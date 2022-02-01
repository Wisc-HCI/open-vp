"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropRegion = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _ProgrammingContext = require("../ProgrammingContext");

var _reactDnd = require("react-dnd");

var _index = require("./index");

var _react = require("react");

var transferBlockSelector = function transferBlockSelector(state) {
  return state.transferBlock;
};

var DropRegion = function DropRegion(_ref) {
  var _dropProps$item, _dropProps$item$data, _dropProps$item2;

  var id = _ref.id,
      parentId = _ref.parentId,
      fieldInfo = _ref.fieldInfo,
      idx = _ref.idx,
      minHeight = _ref.minHeight,
      hideText = _ref.hideText,
      disabled = _ref.disabled,
      highlightColor = _ref.highlightColor;
  var transferBlock = (0, _ProgrammingContext.useProgrammingStore)(transferBlockSelector);
  var data = (0, _ProgrammingContext.useProgrammingStore)((0, _react.useCallback)(function (store) {
    return store.programData[id];
  }, [id]));

  var _useDrop = (0, _reactDnd.useDrop)(function () {
    return {
      accept: fieldInfo.accepts,
      drop: function drop(item, _) {
        transferBlock(item.data, item, {
          fieldInfo: fieldInfo,
          parentId: parentId,
          idx: idx
        });
      },
      canDrop: function canDrop(item) {
        return !disabled && !item.onCanvas;
      },
      collect: function collect(monitor) {
        return {
          isOver: monitor.isOver(),
          item: monitor.getItem()
        };
      }
    };
  }, [fieldInfo, parentId, idx, disabled]),
      _useDrop2 = (0, _slicedToArray2.default)(_useDrop, 2),
      dropProps = _useDrop2[0],
      drop = _useDrop2[1];

  var validDropType = fieldInfo.accepts.includes((_dropProps$item = dropProps.item) === null || _dropProps$item === void 0 ? void 0 : (_dropProps$item$data = _dropProps$item.data) === null || _dropProps$item$data === void 0 ? void 0 : _dropProps$item$data.type) && !((_dropProps$item2 = dropProps.item) !== null && _dropProps$item2 !== void 0 && _dropProps$item2.onCanvas);
  var renderedData = data ? data : dropProps.item && validDropType && !disabled && dropProps.isOver ? dropProps.item.data : null;
  var isPreview = renderedData && renderedData !== data;
  return /*#__PURE__*/React.createElement("div", {
    className: "nodrag",
    ref: drop,
    style: {
      borderRadius: 4,
      backgroundColor: dropProps.isOver && validDropType ? "#44884488" : validDropType ? "#88888888" : null,
      minHeight: minHeight,
      minWidth: 190,
      display: 'flex',
      flex: 1
    }
  }, renderedData && !isPreview ? /*#__PURE__*/React.createElement(_index.Block, {
    staticData: renderedData,
    idx: idx,
    parentId: parentId,
    fieldInfo: fieldInfo,
    bounded: true,
    highlightColor: highlightColor
  }) : renderedData ? /*#__PURE__*/React.createElement(_index.PreviewBlock, {
    staticData: renderedData,
    idx: idx,
    parentId: parentId,
    fieldInfo: fieldInfo,
    bounded: true,
    highlightColor: highlightColor
  }) : hideText ? null : fieldInfo.name);
};

exports.DropRegion = DropRegion;