import {
  ObjectData,
  ArgumentData,
  BlockData,
  FunctionDeclarationData,
  TypeSpec,
  ObjectReferenceData,
  FunctionCallData,
  ConnectionData,
  ExecutionState
} from "./types";
import { 
  PrimitiveType,
  MetaType, 
  PropertyType} from "./constants";
import { mapValues, pickBy } from "lodash";

export function instanceTemplateFromSpec(
  type: string,
  typeSpec: TypeSpec,
  isArg: boolean
): ObjectData | ArgumentData | FunctionDeclarationData {
  let hideNewPrefix =
    typeSpec.primitiveType === PrimitiveType.Object
      ? typeSpec.instanceBlock?.hideNewPrefix
      : typeSpec.primitiveType === PrimitiveType.Function
      ? typeSpec.functionBlock?.hideNewPrefix
      : false;

  let data: ObjectData | ArgumentData | FunctionDeclarationData;

  if (isArg) {
    data = {
      id: type,
      name: `${hideNewPrefix ? "" : "New "}${typeSpec.name} Argument`,
      metaType: MetaType.Argument,
      type,
      canDelete: true,
      canEdit: true,
      editing: false,
      selected: false,
      docActive: false,
    };
  } else if (typeSpec.primitiveType === PrimitiveType.Function) {
    data = {
      id: type,
      name: `${hideNewPrefix ? "" : "New "}${typeSpec.name}${
        isArg ? " Argument" : ""
      }`,
      metaType: MetaType.FunctionDeclaration,
      type,
      properties: {},
      position: typeSpec.functionBlock.onCanvas ? { x: 0, y: 0 } : undefined,
      arguments: [],
      canDelete: true,
      canEdit: true,
      editing: false,
      selected: false,
      docActive: false,
    };
  } else if (typeSpec.primitiveType === PrimitiveType.Object) {
    data = {
      id: type,
      name: `${hideNewPrefix ? "" : "New "}${typeSpec.name}`,
      metaType: MetaType.ObjectInstance,
      type,
      properties: {},
      position: typeSpec.instanceBlock.onCanvas ? { x: 0, y: 0 } : undefined,
      canDelete: true,
      canEdit: true,
      editing: false,
      selected: false,
      docActive: false,
    };
  } else {
    throw new Error(
      `Unknown type being generated: Cannot create instance of ${type}`
    );
  }

  if (data.metaType !== MetaType.Argument) {
    Object.entries(typeSpec.properties).forEach(([propKey, propInfo]) => {
      (data as ObjectData | FunctionDeclarationData).properties[propKey] =
        propInfo.default;
    });
  }
  if (
    (typeSpec.primitiveType === PrimitiveType.Object && typeSpec.instanceBlock?.onCanvas) ||
    (typeSpec.primitiveType === PrimitiveType.Function && typeSpec.functionBlock?.onCanvas)
  ) {
    (data as ObjectData | FunctionDeclarationData).position = { x: 0, y: 0 };
  }
  return data;
}

export function referenceTemplateFromSpec(
  type: string,
  instanceReference: BlockData,
  typeSpec: TypeSpec
): FunctionCallData | ObjectReferenceData {
  let data: FunctionCallData | ObjectReferenceData;

  if (typeSpec.primitiveType === PrimitiveType.Function) {
    data = {
      id: `new-${type}-${instanceReference.id}`,
      metaType: MetaType.FunctionCall,
      type,
      ref: instanceReference.id,
      name: instanceReference.name,
      properties: {},
      position: typeSpec.callBlock?.onCanvas ? { x: 0, y: 0 } : undefined,
      canDelete: true,
      canEdit: true,
      editing: false,
      selected: false,
      docActive: false,
    };
  } else if (typeSpec.primitiveType ===PrimitiveType.Object) {
    data = {
      id: `new-${type}-${instanceReference.id}`,
      metaType: MetaType.ObjectReference,
      type,
      ref: instanceReference.id,
      name: instanceReference.name,
      position: typeSpec.referenceBlock?.onCanvas ? { x: 0, y: 0 } : undefined,
      canDelete: true,
      canEdit: true,
      editing: false,
      selected: false,
      docActive: false,
    };
  } else {
    throw new Error(
      `Unknown type being generated: Cannot create reference of ${type}`
    );
  }
  return data;
}

// Generate a pseudo-spec for a function instance, based on the function type spec and the function instance data
export function functionInstanceAsType(
  functionTypeSpec: TypeSpec,
  functionInstance: FunctionDeclarationData,
  programData: { [key: string]: BlockData | ConnectionData }
): TypeSpec {
  const initialFunctionDef = {
    ...functionTypeSpec,
    name: functionInstance.name,
    specificType: functionInstance.type,
  };
  let newProperties: {[key: string]: any} = {};
  functionInstance.arguments?.forEach((arg:string) => {
    const argBlock = programData[arg] as ArgumentData;
    newProperties[arg] = {
      id: argBlock.id,
      name: argBlock.name,
      type: PropertyType.Block,
      accepts: [(argBlock as ArgumentData).type],
      default: null,
      isFunctionArgument: true,
    };
  });
  let functionTypeDef = {
    ...initialFunctionDef,
    properties: {
      ...mapValues(initialFunctionDef.properties, (v) => ({
        ...v,
        isFunctionBlockField: true,
      })),
      ...newProperties,
    },
  };
  return functionTypeDef;
}

export function combinedBlockData(
  programData: { [key: string]: BlockData | ConnectionData },
  executionData: { [key: string]: ExecutionState },
  objectTypes: { [key: string]: TypeSpec },
  info: string | BlockData
): [null | BlockData | ConnectionData, null | TypeSpec, null | ExecutionState, null | BlockData] {
  const data: BlockData | ConnectionData | undefined = typeof info === "string" 
    ? programData[info]
    : info;

  if (!data) {
    // This is likely present because of cleanup. Return null to be removed
    return [null, null, null, null]
  }
  if (data.metaType === "CONNECTION") {
    return [data, null, null, null];
  }
  const progress = executionData[data.id];
  const typeSpec = objectTypes[data.type];
  const robustTypeSpec = data.metaType === "FUNCTION-DECLARATION" 
    ? functionInstanceAsType(typeSpec, data as FunctionDeclarationData, programData)
    : data.metaType === "FUNCTION-CALL"
    ? functionInstanceAsType(typeSpec, programData[data.ref as string] as FunctionDeclarationData, programData)
    : typeSpec;
  let refData: BlockData | null;
  if (data.metaType === "FUNCTION-CALL" || data.metaType === "OBJECT-REFERENCE") {
    refData = programData[data.ref as string] as BlockData;
  } else {
    refData = null;
  }
  const selected = data?.selected || refData?.selected || false;
  const editing = data?.editing || refData?.editing || false;
  // Package up information on the block, data about the corresponding reference (if applicable), and argument blocks it contains
  return [
    { ...data, selected, editing } as BlockData,
    robustTypeSpec,
    progress,
    refData || null
  ];
}

export const functionTypeSpec = (typeSpec: {[key:string]: TypeSpec}, programData: { [key: string]: BlockData | ConnectionData }) => {
  let augmented = {...typeSpec};
  Object.values(programData)
    .filter(
      (data) =>
        data.metaType === MetaType.FunctionDeclaration
    )
    .forEach((functionInstance) => {
      augmented[functionInstance.id] = functionInstanceAsType(
        typeSpec[functionInstance.type],
        functionInstance as FunctionDeclarationData,
        programData
      );
    });
  return augmented;
};