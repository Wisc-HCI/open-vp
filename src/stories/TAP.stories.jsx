import React, { useLayoutEffect } from 'react';
import {Environment, useDefaultProgrammingStore, DATA_TYPES, TYPES, EXTRA_TYPES, SIMPLE_PROPERTY_TYPES } from '../components';
import { FiClipboard, FiBriefcase, FiGrid, FiBox, FiMoreHorizontal } from "react-icons/fi";
import useMeasure from 'react-use-measure';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TAP',
  component: Environment
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  const { drawers, objectTypes, programData, drawerWidth, ...otherArgs } = args;

  const [ref, bounds] = useMeasure();
  
  useLayoutEffect(()=>{
    useDefaultProgrammingStore.setState({programSpec:{drawers,objectTypes},programData});
  })
  return (
    <div ref={ref} style={{display:'flex',height:'100vh',flexDirection:'row',backgroundColor:otherArgs.highlightColor}}>
      <Environment {...otherArgs} store={useDefaultProgrammingStore} height={bounds.height} width={bounds.width} drawerWidth={drawerWidth}/>
    </div>
    )
};

export const TAP = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TAP.args = {
  highlightColor: '#ff00ff',
  drawerWidth: 235,
  drawers: [
    { title: "Rules", dataType: DATA_TYPES.INSTANCE, objectTypes: ["whenType", "wheneverType", "whileType"], icon: FiClipboard },
    { title: "Actions", dataType: DATA_TYPES.REFERENCE, objectType: 'actionType', icon: FiBox },
    { title: "States", dataType: DATA_TYPES.REFERENCE, objectType: 'stateType', icon: FiGrid },
    { title: "Events", dataType: DATA_TYPES.REFERENCE, objectType: 'eventType', icon: FiGrid },
    { title: "State Operations", dataType: DATA_TYPES.INSTANCE, objectTypes: ['notStateType'], icon: FiGrid}
    // { title: "Action Expressions", dataType: DATA_TYPES.INSTANCE, objectTypes: [], icon: FiClipboard },
    // { title: "State Expressions", dataType: DATA_TYPES.INSTANCE, objectTypes: ["notStateType", "isConstantStateType", "andStateType", "orStateType", "toStateType", "constantStateType"], icon: FiClipboard },
    // { title: "Event Expressions", dataType: DATA_TYPES.INSTANCE, objectTypes: ["notEventType", "isConstantEventType", "orEventType", "toEventType", "constantEventType", "emptyEventType"], icon: FiClipboard },
    // { title: "Controllers", dataType: DATA_TYPES.INSTANCE, objectTypes: ["negationControllerType","sinControllerType","cosControllerType","addControllerType","subtractControllerType"], icon: FiClipboard },
  ],
  objectTypes: {
    whenType: {
      name: 'When',
      type: TYPES.OBJECT,
      instanceBlock: {
        onCanvas: true,
        color: "#8790a3",
        icon: FiBriefcase,
        hideNewPrefix: true,
        extras: [
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.NAME_EDIT_TOGGLE,
              EXTRA_TYPES.COLLAPSE_TOGGLE
            ]
          }
        ]
      },
      referenceBlock: null,
      properties: {
        eventExpression: {
          name: 'When',
          accepts: ['eventType', "notEventType", "isConstantEventType", "orEventType", "toEventType", "constantEventType", "emptyEventType"],
          default: null,
          isList: false,
          fullWidth: false
        },
        actionExpression: {
          name: 'Do',
          accepts: ['actionType'],
          default: null,
          isList: false,
          fullWidth: false
        }
      }
    },
    wheneverType: {
      name: 'Whenever',
      type: TYPES.OBJECT,
      instanceBlock: {
        onCanvas: true,
        color: "#a3879e",
        icon: FiBriefcase,
        hideNewPrefix: true,
        extras: [
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.NAME_EDIT_TOGGLE,
              EXTRA_TYPES.COLLAPSE_TOGGLE
            ]
          }
        ]
      },
      referenceBlock: null,
      properties: {
        stateExpression: {
          name: 'Whenever',
          accepts: ['stateType', "notStateType", "isConstantStateType", "andStateType", "orStateType", "toStateType", "constantStateType"],
          default: null,
          isList: false,
          fullWidth: false
        },
        actionExpression: {
          name: 'Do',
          accepts: ['actionType'],
          default: null,
          isList: false,
          fullWidth: false
        }
      }
    },
    whileType: {
      name: 'While',
      type: TYPES.OBJECT,
      instanceBlock: {
        onCanvas: true,
        color: "#6C5799",
        icon: FiBriefcase,
        hideNewPrefix: true,
        extras: [
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.NAME_EDIT_TOGGLE,
              EXTRA_TYPES.COLLAPSE_TOGGLE
            ]
          }
        ]
      },
      referenceBlock: null,
      properties: {
        stateExpression: {
          name: 'While',
          accepts: ['stateType', "notStateType", "isConstantStateType", "andStateType", "orStateType", "toStateType", "constantStateType"],
          default: null,
          isList: false,
          fullWidth: false
        },
        actionExpression: {
          name: 'Do',
          accepts: ['actionType'],
          default: null,
          isList: false,
          fullWidth: false
        }
      }
    },
    actionType: {
      name: 'Action',
      type: TYPES.OBJECT,
      instanceBlock: null,
      referenceBlock: {
        onCanvas: false,
        color: "#fa7645",
        icon: FiGrid,
        extras: [
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.DELETE_BUTTON,
              EXTRA_TYPES.NAME_EDIT_TOGGLE,
              EXTRA_TYPES.DEBUG_TOGGLE
            ]
          }
        ]
      }
    },
    eventType: {
      name: 'Event',
      type: TYPES.OBJECT,
      instanceBlock: null,
      referenceBlock: {
        onCanvas: false,
        color: "#8a645f",
        icon: FiGrid,
        extras: [
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.DELETE_BUTTON,
              EXTRA_TYPES.NAME_EDIT_TOGGLE,
              EXTRA_TYPES.DEBUG_TOGGLE
            ]
          }
        ]
      }
    },
    stateType: {
      name: 'State',
      type: TYPES.OBJECT,
      instanceBlock: null,
      referenceBlock: {
        onCanvas: false,
        color: "#89b18d",
        icon: FiGrid,
        extras: [
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.DELETE_BUTTON,
              EXTRA_TYPES.NAME_EDIT_TOGGLE,
              EXTRA_TYPES.DEBUG_TOGGLE
            ]
          }
        ]
      }
    },
    notStateType: {
      name: 'Not-State',
      type: TYPES.OBJECT,
      instanceBlock: {
        onCanvas: false,
        minified: true,
        color: "#89b18d",
        icon: FiGrid,
        extras: [
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.DELETE_BUTTON,
              EXTRA_TYPES.NAME_EDIT_TOGGLE,
              EXTRA_TYPES.DEBUG_TOGGLE
            ]
          }
        ]
      },
      referenceBlock: null,
      properties: {
        expressionType: {
          name: "Type",
          type: SIMPLE_PROPERTY_TYPES.OPTIONS,
          options: [{value:'not',label:'Not'},{value:'is',label:'Is'}],
          default: 'not'
        },
        doFunky: {
          name: "Do Funky",
          type: SIMPLE_PROPERTY_TYPES.BOOLEAN,
          default: false
        },
        speed: {
          name: "Speed",
          type: SIMPLE_PROPERTY_TYPES.NUMBER,
          default: 1,
          min: -2,
          max: 2,
          step: 0.1,
          units: 'm/s',
          visualScaling: 0.1,
          visualPrecision: 1
        },
        hat: {
          name: "Hat",
          type: SIMPLE_PROPERTY_TYPES.STRING,
          default: 'Funny'
        },
        stateExpression: {
          name: 'State',
          accepts: ['stateType', "notStateType", "isConstantStateType", "andStateType", "orStateType", "toStateType", "constantStateType"],
          default: null,
          isList: false,
          fullWidth: false
        },
        
      }
    }
  },
  programData: {
    "6dewwwwww": {
      id: "6dewwwwww",
      name: 'Play Music',
      type: "actionType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "pspssse32": {
      id: "pspssse32",
      name: 'Human Speech',
      type: "eventType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "sgssdds32": {
      id: "sgssdds32",
      name: 'Human Face',
      type: "stateType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    }
  },
};