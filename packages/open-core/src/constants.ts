export const SPAWNER = "SPAWNER";
export const CANVAS = "CANVAS";
export const OUTSIDE = "OUTSIDE";

export enum PrimitiveType {
  Object = "OBJECT",
  Function = "FUNCTION",
}

export enum MetaType {
  ObjectInstance = "OBJECT-INSTANCE",
  ObjectReference = "OBJECT-REFERENCE",
  FunctionDeclaration = "FUNCTION-DECLARATION",
  FunctionCall = "FUNCTION-CALL",
  Argument = "ARGUMENT",
  Connection = "CONNECTION",
  Comment = "COMMENT",
}

export enum ConnectionDirection {
  Inbound = "INBOUND",
  Outbound = "OUTBOUND",
}

export enum ClipboardAction {
  Copy = "COPY",
  Cut = "CUT",
  Paste = "PASTE",
  Select = "SELECT",
}

export enum ConnectionType {
  Number = "NUMBER",
  String = "STRING",
}

export enum PropertyType {
  Boolean = "BOOLEAN",
  Number = "NUMBER",
  String = "STRING",
  Options = "OPTIONS",
  Metadata = "METADATA",
  Vector3 = "VECTOR3",
  Custom = "CUSTOM",
  Block = "BLOCK",
}

export enum DrawerType {
  Singular = "SINGULAR",
  Multiple = "MULTIPLE",
}

export enum ExtraType {
  SelectionToggle = "SELECTION_TOGGLE",
  DocToggle = "DOC_TOGGLE",
  CollapseToggle = "COLLAPSE_TOGGLE",
  FunctionButton = "FUNCTION_BUTTON",
  Dropdown = "DROPDOWN",
  DeleteButton = "DELETE_BUTTON",
  CopyButton = "COPY_BUTTON",
  CutButton = "CUT_BUTTON",
  AddArgument = "ADD_ARGUMENT",
  AddArgumentGroup = "ADD_ARGUMENT_GROUP",
  DebugToggle = "DEBUG_TOGGLE",
  Indicator = "INDICATOR",
  Divider = "DIVIDER",
}
