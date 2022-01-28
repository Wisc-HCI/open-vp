"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualBlock = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = require("react");

var _DropZone = require("./DropZone");

var _List = require("./List");

var _Constants = require("../Constants");

var _fi = require("react-icons/fi");

var _grommet = require("grommet");

var _ProgrammingContext = require("../ProgrammingContext");

var _ExtraBar = require("./ExtraBar");

var _Selectable = require("./Selectable");

var VisualBlock = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _data$refData, _data$refData2, _Object$entries;

  var data = _ref.data,
      x = _ref.x,
      y = _ref.y,
      scale = _ref.scale,
      typeSpec = _ref.typeSpec,
      onCanvas = _ref.onCanvas,
      interactionDisabled = _ref.interactionDisabled,
      bounded = _ref.bounded,
      highlightColor = _ref.highlightColor;
  var blockSpec = data.dataType === _Constants.DATA_TYPES.REFERENCE ? typeSpec.referenceBlock : data.dataType === _Constants.DATA_TYPES.CALL ? typeSpec.callBlock : typeSpec.instanceBlock;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isCollapsed = _useState2[0],
      setIsCollapsed = _useState2[1];

  var updateItemName = (0, _ProgrammingContext.useProgrammingStore)(function (store) {
    return store.updateItemName;
  });
  var setIsEditing = (0, _ProgrammingContext.useProgrammingStore)(function (store) {
    return store.updateItemEditing;
  }); // const setIsSelected = useProgrammingStore(store=>store.updateItemSelected);

  var Icon = blockSpec.icon ? blockSpec.icon : _fi.FiSquare;
  var name = [_Constants.DATA_TYPES.CALL, _Constants.DATA_TYPES.REFERENCE].includes(data.dataType) ? data.refData.name : data.name;
  return /*#__PURE__*/React.createElement(_Selectable.Selectable, {
    selected: data.selected,
    highlightColor: highlightColor,
    className: onCanvas && blockSpec.onCanvas ? null : "nodrag",
    ref: ref,
    style: {
      minWidth: 175,
      width: bounded ? "inherit" : "max-content",
      backgroundColor: blockSpec.color,
      borderRadius: 3,
      padding: 4,
      flex: bounded ? 1 : null,
      transform: "translate(".concat(x ? x : 0, "px, ").concat(y ? y : 0, "px) scale(").concat(scale ? scale : 1, ")"),
      WebkitTransform: "translate(".concat(x ? x : 0, "px, ").concat(y ? y : 0, "px) scale(").concat(scale ? scale : 1, ")")
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      margin: 4,
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(_grommet.TextInput, {
    size: "small",
    icon: /*#__PURE__*/React.createElement(Icon, null),
    value: name,
    focusIndicator: false,
    disabled: interactionDisabled || !data.editing,
    onChange: function onChange(e) {
      return updateItemName(data.id, e.target.value);
    }
  }), (blockSpec === null || blockSpec === void 0 ? void 0 : blockSpec.extras) && /*#__PURE__*/React.createElement(_ExtraBar.ExtraBar, {
    interactionDisabled: interactionDisabled,
    data: data,
    blockSpec: blockSpec,
    isEditing: data.editing,
    isCollapsed: isCollapsed,
    setIsEditing: setIsEditing,
    setIsCollapsed: setIsCollapsed
  })), data.dataType === _Constants.DATA_TYPES.INSTANCE && typeSpec.type === _Constants.TYPES.FUNCTION && /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 4,
      width: 'inherit',
      margin: 4,
      padding: 5,
      backgroundColor: "rgba(0,0,0,0.2)"
    }
  }), ((_data$refData = data.refData) === null || _data$refData === void 0 ? void 0 : _data$refData.arguments) && Object.entries((_data$refData2 = data.refData) === null || _data$refData2 === void 0 ? void 0 : _data$refData2.arguments).map(function (_ref2) {
    var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
        argKey = _ref3[0],
        argInfo = _ref3[1];

    return /*#__PURE__*/React.createElement(_DropZone.DropZone, {
      key: argKey,
      id: data.properties[argKey],
      fieldInfo: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, argInfo), {}, {
        value: argKey
      }),
      parentId: data.id,
      interactionDisabled: interactionDisabled,
      highlightColor: highlightColor
    });
  }), data.dataType === _Constants.DATA_TYPES.INSTANCE && ((_Object$entries = Object.entries(typeSpec.properties)) === null || _Object$entries === void 0 ? void 0 : _Object$entries.map(function (_ref4) {
    var _ref5 = (0, _slicedToArray2.default)(_ref4, 2),
        fieldKey = _ref5[0],
        fieldInfo = _ref5[1];

    if (fieldInfo.isList) {
      return /*#__PURE__*/React.createElement(_List.List, {
        key: fieldKey,
        ids: data.properties[fieldKey],
        fieldInfo: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, fieldInfo), {}, {
          value: fieldKey
        }),
        parentId: data.id,
        interactionDisabled: interactionDisabled,
        highlightColor: highlightColor
      });
    } else {
      return /*#__PURE__*/React.createElement(_DropZone.DropZone, {
        key: fieldKey,
        id: data.properties[fieldKey],
        fieldInfo: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, fieldInfo), {}, {
          value: fieldKey
        }),
        parentId: data.id,
        interactionDisabled: interactionDisabled,
        highlightColor: highlightColor
      });
    }
  })), false && /*#__PURE__*/React.createElement("p", {
    style: {
      whiteSpace: "pre"
    }
  }, JSON.stringify(data, null, "\t")));
});
exports.VisualBlock = VisualBlock;