"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawingCanvasEdge = exports.CanvasEdge = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactFlowRenderer = require("react-flow-renderer");

var _ProgrammingContext = require("./ProgrammingContext");

var _grommet = require("grommet");

var _fi = require("react-icons/fi");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Constants = require("./Constants");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var EdgeButton = _styledComponents.default.button({
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: '20px',
  width: '20px',
  display: 'inherit',
  padding: '3px',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  cursor: 'pointer',
  // backgroundColor: 'darkgrey',
  '&:hover': {
    backgroundColor: '#ffffff22'
  },
  '&:focus': {
    boxShadow: '0 0 0 2px darkgrey'
  }
});

var EdgeField = _styledComponents.default.input(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  border-width: 0;\n  outline: none;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  padding: 0 10px;\n  height: 25px;\n  max-width: 80px;\n  font-size: 12px;\n  line-height: 1;\n  color: white;\n  background-color: #22222299;\n  box-shadow: 0 0 0 1px #222222;\n  &:focus: {\n    box-shadow: 0 0 0 2px #222222;\n  }\n"])));

var DrawingCanvasEdge = function DrawingCanvasEdge(_ref) {
  var sourceX = _ref.sourceX,
      sourceY = _ref.sourceY,
      sourcePosition = _ref.sourcePosition,
      targetX = _ref.targetX,
      targetY = _ref.targetY,
      targetPosition = _ref.targetPosition,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style;
  var edgePath = (0, _reactFlowRenderer.getSmoothStepPath)({
    sourceX: sourceX,
    sourceY: sourceY,
    sourcePosition: sourcePosition,
    targetX: targetX,
    targetY: targetY,
    targetPosition: targetPosition
  });
  return /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "none",
    stroke: "#ffffff99",
    strokeWidth: 1.5,
    className: "animated",
    d: edgePath
  }), /*#__PURE__*/_react.default.createElement("circle", {
    cx: targetX,
    cy: targetY,
    fill: "#fff",
    r: 3,
    stroke: "#222",
    strokeWidth: 1.5
  }));
};

exports.DrawingCanvasEdge = DrawingCanvasEdge;

var CanvasEdge = function CanvasEdge(_ref2) {
  var id = _ref2.id,
      sourceX = _ref2.sourceX,
      sourceY = _ref2.sourceY,
      targetX = _ref2.targetX,
      targetY = _ref2.targetY,
      sourcePosition = _ref2.sourcePosition,
      targetPosition = _ref2.targetPosition,
      _ref2$style = _ref2.style,
      style = _ref2$style === void 0 ? {} : _ref2$style,
      markerEnd = _ref2.markerEnd;
  var updateEdgeName = (0, _ProgrammingContext.useProgrammingStore)(function (state) {
    return state.updateEdgeName;
  });
  var deleteEdge = (0, _ProgrammingContext.useProgrammingStore)(function (state) {
    return state.deleteEdge;
  });
  var toggleEdgeMode = (0, _ProgrammingContext.useProgrammingStore)(function (state) {
    return state.toggleEdgeMode;
  });
  var edge = (0, _ProgrammingContext.useProgrammingStore)((0, _react.useCallback)(function (state) {
    return state.programData[id];
  }, [id]));
  var bounds = {
    width: 165,
    height: 30
  }; // const [ref, bounds] = useMeasure();
  // console.log(bounds);

  var edgePath = (0, _reactFlowRenderer.getSmoothStepPath)({
    sourceX: sourceX,
    sourceY: sourceY,
    sourcePosition: sourcePosition,
    targetX: targetX,
    targetY: targetY,
    targetPosition: targetPosition
  });

  var _getEdgeCenter = (0, _reactFlowRenderer.getEdgeCenter)({
    sourceX: sourceX,
    sourceY: sourceY,
    targetX: targetX,
    targetY: targetY
  }),
      _getEdgeCenter2 = _slicedToArray(_getEdgeCenter, 2),
      edgeCenterX = _getEdgeCenter2[0],
      edgeCenterY = _getEdgeCenter2[1];

  return edge && /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    id: id,
    style: _objectSpread(_objectSpread({}, style), {}, {
      strokeWidth: 2
    }),
    className: "animated react-flow__edge-path",
    d: edgePath,
    markerEnd: markerEnd
  }), /*#__PURE__*/_react.default.createElement("foreignObject", {
    width: "".concat(bounds.width, "pt"),
    height: "".concat(bounds.height, "pt"),
    x: "".concat(edgeCenterX - bounds.width / 2, "px"),
    y: "".concat(edgeCenterY - bounds.height / 2, "px"),
    requiredExtensions: "http://www.w3.org/1999/xhtml"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "nodrag",
    style: {
      unset: "all",
      display: "inline-block",
      width: "".concat(bounds.width, "px"),
      height: "".concat(bounds.height, "px"),
      backgroundColor: "grey",
      borderRadius: 5,
      borderColor: "white",
      flexDirection: "row",
      padding: 5
    }
  }, /*#__PURE__*/_react.default.createElement(_grommet.Box // style={{ position: "inherit" }}
  , {
    height: "".concat(bounds.height, "px"),
    width: "".concat(bounds.width, "px"),
    direction: "row",
    gap: "xsmall",
    justify: "around",
    align: "center",
    alignContent: "baseline"
  }, /*#__PURE__*/_react.default.createElement(EdgeField, {
    type: edge.mode === _Constants.SIMPLE_PROPERTY_TYPES.NUMBER ? 'number' : null,
    className: "nodrag",
    value: edge.name,
    style: {
      width: bounds.width - 40
    },
    onChange: function onChange(v) {
      return updateEdgeName(edge.id, v.target.value);
    }
  }), /*#__PURE__*/_react.default.createElement(EdgeButton, {
    onClick: function onClick() {
      return toggleEdgeMode(edge.id);
    }
  }, edge.mode === _Constants.SIMPLE_PROPERTY_TYPES.NUMBER ? /*#__PURE__*/_react.default.createElement(_fi.FiType, null) : /*#__PURE__*/_react.default.createElement(_fi.FiHash, null)), /*#__PURE__*/_react.default.createElement(EdgeButton, {
    onClick: function onClick() {
      return deleteEdge(edge.id);
    }
  }, /*#__PURE__*/_react.default.createElement(_fi.FiTrash2, null))))));
};

exports.CanvasEdge = CanvasEdge;