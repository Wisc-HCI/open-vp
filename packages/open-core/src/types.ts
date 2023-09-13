import { DataType, MetaType, SimplePropertyType } from "./constants";

export interface BlockData {
    id: string;
    name: string;
    metaType: MetaType;
    dataType: DataType;
    type: string;
    ref?: string;
    properties: any;
    arguments?: any[];
    position?: { x: number, y: number };
    canDelete: boolean;
    canEdit: boolean;
    editing: boolean;
    selected: boolean;
    docActive: boolean;
    refData?: BlockData;
}

export interface BlockSpec {
    onCanvas: boolean;
    color: string;
    icon: any;
    extras: any[];
    hideNewPrefix?: boolean;
}

export interface ParserProps {
    block: BlockData;
    name: string;
    depth: number;
    context: {[key: string]: BlockData};
    storeParser: (language: string, block: BlockData, depth: number, context: {[key: string]: BlockData}) => string;
}

export interface BlockPropInfo {
    name: string;
    accepts: string[];
    default: any,
    isList: boolean,
    fullWidth: boolean,
}

export interface SimplePropInfo {
    name: string;
    type: SimplePropertyType;
    // Default depends on the property type
    default: any;
    // For numbers
    min?: number;
    max?: number;
    step?: number;
    units?: string;
    // For options
    options?: {value: string, label: string}[];
}

export type PropInfo = BlockPropInfo | SimplePropInfo;

export interface TypeSpec {
    name: string;
    metaType: MetaType;
    description: string;
    instanceBlock?: BlockSpec;
    referenceBlock?: BlockSpec;
    callBlock?: BlockSpec;
    properties: {[key: string]: PropInfo};
    parsers: {[key: string]: (ParserProps) => string};
    namePolicy: {[key: string]: (BlockData) => string};
}