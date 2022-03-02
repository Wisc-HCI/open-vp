"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.referenceTemplateFromSpec = exports.instanceTemplateFromSpec = exports.combinedBlockData = exports.callTemplateFromSpec = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _Constants = require("./Constants");

var instanceTemplateFromSpec = function instanceTemplateFromSpec(type, objectSpec, isArg) {
  var _objectSpec$instanceB, _objectSpec$instanceB2;

  var data = {
    id: type,
    type: type,
    dataType: _Constants.DATA_TYPES.INSTANCE,
    properties: {},
    name: "".concat((_objectSpec$instanceB = objectSpec.instanceBlock) !== null && _objectSpec$instanceB !== void 0 && _objectSpec$instanceB.hideNewPrefix ? '' : 'New ').concat(objectSpec.name).concat(isArg ? ' Argument' : ''),
    canDelete: true,
    canEdit: true,
    editing: false,
    selected: false
  };

  if (objectSpec.properties) {
    Object.entries(objectSpec.properties).forEach(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          propKey = _ref2[0],
          propInfo = _ref2[1];

      data.properties[propKey] = propInfo.default;
    });
  }

  if ((_objectSpec$instanceB2 = objectSpec.instanceBlock) !== null && _objectSpec$instanceB2 !== void 0 && _objectSpec$instanceB2.onCanvas) {
    data.position = {
      x: 0,
      y: 0
    };
  }

  if (objectSpec.type === _Constants.TYPES.FUNCTION) {
    data.arguments = [];
  }

  return data;
};

exports.instanceTemplateFromSpec = instanceTemplateFromSpec;

var referenceTemplateFromSpec = function referenceTemplateFromSpec(type, instanceReference, objectSpec) {
  var data = {
    id: type,
    type: type,
    ref: instanceReference.id,
    dataType: _Constants.DATA_TYPES.REFERENCE,
    name: instanceReference.name,
    canDelete: true,
    canEdit: true,
    editing: false,
    selected: false
  };

  if (objectSpec.referenceBlock.onCanvas) {
    data.position = {
      x: 0,
      y: 0
    };
  }

  return data;
};

exports.referenceTemplateFromSpec = referenceTemplateFromSpec;

var callTemplateFromSpec = function callTemplateFromSpec(type, functionReference, objectSpec) {
  var data = {
    id: type,
    type: type,
    ref: functionReference.id,
    dataType: _Constants.DATA_TYPES.CALL,
    name: functionReference.name,
    properties: {},
    canDelete: true,
    canEdit: true,
    editing: false,
    selected: false
  };

  if (objectSpec.callBlock.onCanvas) {
    data.position = {
      x: 0,
      y: 0
    };
  }

  functionReference.arguments && Object.entries(functionReference.arguments).forEach(function (_ref3) {
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
        argKey = _ref4[0],
        argInfo = _ref4[1];

    data.properties[argKey] = argInfo.default;
  });
  return data;
};

exports.callTemplateFromSpec = callTemplateFromSpec;

var combinedBlockData = function combinedBlockData(state, staticData, id) {
  var data = staticData ? staticData : state.programData[id] ? state.programData[id] : null;
  var typeSpec = state.programSpec.objectTypes[data === null || data === void 0 ? void 0 : data.type] ? state.programSpec.objectTypes[data === null || data === void 0 ? void 0 : data.type] : {
    instanceBlock: {},
    referenceBlock: {},
    callBlock: {}
  };
  var refData = data !== null && data !== void 0 && data.ref ? state.programData[data === null || data === void 0 ? void 0 : data.ref] : {};
  var selected = (data === null || data === void 0 ? void 0 : data.selected) || (refData === null || refData === void 0 ? void 0 : refData.selected);
  var editing = (data === null || data === void 0 ? void 0 : data.editing) || (refData === null || refData === void 0 ? void 0 : refData.editing);
  var argumentBlocks = data !== null && data !== void 0 && data.arguments ? data.arguments : refData !== null && refData !== void 0 && refData.arguments ? refData.arguments : [];
  var argumentBlockData = argumentBlocks.map(function (instanceId) {
    var inst = state.programData[instanceId];
    var instType = state.programSpec.objectTypes[inst.type];
    return referenceTemplateFromSpec(inst.type, inst, instType);
  }); // Package up information on the block, data about the corresponding reference (if applicable), and argument blocks it contains

  return [(0, _objectSpread2.default)((0, _objectSpread2.default)({}, data), {}, {
    refData: refData,
    selected: selected,
    editing: editing,
    argumentBlockData: argumentBlockData
  }), typeSpec];
};

exports.combinedBlockData = combinedBlockData;