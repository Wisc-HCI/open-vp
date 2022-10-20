import React from "react";
import { DATA_TYPES, TYPES, EXTRA_TYPES } from "../../components";
import {
  FiClipboard,
  FiBriefcase,
  FiGrid,
  FiBox,
  FiLogOut,
  FiMoreHorizontal,
  FiLayers,
  FiFeather,
  FiRefreshCw,
} from "react-icons/fi";
import { SIMPLE_PROPERTY_TYPES } from "../../components/Constants";
import { Synchonizing } from "./Synchronizing";

const basicConfig = {
  drawers: [
    {
      title: "Structures",
      dataType: DATA_TYPES.INSTANCE,
      objectTypes: ["functionType", "operationType", "blockType"],
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
      dataType: DATA_TYPES.REFERENCE,
      objectType: "hatType",
      icon: FiGrid,
    },
    {
      title: "Boots",
      dataType: DATA_TYPES.REFERENCE,
      objectType: "bootType",
      icon: FiBox,
    },
  ],
  objectTypes: {
    programType: {
      name: "Program",
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
  \`\`\`
   function main() {
    // Contents of the program
   }
  \`\`\`
      `,
      instanceBlock: {
        onCanvas: true,
        color: "#3f3f3f",
        icon: FiBriefcase,
        extras: [
          {
            type: EXTRA_TYPES.INDICATOR_TEXT,
            accessor: (data) => data.properties.children.length,
            label: "Size",
          },
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
              EXTRA_TYPES.DEBUG_TOGGLE,
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
                    type: EXTRA_TYPES.INDICATOR_TEXT,
                    accessor: (data) => data.properties.children.length,
                    label: "Size",
                  },
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
      properties: {
        children: {
          name: "Children",
          accepts: ["operationType", "functionType", "blockType"],
          default: [],
          isList: true,
          fullWidth: true,
        },
      },
      parsers: {
        javascript: ({ block, name, depth, context, storeParser }) => {
          return `function ${name}() {\n${block.properties.children
            .map((a) => storeParser("javascript", a, depth + 1, context))
            .join(";\n")};\n};\n\n`;
        },
      },
      namePolicy: {
        javascript: (block) => {
          return block.name.replace(" ", "");
        },
      },
    },
    blockType: {
      name: "Block",
      type: TYPES.OBJECT,
      instanceBlock: {
        onCanvas: false,
        color: "#7f7f7f",
        icon: FiLayers,
        extras: [
          EXTRA_TYPES.DOC_TOGGLE,
          EXTRA_TYPES.COLLAPSE_TOGGLE,
          EXTRA_TYPES.DEBUG_TOGGLE,
          {
            type: EXTRA_TYPES.INDICATOR_TEXT,
            accessor: (data) => data.properties.children.length,
            label: "Size",
          },
          {
            type: EXTRA_TYPES.FUNCTION_BUTTON,
            onClick: "updateItemBlockColors",
            label: "Cycle Color",
            icon: FiFeather,
          },
          EXTRA_TYPES.LOCKED_INDICATOR,
        ],
      },
      referenceBlock: null,
      properties: {
        children: {
          name: "Children",
          accepts: ["operationType", "functionType", "blockType"],
          default: [],
          isList: true,
          fullWidth: true,
        },
      },
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
            contents: [EXTRA_TYPES.DEBUG_TOGGLE,EXTRA_TYPES.DELETE_BUTTON],
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
      parsers: {
        javascript: ({ block, name, depth, context, storeParser }) => {
          if (block.dataType === DATA_TYPES.INSTANCE) {
            return `function ${name}(${block.arguments
              .map((a) => storeParser("javascript", a, 0, context))
              .join(", ")}) {\n${block.properties.children
              .map((a) => storeParser("javascript", a, depth + 1, context))
              .join(";\n")};\n};\n\n`;
          } else if (block.dataType === DATA_TYPES.CALL) {
            return `${" ".repeat(depth * 3)}${name}()`;
          }
        },
      },
      namePolicy: {
        javascript: (block) => {
          return block.name.replace(" ", "");
        },
      },
    },
    operationType: {
      name: "Operation",
      description: `# The Operation
The **Operation** does stuff and things. It can be included in a [Program](programType) as a *child*. 

Equivalent code may look like this in javascript:
  \`\`\`
   topic.publish({
    hat,
    boot,
    speed,
    isFancy
  })
  \`\`\`
      `,
      type: TYPES.OBJECT,
      instanceBlock: {
        onCanvas: false,
        color: "#629e6c",
        icon: FiClipboard,
        extras: [
          EXTRA_TYPES.DOC_TOGGLE,
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
      },
      properties: {
        hat: {
          name: "Hat",
          accepts: ["hatType"],
          default: null,
          isList: false,
          isRequired: true
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
      },
      parsers: {
        javascript: ({ block, name, depth, context, storeParser }) => {
          if (block.properties.hat && block.properties.boot) {
            return (
              " ".repeat(depth * 3) +
              'console.log("While wearing ${' +
              storeParser("javascript", block.properties.hat, 0, context) +
              "} and ${" +
              storeParser("javascript", block.properties.boot, 0, context) +
              "} greet by saying " +
              block.properties.greeting +
              " in the " +
              block.properties.time +
              " with speed " +
              block.properties.speed +
              `${block.properties.doFunky ? " in a funky way." : "."}"` +
              ")"
            );
          } else if (block.properties.hat) {
            return (
              " ".repeat(depth * 3) +
              'console.log("While wearing ${' +
              storeParser("javascript", block.properties.hat, 0, context) +
              "} greet by saying " +
              block.properties.greeting +
              " in the " +
              block.properties.time +
              " with speed " +
              block.properties.speed +
              `${block.properties.doFunky ? " in a funky way." : "."}"` +
              ")"
            );
          } else if (block.properties.boot) {
            return (
              " ".repeat(depth * 3) +
              'console.log("While wearing ${' +
              storeParser("javascript", block.properties.boot, 0, context) +
              "} greet by saying " +
              block.properties.greeting +
              " in the " +
              block.properties.time +
              " with speed " +
              block.properties.speed +
              `${block.properties.doFunky ? " in a funky way." : "."}"` +
              ")"
            );
          } else {
            return (
              " ".repeat(depth * 3) +
              'console.log("Greet by saying ' +
              block.properties.greeting +
              " in the " +
              block.properties.time +
              " with speed " +
              block.properties.speed +
              `${block.properties.doFunky ? " in a funky way." : "."}"` +
              ")"
            );
          }
        },
      },
      namePolicy: {
        javascript: (block) => {
          return block.name.replace(" ", "");
        },
      },
    },
    hatType: {
      name: "Hat",
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
              EXTRA_TYPES.DEBUG_TOGGLE,
              EXTRA_TYPES.NAME_EDIT_TOGGLE,
              EXTRA_TYPES.SELECTION_TOGGLE,
            ],
          },
        ],
      },
      parsers: {
        javascript: ({ block, name, depth, context, storeParser }) => {
          return `let ${name} = {};\n\n`;
        },
      },
      namePolicy: {
        javascript: (block) => {
          return block.name.replace(" ", "");
        },
      },
    },
    bootType: {
      name: "Boot",
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
              EXTRA_TYPES.DEBUG_TOGGLE,
              EXTRA_TYPES.SELECTION_TOGGLE,
            ],
          },
        ],
      },
      parsers: {
        javascript: ({ block, name, depth, context, storeParser }) => {
          return `let ${name} = {};\n\n`;
        },
      },
      namePolicy: {
        javascript: (block) => {
          return block.name.replace(" ", "");
        },
      },
    },
  },
};

export default basicConfig;
