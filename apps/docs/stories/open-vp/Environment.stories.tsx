import type { Meta, StoryObj } from "@storybook/react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Button,
  Stack,
  PaletteMode,
  useTheme,
} from "@mui/material";
import { Environment } from "@people_and_robots/open-vp";
import {
  FiClipboard,
  FiLogOut,
  FiGrid,
  FiBox,
  FiBriefcase,
  FiLayers,
  FiChevronDown,
  FiPlus,
} from "react-icons/fi";
import { EnvironmentProps } from "@people_and_robots/open-vp/src/Environment";
import {
  DrawerType,
  FunctionDeclarationData,
  MetaType,
  PrimitiveType,
  PropertyType,
  ExtraType,
  ConnectionDirection,
} from "@people_and_robots/open-core";
import React from "react";

const meta: Meta<typeof Environment> = {
  component: Environment,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story, args) => {
      return (
          <div
            style={{
              display:'flex',
              minHeight: args.viewMode === 'docs' ? 400 : '100vh',//"calc(100vh - 55pt)",
              width: "100%",//"calc(100vw - 25pt)"
            }}
          >
          <Story {...args} />
          </div>
      )
    }
  ]
};

export default meta;

type Story = StoryObj<typeof Environment>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props: EnvironmentProps) => <Environment {...props} />,
  name: "Imperative Programming",
  args: {
    types: {
      stateType: {
        name: "Program",
        primitiveType: PrimitiveType.Object,
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
          extras: [
            {
              type: ExtraType.Dropdown,
              icon: <FiChevronDown />,
              contents: [
                ExtraType.CollapseToggle,
                ExtraType.SelectionToggle,
                ExtraType.DeleteButton,
                ExtraType.DocToggle,
              ],
            },
          ],
        },
        referenceBlock: {
          onCanvas: true,
          color: "#3f3f3f",
          icon: FiBriefcase,
          extras: [],
        },
        properties: {
          children: {
            id: "children",
            type: PropertyType.Block,
            name: "Children",
            accepts: ["operationType", "functionType", "blockType"],
            default: [],
            isList: true,
            fullWidth: true,
          },
        },
        parsers: {
          javascript: ({ block, name, depth, context, storeParser }) => {
            if (block.metaType !== MetaType.FunctionDeclaration) return "error";
            return `function ${name}() {\n${block.properties.children
              .map((a: string) =>
                storeParser("javascript", a, depth + 1, context)
              )
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
        primitiveType: PrimitiveType.Object,
        description: `# A Block
  The **Block** is a block. It can be included in a [Program](stateType) as a *child*.
    \`\`\`
        `,
        instanceBlock: {
          onCanvas: false,
          color: "#7f7f7f",
          icon: FiLayers,
          extras: [ExtraType.CollapseToggle, ExtraType.DocToggle],
        },
        referenceBlock: {
          onCanvas: false,
          color: "#7f7f7f",
          icon: FiLayers,
          extras: [],
        },
        properties: {
          children: {
            id: "children",
            type: PropertyType.Block,
            name: "Children",
            accepts: ["operationType", "functionType", "blockType"],
            default: [],
            isList: true,
            fullWidth: true,
          },
        },
        parsers: {
          javascript: ({ block, depth, context, storeParser }) => {
            if (block.metaType !== MetaType.ObjectInstance) return "error";
            return `{\n${block.properties.children
              .map((a: string) =>
                storeParser("javascript", a, depth + 1, context)
              )
              .join(";\n")};\n};\n\n`;
          },
        },
        namePolicy: {
          javascript: (block) => {
            return block.name.replace(" ", "");
          },
        },
      },
      functionType: {
        name: "Function",
        primitiveType: PrimitiveType.Function,
        description: `# The Function
  The **Function** does stuff and things. It can be included in a [Program](stateType) as a *child*.
  `,
        functionBlock: {
          onCanvas: true,
          color: "#62869e",
          icon: FiLogOut,
          extras: [
            {
              type: ExtraType.Dropdown,
              label: "Actions",
              contents: [
                {
                  type: ExtraType.AddArgumentGroup,
                  icon: FiPlus,
                  allowed: ["hatType", "bootType"],
                },
                ExtraType.DeleteButton,
                ExtraType.DebugToggle,
                ExtraType.DocToggle,
              ],
            },
          ],
        },
        callBlock: {
          onCanvas: false,
          color: "#62869e",
          icon: FiLogOut,
          extras: [ExtraType.DebugToggle, ExtraType.DocToggle],
        },
        properties: {
          children: {
            id: "children",
            type: PropertyType.Block,
            name: "Children",
            accepts: ["operationType", "functionType", "blockType"],
            default: [],
            isList: true,
            fullWidth: true,
          },
        },
        parsers: {
          javascript: ({ block, name, depth, context, storeParser }) => {
            if (
              block.metaType !== MetaType.FunctionDeclaration &&
              block.metaType !== MetaType.FunctionCall
            )
              return "error";
            if (block.metaType === MetaType.FunctionDeclaration) {
              return `function ${name}(${block.arguments
                .map((a: string) => storeParser("javascript", a, 0, context))
                .join(", ")}) {\n${block.properties.children
                .map((a: string) =>
                  storeParser("javascript", a, depth + 1, context)
                )
                .join(";\n")}\n};\n\n`;
            } else if (block.metaType === MetaType.FunctionCall) {
              const inst = context[block.ref] as FunctionDeclarationData;
              return `${" ".repeat(depth * 3)}${name}(${inst.arguments
                .map((a) =>
                  block.properties[a]
                    ? storeParser("javascript", block.properties[a], 0, context)
                    : "undefined"
                )
                .join(", ")})`;
            }
            return "error";
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
  The **Operation** does stuff and things. It can be included in a [Program](stateType) as a *child*. 
  
  Equivalent code may look like this in javascript:
    \`\`\`javascript
  topic.publish({
      hat,
      boot,
      speed,
      isFancy
  })
    \`\`\`
        `,
        primitiveType: PrimitiveType.Object,
        instanceBlock: {
          onCanvas: false,
          color: "#629e6c",
          icon: FiClipboard,
          extras: [ExtraType.CollapseToggle, ExtraType.DocToggle],
          hideNewPrefix: true,
        },
        referenceBlock: {
          onCanvas: false,
          color: "#629e6c",
          icon: FiClipboard,
          extras: [],
          hideNewPrefix: true,
        },
        properties: {
          hat: {
            id: "hat",
            name: "Hat",
            accepts: ["hatType"],
            default: null,
            isList: false,
            type: PropertyType.Block,
          },
          boot: {
            id: "boot",
            name: "Boot",
            accepts: ["bootType"],
            default: null,
            isList: false,
            type: PropertyType.Block,
          },
          speed: {
            id: "speed",
            name: "Speed",
            type: PropertyType.Number,
            default: 1,
            min: 0,
            max: 20,
            step: 0.1,
            units: "m/s",
          },
          doFunky: {
            id: "doFunky",
            name: "Do Funky",
            type: PropertyType.Boolean,
            default: false,
          },
          greeting: {
            id: "greeting",
            name: "Greeting",
            type: PropertyType.String,
            default: "",
          },
          time: {
            id: "time",
            name: "Time",
            type: PropertyType.Options,
            options: [
              { value: "am", label: "AM" },
              { value: "pm", label: "PM" },
            ],
            default: "am",
          },
        },
        parsers: {
          javascript: ({ block, name, depth, context, storeParser }) => {
            if (block.metaType !== MetaType.ObjectInstance) return "error";
            const hat = block.properties.hat
              ? storeParser("javascript", block.properties?.hat, 0, context)
              : "undefined";
            const boot = block.properties.boot
              ? storeParser("javascript", block.properties?.boot, 0, context)
              : "undefined";
            const inner = " ".repeat((depth + 1) * 3);
            return (
              " ".repeat(depth * 3) +
              `console.log("${name}",{\n${inner}hat:${hat},\n${inner}boot:${boot},\n${inner}speed:${
                block.properties.speed
              },\n${inner}doFunky:${
                block.properties.doFunky
              },\n${inner}greeting:"${
                block.properties.greeting
              }",\n${inner}time:"${block.properties.time}"\n${" ".repeat(
                depth * 3
              )}})`
            );
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
        description: `# The Hat
        The **Hat** is something that you wear on your head. It can be included in an [Operation](operationType) as a *parameter*.`,
        primitiveType: PrimitiveType.Object,
        instanceBlock: {
          onCanvas: false,
          color: "#AD1FDE",
          icon: FiGrid,
          extras: [],
        },
        referenceBlock: {
          onCanvas: false,
          color: "#AD1FDE",
          icon: FiGrid,
          extras: [],
        },
        properties: {},
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
        description: `# The Boot
        The **Boot** is something that you wear on your feet. It can be included in an [Operation](operationType) as a *parameter*.`,
        primitiveType: PrimitiveType.Object,
        instanceBlock: {
          onCanvas: false,
          color: "#B3A533",
          icon: FiGrid,
          extras: [],
        },
        referenceBlock: {
          onCanvas: false,
          color: "#B3A533",
          icon: FiGrid,
          extras: [],
        },
        properties: {},
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
    drawers: [
      {
        title: "Structures",
        type: DrawerType.Multiple,
        metaType: MetaType.ObjectInstance,
        objectTypes: ["stateType", "operationType", "blockType"],
        icon: FiClipboard,
      },
      {
        title: "Declarations",
        type: DrawerType.Multiple,
        metaType: MetaType.FunctionDeclaration,
        objectTypes: ["functionType"],
        icon: FiClipboard,
      },
      {
        title: "Function Calls",
        type: DrawerType.Singular,
        metaType: MetaType.FunctionCall,
        objectType: "functionType",
        icon: FiLogOut,
      },
      {
        title: "Hats",
        type: DrawerType.Singular,
        metaType: MetaType.ObjectReference,
        objectType: "hatType",
        icon: FiGrid,
      },
      {
        title: "Boots",
        type: DrawerType.Singular,
        metaType: MetaType.ObjectReference,
        objectType: "bootType",
        icon: FiBox,
      },
    ],
  },
};

export const Secondary: Story = {
  render: (props: EnvironmentProps) => <Environment {...props} />,
  name: "Flow-Based Programming",
  args: {
    types: {
      stateType: {
        name: "State",
        primitiveType: PrimitiveType.Object,
        description: `# The State
Each State is a collection of attributes, which can be dragged into the State. These attributes include [Face Expression](expressionType) and [Hand Gesture](gestureType). 
        `,
        instanceBlock: {
          onCanvas: true,
          color: "#3f3f3f",
          icon: FiBriefcase,
          connections: {
            bottom: {
              allowed: ["stateType"],
              direction: ConnectionDirection.Outbound,
            },
            top: {
              allowed: ["stateType"],
              direction: ConnectionDirection.Inbound,
            },
          },
          extras: [
            {
              type: ExtraType.Dropdown,
              icon: <FiChevronDown />,
              contents: [
                ExtraType.CollapseToggle,
                ExtraType.SelectionToggle,
                ExtraType.DeleteButton,
                ExtraType.DocToggle,
              ],
            },
          ],
        },
        referenceBlock: {
          onCanvas: false,
          color: "#3f3f3f",
          icon: FiBriefcase,
          extras: [],
        },
        properties: {
          children: {
            id: "children",
            type: PropertyType.Block,
            name: "Children",
            accepts: ["expressionType", "gestureType"],
            default: [],
            isList: true,
            fullWidth: true,
          },
        },
        parsers: {
          javascript: ({ block, name, depth, context, storeParser }) => {
            if (block.metaType !== MetaType.FunctionDeclaration) return "error";
            return `function ${name}() {\n${block.properties.children
              .map((a: string) =>
                storeParser("javascript", a, depth + 1, context)
              )
              .join(";\n")};\n};\n\n`;
          },
        },
        namePolicy: {
          javascript: (block) => {
            return block.name.replace(" ", "");
          },
        },
      },
      expressionType: {
        name: "Expression",
        description: `## The Facial Expression Attribute
The **The Facial Expression Attribute** can be configured and added to individual [States](stateType).`,
        primitiveType: PrimitiveType.Object,
        instanceBlock: {
          onCanvas: false,
          color: "#AD1FDE",
          icon: FiGrid,
          extras: [ExtraType.CollapseToggle, ExtraType.DocToggle],
        },
        referenceBlock: {
          onCanvas: false,
          color: "#AD1FDE",
          icon: FiGrid,
          extras: [ExtraType.CollapseToggle, ExtraType.DocToggle],
        },
        properties: {
          type: {
            id: "type",
            name: "Type",
            type: PropertyType.Options,
            options: [
              { value: "happy", label: "Happy" },
              { value: "sad", label: "Sad" },
              { value: "angry", label: "Angry" },
              { value: "surprised", label: "Surprised" },
            ],
            default: "happy",
          },
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
      gestureType: {
        name: "Gesture",
        description: `## The Hand Gesture Attribute
The **Hand Gesture Attribute** can be configured and added to individual [States](stateType).`,
        primitiveType: PrimitiveType.Object,
        instanceBlock: {
          onCanvas: false,
          color: "#B3A533",
          icon: FiGrid,
          extras: [ExtraType.CollapseToggle, ExtraType.DocToggle],
        },
        referenceBlock: {
          onCanvas: false,
          color: "#B3A533",
          icon: FiGrid,
          extras: [ExtraType.CollapseToggle, ExtraType.DocToggle],
        },
        properties: {
          type: {
            id: "type",
            name: "Type",
            type: PropertyType.Options,
            options: [
              { value: "wave", label: "Wave" },
              { value: "point", label: "Point" },
              { value: "thumbsUp", label: "Thumbs Up" },
              { value: "thumbsDown", label: "Thumbs Down" },
            ],
            default: "wave",
          },
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
    drawers: [
      {
        title: "Nodes",
        type: DrawerType.Multiple,
        metaType: MetaType.ObjectInstance,
        objectTypes: ["stateType"],
        icon: FiClipboard,
      },
      {
        title: "Expressions",
        type: DrawerType.Multiple,
        metaType: MetaType.ObjectInstance,
        objectTypes: ["expressionType", "gestureType"],
        icon: FiBox,
      },
    ],
  },
};
