"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreviewBlock = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _ProgrammingContext = require("../ProgrammingContext");

var _VisualBlock = require("./VisualBlock");

var _Generators = require("../Generators");

var PreviewBlock = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var id = _ref.id,
      staticData = _ref.staticData,
      bounded = _ref.bounded,
      highlightColor = _ref.highlightColor,
      context = _ref.context,
      style = _ref.style;

  var _useProgrammingStore = (0, _ProgrammingContext.useProgrammingStore)((0, _react.useCallback)(function (state) {
    return (0, _Generators.combinedBlockData)(state, staticData, id);
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
});
exports.PreviewBlock = PreviewBlock;