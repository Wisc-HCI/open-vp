"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExternalBlock = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _VisualBlock = require("./VisualBlock");

var _ProgrammingContext = require("../ProgrammingContext");

var _theme = require("../theme");

var _rdndmbHtml5ToTouch = require("rdndmb-html5-to-touch");

var _reactDndMultiBackend = require("react-dnd-multi-backend");

var _reactDnd = require("react-dnd");

var _Generators = require("../Generators");

var InnerExternalBlock = function InnerExternalBlock(props) {
  var _useProgrammingStore = (0, _ProgrammingContext.useProgrammingStore)((0, _react.useCallback)(function (state) {
    return (0, _Generators.combinedBlockData)(state, props.data, null);
  }, [props.data])),
      _useProgrammingStore2 = (0, _slicedToArray2.default)(_useProgrammingStore, 2),
      data = _useProgrammingStore2[0],
      typeSpec = _useProgrammingStore2[1];

  var otherProps = {
    x: 0,
    z: 0,
    scale: 1,
    onCanvas: false,
    interactionDisabled: true,
    bounded: true,
    fieldInfo: 'outside',
    parentId: 'outside'
  };
  return /*#__PURE__*/_react.default.createElement(_VisualBlock.VisualBlock, Object.assign({}, props, otherProps, {
    data: data,
    typeSpec: typeSpec
  }));
};

var ExternalBlock = function ExternalBlock(_ref) {
  var store = _ref.store,
      highlightColor = _ref.highlightColor,
      data = _ref.data,
      style = _ref.style,
      context = _ref.context;
  var theme = (0, _theme.getTheme)(highlightColor, true);
  return /*#__PURE__*/_react.default.createElement(_grommet.Grommet, {
    theme: theme
  }, /*#__PURE__*/_react.default.createElement(_ProgrammingContext.ProgrammingProvider, {
    store: store
  }, /*#__PURE__*/_react.default.createElement(_reactDnd.DndProvider, {
    backend: _reactDndMultiBackend.MultiBackend,
    options: _rdndmbHtml5ToTouch.HTML5toTouch
  }, /*#__PURE__*/_react.default.createElement(InnerExternalBlock, {
    highlightColor: highlightColor,
    data: data,
    style: (0, _objectSpread2.default)({}, style),
    context: context
  }))));
};

exports.ExternalBlock = ExternalBlock;