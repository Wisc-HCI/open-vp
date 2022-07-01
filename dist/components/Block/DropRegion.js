"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropRegion = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ProgrammingContext = require("../ProgrammingContext");

var _reactDnd = require("react-dnd");

var _index = require("./index");

var _lodash = require("lodash");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
      _useDrop2 = _slicedToArray(_useDrop, 2),
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
    style: {
      marginTop: 4,
      marginBottom: 4
    },
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