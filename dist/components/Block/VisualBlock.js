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

var _ = require(".");

var _lodash = require("lodash");

var _ExpandCarrot = require("./ExpandCarrot");

var _Input = require("./Input");

var VisualBlock = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _data$refData, _Object$entries;

  var data = _ref.data,
      x = _ref.x,
      y = _ref.y,
      scale = _ref.scale,
      typeSpec = _ref.typeSpec,
      onCanvas = _ref.onCanvas,
      interactionDisabled = _ref.interactionDisabled,
      bounded = _ref.bounded,
      highlightColor = _ref.highlightColor,
      context = _ref.context,
      fieldInfo = _ref.fieldInfo,
      parentId = _ref.parentId,
      style = _ref.style;
  var blockSpec = data.dataType === _Constants.DATA_TYPES.REFERENCE ? typeSpec.referenceBlock : data.dataType === _Constants.DATA_TYPES.CALL ? typeSpec.callBlock : typeSpec.instanceBlock;
  var blockStyle = style ? style : {};

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isCollapsed = _useState2[0],
      setIsCollapsed = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isDebugging = _useState4[0],
      setIsDebugging = _useState4[1];

  var _useState5 = (0, _react.useState)(true),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      simplePropertiesCollapsed = _useState6[0],
      setSimplePropertiesCollapsed = _useState6[1];

  var updateItemName = (0, _ProgrammingContext.useProgrammingStore)(function (store) {
    return store.updateItemName;
  });

  var _setIsEditing = (0, _ProgrammingContext.useProgrammingStore)(function (store) {
    return store.updateItemEditing;
  });

  var _setIsSelected = (0, _ProgrammingContext.useProgrammingStore)(function (store) {
    return store.updateItemSelected;
  });

  var updateItemSimpleProperty = (0, _ProgrammingContext.useProgrammingStore)(function (store) {
    return store.updateItemSimpleProperty;
  });
  var simpleProperties = typeSpec.properties ? (0, _lodash.pickBy)(typeSpec.properties, function (entry) {
    return Object.values(_Constants.SIMPLE_PROPERTY_TYPES).includes(entry.type);
  }) : {};
  var standardProperties = typeSpec.properties ? (0, _lodash.omitBy)(typeSpec.properties, function (entry) {
    return Object.values(_Constants.SIMPLE_PROPERTY_TYPES).includes(entry.type);
  }) : {};
  var Icon = blockSpec.icon ? blockSpec.icon : _fi.FiSquare;
  var name = [_Constants.DATA_TYPES.CALL, _Constants.DATA_TYPES.REFERENCE].includes(data.dataType) ? data === null || data === void 0 ? void 0 : (_data$refData = data.refData) === null || _data$refData === void 0 ? void 0 : _data$refData.name : data === null || data === void 0 ? void 0 : data.name;
  return /*#__PURE__*/React.createElement(_Selectable.Selectable, {
    selected: data.selected,
    highlightColor: highlightColor,
    className: onCanvas && blockSpec.onCanvas ? null : "nodrag",
    ref: ref,
    style: (0, _objectSpread2.default)({
      minWidth: 175,
      width: bounded ? "inherit" : "max-content",
      backgroundColor: blockSpec.color,
      borderRadius: 3,
      padding: 4,
      flex: bounded ? 1 : null,
      transform: "translate(".concat(x ? x : 0, "px, ").concat(y ? y : 0, "px) scale(").concat(scale ? scale : 1, ")"),
      WebkitTransform: "translate(".concat(x ? x : 0, "px, ").concat(y ? y : 0, "px) scale(").concat(scale ? scale : 1, ")")
    }, blockStyle)
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
    fieldInfo: fieldInfo,
    parentId: parentId,
    interactionDisabled: interactionDisabled,
    data: data,
    blockSpec: blockSpec,
    isEditing: data.editing,
    isCollapsed: isCollapsed,
    isSelected: data.selected,
    isDebugging: isDebugging,
    setIsEditing: function setIsEditing(v) {
      return _setIsEditing(data.id, v);
    },
    setIsSelected: function setIsSelected(v) {
      return _setIsSelected(data.id, v);
    },
    setIsCollapsed: setIsCollapsed,
    setIsDebugging: setIsDebugging
  })), !isCollapsed && /*#__PURE__*/React.createElement(_grommet.Box, {
    animation: ['fadeIn', 'zoomIn']
  }, data.dataType === _Constants.DATA_TYPES.INSTANCE && typeSpec.type === _Constants.TYPES.FUNCTION && data.arguments && Object.keys(data.arguments).length && /*#__PURE__*/React.createElement(_grommet.Box, {
    gap: "xsmall",
    direction: "column",
    style: {
      borderRadius: 4,
      display: 'flex',
      margin: 4,
      padding: 5,
      backgroundColor: "rgba(0,0,0,0.2)"
    }
  }, data.argumentBlockData.map(function (argBlockData, argIdx) {
    return /*#__PURE__*/React.createElement(_.Block, {
      key: argIdx,
      staticData: argBlockData,
      parentId: data.id,
      bounded: true,
      highlightColor: highlightColor,
      context: context,
      fieldInfo: {
        name: '',
        value: null,
        accepts: [],
        isSpawner: true
      }
    });
  })), Object.keys(simpleProperties).length > 0 && data.dataType === _Constants.DATA_TYPES.INSTANCE && /*#__PURE__*/React.createElement(_grommet.Box, {
    margin: "xsmall",
    background: "#ffffff50",
    round: "xxsmall",
    align: "center",
    justify: "between",
    direction: "column",
    pad: "xsmall",
    flex: true
  }, /*#__PURE__*/React.createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    justify: "between",
    flex: true,
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(_grommet.Text, {
    margin: {
      left: 'medium'
    }
  }, "Settings"), /*#__PURE__*/React.createElement(_grommet.Button, {
    plain: true,
    style: {
      padding: '5pt 10pt 5pt 10pt'
    },
    icon: /*#__PURE__*/React.createElement(_ExpandCarrot.ExpandCarrot, {
      expanded: !simplePropertiesCollapsed
    }),
    onClick: interactionDisabled ? null : function () {
      return setSimplePropertiesCollapsed(!simplePropertiesCollapsed);
    }
  })), !simplePropertiesCollapsed && /*#__PURE__*/React.createElement(_grommet.Box, {
    flex: true,
    animation: ["fadeIn", "slideDown"],
    style: {
      width: '100%'
    }
  }, Object.entries(simpleProperties).map(function (_ref2) {
    var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
        propKey = _ref3[0],
        propInfo = _ref3[1];

    return /*#__PURE__*/React.createElement(_grommet.Box, {
      key: propKey,
      direction: "row",
      background: "#ffffff50",
      round: "xsmall",
      flex: true,
      pad: "small",
      justify: "between",
      align: "center",
      margin: {
        bottom: 'xsmall'
      }
    }, /*#__PURE__*/React.createElement(_grommet.Text, {
      size: "small",
      color: "#00000088"
    }, propInfo.name), propInfo.type === _Constants.SIMPLE_PROPERTY_TYPES.BOOLEAN && /*#__PURE__*/React.createElement(_grommet.CheckBox, {
      size: "small",
      focusIndicator: false,
      disabled: interactionDisabled,
      checked: data.properties[propKey],
      onChange: function onChange() {
        return updateItemSimpleProperty(data.id, propKey, !data.properties[propKey]);
      }
    }), propInfo.type === _Constants.SIMPLE_PROPERTY_TYPES.NUMBER && /*#__PURE__*/React.createElement(_grommet.Box, {
      width: "xsmall"
    }, /*#__PURE__*/React.createElement(_Input.NumberInput, {
      size: "xsmall",
      style: {
        color: '#00000088'
      },
      min: propInfo.min !== undefined ? propInfo.min : 0,
      max: propInfo.max !== undefined ? propInfo.max : 10,
      value: data.properties[propKey],
      disabled: interactionDisabled,
      onChange: function onChange(value) {
        return updateItemSimpleProperty(data.id, propKey, value);
      }
    })), propInfo.type === _Constants.SIMPLE_PROPERTY_TYPES.STRING && /*#__PURE__*/React.createElement(_grommet.Box, {
      width: "xsmall"
    }, /*#__PURE__*/React.createElement(_grommet.TextInput, {
      size: "xsmall",
      textAlign: "center",
      style: {
        color: '#00000088'
      },
      value: data.properties[propKey],
      disabled: interactionDisabled,
      onChange: function onChange(e) {
        return updateItemSimpleProperty(data.id, propKey, e.target.value);
      }
    })), propInfo.type === _Constants.SIMPLE_PROPERTY_TYPES.OPTIONS && /*#__PURE__*/React.createElement(_grommet.RadioButtonGroup, {
      name: propInfo.name,
      disabled: interactionDisabled,
      size: "xsmall",
      style: {
        color: '#00000088',
        fontSize: 13
      },
      options: propInfo.options,
      value: data.properties[propKey],
      onChange: function onChange(e) {
        return updateItemSimpleProperty(data.id, propKey, e.target.value);
      }
    }));
  }))), data.dataType === _Constants.DATA_TYPES.CALL && data.argumentBlockData.map(function (argInfo, argIdx) {
    return /*#__PURE__*/React.createElement(_grommet.Box, {
      key: argIdx,
      direction: "row",
      margin: "xsmall",
      background: "#ffffff20",
      round: "xxsmall",
      alignContent: "between",
      align: "center",
      justify: "between",
      flex: true
    }, /*#__PURE__*/React.createElement(_grommet.Box, {
      pad: "xsmall",
      alignContent: "center",
      align: "center"
    }, argInfo.name), /*#__PURE__*/React.createElement(_DropZone.DropZone, {
      id: data.properties[argInfo.ref],
      fieldInfo: {
        name: '',
        value: argInfo.ref,
        accepts: [argInfo.type]
      },
      parentId: data.id,
      interactionDisabled: interactionDisabled,
      highlightColor: highlightColor,
      context: context
    }));
  }), data.dataType === _Constants.DATA_TYPES.INSTANCE && ((_Object$entries = Object.entries(standardProperties)) === null || _Object$entries === void 0 ? void 0 : _Object$entries.map(function (_ref4) {
    var _ref5 = (0, _slicedToArray2.default)(_ref4, 2),
        fieldKey = _ref5[0],
        fieldInfo = _ref5[1];

    var innerLabel = !fieldInfo.fullWidth ? fieldInfo.name : '';
    return /*#__PURE__*/React.createElement(_grommet.Box, {
      key: fieldKey,
      direction: "row",
      margin: fieldInfo.fullWidth ? 'none' : 'xsmall',
      background: fieldInfo.fullWidth ? null : '#ffffff20',
      round: "xxsmall",
      alignContent: "between",
      align: "center",
      justify: "between",
      flex: true
    }, /*#__PURE__*/React.createElement(_grommet.Box, {
      pad: fieldInfo.fullWidth ? 'none' : 'xsmall',
      alignContent: "center",
      align: "center"
    }, innerLabel), fieldInfo.isList ? /*#__PURE__*/React.createElement(_List.List, {
      ids: data.properties[fieldKey],
      fieldInfo: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, fieldInfo), {}, {
        value: fieldKey
      }),
      parentId: data.id,
      interactionDisabled: interactionDisabled,
      highlightColor: highlightColor,
      context: context
    }) : /*#__PURE__*/React.createElement(_DropZone.DropZone, {
      id: data.properties[fieldKey],
      fieldInfo: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, fieldInfo), {}, {
        value: fieldKey,
        name: !fieldInfo.fullWidth ? '' : fieldInfo.name
      }),
      parentId: data.id,
      interactionDisabled: interactionDisabled,
      highlightColor: highlightColor,
      context: context
    }));
  }))), isDebugging && /*#__PURE__*/React.createElement(_grommet.Box, {
    round: "small",
    pad: "small",
    background: "#00000044",
    style: {
      whiteSpace: "pre",
      color: 'white',
      fontFamily: 'monospace'
    }
  }, JSON.stringify(data, null, "  ")));
});
exports.VisualBlock = VisualBlock;