type DataType = "INSTANCE" | "REFERENCE" | "CALL" | "ARGUMENT" | "CONNECTION";
declare const DATA_TYPES: {
    INSTANCE: DataType;
    REFERENCE: DataType;
    CALL: DataType;
    ARGUMENT: DataType;
    CONNECTION: DataType;
};
type MetaType = "OBJECT" | "FUNCTION";
declare const META_TYPES: {
    OBJECT: MetaType;
    FUNCTION: MetaType;
};
type ExtraType = "LOCKED_INDICATOR" | "NAME_EDIT_TOGGLE" | "SELECTION_TOGGLE" | "DOC_TOGGLE" | "COLLAPSE_TOGGLE" | "FUNCTION_BUTTON" | "DROPDOWN" | "DELETE_BUTTON" | "COPY_BUTTON" | "CUT_BUTTON" | "ADD_ARGUMENT" | "ADD_ARGUMENT_GROUP" | "DEBUG_TOGGLE" | "INDICATOR_TEXT" | "INDICATOR_ICON" | "DIVIDER" | "LABEL";
declare const EXTRA_TYPES: {
    LOCKED_INDICATOR: ExtraType;
    NAME_EDIT_TOGGLE: ExtraType;
    SELECTION_TOGGLE: ExtraType;
    DOC_TOGGLE: ExtraType;
    COLLAPSE_TOGGLE: ExtraType;
    FUNCTION_BUTTON: ExtraType;
    DROPDOWN: ExtraType;
    DELETE_BUTTON: ExtraType;
    COPY_BUTTON: ExtraType;
    CUT_BUTTON: ExtraType;
    ADD_ARGUMENT: ExtraType;
    ADD_ARGUMENT_GROUP: ExtraType;
    DEBUG_TOGGLE: ExtraType;
    INDICATOR_TEXT: ExtraType;
    INDICATOR_ICON: ExtraType;
    DIVIDER: ExtraType;
    LABEL: ExtraType;
};
type SimplePropertyType = "BOOLEAN" | "NUMBER" | "STRING" | "OPTIONS" | "IGNORED" | "METADATA" | "VECTOR3";
declare const SIMPLE_PROPERTY_TYPES: {
    BOOLEAN: SimplePropertyType;
    NUMBER: SimplePropertyType;
    STRING: SimplePropertyType;
    OPTIONS: SimplePropertyType;
    IGNORED: SimplePropertyType;
    METADATA: SimplePropertyType;
    VECTOR3: SimplePropertyType;
};
type Connection = "OUTBOUND" | "INBOUND";
declare const CONNECTIONS: {
    OUTBOUND: Connection;
    INBOUND: Connection;
};
type ClipboardAction = "COPY" | "CUT" | "PASTE" | "SELECT";
declare const CLIPBOARD_ACTION: {
    COPY: ClipboardAction;
    CUT: ClipboardAction;
    PASTE: ClipboardAction;
    SELECT: ClipboardAction;
};

interface BlockData {
    id: string;
    name: string;
    metaType: MetaType;
    dataType: DataType;
    type: string;
    ref?: string;
    properties: any;
    arguments?: any[];
    position?: {
        x: number;
        y: number;
    };
    canDelete: boolean;
    canEdit: boolean;
    editing: boolean;
    selected: boolean;
    docActive: boolean;
    refData?: BlockData;
}
interface BlockSpec {
    onCanvas: boolean;
    color: string;
    icon: any;
    extras: any[];
    hideNewPrefix?: boolean;
}
interface ParserProps {
    block: BlockData;
    name: string;
    depth: number;
    context: {
        [key: string]: BlockData;
    };
    storeParser: (language: string, block: BlockData, depth: number, context: {
        [key: string]: BlockData;
    }) => string;
}
interface BlockPropInfo {
    name: string;
    accepts: string[];
    default: any;
    isList: boolean;
    fullWidth: boolean;
}
interface SimplePropInfo {
    name: string;
    type: SimplePropertyType;
    default: any;
    min?: number;
    max?: number;
    step?: number;
    units?: string;
    options?: {
        value: string;
        label: string;
    }[];
}
type PropInfo = BlockPropInfo | SimplePropInfo;
interface TypeSpec {
    name: string;
    metaType: MetaType;
    description: string;
    instanceBlock?: BlockSpec;
    referenceBlock?: BlockSpec;
    callBlock?: BlockSpec;
    properties: {
        [key: string]: PropInfo;
    };
    parsers: {
        [key: string]: (ParserProps: any) => string;
    };
    namePolicy: {
        [key: string]: (BlockData: any) => string;
    };
}

declare function instanceTemplateFromSpec(type: string, typeSpec: TypeSpec, isArg: boolean): BlockData;
declare function referenceTemplateFromSpec(type: string, instanceReference: BlockData, typeSpec: TypeSpec): BlockData;
declare function callTemplateFromSpec(type: string, functionReference: BlockData, typeSpec: TypeSpec): BlockData;
declare function combinedBlockData(programData: {
    [key: string]: BlockData;
}, executionData: {
    [key: string]: null | number;
}, objectTypes: {
    [key: string]: TypeSpec;
}, staticData: undefined | null | BlockData, id: string): [BlockData, TypeSpec, null | number];

export { BlockData, BlockSpec, CLIPBOARD_ACTION, CONNECTIONS, ClipboardAction, Connection, DATA_TYPES, DataType, EXTRA_TYPES, ExtraType, META_TYPES, MetaType, ParserProps, SIMPLE_PROPERTY_TYPES, SimplePropertyType, TypeSpec, callTemplateFromSpec, combinedBlockData, instanceTemplateFromSpec, referenceTemplateFromSpec };
