"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropRegion = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _ProgrammingContext = require("../ProgrammingContext");

var _reactDnd = require("react-dnd");

var _index = require("./index");

var _lodash = require("lodash");

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
      highlightColor = _ref.highlightColor,
      context = _ref.context,
      showBuffer = _ref.showBuffer;
  var transferBlock = (0, _ProgrammingContext.useProgrammingStore)(transferBlockSelector);
  var data = (0, _ProgrammingContext.useProgrammingStore)((0, _react.useCallback)(function (store) {
    return store.programData[id];
  }, [id]));

  var _useDrop = (0, _reactDnd.useDrop)(function () {
    return {
      accept: fieldInfo.accepts,
      drop: function drop(item, _) {
        // console.log(item)
        transferBlock(item.data, item, {
          fieldInfo: fieldInfo,
          parentId: parentId,
          idx: idx
        });
      },
      canDrop: function canDrop(item) {
        return !disabled && !item.onCanvas && (0, _lodash.isEqual)((0, _lodash.intersection)(context, item.context), item.context);
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

  var validDropType = fieldInfo.accepts.includes((_dropProps$item = dropProps.item) === null || _dropProps$item === void 0 ? void 0 : (_dropProps$item$data = _dropProps$item.data) === null || _dropProps$item$data === void 0 ? void 0 : _dropProps$item$data.type) && !((_dropProps$item2 = dropProps.item) !== null && _dropProps$item2 !== void 0 && _dropProps$item2.onCanvas) && (0, _lodash.isEqual)((0, _lodash.intersection)(context, dropProps.item.context), dropProps.item.context); // console.log({validDropType,disabled})

  var renderedData = data ? data : dropProps.item && validDropType && !disabled && dropProps.isOver ? dropProps.item.data : null;
  var isPreview = renderedData && renderedData !== data;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "nodrag",
    ref: drop,
    style: {
      borderRadius: 4,
      backgroundColor: dropProps.isOver && validDropType ? "#44884488" : validDropType ? "#88888888" : null,
      minHeight: minHeight,
      minWidth: 100,
      display: 'flex',
      flex: 1
    }
  }, renderedData && !isPreview ? /*#__PURE__*/_react.default.createElement(_index.Block, {
    staticData: renderedData,
    idx: idx,
    parentId: parentId,
    fieldInfo: fieldInfo,
    bounded: true,
    highlightColor: highlightColor,
    context: context
  }) : renderedData ? /*#__PURE__*/_react.default.createElement(_index.PreviewBlock, {
    staticData: renderedData,
    idx: idx,
    parentId: parentId,
    fieldInfo: fieldInfo,
    bounded: true,
    highlightColor: highlightColor,
    context: context,
    style: {
      marginBottom: showBuffer ? minHeight : null,
      marginTop: showBuffer ? minHeight : null
    }
  }) : hideText ? null : fieldInfo.name);
};

exports.DropRegion = DropRegion;