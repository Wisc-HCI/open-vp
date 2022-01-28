"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = void 0;

var _ = require(".");

var _DropRegion = require("./DropRegion");

var List = function List(_ref) {
  var ids = _ref.ids,
      parentId = _ref.parentId,
      fieldInfo = _ref.fieldInfo,
      interactionDisabled = _ref.interactionDisabled,
      highlightColor = _ref.highlightColor;
  // const setField = useStore((store) => store.setField);
  var minHeight = ids.length === 0 ? 30 : 8;
  return /*#__PURE__*/React.createElement("div", {
    className: "nodrag",
    style: {
      padding: 4,
      backgroundColor: "#00000088",
      borderRadius: 3,
      minHeight: 30,
      minWidth: 190,
      margin: 4
    }
  }, /*#__PURE__*/React.createElement(_DropRegion.DropRegion, {
    key: "initial",
    id: null,
    parentId: parentId,
    fieldInfo: fieldInfo,
    idx: 0,
    minHeight: minHeight,
    disabled: interactionDisabled,
    hideText: true,
    highlightColor: highlightColor
  }), ids.map(function (id, idx) {
    return /*#__PURE__*/React.createElement(_.Block, {
      key: id,
      id: id,
      parentId: parentId,
      fieldInfo: fieldInfo,
      idx: idx,
      bounded: true,
      highlightColor: highlightColor,
      after: /*#__PURE__*/React.createElement(_DropRegion.DropRegion, {
        key: "dropzone-".concat(idx),
        id: null,
        parentId: parentId,
        fieldInfo: fieldInfo,
        idx: idx + 1,
        minHeight: 8,
        hideText: true,
        disabled: interactionDisabled,
        highlightColor: highlightColor
      })
    });
  }));
};

exports.List = List;