"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectionHandle = void 0;

var _react = _interopRequireDefault(require("react"));

var _ProgrammingContext = require("../ProgrammingContext");

var _reactFlowRenderer = require("react-flow-renderer");

var _Constants = require("../Constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var handleTypeToDirection = function handleTypeToDirection(handleType) {
  return handleType === "target" ? _Constants.CONNECTIONS.INBOUND : _Constants.CONNECTIONS.OUTBOUND;
};

var checkValid = function checkValid(connectionInfo, nodeData, direction, position, validateEdge) {
  if (!connectionInfo) {
    // No connection being formed, so not valid
    return false;
  } else if (direction === handleTypeToDirection(connectionInfo.handleType)) {
    // Targets need to match with Sources
    return false;
  }

  var otherIsTarget = connectionInfo.handleType === 'target';
  var target = otherIsTarget ? connectionInfo.nodeId : nodeData.id;
  var targetHandle = otherIsTarget ? connectionInfo.handleId : position;
  var source = otherIsTarget ? nodeData.id : connectionInfo.nodeId;
  var sourceHandle = otherIsTarget ? position : connectionInfo.handleId;
  return validateEdge(source, sourceHandle, target, targetHandle);
};

var ConnectionHandle = function ConnectionHandle(_ref) {
  var nodeData = _ref.nodeData,
      _ref$position = _ref.position,
      position = _ref$position === void 0 ? "top" : _ref$position,
      _ref$direction = _ref.direction,
      direction = _ref$direction === void 0 ? _Constants.CONNECTIONS.INBOUND : _ref$direction,
      highlightColor = _ref.highlightColor;
  var validateEdge = (0, _ProgrammingContext.useProgrammingStore)(function (state) {
    return state.validateEdge;
  });
  var connectionInfo = (0, _ProgrammingContext.useProgrammingStore)(function (state) {
    if (state.connectionInfo) {
      var node = state.programData[state.connectionInfo.nodeId];
      var nodeType = node.type;
      var typeSpec = state.programSpec.objectTypes[nodeType];
      var nodeDataType = node.dataType;
      var blockSpec = nodeDataType === _Constants.DATA_TYPES.REFERENCE ? typeSpec.referenceBlock : nodeDataType === _Constants.DATA_TYPES.CALL ? typeSpec.callBlock : typeSpec.instanceBlock;
      return _objectSpread(_objectSpread({}, state.connectionInfo), {}, {
        nodeType: nodeType,
        connectionSpec: blockSpec.connections[state.connectionInfo.handleId],
        existing: Object.values(state.programData).filter(function (d) {
          return d.dataType === _Constants.DATA_TYPES.CONNECTION;
        })
      });
    } else {
      return null;
    }
  });
  var isValidConnectionOption = checkValid(connectionInfo, nodeData, direction, position, validateEdge);
  return /*#__PURE__*/_react.default.createElement(_reactFlowRenderer.Handle, {
    isConnectable: !connectionInfo || isValidConnectionOption,
    id: position,
    position: position,
    type: direction === _Constants.CONNECTIONS.INBOUND ? "target" : "source",
    style: {
      boxShadow: isValidConnectionOption ? "0pt 0pt 3pt 1pt ".concat(highlightColor) : null,
      backgroundColor: isValidConnectionOption ? highlightColor : "grey",
      opacity: !connectionInfo || isValidConnectionOption ? 1 : 0.5
    }
  });
};

exports.ConnectionHandle = ConnectionHandle;