"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Canvas = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _reactFlowRenderer = _interopRequireWildcard(require("react-flow-renderer"));

var _reactDnd = require("react-dnd");

var _ProgrammingContext = require("./ProgrammingContext");

var _Block = require("./Block");

var _Constants = require("./Constants");

var _Generators = require("./Generators");

var _excluded = ["highlightColor"];

var CanvasNode = function CanvasNode(_ref) {
  var data = _ref.data;
  var highlightColor = data.highlightColor,
      rest = (0, _objectWithoutProperties2.default)(data, _excluded);
  return /*#__PURE__*/_react.default.createElement(_Block.VisualBlock, {
    data: rest,
    x: 0,
    y: 0,
    typeSpec: rest.typeSpec,
    onCanvas: true,
    highlightColor: highlightColor,
    context: rest.context
  });
};

var Canvas = function Canvas(_ref2) {
  var highlightColor = _ref2.highlightColor;
  var nodes = (0, _ProgrammingContext.useProgrammingStore)(function (state) {
    return Object.values(state.programData).map(function (data) {
      var _state$programSpec$ob, _state$programSpec$ob2;

      var typeSpec = state.programSpec.objectTypes[data.type];
      var blockType = data.dataType === _Constants.DATA_TYPES.INSTANCE ? 'instanceBlock' : data.dataType === _Constants.DATA_TYPES.CALL ? 'callBlock' : data.dataType === _Constants.DATA_TYPES.REFERENCE ? 'referenceBlock' : 'nullBlock';
      var color = (_state$programSpec$ob = state.programSpec.objectTypes[data.type][blockType]) === null || _state$programSpec$ob === void 0 ? void 0 : _state$programSpec$ob.color;
      var onCanvas = (_state$programSpec$ob2 = state.programSpec.objectTypes[data.type][blockType]) === null || _state$programSpec$ob2 === void 0 ? void 0 : _state$programSpec$ob2.onCanvas;
      var ref = data.ref ? state.programData[data.ref] : {};
      var argumentBlocks = data !== null && data !== void 0 && data.arguments ? data.arguments : ref !== null && ref !== void 0 && ref.arguments ? ref.arguments : [];
      var argumentBlockData = argumentBlocks.map(function (instanceId) {
        var inst = state.programData[instanceId];
        var instType = state.programSpec.objectTypes[inst.type];
        return (0, _Generators.referenceTemplateFromSpec)(inst.type, inst, instType);
      });
      return {
        id: data.id,
        position: data.position,
        type: 'canvasNode',
        data: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, data), {}, {
          highlightColor: highlightColor,
          ref: ref,
          typeSpec: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, typeSpec), {}, {
            color: color,
            onCanvas: onCanvas
          }),
          context: data.arguments ? data.arguments : [],
          argumentBlockData: argumentBlockData
        })
      };
    }).filter(function (data) {
      var _data$data$typeSpec;

      return (_data$data$typeSpec = data.data.typeSpec) === null || _data$data$typeSpec === void 0 ? void 0 : _data$data$typeSpec.onCanvas;
    });
  });
  var acceptTypes = (0, _ProgrammingContext.useProgrammingStore)(function (state) {
    return Object.entries(state.programSpec.objectTypes).filter(function (_ref3) {
      var _objectType$instanceB, _objectType$reference, _objectType$callBlock;

      var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
          _ = _ref4[0],
          objectType = _ref4[1];

      return ((_objectType$instanceB = objectType.instanceBlock) === null || _objectType$instanceB === void 0 ? void 0 : _objectType$instanceB.onCanvas) || ((_objectType$reference = objectType.referenceBlock) === null || _objectType$reference === void 0 ? void 0 : _objectType$reference.onCanvas) || ((_objectType$callBlock = objectType.callBlock) === null || _objectType$callBlock === void 0 ? void 0 : _objectType$callBlock.onCanvas);
    }).map(function (_ref5) {
      var _ref6 = (0, _slicedToArray2.default)(_ref5, 1),
          objectKey = _ref6[0];

      return objectKey;
    });
  });
  var moveNode = (0, _ProgrammingContext.useProgrammingStore)(function (state) {
    return state.moveBlock;
  });
  var createPlacedNode = (0, _ProgrammingContext.useProgrammingStore)(function (state) {
    return state.createPlacedBlock;
  });

  var _useReactFlow = (0, _reactFlowRenderer.useReactFlow)(),
      project = _useReactFlow.project;

  var drop = (0, _reactDnd.useDrop)({
    accept: acceptTypes,
    canDrop: function canDrop(item) {
      return item.onCanvas;
    },
    drop: function drop(item, monitor) {
      var clientOffset = monitor.getClientOffset();
      var position = project({
        x: clientOffset.x - 350,
        y: clientOffset.y
      });
      createPlacedNode(item.data, position.x, position.y);
    }
  })[1];
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      backgroundColor: "black",
      display: 'flex',
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactFlowRenderer.default, {
    ref: drop,
    maxZoom: 1.5,
    minZoom: 0.5,
    nodesConnectable: false,
    elementsSelectable: false,
    nodesDraggable: true,
    nodeTypes: (0, _react.useMemo)(function () {
      return {
        canvasNode: CanvasNode
      };
    }, []),
    nodes: nodes,
    onConnect: function onConnect(_) {},
    onNodesChange: moveNode,
    fitViewOnInit: true,
    defaultZoom: 0.5,
    snapToGrid: true,
    snapGrid: [30, 30]
  }, /*#__PURE__*/_react.default.createElement(_reactFlowRenderer.MiniMap, {
    maskColor: "#1a192b44",
    nodeStrokeColor: function nodeStrokeColor(n) {
      var _n$style;

      if ((_n$style = n.style) !== null && _n$style !== void 0 && _n$style.background) return n.style.background;
      if (n.data.typeSpec.color !== null) return n.data.typeSpec.color;
      return "#eee";
    },
    nodeColor: function nodeColor(n) {
      var _n$style2;

      if (n.data.typeSpec.color !== null) return n.data.typeSpec.color;
      if ((_n$style2 = n.style) !== null && _n$style2 !== void 0 && _n$style2.background) return n.style.background;
      return "#fff";
    },
    nodeBorderRadius: 3
  }), /*#__PURE__*/_react.default.createElement(_reactFlowRenderer.Controls, null), /*#__PURE__*/_react.default.createElement(_reactFlowRenderer.Background, {
    variant: "lines",
    color: "#555",
    gap: 30
  })));
};

exports.Canvas = Canvas;