// DATA_TYPES are the sub-types of each user-defined type. For example, you may have an INSTANCE and REFERENCE to some newType
export const DATA_TYPES = {
  INSTANCE: "INSTANCE",
  REFERENCE: "REFERENCE",
  CALL: "CALL",
  ARGUMENT: "ARGUMENT",
  CONNECTION: "CONNECTION",
};

// The high-level type that each objectType belongs to (either object or function)
export const TYPES = {
  OBJECT: "OBJECT",
  FUNCTION: "FUNCTION",
};

export const EXTRA_TYPES = {
  LOCKED_INDICATOR: "LOCKED_INDICATOR",
  NAME_EDIT_TOGGLE: "NAME_EDIT_TOGGLE",
  SELECTION_TOGGLE: "SELECTION_TOGGLE",
  DOC_TOGGLE: "DOC_TOGGLE",
  COLLAPSE_TOGGLE: "COLLAPSE_TOGGLE",
  FUNCTION_BUTTON: "FUNCTION_BUTTON",
  DROPDOWN: "DROPDOWN",
  DELETE_BUTTON: "DELETE_BUTTON",
  ADD_ARGUMENT: "ADD_ARGUMENT",
  ADD_ARGUMENT_GROUP: "ADD_ARGUMENT_GROUP",
  DEBUG_TOGGLE: "DEBUG_TOGGLE",
  INDICATOR_TEXT: "INDICATOR_TEXT",
  INDICATOR_ICON: "INDICATOR_ICON",
  DIVIDER: "DIVIDER",
  LABEL: "LABEL",
};

export const SIMPLE_PROPERTY_TYPES = {
  BOOLEAN: "BOOLEAN",
  NUMBER: "NUMBER",
  STRING: "STRING",
  OPTIONS: "OPTIONS",
  IGNORED: "IGNORED",
  METADATA: "METADATA",
  VECTOR3: "VECTOR3"
};

export const CONNECTIONS = {
  OUTBOUND: "OUTBOUND",
  INBOUND: "INBOUND",
};

export const ATTENDED_DATA_PROPERTIES = [
  "argumentBlockData",
  "arguments",
  "canDelete",
  "canEdit",
  "context",
  "dataType",
  "editing",
  "id",
  "name",
  "refData",
  "selected",
  "docActive",
  "type",
];

export const ATTENDED_RENDER_PROPS = [
  "typeSpec",
  "onCanvas",
  "interactionDisabled",
  "bounded",
  "highlightColor",
  "context",
  "fieldInfo",
  "parentId",
  "progress",
  "limitedRender",
];

export const UNRENDERED_PROPS = ['METADATA','IGNORED']