import React, { useLayoutEffect } from 'react';
import {Environment, useDefaultProgrammingStore, DATA_TYPES, TYPES, EXTRA_TYPES } from '../components';
import { FiClipboard, FiBriefcase, FiGrid, FiBox, FiLogOut, FiMoreHorizontal, FiLayers, FiFeather } from "react-icons/fi";
import { SIMPLE_PROPERTY_TYPES } from '../components/Constants';
import useMeasure from 'react-use-measure';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Stress',
  component: Environment
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  const { drawers, objectTypes, programData, drawerWidth, tabs, activeTab, ...otherArgs } = args;

  const [ref, bounds] = useMeasure();
  
  useLayoutEffect(()=>{
    useDefaultProgrammingStore.setState({programSpec:{drawers,objectTypes},tabs, activeTab, programData});
  })
  return (
    <div ref={ref} style={{display:'flex',height:'100vh',flexDirection:'row',backgroundColor:'#333'}}>
      <Environment {...otherArgs} store={useDefaultProgrammingStore} height={bounds.height} width={bounds.width} drawerWidth={drawerWidth}/>
    </div>
    )
};

export const Stress = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Stress.args = {
  highlightColor: '#ff00ff',
  drawerWidth: 235,
  drawers: [
    { title: "Structures and Other Blocks", dataType: DATA_TYPES.INSTANCE, objectTypes: ["functionType", "operationType", "blockType"], icon: FiClipboard },
    { title: "Functions", dataType: DATA_TYPES.CALL, objectType: 'functionType', icon: FiLogOut },
    { title: "Hats", dataType: DATA_TYPES.REFERENCE, objectType: 'hatType', icon: FiGrid },
    { title: "Boots", dataType: DATA_TYPES.REFERENCE, objectType: 'bootType', icon: FiBox },
  ],
  objectTypes: {
    programType: {
      name: 'Program',
      type: TYPES.OBJECT,
      instanceBlock: {
        onCanvas: true,
        color: "#3f3f3f",
        icon: FiBriefcase,
        extras: [
          { 
            type: EXTRA_TYPES.INDICATOR_TEXT,
            accessor: (data)=>data.properties.children.length,
            label: 'Size'
          },
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.NAME_EDIT_TOGGLE,
              EXTRA_TYPES.LOCKED_INDICATOR,
              {
                icon: FiMoreHorizontal,
                label: 'More Options',
                type: EXTRA_TYPES.DROPDOWN,
                contents: [
                  EXTRA_TYPES.NAME_EDIT_TOGGLE,
                  EXTRA_TYPES.COLLAPSE_TOGGLE,
                  EXTRA_TYPES.LOCKED_INDICATOR,
                  { 
                    type: EXTRA_TYPES.INDICATOR_TEXT,
                    accessor: (data)=>data.properties.children.length,
                    label: 'Size'
                  },
                  { 
                    type: EXTRA_TYPES.FUNCTION_BUTTON,
                    onClick: 'updateItemBlockColors',
                    label: 'Cycle Color',
                    icon: FiFeather
                  }
                ]
              }
            ]
          },
          EXTRA_TYPES.LOCKED_INDICATOR
        ]
      },
      referenceBlock: null,
      properties: {
        children: {
          name: 'Children',
          accepts: ['operationType', 'functionType', 'blockType'],
          default: [],
          isList: true,
          fullWidth: true
        },
        description: {
          name: "Description",
          type: SIMPLE_PROPERTY_TYPES.IGNORED,
          default: 'Some description text'
        }
      }
    },
    blockType: {
      name: "Block",
      type: TYPES.OBJECT,
      instanceBlock: {
        onCanvas: false,
        color: '#7f7f7f',
        icon: FiLayers,
        extras: [
          EXTRA_TYPES.COLLAPSE_TOGGLE,
          { 
            type: EXTRA_TYPES.INDICATOR_TEXT,
            accessor: (data)=>data.properties.children.length,
            label: 'Size'
          },
          { 
            type: EXTRA_TYPES.FUNCTION_BUTTON,
            onClick: 'updateItemBlockColors',
            label: 'Cycle Color',
            icon: FiFeather
          },
          EXTRA_TYPES.LOCKED_INDICATOR
        ]
      },
      referenceBlock: null,
      properties: {
        children: {
          name: 'Children',
          accepts: ['operationType', 'functionType', 'blockType'],
          default: [],
          isList: true,
          fullWidth: true
        }
      }
    },
    functionType: {
      name: 'Function',
      type: TYPES.FUNCTION,
      instanceBlock: {
        onCanvas: true,
        color: "#62869e",
        icon: FiLogOut,
        extras: [
          EXTRA_TYPES.LOCKED_INDICATOR,
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.SELECTION_TOGGLE,
              EXTRA_TYPES.DELETE_BUTTON,
              EXTRA_TYPES.LOCKED_INDICATOR,
              EXTRA_TYPES.DEBUG_TOGGLE,
              {
                type: EXTRA_TYPES.ADD_ARGUMENT_GROUP,
                allowed: ['hatType','bootType']
              },
              {
                type: EXTRA_TYPES.ADD_ARGUMENT,
                argumentType: 'hatType'
              }
            ]
          },
          {
            type: EXTRA_TYPES.ADD_ARGUMENT_GROUP,
            allowed: ['hatType','bootType']
          }
        ]
      },
      callBlock: {
        onCanvas: false,
        color: "#62869e",
        icon: FiLogOut
      },
      properties: {
        children: {
          name: 'Children',
          accepts: ['functionType', 'blockType', 'operationType'],
          default: [],
          isList: true,
          fullWidth: true
        }
      }
    },
    operationType: {
      name: 'Operation',
      type: TYPES.OBJECT,
      instanceBlock: {
        onCanvas: false,
        color: "#629e6c",
        icon: FiClipboard,
        extras: [
          EXTRA_TYPES.LOCKED_INDICATOR,
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.DELETE_BUTTON,
              EXTRA_TYPES.DEBUG_TOGGLE
            ]
          }
        ],
        hideNewPrefix: true
      },
      properties: {
        hat: {
          name: "Hat",
          accepts: ["hatType"],
          default: null,
          isList: false
        },
        boot: {
          name: "Boot",
          accepts: ["bootType"],
          default: null,
          isList: false
        },
        speed: {
          name: "Speed",
          type: SIMPLE_PROPERTY_TYPES.NUMBER,
          default: 1,
          min: 0,
          max: 2,
          visualScaling: 100
        },
        doFunky: {
          name: "Do Funky",
          type: SIMPLE_PROPERTY_TYPES.BOOLEAN,
          default: false
        },
        greeting: {
          name: "Greeting",
          type: SIMPLE_PROPERTY_TYPES.STRING,
          default: ''
        },
        time: {
          name: "Time",
          type: SIMPLE_PROPERTY_TYPES.OPTIONS,
          options: [{value:'am',label:'AM'},{value:'pm',label:'PM'}],
          default: 'am'
        },
        description: {
          name: "Description",
          type: SIMPLE_PROPERTY_TYPES.IGNORED,
          default: 'Some description text'
        }
      }
    },
    hatType: {
      name: 'Hat',
      type: TYPES.OBJECT,
      instanceBlock: null,
      referenceBlock: {
        onCanvas: false,
        color: "#AD1FDE",
        icon: FiGrid,
        extras: [
          EXTRA_TYPES.LOCKED_INDICATOR,
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.DELETE_BUTTON,
              EXTRA_TYPES.DEBUG_TOGGLE
            ]
          }
        ]
      }
    },
    bootType: {
      name: 'Boot',
      type: TYPES.OBJECT,
      instanceBlock: null,
      referenceBlock: {
        onCanvas: false,
        color: "#B3A533",
        icon: FiGrid,
        extras: [
          EXTRA_TYPES.LOCKED_INDICATOR,
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.DELETE_BUTTON,
              EXTRA_TYPES.DEBUG_TOGGLE
            ]
          }
        ]
      }
    }
  },
  tabs: [
    {
      title:'Main',
      id: 'default',
      visible: true,
      blocks: ["45535153s","655sssefs"]
    }
  ],
  activeTab:'default',
  programData: {
    "45535153s": {
      id: "45535153s",
      name: 'MyProgram',
      type: "programType",
      dataType: DATA_TYPES.INSTANCE,
      properties: {
        children: ['2dfsessfs']
      },
      position: { x: 0, y: 10 },
      canDelete: false,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "655sssefs": {
      id: "655sssefs",
      name: 'MyFunction',
      type: "functionType",
      dataType: DATA_TYPES.INSTANCE,
      arguments: ['s3siakawme'],
      properties: {
        children: []
      },
      position: { x: 400, y: 10 },
      canDelete: true,
      canEdit: true,
      selected: true,
      editing: false,
      
    },
    "s3siakawme" : {
      id: "s3siakawme",
      name: 'Passed Hat',
      type: "hatType",
      dataType: DATA_TYPES.ARGUMENT,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "2dfsessfs": {
      id: "2dfsessfs",
      name: 'MyOperation',
      type: "operationType",
      dataType: DATA_TYPES.INSTANCE,
      properties: {
        hat: null,
        boot: null,
        speed: 1,
        doFunky: true,
        greeting: 'Hello!'
      },
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "6dewwwwww": {
      id: "6dewwwwww",
      name: 'Sombrero',
      type: "hatType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "pspssse32": {
      id: "pspssse32",
      name: 'Fur Boots',
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "pspssse64": {
      id: "pspssse64",
      name: 'Leather Boots',
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "sdfsdsq64": {
      id: "sdfsdsq64",
      name: 'Funky Boots',
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "8423ljdso8s3": {
      id: "8423ljdso8s3",
      name: 'Magenta Boots',
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "p-pspssse32": {
      id: "p-pspssse32",
      name: 'Pricy Boots',
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "55pspssse64": {
      id: "55pspssse64",
      name: 'Fast Boots',
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "6556sdfsdsq64": {
      id: "6556sdfsdsq64",
      name: 'Jazzy Boots',
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "448423ljdso8s3": {
      id: "448423ljdso8s3",
      name: 'Cute Boots',
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "45p-pspssse32": {
      id: "45p-pspssse32",
      name: 'Black Boots',
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "bb55pspssse64": {
      id: "bb55pspssse64",
      name: 'Brown Boots',
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "yy6556sdfsdsq64": {
      id: "yy6556sdfsdsq64",
      name: 'Ugly Boots',
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "44448423ljdso8s3": {
      id: "44448423ljdso8s3",
      name: 'Ugg Boots',
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    }
  },
};