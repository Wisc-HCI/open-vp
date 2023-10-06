import { OnConnectStartParams, NodeChange, Viewport } from "reactflow";
import { Timer } from "./timer";
import { createProgrammingStore } from "./store";

export type MetaType = "OBJECT" | "FUNCTION";

export type LockedIndicatorExtra = "LOCKED_INDICATOR";
export type NameEditToggleExtra = "NAME_EDIT_TOGGLE";
export type SelectionToggleExtra = "SELECTION_TOGGLE";
export type DocToggleExtra = "DOC_TOGGLE";
export type CollapseToggleExtra = "COLLAPSE_TOGGLE";
export type DebugToggleExtra = "DEBUG_TOGGLE";
export type DeleteButtonExtra = "DELETE_BUTTON";
export type CopyButtonExtra = "COPY_BUTTON";
export type CutButtonExtra = "CUT_BUTTON";
export type DividerExtra = "DIVIDER";

export type FunctionButtonExtra = {
  label: string;
  type: "FUNCTION_BUTTON";
  icon: React.ReactNode;
  onClick: string | ((block: BlockData) => void);
};

export type DropdownExtra = {
  label: string;
  type: "DROPDOWN";
  icon: React.ReactNode;
  contents: Extra[];
};

export type AddArgumentExtra = {
  label: string;
  type: "ADD_ARGUMENT";
  icon: React.ReactNode;
  argumentType: string;
};

export type AddArgumentGroupExtra = {
  label: string;
  type: "ADD_ARGUMENT_GROUP";
  icon: React.ReactNode;
  allowed: string[];
};

export type IndicatorExtra = {
  label: string | React.ReactNode | ((block: BlockData) => React.ReactNode);
  type: "INDICATOR";
  icon:
    | null
    | undefined
    | React.ReactNode
    | ((block: BlockData) => React.ReactNode);
};

export type Extra =
  | LockedIndicatorExtra
  | NameEditToggleExtra
  | SelectionToggleExtra
  | DocToggleExtra
  | CollapseToggleExtra
  | FunctionButtonExtra
  | DropdownExtra
  | DeleteButtonExtra
  | CopyButtonExtra
  | CutButtonExtra
  | DebugToggleExtra
  | DividerExtra
  | AddArgumentExtra
  | AddArgumentGroupExtra
  | DebugToggleExtra
  | IndicatorExtra
  | DividerExtra;

export type SimpleProperty =
  | "BOOLEAN"
  | "NUMBER"
  | "STRING"
  | "OPTIONS"
  | "IGNORED"
  | "METADATA"
  | "VECTOR3";

export type ConnectionDirection = "OUTBOUND" | "INBOUND";

export type ConnectionHandle = "top" | "bottom" | "left" | "right";

export type ClipboardAction = "COPY" | "CUT" | "PASTE" | "SELECT";

export interface ClipboardProps {
  data?: BlockData;
  fieldInfo: FieldInfo;
  parentId: string;
  idx?: number;
  context: string[];
  onCanvas: boolean;
  coordinates?: { x: number; y: number };
}

export interface ObjectData {
  id: string;
  name: string;
  metaType: "OBJECT-INSTANCE";
  type: string;
  properties: any;
  position?: { x: number; y: number };
  canDelete: boolean;
  canEdit: boolean;
  editing: boolean;
  selected: boolean;
  docActive: boolean;
}

export interface ObjectReferenceData {
  id: string;
  name: string;
  metaType: "OBJECT-REFERENCE";
  type: string;
  ref: string;
  position?: { x: number; y: number };
  canDelete: boolean;
  canEdit: boolean;
  editing: boolean;
  selected: boolean;
  docActive: boolean;
  refData?: BlockData;
}

export interface ArgumentData {
  id: string;
  name: string;
  metaType: "ARGUMENT";
  type: string;
  canDelete: boolean;
  canEdit: boolean;
  editing: boolean;
  selected: boolean;
  docActive: boolean;
}

export interface FunctionCallData {
  id: string;
  name: string;
  metaType: "FUNCTION-CALL";
  type: string;
  ref: string;
  properties: any;
  position?: { x: number; y: number };
  canDelete: boolean;
  canEdit: boolean;
  editing: boolean;
  selected: boolean;
  docActive: boolean;
  refData?: BlockData;
}

export interface FunctionDeclarationData {
  id: string;
  name: string;
  metaType: "FUNCTION-DECLARATION";
  type: string;
  properties: any;
  arguments: string[];
  position?: { x: number; y: number };
  canDelete: boolean;
  canEdit: boolean;
  editing: boolean;
  selected: boolean;
  docActive: boolean;
}

export type BlockData =
  | ObjectData
  | FunctionDeclarationData
  | FunctionCallData
  | ObjectReferenceData
  | ArgumentData;

export interface BlockSpec {
  onCanvas: boolean;
  color: string;
  icon: any;
  extras: any[];
  connections?: {
    [key in ConnectionHandle] : {
      direction: ConnectionDirection,
      allowed: string[]
    }
  }
  hideNewPrefix?: boolean;
  minified?: boolean;
  style?: {
    [key: string]:
      | number
      | string
      | boolean
      | undefined
      | null
      | ((data: BlockData) => number | string | boolean | undefined | null);
  };
}

export interface ConnectionData {
  id: string;
  name: number | string;
  metaType: "CONNECTION";
  parent: { id: string; handle: ConnectionHandle };
  child: { id: string; handle: ConnectionHandle };
  mode: "NUMBER" | "STRING";
}

export interface ParserProps {
  block: BlockData;
  name: string;
  depth: number;
  context: { [key: string]: BlockData };  
  storeParser: (
    language: string,
    nodeId: undefined | string,
    depth: number,
    context: { [key: string]: BlockData } ) => string;
}

export interface BlockFieldInfo {
  id: string;
  name: string;
  accepts: string[];
  default: any;
  isList: boolean;
  fullWidth: boolean;
  type: "BLOCK";
}

export interface SimpleBooleanFieldInfo {
  id: string;
  name: string;
  default: boolean;
  type: "BOOLEAN";
}

export interface SimpleNumberFieldInfo {
  id: string;
  name: string;
  default: number;
  type: "NUMBER";
  min?: number;
  max?: number;
  step?: number;
  units?: string;
}

export interface SimpleStringFieldInfo {
  id: string;
  name: string;
  default: string;
  type: "STRING";
}

export interface SimpleOptionsFieldInfo {
  id: string;
  name: string;
  default: string;
  type: "OPTIONS";
  options: { value: string; label: string }[];
}

export interface SimpleIgnoredFieldInfo {
  id: string;
  name: string;
  default: any;
  type: "IGNORED";
}

export interface SimpleMetadataFieldInfo {
  id: string;
  name: string;
  default: any;
  type: "METADATA";
}

export interface SimpleVector3FieldInfo {
  id: string;
  name: string;
  default: number[];
  type: "VECTOR3";
}

export type SimpleFieldInfo =
  | SimpleBooleanFieldInfo
  | SimpleNumberFieldInfo
  | SimpleStringFieldInfo
  | SimpleOptionsFieldInfo
  | SimpleIgnoredFieldInfo
  | SimpleMetadataFieldInfo
  | SimpleVector3FieldInfo;

export type FieldInfo = BlockFieldInfo | SimpleFieldInfo;

export interface ObjectTypeSpec {
  name: string;
  metaType: "OBJECT";
  description: string;
  instanceBlock: BlockSpec;
  referenceBlock: BlockSpec;
  properties: { [key: string]: FieldInfo };
  parsers: { [key: string]: (props: ParserProps) => string };
  namePolicy: { [key: string]: (data: BlockData) => string };
}

export interface FunctionTypeSpec {
  name: string;
  metaType: "FUNCTION";
  description: string;
  functionBlock: BlockSpec;
  callBlock: BlockSpec;
  properties: { [key: string]: FieldInfo };
  parsers: { [key: string]: (props: ParserProps) => string };
  namePolicy: { [key: string]: (data: BlockData) => string };
}

export type TypeSpec = ObjectTypeSpec | FunctionTypeSpec;

export interface ObjectDrawerSpec {
  title: string;
  icon: any;
  objectTypes: string[];
  metaType: "OBJECT-INSTANCE" | "FUNCTION-DECLARATION";
}

export interface ReferenceDrawerSpec {
  title: string;
  icon: any;
  objectType: string;
  metaType: "OBJECT-REFERENCE" | "FUNCTION-CALL";
}

export type DrawerSpec = ObjectDrawerSpec | ReferenceDrawerSpec;

export interface ProgramSpec {
  drawers: DrawerSpec[];
  objectTypes: { [key: string]: TypeSpec };
}

export type ExecutionState = number | ((currentTime: number) => number);

export interface Tab {
  title: string;
  id: string;
  visible: boolean;
  blocks: string[];
  viewport?: Viewport;
}

export interface RegionInfo {
  fieldInfo: FieldInfo;
  parentId: string;
  idx?: number;
}

export interface ProgrammingStateStructures {
  activeDrawer: string | null;
  connectionInfo: OnConnectStartParams | null;
  programSpec: ProgramSpec;
  programData: { [key: string]: BlockData | ConnectionData };
  executionData: { [key: string]: ExecutionState };
  tabs: Tab[];
  activeTab: string | null;
  featuredDocs: { [key: string]: string };
  activeDoc: string | null;
  clipboard: {
    block?: BlockData;
    fieldInfo?: FieldInfo;
    parentId?: string;
    idx?: number;
    context?: string[];
    onCanvas?: boolean;
    action?: ClipboardAction;
  };
  clock: Timer;
}

export interface ProgrammingStateActions {
  onVPEClick: (entryInfo: BlockData) => void;
  onOffVPEClick: (entryInfo: any) => void;
  setConnectionInfo: (info: OnConnectStartParams | null) => void;
  setActiveDrawer: (activeDrawer: string | null) => void;
  setTabs: (newTabs: Tab[]) => void;
  setActiveDoc: (id: string, value: boolean) => void;
  parse: (
    language: string,
    nodeId?: string,
    depth?: number,
    context?: { [key: string]: BlockData }
  ) => string;
  transferBlock: (
    data: BlockData,
    sourceInfo: RegionInfo,
    destInfo: RegionInfo
  ) => void;
  moveBlocks: (changes: NodeChange[]) => void;
  deleteBlock: (
    data: BlockData,
    parentId: string,
    fieldInfo: FieldInfo
  ) => void;
  createPlacedBlock: (data: BlockData, x: number, y: number) => void;
  addInstance: (instanceType: string) => void;
  addArgument: (parentFunctionId: string, argumentType: string) => void;
  updateItemName: (id: string, value: string) => void;
  updateItemSelected: (id: string, value: boolean) => void;
  updateItemEditing: (id: string, value: boolean) => void;
  updateItemSimpleProperty: (id: string, property: string, value: any) => void;
  updateEdgeName: (id: string, value: string) => void;
  deleteEdge: (id: string) => void;
  createEdge: (
    source: string,
    sourceHandle: ConnectionHandle,
    target: string,
    targetHandle: ConnectionHandle
  ) => void;
  validateEdge: (
    source: string,
    sourceHandle: ConnectionHandle,
    target: string,
    targetHandle: ConnectionHandle
  ) => boolean;
  toggleEdgeMode: (id: string) => void;
  pause: () => void;
  play: (speed: number) => void;
  reset: (time: number) => void;
  cut: (clipboardProps: ClipboardProps) => void;
  copy: (clipboardProps: ClipboardProps) => void;
  paste: (clipboardProps: ClipboardProps) => void;
  setClipboardBlock: (block: BlockData) => void;
}

export interface ProgrammingState
  extends ProgrammingStateStructures,
    ProgrammingStateActions {}

export type ProgrammingStore = typeof createProgrammingStore;

export interface BackReference {
  id: string;
  regionInfo: RegionInfo;
  pattern:
    | "EMBEDDED-OBJECT"
    | "REFERENCE-OBJECT"
    | "CALL-FUNCTION"
    | "REFERENCE-ARGUMENT"
    | "REFERENCE-REFERENCE"
    | "ARGUMENT-SPECIFICATION";
}
