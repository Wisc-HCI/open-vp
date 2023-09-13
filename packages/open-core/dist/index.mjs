var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/constants.ts
var DATA_TYPES = {
  INSTANCE: "INSTANCE",
  REFERENCE: "REFERENCE",
  CALL: "CALL",
  ARGUMENT: "ARGUMENT",
  CONNECTION: "CONNECTION"
};
var META_TYPES = {
  OBJECT: "OBJECT",
  FUNCTION: "FUNCTION"
};
var EXTRA_TYPES = {
  LOCKED_INDICATOR: "LOCKED_INDICATOR",
  NAME_EDIT_TOGGLE: "NAME_EDIT_TOGGLE",
  SELECTION_TOGGLE: "SELECTION_TOGGLE",
  DOC_TOGGLE: "DOC_TOGGLE",
  COLLAPSE_TOGGLE: "COLLAPSE_TOGGLE",
  FUNCTION_BUTTON: "FUNCTION_BUTTON",
  DROPDOWN: "DROPDOWN",
  DELETE_BUTTON: "DELETE_BUTTON",
  COPY_BUTTON: "COPY_BUTTON",
  CUT_BUTTON: "CUT_BUTTON",
  ADD_ARGUMENT: "ADD_ARGUMENT",
  ADD_ARGUMENT_GROUP: "ADD_ARGUMENT_GROUP",
  DEBUG_TOGGLE: "DEBUG_TOGGLE",
  INDICATOR_TEXT: "INDICATOR_TEXT",
  INDICATOR_ICON: "INDICATOR_ICON",
  DIVIDER: "DIVIDER",
  LABEL: "LABEL"
};
var SIMPLE_PROPERTY_TYPES = {
  BOOLEAN: "BOOLEAN",
  NUMBER: "NUMBER",
  STRING: "STRING",
  OPTIONS: "OPTIONS",
  IGNORED: "IGNORED",
  METADATA: "METADATA",
  VECTOR3: "VECTOR3"
};
var CONNECTIONS = {
  OUTBOUND: "OUTBOUND",
  INBOUND: "INBOUND"
};
var CLIPBOARD_ACTION = {
  COPY: "COPY",
  CUT: "CUT",
  PASTE: "PASTE",
  SELECT: "SELECT"
};

// src/generators.ts
import { mapValues } from "lodash";
function instanceTemplateFromSpec(type, typeSpec, isArg) {
  var _a, _b;
  let data = {
    id: type,
    name: `${((_a = typeSpec.instanceBlock) == null ? void 0 : _a.hideNewPrefix) ? "" : "New "}${typeSpec.name}${isArg ? " Argument" : ""}`,
    metaType: typeSpec.metaType,
    dataType: DATA_TYPES.INSTANCE,
    type,
    properties: {},
    arguments: void 0,
    position: void 0,
    canDelete: true,
    canEdit: true,
    editing: false,
    selected: false,
    docActive: false
  };
  if (typeSpec.properties) {
    Object.entries(typeSpec.properties).forEach(([propKey, propInfo]) => {
      data.properties[propKey] = propInfo.default;
    });
  }
  if ((_b = typeSpec.instanceBlock) == null ? void 0 : _b.onCanvas) {
    data.position = { x: 0, y: 0 };
  }
  if (typeSpec.metaType === META_TYPES.FUNCTION) {
    data.arguments = [];
  }
  return data;
}
function referenceTemplateFromSpec(type, instanceReference, typeSpec) {
  var _a;
  let data = {
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
    docActive: false
  };
  if ((_a = typeSpec.referenceBlock) == null ? void 0 : _a.onCanvas) {
    data.position = { x: 0, y: 0 };
  }
  return data;
}
function callTemplateFromSpec(type, functionReference, typeSpec) {
  var _a;
  let data = {
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
    docActive: false
  };
  if ((_a = typeSpec.callBlock) == null ? void 0 : _a.onCanvas) {
    data.position = { x: 0, y: 0 };
  }
  functionReference.arguments && Object.entries(functionReference.arguments).forEach(([argKey, argInfo]) => {
    data.properties[argKey] = argInfo.default;
  });
  return data;
}
function functionInstanceAsType(functionTypeSpec, functionInstance, programData) {
  var _a;
  const initialFunctionDef = __spreadProps(__spreadValues({}, functionTypeSpec), {
    name: functionInstance.name,
    specificType: functionInstance.type
  });
  let newProperties = {};
  (_a = functionInstance.arguments) == null ? void 0 : _a.forEach((arg) => {
    const argBlock = programData[arg];
    newProperties[arg] = {
      name: argBlock.name,
      accepts: [argBlock.type],
      default: null,
      isFunctionArgument: true
    };
  });
  let functionTypeDef = __spreadProps(__spreadValues({}, initialFunctionDef), {
    properties: __spreadValues(__spreadValues({}, mapValues(initialFunctionDef.properties, (v) => __spreadProps(__spreadValues({}, v), {
      isFunctionBlockField: true
    }))), newProperties)
  });
  return functionTypeDef;
}
function combinedBlockData(programData, executionData, objectTypes, staticData, id) {
  const data = staticData ? staticData : programData[id] ? programData[id] : { type: "unknown", ref: "unknown" };
  const progress = executionData[id];
  const typeSpec = objectTypes[data.type] ? objectTypes[data.type] : { instanceBlock: {}, referenceBlock: {}, callBlock: {} };
  const robustTypeSpec = typeSpec.metaType === META_TYPES.FUNCTION && data && data.dataType === DATA_TYPES.INSTANCE ? functionInstanceAsType(typeSpec, data, programData) : typeSpec.metaType === META_TYPES.FUNCTION && data && data.dataType === DATA_TYPES.CALL ? functionInstanceAsType(typeSpec, programData[data.ref], programData) : typeSpec;
  const refData = (data == null ? void 0 : data.ref) ? programData[data == null ? void 0 : data.ref] : void 0;
  const selected = (data == null ? void 0 : data.selected) || (refData == null ? void 0 : refData.selected) || false;
  const editing = (data == null ? void 0 : data.editing) || (refData == null ? void 0 : refData.editing) || false;
  return [
    __spreadProps(__spreadValues({}, data), { refData, selected, editing }),
    robustTypeSpec,
    progress
  ];
}
export {
  CLIPBOARD_ACTION,
  CONNECTIONS,
  DATA_TYPES,
  EXTRA_TYPES,
  META_TYPES,
  SIMPLE_PROPERTY_TYPES,
  callTemplateFromSpec,
  combinedBlockData,
  instanceTemplateFromSpec,
  referenceTemplateFromSpec
};
