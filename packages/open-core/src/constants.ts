export type DataType = "INSTANCE" | "REFERENCE" | "CALL" | "ARGUMENT" | "CONNECTION";

export const DATA_TYPES = {
  INSTANCE: "INSTANCE" as DataType,
  REFERENCE: "REFERENCE" as DataType,
  CALL: "CALL" as DataType,
  ARGUMENT: "ARGUMENT" as DataType,
  CONNECTION: "CONNECTION" as DataType,
};

export type MetaType = "OBJECT" | "FUNCTION";

export const META_TYPES = {
  OBJECT: "OBJECT" as MetaType,
  FUNCTION: "FUNCTION" as MetaType,
};

export type ExtraType = 
  "LOCKED_INDICATOR" 
  | "NAME_EDIT_TOGGLE" 
  | "SELECTION_TOGGLE" 
  | "DOC_TOGGLE" 
  | "COLLAPSE_TOGGLE" 
  | "FUNCTION_BUTTON" 
  | "DROPDOWN" 
  | "DELETE_BUTTON" 
  | "COPY_BUTTON" 
  | "CUT_BUTTON" 
  | "ADD_ARGUMENT" 
  | "ADD_ARGUMENT_GROUP" 
  | "DEBUG_TOGGLE" 
  | "INDICATOR_TEXT" 
  | "INDICATOR_ICON" 
  | "DIVIDER" 
  | "LABEL";

export const EXTRA_TYPES = {
  LOCKED_INDICATOR: "LOCKED_INDICATOR" as ExtraType,
  NAME_EDIT_TOGGLE: "NAME_EDIT_TOGGLE" as ExtraType,
  SELECTION_TOGGLE: "SELECTION_TOGGLE" as ExtraType,
  DOC_TOGGLE: "DOC_TOGGLE" as ExtraType,
  COLLAPSE_TOGGLE: "COLLAPSE_TOGGLE" as ExtraType,
  FUNCTION_BUTTON: "FUNCTION_BUTTON" as ExtraType,
  DROPDOWN: "DROPDOWN" as ExtraType,
  DELETE_BUTTON: "DELETE_BUTTON" as ExtraType,
  COPY_BUTTON: "COPY_BUTTON" as ExtraType,
  CUT_BUTTON: "CUT_BUTTON" as ExtraType,
  ADD_ARGUMENT: "ADD_ARGUMENT" as ExtraType,
  ADD_ARGUMENT_GROUP: "ADD_ARGUMENT_GROUP" as ExtraType,
  DEBUG_TOGGLE: "DEBUG_TOGGLE" as ExtraType,
  INDICATOR_TEXT: "INDICATOR_TEXT" as ExtraType,
  INDICATOR_ICON: "INDICATOR_ICON" as ExtraType,
  DIVIDER: "DIVIDER" as ExtraType,
  LABEL: "LABEL" as ExtraType,
};

export type SimplePropertyType = "BOOLEAN" | "NUMBER" | "STRING" | "OPTIONS" | "IGNORED" | "METADATA" | "VECTOR3";

export const SIMPLE_PROPERTY_TYPES = {
  BOOLEAN: "BOOLEAN" as SimplePropertyType,
  NUMBER: "NUMBER" as SimplePropertyType,
  STRING: "STRING" as SimplePropertyType,
  OPTIONS: "OPTIONS" as SimplePropertyType,
  IGNORED: "IGNORED" as SimplePropertyType,
  METADATA: "METADATA" as SimplePropertyType,
  VECTOR3: "VECTOR3" as SimplePropertyType,
};

export type Connection = "OUTBOUND" | "INBOUND";

export const CONNECTIONS = {
  OUTBOUND: "OUTBOUND" as Connection,
  INBOUND: "INBOUND" as Connection,
};

export type ClipboardAction = "COPY" | "CUT" | "PASTE" | "SELECT";

export const CLIPBOARD_ACTION = {
  COPY: 'COPY' as ClipboardAction,
  CUT: 'CUT' as ClipboardAction,
  PASTE: 'PASTE' as ClipboardAction,
  SELECT: 'SELECT' as ClipboardAction
}