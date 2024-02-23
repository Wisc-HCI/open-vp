import { OnConnectStartParams, NodeChange, Viewport, Position } from "reactflow";
import { Timer } from "./timer";
import { DefaultStore } from "./store";
import { PrimitiveType, MetaType, ConnectionDirection, ClipboardAction, PropertyType, ConnectionType, DrawerType, ExtraType } from "./constants";
import type { IconName } from "@people_and_robots/open-gui";
import { CSSProperties } from "react";

export type FunctionButtonExtra = {
  label: string;
  type: ExtraType.FunctionButton;
  icon: IconName | ((block: BlockData) => IconName);
  onClick: string | ((block: BlockData) => void);
};

export type DropdownExtra = {
  label?: string;
  type: ExtraType.Dropdown;
  icon?: IconName | ((block: BlockData) => IconName);
  contents: Extra[];
};

export type AddArgumentExtra = {
  label: string;
  type: ExtraType.AddArgument;
  icon: IconName | ((block: BlockData) => IconName);
  argumentType: string;
};

export type AddArgumentGroupExtra = {
  label: string;
  type: ExtraType.AddArgumentGroup;
  icon: IconName | ((block: BlockData) => IconName);
  allowed: string[];
};

export type IndicatorExtra = {
  label: string | React.ReactNode | ((block: BlockData) => React.ReactNode);
  type: ExtraType.Indicator;
  icon:
    | null
    | undefined
    | IconName 
    | ((block: BlockData) => IconName);
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

export type ClipboardProps = {
  data?: BlockData | CommentData;
  typeSpec?: TypeSpec;
  regionInfo?: RegionInfo;
  context?: string[];
  coordinates?: { x: number; y: number };
  tab?: string;
}

export type CommentData = {
  id: string;
  type: MetaType.Comment;
  metaType: MetaType.Comment;
  text: string;
  editing: boolean;
}

export type ObjectData = {
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

export type ObjectReferenceData = {
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

export type ArgumentData = {
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

export type FunctionCallData = {
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

export type FunctionDeclarationData = {
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

export type BlockSpec = {
  onCanvas: boolean;
  color: string;
  icon: IconName;
  extras: Extra[];
  connections?: {
    [key in Position]? : {
      direction: ConnectionDirection,
      allowed: string[]
    }
  }
  hideNewPrefix?: boolean;
  minified?: boolean;
  style?: CSSProperties;
}

export type NumberConnectionData = {
  id: string;
  value: number;
  metaType: MetaType.Connection;
  parent: { id: string; handle: Position };
  child: { id: string; handle: Position };
  type: ConnectionType.Number;
}

export type StringConnectionData = {
  id: string;
  value: string;
  metaType: MetaType.Connection;
  parent: { id: string; handle: Position };
  child: { id: string; handle: Position };
  type: ConnectionType.String;
}

export type ConnectionData = NumberConnectionData | StringConnectionData;

export type ParserProps = {
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

export type SimpleBooleanFieldInfo = {
  id: string;
  name: string;
  default: boolean;
  type: PropertyType.Boolean;
}

export type SimpleNumberFieldInfo = {
  id: string;
  name: string;
  default: number;
  type: PropertyType.Number;
  min?: number;
  max?: number;
  step?: number;
  units?: string;
}

export type SimpleStringFieldInfo = {
  id: string;
  name: string;
  default: string;
  type: PropertyType.String;
}

export type SimpleOptionsFieldInfo = {
  id: string;
  name: string;
  default: string;
  type: PropertyType.Options;
  options: { value: string; label: string }[];
}

export type SimpleMetadataFieldInfo = {
  id: string;
  name: string;
  default: any;
  type: PropertyType.Metadata;
}

export type SimpleVector3FieldInfo = {
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
  | SimpleMetadataFieldInfo
  | SimpleVector3FieldInfo;

  export type BlockFieldInfo = {
    id: string;
    name: string | SimpleOptionsFieldInfo;
    accepts: string[];
    default: any;
    isList?: boolean;
    fullWidth?: boolean;
    type: PropertyType.Block;
    isFunctionArgument?: boolean;
    isRequired?: boolean;
  }

export type FieldInfo = BlockFieldInfo | SimpleFieldInfo;

export type ObjectTypeSpec = {
  name: string;
  primitiveType: PrimitiveType.Object;
  description: string;
  instanceBlock: BlockSpec;
  referenceBlock: BlockSpec;
  properties: { [key: string]: FieldInfo };
  parsers: { [key: string]: (props: ParserProps) => string };
  namePolicy: { [key: string]: (data: BlockData) => string };
}

export type FunctionTypeSpec = {
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

export type ObjectDrawerSpec = {
  type: DrawerType.Multiple,
  title: string;
  icon: IconName;
  objectTypes: string[];
  metaType: MetaType.ObjectInstance | MetaType.FunctionDeclaration;
}

export type ReferenceDrawerSpec = {
  type: DrawerType.Singular
  title: string;
  icon: IconName;
  objectType: string;
  metaType: MetaType.ObjectReference | MetaType.FunctionCall;
}

export type DrawerSpec = ObjectDrawerSpec | ReferenceDrawerSpec;

export type ProgramSpec = {
  drawers: DrawerSpec[];
  objectTypes: { [key: string]: TypeSpec };
}

export type ExecutionState = number | 'indeterminite' | ((currentTime: number) => number | 'indeterminite');

export type Tab = {
  title: string;
  id: string;
  visible: boolean;
  blocks: string[];
  viewport?: Viewport;
}

export type RegionInfo = {
  fieldInfo: FieldInfo;
  parentId: string;
  idx?: number;
}

export type ProgrammingStateStructures = {
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

export type ProgrammingStateActions = {
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

export type ProgrammingState
  = ProgrammingStateStructures & ProgrammingStateActions;

export type ProgrammingStore = typeof DefaultStore;

// export type BackReference {
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
