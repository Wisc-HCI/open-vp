"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Canvas = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactFlowRenderer = _interopRequireWildcard(require("react-flow-renderer"));

var _reactDnd = require("react-dnd");

var _ProgrammingContext = require("./ProgrammingContext");

var _Block = require("./Block");

var _Constants = require("./Constants");

var _Generators = require("./Generators");

var _reactUseMeasure = _interopRequireDefault(require("react-use-measure"));

var _fi = require("react-icons/fi");

var _excluded = ["highlightColor", "progress"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var CanvasNode = function CanvasNode(_ref) {
  var data = _ref.data;

  var highlightColor = data.highlightColor,
      progress = data.progress,
      rest = _objectWithoutProperties(data, _excluded); // console.log(rest)


  return /*#__PURE__*/_react.default.createElement(_Block.VisualBlock, {
    data: rest,
    x: 0,
    y: 0,
    typeSpec: rest.typeSpec,
    onCanvas: true,
    highlightColor: highlightColor,
    context: rest.context,
    progress: progress
  });
};

var Canvas = function Canvas(_ref2) {
  var highlightColor = _ref2.highlightColor,
      snapToGrid = _ref2.snapToGrid;
  var locked = (0, _ProgrammingContext.useProgrammingStore)(function (state) {
    return state.locked;
  });
  var setLocked = (0, _ProgrammingContext.useProgrammingStore)(function (state) {
    return state.setLocked;
  });
  var nodes = (0, _ProgrammingContext.useProgrammingStore)(function (state) {
    return Object.values(state.programData).map(function (data) {
      var _state$programSpec$ob, _state$programSpec$ob2;

      var typeSpec = state.programSpec.objectTypes[data.type];
      var progress = state.executionData[data.id];
      var blockType = data.dataType === _Constants.DATA_TYPES.INSTANCE ? 'instanceBlock' : data.dataType === _Constants.DATA_TYPES.CALL ? 'callBlock' : data.dataType === _Constants.DATA_TYPES.REFERENCE ? 'referenceBlock' : 'nullBlock';
      var color = (_state$programSpec$ob = state.programSpec.objectTypes[data.type][blockType]) === null || _state$programSpec$ob === void 0 ? void 0 : _state$programSpec$ob.color;
      var onCanvas = (_state$programSpec$ob2 = state.programSpec.objectTypes[data.type][blockType]) === null || _state$programSpec$ob2 === void 0 ? void 0 : _state$programSpec$ob2.onCanvas;
      var ref = data.ref ? state.programData[data.ref] : null;
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
        // draggable:!locked,
        data: _objectSpread(_objectSpread({}, data), {}, {
          highlightColor: highlightColor,
          ref: ref,
          typeSpec: _objectSpread(_objectSpread({}, typeSpec), {}, {
            color: color,
            onCanvas: onCanvas
          }),
          context: data.arguments ? data.arguments : [],
          argumentBlockData: argumentBlockData,
          progress: progress
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

      var _ref4 = _slicedToArray(_ref3, 2),
          _ = _ref4[0],
          objectType = _ref4[1];

      return ((_objectType$instanceB = objectType.instanceBlock) === null || _objectType$instanceB === void 0 ? void 0 : _objectType$instanceB.onCanvas) || ((_objectType$reference = objectType.referenceBlock) === null || _objectType$reference === void 0 ? void 0 : _objectType$reference.onCanvas) || ((_objectType$callBlock = objectType.callBlock) === null || _objectType$callBlock === void 0 ? void 0 : _objectType$callBlock.onCanvas);
    }).map(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 1),
          objectKey = _ref6[0];

      return objectKey;
    });
  });
  var moveNodes = (0, _ProgrammingContext.useProgrammingStore)(function (state) {
    return state.moveBlocks;
  });
  var createPlacedNode = (0, _ProgrammingContext.useProgrammingStore)(function (state) {
    return state.createPlacedBlock;
  });

  var _useReactFlow = (0, _reactFlowRenderer.useReactFlow)(),
      project = _useReactFlow.project;

  var _useMeasure = (0, _reactUseMeasure.default)(),
      _useMeasure2 = _slicedToArray(_useMeasure, 2),
      ref = _useMeasure2[0],
      bounds = _useMeasure2[1];

  var drop = (0, _reactDnd.useDrop)({
    accept: acceptTypes,
    canDrop: function canDrop(item) {
      return item.onCanvas;
    },
    drop: function drop(item, monitor) {
      var clientOffset = monitor.getClientOffset(); // console.log(monitor)
      // const zoom = getZoom();

      var position = project({
        x: clientOffset.x - bounds.left - 50,
        y: clientOffset.y - bounds.top
      });
      createPlacedNode(item.data, position.x, position.y);
    }
  })[1];
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    style: {
      backgroundColor: "black",
      display: 'flex',
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactFlowRenderer.default, {
    ref: drop,
    maxZoom: 1.5,
    minZoom: 0.5 // panOnDrag={!locked}
    ,
    nodesConnectable: false,
    elementsSelectable: false,
    nodeTypes: (0, _react.useMemo)(function () {
      return {
        canvasNode: CanvasNode
      };
    }, []),
    nodes: nodes,
    onConnect: function onConnect(_) {},
    onNodesChange: moveNodes,
    fitView: true,
    snapToGrid: snapToGrid,
    snapGrid: [30, 30]
  }, /*#__PURE__*/_react.default.createElement(_reactFlowRenderer.MiniMap, {
    maskColor: "#1a192b44",
    nodeStrokeColor: function nodeStrokeColor(n) {
      var _n$style;

      // if (n.type==='input') return 'black';
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
  }), /*#__PURE__*/_react.default.createElement(_reactFlowRenderer.Controls, {
    showInteractive: false
  }, /*#__PURE__*/_react.default.createElement(_reactFlowRenderer.ControlButton, {
    onClick: function onClick() {
      return setLocked(!locked);
    }
  }, locked ? /*#__PURE__*/_react.default.createElement(_fi.FiLock, null) : /*#__PURE__*/_react.default.createElement(_fi.FiUnlock, null))), /*#__PURE__*/_react.default.createElement(_reactFlowRenderer.Background, {
    variant: "lines",
    color: "#555",
    gap: 30
  })));
};

exports.Canvas = Canvas;