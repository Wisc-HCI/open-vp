"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropZone = void 0;

var _DropRegion = require("./DropRegion");

var DropZone = function DropZone(_ref) {
  var id = _ref.id,
      parentId = _ref.parentId,
      fieldInfo = _ref.fieldInfo,
      idx = _ref.idx,
      interactionDisabled = _ref.interactionDisabled,
      highlightColor = _ref.highlightColor;
  return /*#__PURE__*/React.createElement("div", {
    className: "nodrag",
    style: {
      padding: 4,
      backgroundColor: "#00000088",
      borderRadius: 3,
      minHeight: 30,
      minWidth: "max-content",
      margin: 4,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(_DropRegion.DropRegion, {
    id: id,
    parentId: parentId,
    fieldInfo: fieldInfo,
    idx: idx,
    minHeight: 30,
    bounded: true,
    disabled: id !== null || interactionDisabled,
    highlightColor: highlightColor
  }));
};

exports.DropZone = DropZone;