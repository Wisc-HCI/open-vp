interface DocData {
  name: string;
  description: string;
  example?: string;
  required: boolean;
  type: TypeData;
}

interface LinkTypeData {
  type: "link";
  label: string;
  path: string;
}

interface RecordTypeData {
  type: "record";
  key: TypeData;
  value: TypeData;
}

interface ArrayTypeData {
  type: "array";
  value: TypeData;
}

interface ObjectTypeData {
  type: "object";
  value: Record<string, TypeData>;
}

interface OrTypeData {
  type: "or";
  entries: TypeData[];
}

interface AndTypeData {
  type: "and";
  entries: TypeData[];
}

type TypeData =
  | string
  | LinkTypeData
  | RecordTypeData
  | ArrayTypeData
  | ObjectTypeData
  | OrTypeData
  | AndTypeData;

export const ObjectTypeSpec: DocData[] = [
  {
    name: "name",
    description: "The name of this type",
    example: "State",
    required: true,
    type: "string",
  },
  {
    name: "primitiveType",
    description: 'This is always `PrimitiveType.Object` or "OBJECT"',
    example: "PrimitiveType.Object",
    required: true,
    type: {
      type: "link",
      label: "PrimitiveType.Object",
      path: "/docs/api/enums/primitive-type",
    },
  },
  {
    name: "description",
    description: "A markdown flavored string description of the block",
    example: null,
    required: true,
    type: "string",
  },
  {
    name: "instanceBlock",
    description: "The block spec for the instance of this object",
    example: null,
    required: true,
    type: { type: "link", label: "BlockSpec", path: "/docs/api/block-spec" },
  },
  {
    name: "referenceBlock",
    description: "The block spec for the reference of this object",
    example: null,
    required: true,
    type: { type: "link", label: "BlockSpec", path: "/docs/api/block-spec" },
  },
  {
    name: "properties",
    description: "The properties of the object",
    example: null,
    required: true,
    type: {
      type: "record",
      key: "string",
      value: {
        type: "link",
        label: "FieldInfo",
        path: "/docs/api/field-info",
      },
    },
  },
];

export const FunctionTypeSpec: DocData[] = [
  {
    name: "name",
    description: "The name of this type",
    example: "State",
    required: true,
    type: "string",
  },
  {
    name: "primitiveType",
    description: 'This is always `PrimitiveType.Function` or "FUNCTION"',
    example: "PrimitiveType.Function",
    required: true,
    type: {
      type: "link",
      label: "PrimitiveType.Function",
      path: "/docs/api/enums/primitive-type",
    },
  },
  {
    name: "description",
    description: "A markdown flavored string description of the block",
    example: null,
    required: true,
    type: "string",
  },
  {
    name: "functionBlock",
    description: "The block spec for the instance of this object",
    example: null,
    required: true,
    type: { type: "link", label: "BlockSpec", path: "/docs/api/block-spec" },
  },
  {
    name: "callBlock",
    description: "The block spec for the reference of this object",
    example: null,
    required: true,
    type: { type: "link", label: "BlockSpec", path: "/docs/api/block-spec" },
  },
  {
    name: "properties",
    description: "The properties of the object",
    example: null,
    required: true,
    type: {
      type: "record",
      key: "string",
      value: {
        type: "link",
        label: "FieldInfo",
        path: "/docs/api/field-info",
      },
    },
  },
];

export const ProgramSpec: DocData[] = [
  {
    name: "drawer",
    description:
      "A list of specifications for the drawers on the left-hand side of the environment",
    example: null,
    required: true,
    type: {
      type: "array",
      value: {
        type: "link",
        label: "DrawerSpec",
        path: "/docs/api/drawer-spec",
      },
    },
  },
  {
    name: "objectTypes",
    description:
      "A lookup of the different blocks that can be used in the environment",
    example: null,
    required: true,
    type: {
      type: "record",
      key: "string",
      value: {
        type: "link",
        label: "TypeSpec",
        path: "/docs/api/type-spec",
      },
    },
  },
];

export const ObjectDrawerSpec: DocData[] = [
  {
    name: "type",
    description: 'This is always `DrawerType.Multiple` or "MULTIPLE"',
    example: "DrawerType.Multiple",
    required: true,
    type: {
      type: "link",
      label: "DrawerType.Multiple",
      path: "/docs/api/enums/drawer-type",
    },
  },
  {
    name: "title",
    description: "The title of the drawer",
    example: "Container Blocks",
    required: true,
    type: "string",
  },
  {
    name: "icon",
    description: "The name of the icon to use for the drawer",
    example: "SquareRounded",
    required: true,
    type: "string",
  },
  {
    name: "objectTypes",
    description: "The keys for block types that are shown in this drawer",
    example: '["blockType", "programType"]',
    required: true,
    type: {
      type: "array",
      value: "string",
    },
  },
  {
    name: "metaType",
    description: "The parent type of the blocks inside",
    example: "MetaType.ObjectInstance",
    required: true,
    type: {
      type: "or",
      entries: [
        {
          type: "link",
          label: "MetaType.ObjectInstance",
          path: "/docs/api/enums/meta-type",
        },
        {
          type: "link",
          label: "MetaType.FunctionDeclaration",
          path: "/docs/api/enums/meta-type",
        },
      ],
    },
  },
];

export const ReferenceDrawerSpec: DocData[] = [
  {
    name: "type",
    description: 'This is always `DrawerType.Singular` or "SINGULAR"',
    example: "DrawerType.Singular",
    required: true,
    type: {
      type: "link",
      label: "DrawerType.Singular",
      path: "/docs/api/enums/drawer-type",
    },
  },
  {
    name: "title",
    description: "The title of the drawer",
    example: "Block References",
    required: true,
    type: "string",
  },
  {
    name: "icon",
    description: "The name of the icon to use for the drawer",
    example: "SquareRounded",
    required: true,
    type: "string",
  },
  {
    name: "objectType",
    description: "The keys for block types that are shown in this drawer",
    example: '"blockType"',
    required: true,
    type: "string",
  },
  {
    name: "metaType",
    description: "The parent type of the blocks inside",
    example: "MetaType.FunctionCall",
    required: true,
    type: {
      type: "or",
      entries: [
        {
          type: "link",
          label: "MetaType.ObjectReference",
          path: "/docs/api/enums/meta-type",
        },
        {
          type: "link",
          label: "MetaType.FunctionCall",
          path: "/docs/api/enums/meta-type",
        },
      ],
    },
  },
];

export const BlockFieldInfo: DocData[] = [
  {
    name: "id",
    type: "string",
    required: true,
    example: "canDance",
    description:
      "The key that is used for storing this data in the block data. Matches the key of the item in properties.",
  },
  {
    name: "name",
    type: {
      type: "or",
      entries: [
        "string",
        {
          type: "link",
          label: "SimpleOptionsFieldInfo",
          path: "/docs/api/field-info",
        },
      ],
    },
    required: true,
    example: "Can Dance",
    description: "The name of the field that is shown to the user",
  },
  {
    name: "accepts",
    type: {
      type: "array",
      value: "string",
    },
    required: true,
    example: '["blockType"]',
    description:
      "The keys for block types that are allowed to be used in this field",
  },
  {
    name: "default",
    type: "any",
    required: true,
    example: null,
    description: "The default value for the field",
  },
  {
    name: "isList",
    type: "boolean",
    required: false,
    example: "false",
    description: "Whether the field can accept multiple values",
  },
  {
    name: "fullWidth",
    type: "boolean",
    required: false,
    example: "false",
    description:
      "Whether the field should take up the full width of the drawer",
  },
  {
    name: "type",
    type: {
      type: "link",
      path: "/docs/api/enums/property-type",
      label: "PropertyType.Block",
    },
    required: true,
    example: "PropertyType.Block",
    description: "Indicator for this field being a block",
  },
];

export const SimpleBooleanFieldInfo: DocData[] = [
  {
    name: "id",
    type: "string",
    required: true,
    example: "canDance",
    description:
      "The key that is used for storing this data in the block data. Matches the key of the item in properties.",
  },
  {
    name: "name",
    type: "string",
    required: true,
    example: "Can Dance",
    description: "The name of the field that is shown to the user",
  },
  {
    name: "default",
    type: "boolean",
    required: true,
    example: "false",
    description: "The default value for the field",
  },
  {
    name: "type",
    type: {
      type: "link",
      path: "/docs/api/enums/property-type",
      label: "PropertyType.Boolean",
    },
    required: true,
    example: "PropertyType.Boolean",
    description: "Indicator for this field being a boolean",
  },
];

export const SimpleNumberFieldInfo: DocData[] = [
  {
    name: "id",
    type: "string",
    required: true,
    example: "walkingSpeed",
    description:
      "The key that is used for storing this data in the block data. Matches the key of the item in properties.",
  },
  {
    name: "name",
    type: "string",
    required: true,
    example: "Walking Speed",
    description: "The name of the field that is shown to the user",
  },
  {
    name: "default",
    type: "number",
    required: true,
    example: "10",
    description: "The default value for the field",
  },
  {
    name: "type",
    type: {
      type: "link",
      path: "/docs/api/enums/property-type",
      label: "PropertyType.Number",
    },
    required: true,
    example: "PropertyType.Number",
    description: "Indicator for this field being a number",
  },
  {
    name: "min",
    type: "number",
    required: false,
    example: "0",
    description: "Minimum value for field. Defaults to -∞",
  },
  {
    name: "max",
    type: "number",
    required: false,
    example: "100",
    description: "Maximum value for field. Defaults to ∞",
  },
  {
    name: "step",
    type: "number",
    required: false,
    example: "1",
    description: "Step value for field. Defaults to 1",
  },
  {
    name: "units",
    type: "string",
    required: false,
    example: "m/s",
    description: "The units for the number field. Defaults to none.",
  },
];

export const SimpleStringFieldInfo: DocData[] = [
  {
    name: "id",
    type: "string",
    required: true,
    example: "greeting",
    description:
      "The key that is used for storing this data in the block data. Matches the key of the item in properties.",
  },
  {
    name: "name",
    type: "string",
    required: true,
    example: "Greeting",
    description: "The name of the field that is shown to the user",
  },
  {
    name: "default",
    type: "string",
    required: true,
    example: '"Hello World!"',
    description: "The default value for the field",
  },
  {
    name: "type",
    type: {
      type: "link",
      path: "/docs/api/enums/property-type",
      label: "PropertyType.String",
    },
    required: true,
    example: "PropertyType.String",
    description: "Indicator for this field being a string",
  },
];

export const SimpleOptionsFieldInfo: DocData[] = [
  {
    name: "id",
    type: "string",
    required: true,
    example: "time",
    description:
      "The key that is used for storing this data in the block data. Matches the key of the item in properties.",
  },
  {
    name: "name",
    type: "string",
    required: true,
    example: "Time",
    description: "The name of the field that is shown to the user",
  },
  {
    name: "default",
    type: "string",
    required: true,
    example: '"am"',
    description: "The default option selected, based on value.",
  },
  {
    name: "type",
    type: {
      type: "link",
      path: "/docs/api/enums/property-type",
      label: "PropertyType.Options",
    },
    required: true,
    example: "PropertyType.Options",
    description: "Indicator for this field being a set of options",
  },
  {
    name: "options",
    type: {
      type: "array",
      value: {
        type: "object",
        value: {
          value: "string",
          label: "string",
        },
      },
    },
    required: true,
    example: "[{value: 'am', label: 'AM'}, {value: 'pm', label: 'PM'}]",
    description:
      "Options for the user to select from. Value stored is the value field.",
  },
];

export const SimpleMetadataFieldInfo: DocData[] = [
  {
    name: "id",
    type: "string",
    required: true,
    example: "jointData",
    description:
      "The key that is used for storing this data in the block data. Matches the key of the item in properties.",
  },
  {
    name: "name",
    type: "string",
    required: true,
    example: "Joint Data",
    description:
      "The name of the field (although metadata isn't displayed to the user).",
  },
  {
    name: "default",
    type: "any",
    required: true,
    example: '{ "jointType": "continuous", "jointAxis": "x"}',
    description: "The default value for the field",
  },
  {
    name: "type",
    type: {
      type: "link",
      path: "/docs/api/enums/property-type",
      label: "PropertyType.Metadata",
    },
    required: true,
    example: "PropertyType.Metadata",
    description: "Indicator for this field being metadata",
  },
];

export const SimpleVector3FieldInfo: DocData[] = [
  {
    name: "id",
    type: "string",
    required: true,
    example: "position",
    description:
      "The key that is used for storing this data in the block data. Matches the key of the item in properties.",
  },
  {
    name: "name",
    type: "string",
    required: true,
    example: "Position",
    description: "The name of the field that is shown to the user",
  },
  {
    name: "default",
    type: {
      type: "array",
      value: "number",
    },
    required: true,
    example: "[0, 0, 0]",
    description: "The default value of the vector3 field",
  },
  {
    name: "type",
    type: {
      type: "link",
      path: "/docs/api/enums/property-type",
      label: "PropertyType.Vector3",
    },
    required: true,
    example: "PropertyType.Vector3",
    description: "Indicator for this field being a vector-3",
  },
];

export const BlockSpec: DocData[] = [
  {
    name: "onCanvas",
    type: "boolean",
    required: false,
    example: "true",
    description:
      "Whether the block is rendered on the canvas. Otherwise, it must be dragged into another block.",
  },
  {
    name: "color",
    type: "string",
    required: true,
    example: "#FF5733",
    description: "The color of the block",
  },
  {
    name: "icon",
    type: {
      type: "link",
      path: "/docs/api/enums/icon-name",
      label: "IconName",
    },
    required: true,
    example: "IconName.ArrowRight",
    description: "The icon to be displayed on the block",
  },
  {
    name: "extras",
    type: {
      type: "array",
      value: {
        type: "link",
        path: "/docs/api/extra",
        label: "Extra",
      },
    },
    required: true,
    example: "[Extra.Collapsible]",
    description: "The extra features of the block",
  },
  {
    name: "connections",
    type: {
      type: "record",
      key: {
        type: "link",
        path: "https://reactflow.dev/api-reference/types/position",
        label: "Position",
      },
      value: {
        type: "object",
        value: {
          direction: {
            type: "link",
            path: "/docs/api/enums/connection-direction",
            label: "ConnectionDirection",
          },
          allowed: {
            type: "array",
            value: "string",
          },
        },
      },
    },
    required: false,
    example:
      "{ top: { direction: ConnectionDirection.Up, allowed: ['state'] } }",
    description: "The allowed connections for the block",
  },
  {
    name: "hideNewPrefix",
    type: "boolean",
    required: false,
    example: "true",
    description: "Whether to hide the 'New' prefix in newly spawned blocks",
  },
  {
    name: "minified",
    type: "boolean",
    required: false,
    example: "true",
    description: "Whether the block utilizes a minified footprint",
  },
  {
    name: "style",
    type: "object",
    required: false,
    example: "{ width: 100, height: 100 }",
    description: "Style overrides for the block",
  },
];
