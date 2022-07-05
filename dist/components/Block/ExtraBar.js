"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RightClickMenu = exports.ExtraBar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _fi = require("react-icons/fi");

var _ProgrammingContext = require("../ProgrammingContext");

var _ = require("..");

var _ExpandCarrot = require("./ExpandCarrot");

var _Utility = require("./Utility");

var _ButtonGroup = _interopRequireDefault(require("@mui/material/ButtonGroup"));

var _Button = _interopRequireDefault(require("@mui/material/Button"));

var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));

var _ListItemIcon = _interopRequireDefault(require("@mui/material/ListItemIcon"));

var _ListItemText = _interopRequireDefault(require("@mui/material/ListItemText"));

var _Divider = _interopRequireDefault(require("@mui/material/Divider"));

var _Chip = _interopRequireDefault(require("@mui/material/Chip"));

var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));

var _MenuList = _interopRequireDefault(require("@mui/material/MenuList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FunctionButtonExtra = function FunctionButtonExtra(_ref) {
  var actionInfo = _ref.actionInfo,
      data = _ref.data,
      blockSpec = _ref.blockSpec,
      inTopLevel = _ref.inTopLevel,
      interactionDisabled = _ref.interactionDisabled;

  var _onClick = (0, _ProgrammingContext.useProgrammingStore)((0, _react.useCallback)(function (state) {
    if (typeof actionInfo.onClick === "function") {
      return actionInfo.onClick;
    } else {
      return state[actionInfo.onClick];
    }
  }, [actionInfo]));

  var ExtraActionIcon = actionInfo.icon ? actionInfo.icon : _fi.FiCircle;
  return inTopLevel ? /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    disabled: interactionDisabled,
    onClick: function onClick() {
      return _onClick(data, blockSpec);
    }
  }, /*#__PURE__*/_react.default.createElement(ExtraActionIcon, null)) : /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    disabled: interactionDisabled,
    onClick: _onClick
  }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, /*#__PURE__*/_react.default.createElement(ExtraActionIcon, null)), /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primaryTypographyProps: {
      color: interactionDisabled ? "text.secondary" : "text.primary"
    }
  }, actionInfo.label));
};

var LabelExtra = function LabelExtra(_ref2) {
  var inTopLevel = _ref2.inTopLevel,
      label = _ref2.label;
  return inTopLevel ? /*#__PURE__*/_react.default.createElement(_Button.default, {
    disabled: true
  }, label) :
  /*#__PURE__*/
  // <Divider style={{fontFamily:'Helvetica'}}>{label}</Divider>
  _react.default.createElement(_ListItemText.default, {
    primaryTypographyProps: {
      color: "text.secondary"
    },
    style: {
      marginLeft: 10,
      opacity: 0.5
    }
  }, label);
};

var LockIndicatorExtra = function LockIndicatorExtra(_ref3) {
  var locked = _ref3.locked,
      inTopLevel = _ref3.inTopLevel;
  var Icon = locked ? _fi.FiLock : _fi.FiUnlock;
  return inTopLevel ? /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    disableFocusRipple: true,
    disableTouchRipple: true
  }, /*#__PURE__*/_react.default.createElement(Icon, null)) : /*#__PURE__*/_react.default.createElement(_MenuItem.default, null, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, /*#__PURE__*/_react.default.createElement(Icon, null)), /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primaryTypographyProps: {
      color: "text.secondary"
    }
  }, locked ? "Locked" : "Unlocked"));
};

var NameEditToggleExtra = function NameEditToggleExtra(_ref4) {
  var isEditing = _ref4.isEditing,
      setIsEditing = _ref4.setIsEditing,
      locked = _ref4.locked,
      interactionDisabled = _ref4.interactionDisabled,
      inTopLevel = _ref4.inTopLevel,
      data = _ref4.data;
  var Icon = isEditing ? _fi.FiSave : _fi.FiEdit3;
  var disabled = locked || interactionDisabled && data.dataType !== _.DATA_TYPES.REFERENCE;
  return inTopLevel ? /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    disabled: disabled,
    onClick: function onClick() {
      return setIsEditing(!isEditing);
    }
  }, /*#__PURE__*/_react.default.createElement(Icon, null)) : /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: function onClick() {
      return setIsEditing(!isEditing);
    }
  }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, /*#__PURE__*/_react.default.createElement(Icon, null)), /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primaryTypographyProps: {
      color: disabled ? "text.secondary" : "text.primary"
    }
  }, isEditing ? "Save" : "Edit Name"));
};

var SelectionToggleExtra = function SelectionToggleExtra(_ref5) {
  var isSelected = _ref5.isSelected,
      setIsSelected = _ref5.setIsSelected,
      inTopLevel = _ref5.inTopLevel,
      data = _ref5.data,
      locked = _ref5.locked;
  var Icon = isSelected ? _fi.FiEyeOff : _fi.FiEye;
  var disabled = data.dataType === _.DATA_TYPES.INSTANCE && locked;
  return inTopLevel ? /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    disabled: disabled,
    onClick: function onClick() {
      return setIsSelected(!isSelected);
    }
  }, /*#__PURE__*/_react.default.createElement(Icon, null)) : /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: function onClick() {
      return setIsSelected(!isSelected);
    }
  }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, /*#__PURE__*/_react.default.createElement(Icon, null)), /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primaryTypographyProps: {
      color: disabled ? "text.secondary" : "text.primary"
    }
  }, isSelected ? "Deselect" : "Select"));
};

var CollapseToggleExtra = function CollapseToggleExtra(_ref6) {
  var isCollapsed = _ref6.isCollapsed,
      setIsCollapsed = _ref6.setIsCollapsed,
      inTopLevel = _ref6.inTopLevel;
  return inTopLevel ? /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    onClick: function onClick() {
      return setIsCollapsed(!isCollapsed);
    }
  }, /*#__PURE__*/_react.default.createElement(_ExpandCarrot.ExpandCarrot, {
    expanded: !isCollapsed
  })) : /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: function onClick() {
      return setIsCollapsed(!isCollapsed);
    }
  }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, /*#__PURE__*/_react.default.createElement(_ExpandCarrot.ExpandCarrot, {
    expanded: !isCollapsed
  })), /*#__PURE__*/_react.default.createElement(_ListItemText.default, null, isCollapsed ? "Expand" : "Collapse"));
};

var DebugToggleExtra = function DebugToggleExtra(_ref7) {
  var isDebugging = _ref7.isDebugging,
      setIsDebugging = _ref7.setIsDebugging,
      inTopLevel = _ref7.inTopLevel;
  var Icon = isDebugging ? _fi.FiZapOff : _fi.FiZap;
  return inTopLevel ? /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    onClick: function onClick() {
      return setIsDebugging(!isDebugging);
    }
  }, /*#__PURE__*/_react.default.createElement(Icon, null)) : /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: function onClick() {
      return setIsDebugging(!isDebugging);
    }
  }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, /*#__PURE__*/_react.default.createElement(Icon, null)), /*#__PURE__*/_react.default.createElement(_ListItemText.default, null, isDebugging ? "Cancel Debug" : "Debug"));
};

var IndicatorTextExtra = function IndicatorTextExtra(_ref8) {
  var value = _ref8.value,
      label = _ref8.label,
      inTopLevel = _ref8.inTopLevel;
  return inTopLevel ? /*#__PURE__*/_react.default.createElement(_IconButton.default, null, /*#__PURE__*/_react.default.createElement(_Chip.default, {
    size: "small",
    label: value
  })) : /*#__PURE__*/_react.default.createElement(_MenuItem.default, null, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, /*#__PURE__*/_react.default.createElement(_Chip.default, {
    size: "small",
    label: value
  })), /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primaryTypographyProps: {
      color: 'text.secondary'
    }
  }, label));
};

var IndicatorIconExtra = function IndicatorIconExtra(_ref9) {
  var value = _ref9.value,
      label = _ref9.label,
      inTopLevel = _ref9.inTopLevel;
  return inTopLevel ? /*#__PURE__*/_react.default.createElement(_IconButton.default, null, value) : /*#__PURE__*/_react.default.createElement(_MenuItem.default, null, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, value), /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primaryTypographyProps: {
      color: 'text.secondary'
    }
  }, label));
};

var AddArgumentExtra = function AddArgumentExtra(_ref10) {
  var _typeSpec$referenceBl;

  var data = _ref10.data,
      argumentType = _ref10.argumentType,
      interactionDisabled = _ref10.interactionDisabled,
      inTopLevel = _ref10.inTopLevel,
      highlightColor = _ref10.highlightColor,
      menuType = _ref10.menuType;
  var typeSpec = (0, _ProgrammingContext.useProgrammingStore)((0, _react.useCallback)(function (store) {
    return store.programSpec.objectTypes[argumentType];
  }, [argumentType]));
  var Icon = typeSpec !== null && typeSpec !== void 0 && (_typeSpec$referenceBl = typeSpec.referenceBlock) !== null && _typeSpec$referenceBl !== void 0 && _typeSpec$referenceBl.icon ? typeSpec.referenceBlock.icon : _fi.FiPlus;
  var addArgument = (0, _ProgrammingContext.useProgrammingStore)(function (store) {
    return store.addArgument;
  });
  return inTopLevel ? /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    disabled: interactionDisabled,
    onClick: function onClick() {
      return addArgument(data.id, argumentType);
    }
  }, /*#__PURE__*/_react.default.createElement(Icon, null)) : /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    disabled: interactionDisabled,
    onClick: function onClick() {
      return addArgument(data.id, argumentType);
    }
  }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, /*#__PURE__*/_react.default.createElement(Icon, null)), /*#__PURE__*/_react.default.createElement(_ListItemText.default, null, "Add ".concat(typeSpec.name, " Argument")));
};

var AddArgumentGroupExtra = function AddArgumentGroupExtra(_ref11) {
  var data = _ref11.data,
      allowed = _ref11.allowed,
      interactionDisabled = _ref11.interactionDisabled,
      inTopLevel = _ref11.inTopLevel,
      highlightColor = _ref11.highlightColor,
      menuType = _ref11.menuType;
  return /*#__PURE__*/_react.default.createElement(DropdownExtra, {
    icon: _fi.FiPlus,
    label: "Add Argument",
    contents: allowed.map(function (argumentType) {
      return {
        type: _.EXTRA_TYPES.ADD_ARGUMENT,
        argumentType: argumentType
      };
    }),
    inTopLevel: inTopLevel,
    data: data,
    interactionDisabled: interactionDisabled,
    highlightColor: highlightColor,
    menuType: menuType
  });
};

var DeleteExtra = function DeleteExtra(_ref12) {
  var _data$refData;

  var data = _ref12.data,
      inTopLevel = _ref12.inTopLevel,
      locked = _ref12.locked,
      fieldInfo = _ref12.fieldInfo,
      parentId = _ref12.parentId,
      highlightColor = _ref12.highlightColor,
      menuType = _ref12.menuType;
  var deleteFunc = (0, _ProgrammingContext.useProgrammingStore)(function (state) {
    return state.deleteBlock;
  });
  var canDeleteInstance = parentId === "spawner" && data.dataType === _.DATA_TYPES.REFERENCE && ((_data$refData = data.refData) === null || _data$refData === void 0 ? void 0 : _data$refData.canDelete);
  var canDelete = !locked && data.canDelete || canDeleteInstance;
  return inTopLevel ? /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    disabled: !canDelete,
    onClick: function onClick() {
      return deleteFunc(data, parentId, fieldInfo);
    }
  }, /*#__PURE__*/_react.default.createElement(_fi.FiTrash2, null)) : /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    disabled: !canDelete,
    onClick: function onClick() {
      return deleteFunc(data, parentId, fieldInfo);
    }
  }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, /*#__PURE__*/_react.default.createElement(_fi.FiTrash2, null)), /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primary: "Delete"
  }));
};

var DropdownExtra = function DropdownExtra(_ref13) {
  var icon = _ref13.icon,
      contents = _ref13.contents,
      _ref13$label = _ref13.label,
      label = _ref13$label === void 0 ? "More Options" : _ref13$label,
      inTopLevel = _ref13.inTopLevel,
      data = _ref13.data,
      blockSpec = _ref13.blockSpec,
      isEditing = _ref13.isEditing,
      isCollapsed = _ref13.isCollapsed,
      isSelected = _ref13.isSelected,
      isDebugging = _ref13.isDebugging,
      setIsEditing = _ref13.setIsEditing,
      setIsCollapsed = _ref13.setIsCollapsed,
      setIsSelected = _ref13.setIsSelected,
      setIsDebugging = _ref13.setIsDebugging,
      interactionDisabled = _ref13.interactionDisabled,
      parentId = _ref13.parentId,
      fieldInfo = _ref13.fieldInfo,
      highlightColor = _ref13.highlightColor;
  var DropIcon = icon ? icon : inTopLevel ? _fi.FiMoreHorizontal : _fi.FiChevronRight;
  var childProps = {
    data: data,
    blockSpec: blockSpec,
    highlightColor: highlightColor,
    isEditing: isEditing,
    setIsEditing: setIsEditing,
    isCollapsed: isCollapsed,
    setIsCollapsed: setIsCollapsed,
    isSelected: isSelected,
    setIsSelected: setIsSelected,
    isDebugging: isDebugging,
    setIsDebugging: setIsDebugging,
    interactionDisabled: interactionDisabled,
    fieldInfo: fieldInfo,
    parentId: parentId,
    inTopLevel: false
  };
  return /*#__PURE__*/_react.default.createElement(_Utility.DropdownTrigger, {
    isChild: !inTopLevel,
    triggerComponent: inTopLevel ? _IconButton.default : _MenuItem.default,
    triggerProps: inTopLevel ? {
      onClick: function onClick() {
        return setIsEditing(!isEditing);
      },
      children: /*#__PURE__*/_react.default.createElement(DropIcon, null)
    } : {
      onClick: function onClick() {
        return setIsEditing(!isEditing);
      },
      children: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, /*#__PURE__*/_react.default.createElement(DropIcon, null)), /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
        primary: label
      }))
    }
  }, contents === null || contents === void 0 ? void 0 : contents.map(function (feature, featureIdx) {
    return getItem(_objectSpread(_objectSpread({}, childProps), {}, {
      feature: feature,
      key: featureIdx
    }));
  }));
};

var getItem = function getItem(_ref14) {
  var key = _ref14.key,
      data = _ref14.data,
      blockSpec = _ref14.blockSpec,
      highlightColor = _ref14.highlightColor,
      isEditing = _ref14.isEditing,
      setIsEditing = _ref14.setIsEditing,
      isCollapsed = _ref14.isCollapsed,
      setIsCollapsed = _ref14.setIsCollapsed,
      isSelected = _ref14.isSelected,
      setIsSelected = _ref14.setIsSelected,
      isDebugging = _ref14.isDebugging,
      setIsDebugging = _ref14.setIsDebugging,
      interactionDisabled = _ref14.interactionDisabled,
      inTopLevel = _ref14.inTopLevel,
      feature = _ref14.feature,
      fieldInfo = _ref14.fieldInfo,
      parentId = _ref14.parentId,
      menuType = _ref14.menuType;

  // console.log(highlightColor)
  if (feature === _.EXTRA_TYPES.LOCKED_INDICATOR) {
    return /*#__PURE__*/_react.default.createElement(LockIndicatorExtra, {
      key: key,
      highlightColor: highlightColor,
      locked: !data.canEdit,
      inTopLevel: inTopLevel,
      interactionDisabled: interactionDisabled,
      menuType: menuType
    });
  } else if (feature === _.EXTRA_TYPES.NAME_EDIT_TOGGLE) {
    return /*#__PURE__*/_react.default.createElement(NameEditToggleExtra, {
      key: key,
      highlightColor: highlightColor,
      isEditing: isEditing,
      setIsEditing: setIsEditing,
      locked: !data.canEdit,
      inTopLevel: inTopLevel,
      interactionDisabled: interactionDisabled,
      menuType: menuType,
      data: data
    });
  } else if (feature === _.EXTRA_TYPES.COLLAPSE_TOGGLE) {
    return /*#__PURE__*/_react.default.createElement(CollapseToggleExtra, {
      key: key,
      highlightColor: highlightColor,
      isCollapsed: isCollapsed,
      setIsCollapsed: setIsCollapsed,
      inTopLevel: inTopLevel,
      interactionDisabled: interactionDisabled,
      menuType: menuType
    });
  } else if (feature === _.EXTRA_TYPES.SELECTION_TOGGLE) {
    return /*#__PURE__*/_react.default.createElement(SelectionToggleExtra, {
      key: key,
      highlightColor: highlightColor,
      locked: interactionDisabled,
      data: data,
      isSelected: isSelected,
      setIsSelected: setIsSelected,
      inTopLevel: inTopLevel,
      menuType: menuType
    });
  } else if (feature === _.EXTRA_TYPES.DEBUG_TOGGLE) {
    return /*#__PURE__*/_react.default.createElement(DebugToggleExtra, {
      key: key,
      highlightColor: highlightColor,
      isDebugging: isDebugging,
      setIsDebugging: setIsDebugging,
      inTopLevel: inTopLevel,
      menuType: menuType
    });
  } else if (feature === _.EXTRA_TYPES.DELETE_BUTTON) {
    return /*#__PURE__*/_react.default.createElement(DeleteExtra, {
      key: key,
      highlightColor: highlightColor,
      data: data,
      inTopLevel: inTopLevel,
      locked: interactionDisabled,
      fieldInfo: fieldInfo,
      parentId: parentId,
      menuType: menuType
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.LABEL) {
    return /*#__PURE__*/_react.default.createElement(LabelExtra, {
      key: key,
      inTopLevel: inTopLevel,
      label: feature.label,
      menuType: menuType
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.ADD_ARGUMENT) {
    return /*#__PURE__*/_react.default.createElement(AddArgumentExtra, {
      key: key,
      highlightColor: highlightColor,
      data: data,
      argumentType: feature === null || feature === void 0 ? void 0 : feature.argumentType,
      interactionDisabled: interactionDisabled,
      inTopLevel: inTopLevel,
      menuType: menuType
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.ADD_ARGUMENT_GROUP) {
    return /*#__PURE__*/_react.default.createElement(AddArgumentGroupExtra, {
      key: key,
      highlightColor: highlightColor,
      data: data,
      allowed: feature === null || feature === void 0 ? void 0 : feature.allowed,
      interactionDisabled: interactionDisabled,
      inTopLevel: inTopLevel,
      menuType: menuType
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.FUNCTION_BUTTON) {
    return /*#__PURE__*/_react.default.createElement(FunctionButtonExtra, {
      key: key,
      highlightColor: highlightColor,
      actionInfo: feature,
      data: data,
      blockSpec: blockSpec,
      interactionDisabled: interactionDisabled,
      inTopLevel: inTopLevel,
      menuType: menuType
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.INDICATOR_TEXT) {
    return /*#__PURE__*/_react.default.createElement(IndicatorTextExtra, {
      key: key,
      highlightColor: highlightColor,
      value: feature.accessor(data),
      label: feature.label,
      inTopLevel: inTopLevel,
      interactionDisabled: interactionDisabled,
      menuType: menuType
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.INDICATOR_ICON) {
    return /*#__PURE__*/_react.default.createElement(IndicatorIconExtra, {
      key: key,
      highlightColor: highlightColor,
      value: feature.accessor(data),
      label: feature.label,
      inTopLevel: inTopLevel,
      interactionDisabled: interactionDisabled,
      menuType: menuType
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.DROPDOWN) {
    return /*#__PURE__*/_react.default.createElement(DropdownExtra, {
      key: key,
      data: data,
      blockSpec: blockSpec,
      icon: feature === null || feature === void 0 ? void 0 : feature.icon,
      contents: feature === null || feature === void 0 ? void 0 : feature.contents,
      label: feature === null || feature === void 0 ? void 0 : feature.label,
      inTopLevel: inTopLevel,
      isEditing: isEditing,
      isCollapsed: isCollapsed,
      isSelected: isSelected,
      isDebugging: isDebugging,
      setIsEditing: setIsEditing,
      setIsCollapsed: setIsCollapsed,
      setIsSelected: setIsSelected,
      setIsDebugging: setIsDebugging,
      interactionDisabled: interactionDisabled,
      parentId: parentId,
      fieldInfo: fieldInfo,
      highlightColor: highlightColor,
      menuType: menuType
    });
  } else if (feature === _.EXTRA_TYPES.DIVIDER) {
    return /*#__PURE__*/_react.default.createElement(_Divider.default, {
      key: key
    });
  }

  return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    key: key
  }, "Not Handled");
};

var ExtraBar = function ExtraBar(_ref15) {
  var _blockSpec$extras;

  var data = _ref15.data,
      blockSpec = _ref15.blockSpec,
      highlightColor = _ref15.highlightColor,
      isEditing = _ref15.isEditing,
      setIsEditing = _ref15.setIsEditing,
      isCollapsed = _ref15.isCollapsed,
      setIsCollapsed = _ref15.setIsCollapsed,
      isSelected = _ref15.isSelected,
      setIsSelected = _ref15.setIsSelected,
      isDebugging = _ref15.isDebugging,
      setIsDebugging = _ref15.setIsDebugging,
      interactionDisabled = _ref15.interactionDisabled,
      fieldInfo = _ref15.fieldInfo,
      parentId = _ref15.parentId;
  var childProps = {
    data: data,
    blockSpec: blockSpec,
    highlightColor: highlightColor,
    isEditing: isEditing,
    setIsEditing: setIsEditing,
    isCollapsed: isCollapsed,
    setIsCollapsed: setIsCollapsed,
    isSelected: isSelected,
    setIsSelected: setIsSelected,
    isDebugging: isDebugging,
    setIsDebugging: setIsDebugging,
    interactionDisabled: interactionDisabled,
    fieldInfo: fieldInfo,
    parentId: parentId,
    inTopLevel: true
  };
  return /*#__PURE__*/_react.default.createElement(_ButtonGroup.default, {
    variant: "outlined",
    "aria-label": "outlined button group",
    color: "quiet"
  }, blockSpec === null || blockSpec === void 0 ? void 0 : (_blockSpec$extras = blockSpec.extras) === null || _blockSpec$extras === void 0 ? void 0 : _blockSpec$extras.map(function (extra, extraIdx) {
    return getItem(_objectSpread(_objectSpread({}, childProps), {}, {
      feature: extra,
      key: extraIdx
    }));
  }));
};

exports.ExtraBar = ExtraBar;

var flattenMenuOnce = function flattenMenuOnce(extras) {
  var pancaked = [];
  extras === null || extras === void 0 ? void 0 : extras.forEach(function (extra) {
    if (extra.type === _.EXTRA_TYPES.DROPDOWN) {
      if (pancaked[pancaked.length - 1] !== _.EXTRA_TYPES.DIVIDER) {
        pancaked.push(_.EXTRA_TYPES.DIVIDER);
      }

      if (extra.label) {
        // console.log('creating label',extra.label)
        pancaked.push({
          label: extra.label,
          type: _.EXTRA_TYPES.LABEL
        });
      }

      extra.contents.forEach(function (child) {
        if (child === _.EXTRA_TYPES.DIVIDER) {
          if (pancaked[pancaked.length - 1] !== _.EXTRA_TYPES.DIVIDER) {
            pancaked.push(_.EXTRA_TYPES.DIVIDER);
          }
        } else {
          pancaked.push(child);
        }
      });

      if (pancaked[pancaked.length - 1] !== _.EXTRA_TYPES.DIVIDER) {
        pancaked.push(_.EXTRA_TYPES.DIVIDER);
      }
    } else if (extra === _.EXTRA_TYPES.DIVIDER) {
      if (pancaked[pancaked.length - 1] !== _.EXTRA_TYPES.DIVIDER) {
        pancaked.push(_.EXTRA_TYPES.DIVIDER);
      }
    } else {
      pancaked.push(extra);
    }
  });

  if (pancaked[pancaked.length - 1] === _.EXTRA_TYPES.DIVIDER) {
    pancaked.pop();
  }

  if (pancaked.length > 0 && pancaked[0] === _.EXTRA_TYPES.DIVIDER) {
    pancaked.shift();
  } // console.log(pancaked)


  if (pancaked.length === 0) {
    pancaked.push({
      label: 'No Actions',
      type: _.EXTRA_TYPES.LABEL
    });
  }

  return pancaked;
};

var RightClickMenu = function RightClickMenu(_ref16) {
  var data = _ref16.data,
      blockSpec = _ref16.blockSpec,
      highlightColor = _ref16.highlightColor,
      isEditing = _ref16.isEditing,
      setIsEditing = _ref16.setIsEditing,
      isCollapsed = _ref16.isCollapsed,
      setIsCollapsed = _ref16.setIsCollapsed,
      isSelected = _ref16.isSelected,
      setIsSelected = _ref16.setIsSelected,
      isDebugging = _ref16.isDebugging,
      setIsDebugging = _ref16.setIsDebugging,
      interactionDisabled = _ref16.interactionDisabled,
      fieldInfo = _ref16.fieldInfo,
      parentId = _ref16.parentId;
  var flattenedExtras = flattenMenuOnce(blockSpec === null || blockSpec === void 0 ? void 0 : blockSpec.extras);
  var childProps = {
    data: data,
    blockSpec: blockSpec,
    highlightColor: highlightColor,
    isEditing: isEditing,
    setIsEditing: setIsEditing,
    isCollapsed: isCollapsed,
    setIsCollapsed: setIsCollapsed,
    isSelected: isSelected,
    setIsSelected: setIsSelected,
    isDebugging: isDebugging,
    setIsDebugging: setIsDebugging,
    interactionDisabled: interactionDisabled,
    fieldInfo: fieldInfo,
    parentId: parentId,
    inTopLevel: false
  };
  return /*#__PURE__*/_react.default.createElement(_MenuList.default, null, flattenedExtras.map(function (extra, extraIdx) {
    return getItem(_objectSpread(_objectSpread({}, childProps), {}, {
      feature: extra,
      key: extraIdx
    }));
  }));
};

exports.RightClickMenu = RightClickMenu;