"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.referenceTemplateFromSpec = exports.instanceTemplateFromSpec = exports.callTemplateFromSpec = void 0;

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