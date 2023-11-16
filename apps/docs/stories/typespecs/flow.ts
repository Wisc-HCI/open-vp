import {
  PrimitiveType,
  ConnectionDirection,
  ExtraType,
  PropertyType,
  MetaType,
  ParserProps,
  BlockData,
  TypeSpec,
  DrawerSpec,
  DrawerType
} from "@people_and_robots/open-core";

export const flowDrawers: DrawerSpec[] = [
  {
    title: "Nodes",
    type: DrawerType.Multiple,
    metaType: MetaType.ObjectInstance,
    objectTypes: ["stateType"],
    icon: "BoxIcon",
  },
  {
    title: "Expressions",
    type: DrawerType.Multiple,
    metaType: MetaType.ObjectInstance,
    objectTypes: ["expressionType", "gestureType"],
    icon: "FaceIcon",
  }
]

export const flowTypes: { [key: string]: TypeSpec } = {
  stateType: {
    name: "State",
    primitiveType: PrimitiveType.Object,
    description: `# The State
Each State is a collection of attributes, which can be dragged into the State. These attributes include [Face Expression](expressionType) and [Hand Gesture](gestureType). 
    `,
    instanceBlock: {
      onCanvas: true,
      color: "#3f3f3f",
      icon: "BoxIcon",
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
          label: "More",
          icon: "DotsHorizontalIcon",
          contents: [
            ExtraType.CollapseToggle,
            ExtraType.SelectionToggle,
            ExtraType.DeleteButton,
            ExtraType.DocToggle,
            {
              type: ExtraType.Dropdown,
              label: "More",
              icon: "DotsHorizontalIcon",
              contents: [
                ExtraType.CollapseToggle,
                ExtraType.SelectionToggle,
                ExtraType.DeleteButton,
                ExtraType.DocToggle,
              ],
            }
          ],
        },
      ],
    },
    referenceBlock: {
      onCanvas: false,
      color: "#3f3f3f",
      icon: "BoxIcon",
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
      javascript: ({
        block,
        name,
        depth,
        context,
        storeParser,
      }: ParserProps) => {
        if (block.metaType !== MetaType.FunctionDeclaration) return "error";
        return `function ${name}() {\n${block.properties.children
          .map((a: string) => storeParser("javascript", a, depth + 1, context))
          .join(";\n")};\n};\n\n`;
      },
    },
    namePolicy: {
      javascript: (block: BlockData) => {
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
      icon: "FaceIcon",
      extras: [ExtraType.CollapseToggle, ExtraType.DocToggle],
    },
    referenceBlock: {
      onCanvas: false,
      color: "#AD1FDE",
      icon: "FaceIcon",
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
      javascript: ({
        block,
        name,
        depth,
        context,
        storeParser,
      }: ParserProps) => {
        return `let ${name} = {};\n\n`;
      },
    },
    namePolicy: {
      javascript: (block: BlockData) => {
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
      icon: "HandIcon",
      extras: [ExtraType.CollapseToggle, ExtraType.DocToggle],
    },
    referenceBlock: {
      onCanvas: false,
      color: "#B3A533",
      icon: "HandIcon",
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
      javascript: ({
        block,
        name,
        depth,
        context,
        storeParser,
      }: ParserProps) => {
        return `let ${name} = {};\n\n`;
      },
    },
    namePolicy: {
      javascript: (block: BlockData) => {
        return block.name.replace(" ", "");
      },
    },
  },
};
