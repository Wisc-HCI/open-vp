import { OnConnectStartParams, NodeChange, Viewport, Position } from "reactflow";
import { Timer } from "./timer";
import { createProgrammingStore } from "./store";
import { PrimitiveType, MetaType, ConnectionDirection, ClipboardAction, PropertyType, ConnectionType, DrawerType, ExtraType } from "./constants";

export type FunctionButtonExtra = {
  label: string;
  type: ExtraType.FunctionButton;
  icon: React.ReactNode;
  onClick: string | ((block: BlockData) => void);
};

export type DropdownExtra = {
  label: string;
  type: ExtraType.Dropdown;
  icon: React.ReactNode;
  contents: Extra[];
};

export type AddArgumentExtra = {
  label: string;
  type: ExtraType.AddArgument;
  icon: React.ReactNode;
  argumentType: string;
};

export type AddArgumentGroupExtra = {
  label: string;
  type: ExtraType.AddArgumentGroup;
  icon: React.ReactNode;
  allowed: string[];
};

export type IndicatorExtra = {
  label: string | React.ReactNode | ((block: BlockData) => React.ReactNode);
  type: ExtraType.Indicator;
  icon:
    | null
    | undefined
    | React.ReactNode
    | ((block: BlockData) => React.ReactNode);
};

export type Extra =
  ExtraType.SelectionToggle
  | ExtraType.DocToggle
  | ExtraType.CollapseToggle
  | ExtraType.DeleteButton
  | ExtraType.CopyButton
  | ExtraType.CutButton
  | ExtraType.Divider
  | ExtraType.DebugToggle
  | AddArgumentExtra
  | AddArgumentGroupExtra
  | DropdownExtra
  | FunctionButtonExtra
  | IndicatorExtra;

export interface ClipboardProps {
  data?: BlockData | CommentData;
  typeSpec?: TypeSpec;
  regionInfo?: RegionInfo;
  context?: string[];
  coordinates?: { x: number; y: number };
  tab?: string;
}

export interface CommentData {
  id: string;
  type: MetaType.Comment;
  metaType: MetaType.Comment;
  text: string;
}

export interface ObjectData {
  id: string;
  name: string;
  metaType: MetaType.ObjectInstance;
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
  metaType: MetaType.ObjectReference;
  type: string;
  ref: string;
  position?: { x: number; y: number };
  canDelete: boolean;
  canEdit: boolean;
  editing: boolean;
  selected: boolean;
  docActive: boolean;
  // refData?: BlockData;
}

export interface ArgumentData {
  id: string;
  name: string;
  metaType: MetaType.Argument;
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
  metaType: MetaType.FunctionCall;
  type: string;
  ref: string;
  properties: any;
  position?: { x: number; y: number };
  canDelete: boolean;
  canEdit: boolean;
  editing: boolean;
  selected: boolean;
  docActive: boolean;
  // refData?: BlockData;
}

export interface FunctionDeclarationData {
  id: string;
  name: string;
  metaType: MetaType.FunctionDeclaration;
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
    [key in Position]? : {
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

export interface NumberConnectionData {
  id: string;
  value: number;
  metaType: MetaType.Connection;
  parent: { id: string; handle: Position };
  child: { id: string; handle: Position };
  type: ConnectionType.Number;
}

export interface StringConnectionData {
  id: string;
  value: string;
  metaType: MetaType.Connection;
  parent: { id: string; handle: Position };
  child: { id: string; handle: Position };
  type: ConnectionType.String;
}

export type ConnectionData = NumberConnectionData | StringConnectionData;

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
  isList?: boolean;
  fullWidth?: boolean;
  type: PropertyType.Block;
  isFunctionArgument?: boolean;
  isRequired?: boolean;
}

export interface SimpleBooleanFieldInfo {
  id: string;
  name: string;
  default: boolean;
  type: PropertyType.Boolean;
}

export interface SimpleNumberFieldInfo {
  id: string;
  name: string;
  default: number;
  type: PropertyType.Number;
  min?: number;
  max?: number;
  step?: number;
  units?: string;
}

export interface SimpleStringFieldInfo {
  id: string;
  name: string;
  default: string;
  type: PropertyType.String;
}

export interface SimpleOptionsFieldInfo {
  id: string;
  name: string;
  default: string;
  type: PropertyType.Options;
  options: { value: string; label: string }[];
}

export interface SimpleIgnoredFieldInfo {
  id: string;
  name: string;
  default: any;
  type: PropertyType.Ignored;
}

export interface SimpleMetadataFieldInfo {
  id: string;
  name: string;
  default: any;
  type: PropertyType.Metadata;
}

export interface SimpleVector3FieldInfo {
  id: string;
  name: string;
  default: number[];
  type: PropertyType.Vector3;
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
  primitiveType: PrimitiveType.Object;
  description: string;
  instanceBlock: BlockSpec;
  referenceBlock: BlockSpec;
  properties: { [key: string]: FieldInfo };
  parsers: { [key: string]: (props: ParserProps) => string };
  namePolicy: { [key: string]: (data: BlockData) => string };
}

export interface FunctionTypeSpec {
  name: string;
  primitiveType: PrimitiveType.Function;
  description: string;
  functionBlock: BlockSpec;
  callBlock: BlockSpec;
  properties: { [key: string]: FieldInfo };
  parsers: { [key: string]: (props: ParserProps) => string };
  namePolicy: { [key: string]: (data: BlockData) => string };
}

export type TypeSpec = ObjectTypeSpec | FunctionTypeSpec;

export interface ObjectDrawerSpec {
  type: DrawerType.Multiple,
  title: string;
  icon: any;
  objectTypes: string[];
  metaType: MetaType.ObjectInstance | MetaType.FunctionDeclaration;
}

export interface ReferenceDrawerSpec {
  type: DrawerType.Singular
  title: string;
  icon: any;
  objectType: string;
  metaType: MetaType.ObjectReference | MetaType.FunctionCall;
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
  programData: { [key: string]: BlockData | ConnectionData | CommentData };
  executionData: { [key: string]: ExecutionState };
  tabs: Tab[];
  activeTab: string | null;
  featuredDocs: { [key: string]: string };
  activeDoc: string | null;
  clipboard: {
    block?: BlockData | CommentData;
    regionInfo?: RegionInfo;
    context?: string[];
    onCanvas?: boolean;
    action?: ClipboardAction;
  };
  clock: Timer;
}

export interface ProgrammingStateActions {
  onVPEClick: (entryInfo: BlockData | ConnectionData | CommentData) => void;
  onOffVPEClick: (entryInfo: any) => void;
  setConnectionInfo: (info: OnConnectStartParams | null) => void;
  setActiveDrawer: (activeDrawer: string | null) => void;
  setTabs: (newTabs: Tab[]) => void;
  setTabViewport: (id: string, viewport: Viewport) => void;
  getTabViewport: (id: string) => Viewport | undefined;
  renameTab: (id: string, name: string) => void;
  setTabVisibility: (id: string, visible: boolean) => void;
  removeTab: (id: string) => void;
  addTab: (id: string, title: string, visible: boolean) => void;
  setActiveTab: (tab: Tab) => void;
  setActiveDoc: (id: string, value: boolean) => void;
  parse: (
    language: string,
    nodeId?: string,
    depth?: number,
    context?: { [key: string]: BlockData }
  ) => string;
  transferBlock: (
    data: BlockData | CommentData,
    sourceInfo: RegionInfo,
    destInfo: RegionInfo
  ) => void;
  moveBlocks: (changes: NodeChange[]) => void;
  deleteBlock: (
    data: BlockData | CommentData,
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
  updateEdgeValue: (id: string, value: string) => void;
  updateCommentText: (id: string, value: string) => void;
  setSelections: (selections: string[]) => void;
  deleteEdge: (id: string) => void;
  createEdge: (
    source: string,
    sourceHandle: Position,
    target: string,
    targetHandle: Position
  ) => void;
  validateEdge: (
    source: string,
    sourceHandle: Position,
    target: string,
    targetHandle: Position
  ) => boolean;
  toggleEdgeMode: (id: string) => void;
  pause: () => void;
  play: (speed: number) => void;
  reset: (time: number) => void;
  cut: (clipboardProps: ClipboardProps) => void;
  copy: (clipboardProps: ClipboardProps) => void;
  paste: (clipboardProps: ClipboardProps) => void;
  setClipboardBlock: (block: BlockData | CommentData) => void;
}

export interface ProgrammingState
  extends ProgrammingStateStructures,
    ProgrammingStateActions {}

export type ProgrammingStore = typeof createProgrammingStore;

// export interface BackReference {
//   id: string;
//   regionInfo: RegionInfo;
//   pattern:
//     | "EMBEDDED-OBJECT"
//     | "REFERENCE-OBJECT"
//     | "CALL-FUNCTION"
//     | "REFERENCE-ARGUMENT"
//     | "REFERENCE-REFERENCE"
//     | "ARGUMENT-SPECIFICATION";
// }
