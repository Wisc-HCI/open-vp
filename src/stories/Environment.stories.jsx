import React, { useLayoutEffect } from 'react';
import {Environment, useDefaultProgrammingStore, DATA_TYPES, TYPES, EXTRA_TYPES } from '../components';
import { FiClipboard, FiBriefcase, FiGrid, FiBox, FiLogOut, FiMoreHorizontal } from "react-icons/fi";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Environment',
  component: Environment
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  const { drawers, objectTypes, programData, ...otherArgs } = args;
  useLayoutEffect(()=>{
    useDefaultProgrammingStore.setState({programSpec:{drawers,objectTypes},programData});
  })
  return <Environment {...otherArgs} store={useDefaultProgrammingStore}/>
};

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {
  highlightColor: '#ff00ff',
  drawers: [
    { title: "Structures", dataType: DATA_TYPES.INSTANCE, objectTypes: ["functionType", "operationType"], icon: FiClipboard },
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
        collapse: true,
        extras: [
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
                  EXTRA_TYPES.LOCKED_INDICATOR
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
          accepts: ['operationType', 'functionType'],
          default: [],
          isList: true
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
        collapse: true,
        extras: [
          EXTRA_TYPES.LOCKED_INDICATOR,
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [EXTRA_TYPES.LOCKED_INDICATOR]
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
          accepts: ['operationType'],
          default: [],
          isList: true
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
            actions: []
          }
        ]
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
        children: {
          name: "Children",
          accepts: ["operationType",'functionType'],
          default: [],
          isList: true
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
            actions: []
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
            actions: []
          }
        ]
      }
    }
  },
  programData: {
    "45535153s": {
      id: "45535153s",
      name: 'MyProgram',
      type: "programType",
      dataType: DATA_TYPES.INSTANCE,
      properties: {
        children: []
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
      position: { x: 300, y: 10 },
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
        children: [],
        field1: null,
        field2: null
      },
      canDelete: true,
      canEdit: true,
      selected: true,
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
    }
  },
};