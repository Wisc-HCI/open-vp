import React from "react";
import {
  DATA_TYPES,
  TYPES,
  EXTRA_TYPES,
  CONNECTIONS
} from "../../components";
import {
  FiClipboard,
  FiBriefcase,
  FiGrid,
  FiBox,
  FiLogOut,
  FiMoreHorizontal,
  FiFeather,
  FiRefreshCw
} from "react-icons/fi";
import { SIMPLE_PROPERTY_TYPES } from "../../components/Constants";
import { Synchonizing } from "./Synchronizing";

const connectionConfig = {
  drawers: [
    {
      title: "Structures",
      dataType: DATA_TYPES.INSTANCE,
      objectTypes: ["functionType", "operationType"],
      icon: FiClipboard,
    },
    {
      title: "Functions",
      dataType: DATA_TYPES.CALL,
      objectType: "functionType",
      icon: FiLogOut,
    },
    {
      title: "Hats",
      dataType: DATA_TYPES.INSTANCE,
      objectTypes: ["hatType"],
      icon: FiGrid,
    },
    {
      title: "Boots",
      dataType: DATA_TYPES.INSTANCE,
      objectTypes: ["bootType"],
      icon: FiBox,
    },
  ],
  objectTypes: {
    programType: {
      name: "Root",
      type: TYPES.OBJECT,
      description: `# The Program
The **program** does things. It also allows you to include [Operations](operationType) in their set of *children*. It does a lot of fancy things:
- Basketball
- Cribbage
- Snorkelling
    1. Eating pie

You should always follow these steps:
1. Live
1. Laugh
1. Love

Equivalent code may look like this in javascript:
  \`\`\`javascript
function main() {
    // Contents of the program
}
  \`\`\`
      `,
      instanceBlock: {
        onCanvas: true,
        color: "#3f3f3f",
        icon: FiBriefcase,
        connections: {
            bottom: {
                direction: CONNECTIONS.OUTBOUND,
                allowed: ["operationType"]
            }
        },
        extras: [
          {
            type: EXTRA_TYPES.INDICATOR_ICON,
            accessor: (data) => {
              return Synchonizing;
            },
            label: "Status",
          },
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            label: "Custom More...",
            contents: [
              EXTRA_TYPES.DOC_TOGGLE,
              EXTRA_TYPES.NAME_EDIT_TOGGLE,
              EXTRA_TYPES.LOCKED_INDICATOR,
              EXTRA_TYPES.SELECTION_TOGGLE,
              EXTRA_TYPES.DIVIDER,
              {
                // icon: FiMoreHorizontal,
                label: "More Options",
                type: EXTRA_TYPES.DROPDOWN,
                contents: [
                  EXTRA_TYPES.NAME_EDIT_TOGGLE,
                  EXTRA_TYPES.COLLAPSE_TOGGLE,
                  EXTRA_TYPES.LOCKED_INDICATOR,
                  {
                    type: EXTRA_TYPES.FUNCTION_BUTTON,
                    onClick: "updateItemBlockColors",
                    label: "Cycle Color",
                    icon: FiFeather,
                  },
                  {
                    type: EXTRA_TYPES.INDICATOR_ICON,
                    accessor: (data) => {
                      return Synchonizing;
                    },
                    label: "Synchronizing",
                  },
                ],
              },
            ],
          },
          EXTRA_TYPES.DIVIDER,
          EXTRA_TYPES.LOCKED_INDICATOR,
        ],
      },
      referenceBlock: null,
    },
    functionType: {
      name: "Function",
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
              EXTRA_TYPES.NAME_EDIT_TOGGLE,
              EXTRA_TYPES.DELETE_BUTTON,
              EXTRA_TYPES.LOCKED_INDICATOR,
              EXTRA_TYPES.DEBUG_TOGGLE,
              {
                type: EXTRA_TYPES.ADD_ARGUMENT_GROUP,
                allowed: ["hatType", "bootType"],
              },
              {
                type: EXTRA_TYPES.ADD_ARGUMENT,
                argumentType: "hatType",
              },
            ],
          },
          {
            type: EXTRA_TYPES.ADD_ARGUMENT_GROUP,
            allowed: ["hatType", "bootType"],
          },
        ],
      },
      callBlock: {
        onCanvas: false,
        color: "#62869e",
        icon: FiLogOut,
        extras: [
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [EXTRA_TYPES.DEBUG_TOGGLE],
          },
        ],
      },
      properties: {
        children: {
          name: "Children",
          accepts: ["functionType", "blockType", "operationType"],
          default: [],
          isList: true,
          fullWidth: true,
        },
      },
    },
    operationType: {
      name: "Operation",
      type: TYPES.OBJECT,
      instanceBlock: {
        onCanvas: true,
        color: "#629e6c",
        icon: FiClipboard,
        connections: {
            bottom: {
                direction: CONNECTIONS.OUTBOUND,
                allowed: ["operationType"],
                limitOne: true
            },
            top: {
                direction: CONNECTIONS.INBOUND,
                allowed: ["operationType","programType"],
                limitOne: false
            }
        },
        extras: [
          EXTRA_TYPES.LOCKED_INDICATOR,
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.DELETE_BUTTON,
              EXTRA_TYPES.DEBUG_TOGGLE,
              EXTRA_TYPES.SELECTION_TOGGLE,
            ],
          },
        ],
        hideNewPrefix: true,
        // minified: true,
      },
      properties: {
        hat: {
          name: "Hat",
          accepts: ["hatType"],
          default: null,
          isList: false,
        },
        boot: {
          name: "Boot",
          accepts: ["bootType"],
          default: null,
          isList: false,
        },
        speed: {
          name: "Speed",
          type: SIMPLE_PROPERTY_TYPES.NUMBER,
          default: 1,
          min: 0,
          max: 20,
          step: 0.1,
          units: "m/s",
          visualScaling: 0.1,
          visualPrecision: 1,
        },
        doFunky: {
          name: "Do Funky",
          type: SIMPLE_PROPERTY_TYPES.BOOLEAN,
          default: false,
        },
        greeting: {
          name: "Greeting",
          type: SIMPLE_PROPERTY_TYPES.STRING,
          default: "",
        },
        time: {
          name: "Time",
          type: SIMPLE_PROPERTY_TYPES.OPTIONS,
          options: [
            { value: "am", label: "AM" },
            { value: "pm", label: "PM" },
          ],
          default: "am",
        },
        position: {
          name: "Position",
          type: SIMPLE_PROPERTY_TYPES.VECTOR3,
          // min: [0,0,0],
          max: [20,20,20],
          default: [0,0,0],
        },
      },
    },
    hatType: {
      name: "Hat",
      type: TYPES.OBJECT,
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
              EXTRA_TYPES.DEBUG_TOGGLE,
              EXTRA_TYPES.NAME_EDIT_TOGGLE,
              EXTRA_TYPES.SELECTION_TOGGLE,
            ],
          },
        ],
      },
      instanceBlock: {
        onCanvas: true,
        color: "#AD1FDE",
        icon: FiGrid,
        extras: [
          EXTRA_TYPES.LOCKED_INDICATOR,
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.DELETE_BUTTON,
              EXTRA_TYPES.DEBUG_TOGGLE,
              EXTRA_TYPES.NAME_EDIT_TOGGLE,
              EXTRA_TYPES.SELECTION_TOGGLE,
            ],
          },
        ],
      },
    },
    bootType: {
      name: "Boot",
      type: TYPES.OBJECT,
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
              EXTRA_TYPES.DEBUG_TOGGLE,
              EXTRA_TYPES.SELECTION_TOGGLE,
            ],
          },
        ],
      },
      instanceBlock: {
        onCanvas: true,
        color: "#B3A533",
        icon: FiGrid,
        extras: [
          EXTRA_TYPES.LOCKED_INDICATOR,
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.DELETE_BUTTON,
              EXTRA_TYPES.DEBUG_TOGGLE,
              EXTRA_TYPES.SELECTION_TOGGLE,
            ],
          },
        ],
      },
    },
  },
};

export default connectionConfig;