"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragLayer = void 0;

var _reactDnd = require("react-dnd");

var _Block = require("./Block");

var DragLayer = function DragLayer(_ref) {
  var highlightColor = _ref.highlightColor;

  var _useDragLayer = (0, _reactDnd.useDragLayer)(function (monitor) {
    return {
      item: monitor.getItem(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging()
    };
  }),
      isDragging = _useDragLayer.isDragging,
      item = _useDragLayer.item,
      currentOffset = _useDragLayer.currentOffset;

  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      pointerEvents: "none",
      zIndex: 100,
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      opacity: 0.5
    }
  }, item && /*#__PURE__*/React.createElement(_Block.VisualBlock, {
    x: currentOffset === null || currentOffset === void 0 ? void 0 : currentOffset.x,
    y: currentOffset === null || currentOffset === void 0 ? void 0 : currentOffset.y,
    data: item.data,
    isDragging: isDragging,
    typeSpec: item.typeSpec,
    highlightColor: highlightColor
  }));
};

exports.DragLayer = DragLayer;