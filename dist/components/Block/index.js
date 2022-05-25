"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

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

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _ProgrammingContext = require("../ProgrammingContext");

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = require("react-dnd-html5-backend");

var _PreviewBlock = require("./PreviewBlock");

var _VisualBlock = require("./VisualBlock");

var _ = require("..");

var _Generators = require("../Generators");

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
      _useProgrammingStore2 = (0, _slicedToArray2.default)(_useProgrammingStore, 3),
      data = _useProgrammingStore2[0],
      typeSpec = _useProgrammingStore2[1],
      progress = _useProgrammingStore2[2];

  var locked = (0, _ProgrammingContext.useProgrammingStore)(function (state) {
    return state.locked;
  });
  var blockContext = data.arguments ? data.arguments : [];
  var wholeContext = [].concat((0, _toConsumableArray2.default)(context), (0, _toConsumableArray2.default)(blockContext));
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
      _useDrag2 = (0, _slicedToArray2.default)(_useDrag, 3),
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