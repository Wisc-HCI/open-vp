"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Block = void 0;
Object.defineProperty(exports, "PreviewBlock", {
  enumerable: true,
  get: function get() {
    return _PreviewBlock.PreviewBlock;
  }
});
Object.defineProperty(exports, "VisualBlock", {
  enumerable: true,
  get: function get() {
    return _VisualBlock.VisualBlock;
  }
});

var _react = _interopRequireWildcard(require("react"));

var _ProgrammingContext = require("../ProgrammingContext");

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = require("react-dnd-html5-backend");

var _PreviewBlock = require("./PreviewBlock");

var _VisualBlock = require("./VisualBlock");

var _ = require("..");

var _Generators = require("../Generators");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Block = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var id = _ref.id,
      staticData = _ref.staticData,
      parentId = _ref.parentId,
      fieldInfo = _ref.fieldInfo,
      idx = _ref.idx,
      dragDisabled = _ref.dragDisabled,
      bounded = _ref.bounded,
      after = _ref.after,
      highlightColor = _ref.highlightColor,
      context = _ref.context,
      interactionDisabled = _ref.interactionDisabled;

  var _useProgrammingStore = (0, _ProgrammingContext.useProgrammingStore)((0, _react.useCallback)(function (state) {
    return (0, _Generators.combinedBlockData)(state, staticData, id);
  }, [id, staticData])),
      _useProgrammingStore2 = _slicedToArray(_useProgrammingStore, 3),
      data = _useProgrammingStore2[0],
      typeSpec = _useProgrammingStore2[1],
      progress = _useProgrammingStore2[2];

  var locked = (0, _ProgrammingContext.useProgrammingStore)(function (state) {
    return state.locked;
  });
  var blockContext = data.arguments ? data.arguments : [];
  var wholeContext = [].concat(_toConsumableArray(context), _toConsumableArray(blockContext));
  var onCanvas = data.dataType === _.DATA_TYPES.REFERENCE ? typeSpec.referenceBlock.onCanvas : data.dataType === _.DATA_TYPES.CALL ? typeSpec.callBlock.onCanvas : data.dataType === _.DATA_TYPES.INSTANCE ? typeSpec.instanceBlock.onCanvas : "null";

  var _useDrag = (0, _reactDnd.useDrag)(function () {
    return {
      type: data !== null && data !== void 0 && data.type ? data.type : "null",
      item: function item() {
        return {
          data: data,
          typeSpec: typeSpec,
          parentId: parentId,
          fieldInfo: fieldInfo,
          idx: idx,
          onCanvas: onCanvas,
          context: wholeContext
        };
      },
      canDrag: !dragDisabled && !data.editing && !locked,
      collect: function collect(monitor) {
        return {
          isDragging: monitor.isDragging()
        };
      }
    };
  }, [data, typeSpec, parentId, fieldInfo, idx, dragDisabled]),
      _useDrag2 = _slicedToArray(_useDrag, 3),
      dragProps = _useDrag2[0],
      drag = _useDrag2[1],
      preview = _useDrag2[2];

  var hidden = !(fieldInfo !== null && fieldInfo !== void 0 && fieldInfo.isSpawner) && dragProps.isDragging;
  (0, _react.useEffect)(function () {
    preview((0, _reactDndHtml5Backend.getEmptyImage)(), {
      captureDraggingState: false
    });
  }, [preview]);

  if (!data || onCanvas === "null") {
    return null;
  } else {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      hidden: hidden,
      style: {
        flex: 1,
        display: hidden ? 'none' : 'flex'
      }
    }, /*#__PURE__*/_react.default.createElement(_VisualBlock.VisualBlock, {
      data: data,
      ref: drag,
      typeSpec: typeSpec,
      bounded: bounded,
      highlightColor: highlightColor,
      context: wholeContext,
      interactionDisabled: interactionDisabled,
      fieldInfo: fieldInfo,
      parentId: parentId,
      progress: progress
    })), /*#__PURE__*/_react.default.createElement("div", {
      hidden: hidden,
      style: {
        display: hidden ? 'none' : 'flex'
      }
    }, after));
  }
});
exports.Block = Block;