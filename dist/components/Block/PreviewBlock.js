"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreviewBlock = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _ProgrammingContext = require("../ProgrammingContext");

var _VisualBlock = require("./VisualBlock");

var _Generators = require("../Generators");

var PreviewBlock = function PreviewBlock(_ref) {
  var id = _ref.id,
      staticData = _ref.staticData,
      bounded = _ref.bounded,
      highlightColor = _ref.highlightColor,
      context = _ref.context,
      style = _ref.style;

  var _useProgrammingStore = (0, _ProgrammingContext.useProgrammingStore)((0, _react.useCallback)(function (state) {
    var data = staticData ? staticData : state.programData[id] ? state.programData[id] : null;
    var typeSpec = state.programSpec.objectTypes[data === null || data === void 0 ? void 0 : data.type];
    var refData = data.ref ? state.programData[data.ref] : {};
    var selected = (data === null || data === void 0 ? void 0 : data.selected) || refData.selected;
    var argumentBlocks = data !== null && data !== void 0 && data.arguments ? data.arguments : refData !== null && refData !== void 0 && refData.arguments ? refData.arguments : [];
    var argumentBlockData = argumentBlocks.map(function (instanceId) {
      var inst = state.programData[instanceId];
      var instType = state.programSpec.objectTypes[inst.type];
      return (0, _Generators.referenceTemplateFromSpec)(inst.type, inst, instType);
    });
    return [(0, _objectSpread2.default)((0, _objectSpread2.default)({}, data), {}, {
      refData: refData,
      selected: selected,
      argumentBlockData: argumentBlockData
    }), typeSpec];
  }, [id, staticData])),
      _useProgrammingStore2 = (0, _slicedToArray2.default)(_useProgrammingStore, 2),
      data = _useProgrammingStore2[0],
      typeSpec = _useProgrammingStore2[1];

  var blockContext = data.arguments ? data.arguments : [];
  var wholeContext = [].concat((0, _toConsumableArray2.default)(context), (0, _toConsumableArray2.default)(blockContext));

  if (!data) {
    return null;
  } else {
    return /*#__PURE__*/_react.default.createElement(_VisualBlock.VisualBlock, {
      data: data,
      typeSpec: typeSpec,
      interactionDisabled: true,
      bounded: bounded,
      highlightColor: highlightColor,
      context: wholeContext,
      style: style
    });
  }
};

exports.PreviewBlock = PreviewBlock;