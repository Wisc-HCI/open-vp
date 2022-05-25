"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = void 0;

var _react = _interopRequireDefault(require("react"));

var _ = require(".");

var _DropRegion = require("./DropRegion");

var List = function List(_ref) {
  var ids = _ref.ids,
      parentId = _ref.parentId,
      fieldInfo = _ref.fieldInfo,
      interactionDisabled = _ref.interactionDisabled,
      highlightColor = _ref.highlightColor,
      context = _ref.context;
  // const setField = useStore((store) => store.setField);
  var minHeight = ids.length === 0 ? 30 : 8;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "nodrag",
    style: {
      padding: 4,
      backgroundColor: "#00000088",
      borderRadius: 3,
      minHeight: 30,
      minWidth: 100,
      margin: 4,
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_DropRegion.DropRegion, {
    key: "initial",
    id: null,
    parentId: parentId,
    fieldInfo: fieldInfo,
    idx: 0,
    minHeight: minHeight,
    disabled: interactionDisabled,
    hideText: true,
    highlightColor: highlightColor,
    context: context
  }), ids.map(function (id, idx) {
    return /*#__PURE__*/_react.default.createElement(_.Block, {
      key: id,
      id: id,
      parentId: parentId,
      fieldInfo: fieldInfo,
      idx: idx,
      bounded: true,
      highlightColor: highlightColor,
      context: context,
      after: /*#__PURE__*/_react.default.createElement(_DropRegion.DropRegion, {
        key: "dropzone-".concat(idx),
        id: null,
        parentId: parentId,
        fieldInfo: fieldInfo,
        idx: idx + 1,
        minHeight: 8,
        hideText: true,
        showBuffer: true,
        disabled: interactionDisabled,
        highlightColor: highlightColor,
        context: context
      })
    });
  }));
};

exports.List = List;