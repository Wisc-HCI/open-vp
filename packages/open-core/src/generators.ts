import { DATA_TYPES, META_TYPES } from "./constants";
import { BlockData, TypeSpec } from "./types";
import { mapValues } from "lodash";

export function instanceTemplateFromSpec(
  type: string,
  typeSpec: TypeSpec,
  isArg: boolean
): BlockData {
  let data: BlockData = {
    id: type,
    name: `${typeSpec.instanceBlock?.hideNewPrefix ? "" : "New "}${
      typeSpec.name
    }${isArg ? " Argument" : ""}`,
    metaType: typeSpec.metaType,
    dataType: DATA_TYPES.INSTANCE,
    type,
    properties: {},
    arguments: undefined,
    position: undefined,
    canDelete: true,
    canEdit: true,
    editing: false,
    selected: false,
    docActive: false,
  };

  if (typeSpec.properties) {
    Object.entries(typeSpec.properties).forEach(([propKey, propInfo]) => {
      data.properties[propKey] = propInfo.default;
    });
  }
  if (typeSpec.instanceBlock?.onCanvas) {
    data.position = { x: 0, y: 0 };
  }
  if (typeSpec.metaType === META_TYPES.FUNCTION) {
    data.arguments = [];
  }
  return data;
}

export function referenceTemplateFromSpec(
  type: string,
  instanceReference: BlockData,
  typeSpec: TypeSpec
): BlockData {
  let data: BlockData = {
    id: `new-${type}-${instanceReference.id}`,
    metaType: typeSpec.metaType,
    dataType: DATA_TYPES.REFERENCE,
    type,
    ref: instanceReference.id,
    name: instanceReference.name,
    properties: {},
    canDelete: true,
    canEdit: true,
    editing: false,
    selected: false,
    docActive: false,
  };
  if (typeSpec.referenceBlock?.onCanvas) {
    data.position = { x: 0, y: 0 };
  }
  return data;
}

export function callTemplateFromSpec(
  type: string,
  functionReference: BlockData,
  typeSpec: TypeSpec
): BlockData {
  let data: BlockData = {
    id: `new-${type}-${functionReference.id}`,
    metaType: typeSpec.metaType,
    dataType: DATA_TYPES.CALL,
    type,
    ref: functionReference.id,
    name: functionReference.name,
    properties: {},
    canDelete: true,
    canEdit: true,
    editing: false,
    selected: false,
    docActive: false,
  };
  if (typeSpec.callBlock?.onCanvas) {
    data.position = { x: 0, y: 0 };
  }
  functionReference.arguments &&
    Object.entries(functionReference.arguments).forEach(([argKey, argInfo]) => {
      data.properties[argKey] = argInfo.default;
    });
  return data;
}

export function functionInstanceAsType(
  functionTypeSpec: TypeSpec,
  functionInstance: BlockData,
  programData: { [key: string]: BlockData }
): TypeSpec {
  const initialFunctionDef = {
    ...functionTypeSpec,
    name: functionInstance.name,
    specificType: functionInstance.type,
  };
  let newProperties = {};
  functionInstance.arguments?.forEach((arg) => {
    const argBlock = programData[arg];
    newProperties[arg] = {
      name: argBlock.name,
      accepts: [argBlock.type],
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
  programData: { [key: string]: BlockData },
  executionData: { [key: string]: null | number },
  objectTypes: { [key: string]: TypeSpec },
  staticData: undefined | null | BlockData,
  id: string
): [BlockData, TypeSpec, null | number] {
  const data = staticData
    ? staticData
    : programData[id]
    ? programData[id]
    : ({ type: "unknown", ref: "unknown" } as BlockData);
  const progress = executionData[id];
  const typeSpec = objectTypes[data.type]
    ? objectTypes[data.type]
    : ({ instanceBlock: {}, referenceBlock: {}, callBlock: {} } as TypeSpec);
  const robustTypeSpec =
    typeSpec.metaType === META_TYPES.FUNCTION &&
    data &&
    data.dataType === DATA_TYPES.INSTANCE
      ? functionInstanceAsType(typeSpec, data, programData)
      : typeSpec.metaType === META_TYPES.FUNCTION &&
        data &&
        data.dataType === DATA_TYPES.CALL
      ? functionInstanceAsType(
          typeSpec,
          programData[data.ref as string],
          programData
        )
      : typeSpec;
  const refData = data?.ref ? programData[data?.ref] : undefined;
  const selected = data?.selected || refData?.selected || false;
  const editing = data?.editing || refData?.editing || false;
  // Package up information on the block, data about the corresponding reference (if applicable), and argument blocks it contains
  return [
    { ...data, refData, selected, editing } as BlockData,
    robustTypeSpec,
    progress,
  ];
}
