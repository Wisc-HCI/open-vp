"use strict";

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

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _ProgrammingContext = require("../ProgrammingContext");

var _reactDnd = require("react-dnd");

var _react = require("react");

var _reactDndHtml5Backend = require("react-dnd-html5-backend");

var _PreviewBlock = require("./PreviewBlock");

var _VisualBlock = require("./VisualBlock");

var _ = require("..");

var Block = function Block(_ref) {
  var id = _ref.id,
      staticData = _ref.staticData,
      parentId = _ref.parentId,
      fieldInfo = _ref.fieldInfo,
      idx = _ref.idx,
      dragDisabled = _ref.dragDisabled,
      bounded = _ref.bounded,
      after = _ref.after,
      highlightColor = _ref.highlightColor;

  var _useProgrammingStore = (0, _ProgrammingContext.useProgrammingStore)((0, _react.useCallback)(function (state) {
    var data = staticData ? staticData : state.programData[id] ? state.programData[id] : null;
    var typeSpec = state.programSpec.objectTypes[data === null || data === void 0 ? void 0 : data.type];
    var refData = data !== null && data !== void 0 && data.ref ? state.programData[data === null || data === void 0 ? void 0 : data.ref] : {};
    var selected = (data === null || data === void 0 ? void 0 : data.selected) || refData.selected;
    return [(0, _objectSpread2.default)((0, _objectSpread2.default)({}, data), {}, {
      refData: refData,
      selected: selected
    }), typeSpec];
  }, [id, staticData])),
      _useProgrammingStore2 = (0, _slicedToArray2.default)(_useProgrammingStore, 2),
      data = _useProgrammingStore2[0],
      typeSpec = _useProgrammingStore2[1];

  var onCanvas = data.dataType === _.DATA_TYPES.REFERENCE ? typeSpec.referenceBlock.onCanvas : data.dataType === _.DATA_TYPES.CALL ? typeSpec.callBlock.onCanvas : typeSpec.instanceBlock.onCanvas;

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
          onCanvas: onCanvas
        };
      },
      canDrag: !dragDisabled,
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

  (0, _react.useEffect)(function () {
    preview((0, _reactDndHtml5Backend.getEmptyImage)(), {
      captureDraggingState: false
    });
  }, [preview]);

  if (!data) {
    return null;
  } else {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      hidden: parentId !== "drawer" && dragProps.isDragging,
      style: {
        display: 'flex',
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(_VisualBlock.VisualBlock, {
      data: data,
      ref: drag,
      typeSpec: typeSpec,
      bounded: bounded,
      highlightColor: highlightColor
    })), /*#__PURE__*/React.createElement("div", {
      hidden: parentId !== "drawer" && dragProps.isDragging,
      style: {
        display: 'flex'
      }
    }, after));
  }
};

exports.Block = Block;