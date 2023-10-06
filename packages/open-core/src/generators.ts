import {
  ObjectData,
  ArgumentData,
  BlockData,
  FunctionDeclarationData,
  TypeSpec,
  ObjectReferenceData,
  FunctionCallData,
  ConnectionData,
  ExecutionState,
} from "./types";
import { mapValues } from "lodash";

export function instanceTemplateFromSpec(
  type: string,
  typeSpec: TypeSpec,
  isArg: boolean
): ObjectData | ArgumentData | FunctionDeclarationData {
  let hideNewPrefix =
    typeSpec.metaType === "OBJECT"
      ? typeSpec.instanceBlock?.hideNewPrefix
      : typeSpec.metaType === "FUNCTION"
      ? typeSpec.functionBlock?.hideNewPrefix
      : false;

  let data: ObjectData | ArgumentData | FunctionDeclarationData;

  if (isArg) {
    data = {
      id: type,
      name: `${hideNewPrefix ? "" : "New "}${typeSpec.name} Argument`,
      metaType: "ARGUMENT",
      type,
      canDelete: true,
      canEdit: true,
      editing: false,
      selected: false,
      docActive: false,
    };
  } else if (typeSpec.metaType === "FUNCTION") {
    data = {
      id: type,
      name: `${hideNewPrefix ? "" : "New "}${typeSpec.name}${
        isArg ? " Argument" : ""
      }`,
      metaType: "FUNCTION-DECLARATION",
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
  } else if (typeSpec.metaType === "OBJECT") {
    data = {
      id: type,
      name: `${hideNewPrefix ? "" : "New "}${typeSpec.name}`,
      metaType: "OBJECT-INSTANCE",
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

  if (data.metaType !== "ARGUMENT") {
    Object.entries(typeSpec.properties).forEach(([propKey, propInfo]) => {
      (data as ObjectData | FunctionDeclarationData).properties[propKey] =
        propInfo.default;
    });
  }
  if (
    (typeSpec.metaType === "OBJECT" && typeSpec.instanceBlock?.onCanvas) ||
    (typeSpec.metaType === "FUNCTION" && typeSpec.functionBlock?.onCanvas)
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

  if (typeSpec.metaType === "FUNCTION") {
    data = {
      id: `new-${type}-${instanceReference.id}`,
      metaType: "FUNCTION-CALL",
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
  } else if (typeSpec.metaType === "OBJECT") {
    data = {
      id: `new-${type}-${instanceReference.id}`,
      metaType: "OBJECT-REFERENCE",
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
    const argBlock = programData[arg];
    newProperties[arg] = {
      name: argBlock.name,
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
): [BlockData | ConnectionData, null | TypeSpec, null | ExecutionState] {
  const data: BlockData | ConnectionData = typeof info === "string" 
    ? programData[info]
    : info;
  if (data.metaType === "CONNECTION") {
    return [data, null, null];
  }
  const progress = executionData[data.id];
  const typeSpec = objectTypes[data.type];
  const robustTypeSpec = data.metaType === "FUNCTION-DECLARATION" 
    ? functionInstanceAsType(typeSpec, data as FunctionDeclarationData, programData)
    : data.metaType === "FUNCTION-CALL"
    ? functionInstanceAsType(typeSpec, programData[data.ref as string] as FunctionDeclarationData, programData)
    : typeSpec;
  let refData: BlockData | undefined;
  if (data.metaType === "FUNCTION-CALL" || data.metaType === "OBJECT-REFERENCE") {
    refData = programData[data.ref as string] as BlockData;
  } else {
    refData = undefined;
  }
  const selected = data?.selected || refData?.selected || false;
  const editing = data?.editing || refData?.editing || false;
  // Package up information on the block, data about the corresponding reference (if applicable), and argument blocks it contains
  return [
    { ...data, refData, selected, editing } as BlockData,
    robustTypeSpec,
    progress,
  ];
}
