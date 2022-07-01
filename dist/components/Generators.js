"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.referenceTemplateFromSpec = exports.instanceTemplateFromSpec = exports.combinedBlockData = exports.callTemplateFromSpec = void 0;

var _Constants = require("./Constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
      var _ref2 = _slicedToArray(_ref, 2),
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
    var _ref4 = _slicedToArray(_ref3, 2),
        argKey = _ref4[0],
        argInfo = _ref4[1];

    data.properties[argKey] = argInfo.default;
  });
  return data;
};

exports.callTemplateFromSpec = callTemplateFromSpec;

var combinedBlockData = function combinedBlockData(state, staticData, id) {
  var data = staticData ? staticData : state.programData[id] ? state.programData[id] : null;
  var progress = state.executionData[id];
  var typeSpec = state.programSpec.objectTypes[data === null || data === void 0 ? void 0 : data.type] ? state.programSpec.objectTypes[data === null || data === void 0 ? void 0 : data.type] : {
    instanceBlock: {},
    referenceBlock: {},
    callBlock: {}
  };
  var refData = data !== null && data !== void 0 && data.ref ? state.programData[data === null || data === void 0 ? void 0 : data.ref] : null;
  var selected = (data === null || data === void 0 ? void 0 : data.selected) || (refData === null || refData === void 0 ? void 0 : refData.selected);
  var editing = (data === null || data === void 0 ? void 0 : data.editing) || (refData === null || refData === void 0 ? void 0 : refData.editing);
  var argumentBlocks = data !== null && data !== void 0 && data.arguments ? data.arguments : refData !== null && refData !== void 0 && refData.arguments ? refData.arguments : [];
  var argumentBlockData = argumentBlocks.map(function (instanceId) {
    var inst = state.programData[instanceId];
    var instType = state.programSpec.objectTypes[inst.type];
    return referenceTemplateFromSpec(inst.type, inst, instType);
  }); // Package up information on the block, data about the corresponding reference (if applicable), and argument blocks it contains

  return [_objectSpread(_objectSpread({}, data), {}, {
    refData: refData,
    selected: selected,
    editing: editing,
    argumentBlockData: argumentBlockData
  }), typeSpec, progress];
};

exports.combinedBlockData = combinedBlockData;