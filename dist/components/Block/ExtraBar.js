"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RightClickMenu = exports.ExtraBar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _fi = require("react-icons/fi");

var _grommet = require("grommet");

var _ProgrammingContext = require("../ProgrammingContext");

var _ = require("..");

var _ExpandCarrot = require("./ExpandCarrot");

var _Utility = require("./Utility");

var MENU_TYPES = {
  DROPDOWN: 'DROPDOWN',
  CONTEXT: 'CONTEXT'
};

var Pill = function Pill(_ref) {
  var value = _ref.value;
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      borderRadius: 20,
      minWidth: 6,
      backgroundColor: "#00000022",
      paddingLeft: 7,
      paddingRight: 7,
      borderStyle: 'solid',
      borderColor: '#00000088',
      borderWidth: 1,
      textAlign: 'center',
      fontSize: 10
    }
  }, value);
};

var FunctionButtonExtra = function FunctionButtonExtra(_ref2) {
  var actionInfo = _ref2.actionInfo,
      data = _ref2.data,
      blockSpec = _ref2.blockSpec,
      inTopLevel = _ref2.inTopLevel,
      interactionDisabled = _ref2.interactionDisabled,
      highlightColor = _ref2.highlightColor,
      menuType = _ref2.menuType;

  var _onClick = (0, _ProgrammingContext.useProgrammingStore)((0, _react.useCallback)(function (state) {
    if (typeof actionInfo.onClick === 'function') {
      return actionInfo.onClick;
    } else {
      return state[actionInfo.onClick];
    }
  }, [actionInfo]));

  var Wrapper = menuType === MENU_TYPES.DROPDOWN ? _Utility.DropdownMenuCheckboxItem : _Utility.ContextMenuCheckboxItem;
  var Indicator = menuType === MENU_TYPES.DROPDOWN ? _Utility.DropdownMenuItemIndicator : _Utility.ContextMenuItemIndicator;
  var ExtraActionIcon = actionInfo.icon ? actionInfo.icon : _fi.FiCircle;

  var inner = /*#__PURE__*/_react.default.createElement(_grommet.Button, {
    size: "small",
    focusIndicator: false,
    hoverIndicator: false,
    disabled: interactionDisabled,
    plain: true,
    style: {
      padding: inTopLevel ? null : '5pt 10pt 5pt 10pt'
    },
    icon: inTopLevel ? /*#__PURE__*/_react.default.createElement(ExtraActionIcon, null) : null,
    label: inTopLevel ? null : actionInfo.label,
    onClick: function onClick() {
      return _onClick(data, blockSpec);
    }
  });

  if (inTopLevel) {
    return inner;
  } else {
    return /*#__PURE__*/_react.default.createElement(Wrapper, {
      checked: true,
      highlightColor: highlightColor,
      disabled: interactionDisabled,
      onSelect: function onSelect() {
        return _onClick(data, blockSpec);
      }
    }, /*#__PURE__*/_react.default.createElement(Indicator, null, /*#__PURE__*/_react.default.createElement(ExtraActionIcon, null)), inner);
  }
};

var LabelExtra = function LabelExtra(_ref3) {
  var inTopLevel = _ref3.inTopLevel,
      menuType = _ref3.menuType,
      label = _ref3.label;
  var Wrapper = menuType === MENU_TYPES.DROPDOWN ? _Utility.DropdownMenuLabel : _Utility.ContextMenuLabel;

  if (inTopLevel) {
    return /*#__PURE__*/_react.default.createElement(_grommet.Button, {
      size: "small",
      plain: true,
      focusIndicator: false,
      hoverIndicator: false,
      disabled: true,
      style: {
        padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt'
      },
      label: label
    });
  } else {
    return /*#__PURE__*/_react.default.createElement(Wrapper, null, label);
  }
};

var LockIndicatorExtra = function LockIndicatorExtra(_ref4) {
  var locked = _ref4.locked,
      inTopLevel = _ref4.inTopLevel,
      highlightColor = _ref4.highlightColor,
      menuType = _ref4.menuType;
  var Icon = locked ? _fi.FiLock : _fi.FiUnlock;
  var Wrapper = menuType === MENU_TYPES.DROPDOWN ? _Utility.DropdownMenuCheckboxItem : _Utility.ContextMenuCheckboxItem;
  var Indicator = menuType === MENU_TYPES.DROPDOWN ? _Utility.DropdownMenuItemIndicator : _Utility.ContextMenuItemIndicator;

  var inner = /*#__PURE__*/_react.default.createElement(_grommet.Button, {
    size: "small",
    plain: true,
    focusIndicator: false,
    hoverIndicator: false,
    disabled: true,
    style: {
      padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt'
    },
    icon: inTopLevel ? /*#__PURE__*/_react.default.createElement(Icon, null) : null,
    label: inTopLevel ? null : locked ? 'Locked' : 'Unlocked'
  });

  if (inTopLevel) {
    return inner;
  } else {
    return /*#__PURE__*/_react.default.createElement(Wrapper, {
      checked: true,
      highlightColor: highlightColor,
      disabled: true
    }, /*#__PURE__*/_react.default.createElement(Indicator, null, /*#__PURE__*/_react.default.createElement(Icon, null)), inner);
  }
};

var NameEditToggleExtra = function NameEditToggleExtra(_ref5) {
  var isEditing = _ref5.isEditing,
      setIsEditing = _ref5.setIsEditing,
      locked = _ref5.locked,
      interactionDisabled = _ref5.interactionDisabled,
      inTopLevel = _ref5.inTopLevel,
      highlightColor = _ref5.highlightColor,
      menuType = _ref5.menuType,
      data = _ref5.data;
  var Icon = isEditing ? _fi.FiSave : _fi.FiEdit3;
  var Wrapper = menuType === MENU_TYPES.DROPDOWN ? _Utility.DropdownMenuCheckboxItem : _Utility.ContextMenuCheckboxItem;
  var Indicator = menuType === MENU_TYPES.DROPDOWN ? _Utility.DropdownMenuItemIndicator : _Utility.ContextMenuItemIndicator;
  var disabled = locked || interactionDisabled && data.dataType !== _.DATA_TYPES.REFERENCE;

  var inner = /*#__PURE__*/_react.default.createElement(_grommet.Button, {
    size: "small",
    plain: true,
    focusIndicator: false,
    hoverIndicator: false,
    disabled: disabled,
    style: {
      padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt'
    },
    icon: inTopLevel ? /*#__PURE__*/_react.default.createElement(Icon, null) : null,
    label: inTopLevel ? null : isEditing ? 'Save' : 'Edit Name',
    onClick: function onClick() {
      return setIsEditing(!isEditing);
    }
  });

  if (inTopLevel) {
    return inner;
  } else {
    return /*#__PURE__*/_react.default.createElement(Wrapper, {
      checked: true,
      highlightColor: highlightColor,
      disabled: disabled,
      onSelect: function onSelect() {
        return setIsEditing(!isEditing);
      }
    }, /*#__PURE__*/_react.default.createElement(Indicator, null, /*#__PURE__*/_react.default.createElement(Icon, null)), inner);
  }
};

var SelectionToggleExtra = function SelectionToggleExtra(_ref6) {
  var isSelected = _ref6.isSelected,
      setIsSelected = _ref6.setIsSelected,
      inTopLevel = _ref6.inTopLevel,
      data = _ref6.data,
      locked = _ref6.locked,
      highlightColor = _ref6.highlightColor,
      menuType = _ref6.menuType;
  var Icon = isSelected ? _fi.FiEyeOff : _fi.FiEye;
  var disabled = data.dataType === _.DATA_TYPES.INSTANCE && locked;
  var Wrapper = menuType === MENU_TYPES.DROPDOWN ? _Utility.DropdownMenuCheckboxItem : _Utility.ContextMenuCheckboxItem;
  var Indicator = menuType === MENU_TYPES.DROPDOWN ? _Utility.DropdownMenuItemIndicator : _Utility.ContextMenuItemIndicator;

  var inner = /*#__PURE__*/_react.default.createElement(_grommet.Button, {
    plain: true,
    disabled: disabled,
    focusIndicator: false,
    hoverIndicator: false,
    size: "small",
    style: {
      padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt'
    },
    icon: inTopLevel ? /*#__PURE__*/_react.default.createElement(Icon, null) : null,
    label: inTopLevel ? null : isSelected ? 'Deselect' : 'Select',
    onClick: function onClick() {
      return setIsSelected(!isSelected);
    }
  });

  if (inTopLevel) {
    return inner;
  } else {
    return /*#__PURE__*/_react.default.createElement(Wrapper, {
      checked: true,
      highlightColor: highlightColor,
      disabled: disabled,
      onSelect: function onSelect() {
        return setIsSelected(!isSelected);
      }
    }, /*#__PURE__*/_react.default.createElement(Indicator, null, /*#__PURE__*/_react.default.createElement(Icon, null)), inner);
  }
};

var CollapseToggleExtra = function CollapseToggleExtra(_ref7) {
  var isCollapsed = _ref7.isCollapsed,
      setIsCollapsed = _ref7.setIsCollapsed,
      inTopLevel = _ref7.inTopLevel,
      highlightColor = _ref7.highlightColor,
      menuType = _ref7.menuType;
  var Wrapper = menuType === MENU_TYPES.DROPDOWN ? _Utility.DropdownMenuCheckboxItem : _Utility.ContextMenuCheckboxItem;
  var Indicator = menuType === MENU_TYPES.DROPDOWN ? _Utility.DropdownMenuItemIndicator : _Utility.ContextMenuItemIndicator;

  var inner = /*#__PURE__*/_react.default.createElement(_grommet.Button, {
    plain: true,
    focusIndicator: false,
    hoverIndicator: false,
    size: "small",
    style: {
      padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt'
    },
    icon: inTopLevel ? /*#__PURE__*/_react.default.createElement(_ExpandCarrot.ExpandCarrot, {
      expanded: !isCollapsed
    }) : null,
    onClick: function onClick() {
      return setIsCollapsed(!isCollapsed);
    },
    label: inTopLevel ? null : isCollapsed ? "Expand" : "Collapse"
  });

  if (inTopLevel) {
    return inner;
  } else {
    return /*#__PURE__*/_react.default.createElement(Wrapper, {
      checked: true,
      highlightColor: highlightColor,
      onSelect: function onSelect() {
        return setIsCollapsed(!isCollapsed);
      }
    }, /*#__PURE__*/_react.default.createElement(Indicator, null, isCollapsed ? /*#__PURE__*/_react.default.createElement(_fi.FiChevronDown, null) : /*#__PURE__*/_react.default.createElement(_fi.FiChevronRight, null)), inner);
  }
};

var DebugToggleExtra = function DebugToggleExtra(_ref8) {
  var isDebugging = _ref8.isDebugging,
      setIsDebugging = _ref8.setIsDebugging,
      inTopLevel = _ref8.inTopLevel,
      highlightColor = _ref8.highlightColor,
      menuType = _ref8.menuType;
  var Icon = isDebugging ? _fi.FiZapOff : _fi.FiZap;
  var Wrapper = menuType === MENU_TYPES.DROPDOWN ? _Utility.DropdownMenuCheckboxItem : _Utility.ContextMenuCheckboxItem;
  var Indicator = menuType === MENU_TYPES.DROPDOWN ? _Utility.DropdownMenuItemIndicator : _Utility.ContextMenuItemIndicator;

  var inner = /*#__PURE__*/_react.default.createElement(_grommet.Button, {
    plain: true,
    focusIndicator: false,
    hoverIndicator: false,
    size: "small",
    style: {
      padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt'
    },
    icon: inTopLevel ? /*#__PURE__*/_react.default.createElement(Icon, null) : null,
    onClick: function onClick() {
      return setIsDebugging(!isDebugging);
    },
    label: inTopLevel ? null : isDebugging ? "Cancel Debug" : "Debug"
  });

  if (inTopLevel) {
    return inner;
  } else {
    return /*#__PURE__*/_react.default.createElement(Wrapper, {
      checked: true,
      highlightColor: highlightColor,
      onSelect: function onSelect() {
        return setIsDebugging(!isDebugging);
      }
    }, /*#__PURE__*/_react.default.createElement(Indicator, null, /*#__PURE__*/_react.default.createElement(Icon, null)), inner);
  }
};

var IndicatorTextExtra = function IndicatorTextExtra(_ref9) {
  var value = _ref9.value,
      label = _ref9.label,
      inTopLevel = _ref9.inTopLevel,
      highlightColor = _ref9.highlightColor,
      menuType = _ref9.menuType;
  var Wrapper = menuType === MENU_TYPES.DROPDOWN ? _Utility.DropdownMenuCheckboxItem : _Utility.ContextMenuCheckboxItem;
  var Indicator = menuType === MENU_TYPES.DROPDOWN ? _Utility.DropdownMenuItemIndicator : _Utility.ContextMenuItemIndicator;

  if (inTopLevel) {
    return /*#__PURE__*/_react.default.createElement(Pill, {
      value: value
    });
  } else {
    return /*#__PURE__*/_react.default.createElement(Wrapper, {
      checked: true,
      highlightColor: highlightColor
    }, /*#__PURE__*/_react.default.createElement(Indicator, null, /*#__PURE__*/_react.default.createElement(Pill, {
      value: value
    })), /*#__PURE__*/_react.default.createElement(_grommet.Button, {
      size: "small",
      plain: true,
      focusIndicator: false,
      hoverIndicator: false,
      style: {
        padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt'
      },
      label: label
    }));
  }
};

var IndicatorIconExtra = function IndicatorIconExtra(_ref10) {
  var value = _ref10.value,
      label = _ref10.label,
      inTopLevel = _ref10.inTopLevel,
      highlightColor = _ref10.highlightColor,
      menuType = _ref10.menuType;
  var Wrapper = menuType === MENU_TYPES.DROPDOWN ? _Utility.DropdownMenuCheckboxItem : _Utility.ContextMenuCheckboxItem;
  var Indicator = menuType === MENU_TYPES.DROPDOWN ? _Utility.DropdownMenuItemIndicator : _Utility.ContextMenuItemIndicator;

  var inner = /*#__PURE__*/_react.default.createElement(_grommet.Button, {
    size: "small",
    plain: true,
    focusIndicator: false,
    hoverIndicator: false,
    disabled: true,
    style: {
      padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt'
    },
    icon: inTopLevel ? value : null,
    label: inTopLevel ? null : label
  });

  if (inTopLevel) {
    return inner;
  } else {
    return /*#__PURE__*/_react.default.createElement(Wrapper, {
      checked: true,
      highlightColor: highlightColor
    }, /*#__PURE__*/_react.default.createElement(Indicator, null, value), inner);
  }
};

var AddArgumentExtra = function AddArgumentExtra(_ref11) {
  var _typeSpec$referenceBl;

  var data = _ref11.data,
      argumentType = _ref11.argumentType,
      interactionDisabled = _ref11.interactionDisabled,
      inTopLevel = _ref11.inTopLevel,
      highlightColor = _ref11.highlightColor,
      menuType = _ref11.menuType;
  var Wrapper = menuType === MENU_TYPES.DROPDOWN ? _Utility.DropdownMenuCheckboxItem : _Utility.ContextMenuCheckboxItem;
  var Indicator = menuType === MENU_TYPES.DROPDOWN ? _Utility.DropdownMenuItemIndicator : _Utility.ContextMenuItemIndicator;
  var typeSpec = (0, _ProgrammingContext.useProgrammingStore)((0, _react.useCallback)(function (store) {
    return store.programSpec.objectTypes[argumentType];
  }, [argumentType]));
  var Icon = typeSpec !== null && typeSpec !== void 0 && (_typeSpec$referenceBl = typeSpec.referenceBlock) !== null && _typeSpec$referenceBl !== void 0 && _typeSpec$referenceBl.icon ? typeSpec.referenceBlock.icon : _fi.FiPlus;
  var addArgument = (0, _ProgrammingContext.useProgrammingStore)(function (store) {
    return store.addArgument;
  });

  var inner = /*#__PURE__*/_react.default.createElement(_grommet.Button, {
    size: "small",
    plain: true,
    focusIndicator: false,
    hoverIndicator: false,
    disabled: interactionDisabled,
    style: {
      padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt'
    },
    icon: inTopLevel ? /*#__PURE__*/_react.default.createElement(Icon, null) : null,
    onClick: function onClick() {
      return addArgument(data.id, argumentType);
    },
    label: inTopLevel ? null : "Add ".concat(typeSpec.name, " Argument")
  });

  if (inTopLevel) {
    return inner;
  } else {
    return /*#__PURE__*/_react.default.createElement(Wrapper, {
      checked: true,
      highlightColor: highlightColor,
      disabled: interactionDisabled,
      onSelect: function onSelect() {
        return addArgument(data.id, argumentType);
      }
    }, /*#__PURE__*/_react.default.createElement(Indicator, null, /*#__PURE__*/_react.default.createElement(Icon, null)), inner);
  }
};

var AddArgumentGroupExtra = function AddArgumentGroupExtra(_ref12) {
  var data = _ref12.data,
      allowed = _ref12.allowed,
      interactionDisabled = _ref12.interactionDisabled,
      inTopLevel = _ref12.inTopLevel,
      highlightColor = _ref12.highlightColor,
      menuType = _ref12.menuType;
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

var DeleteExtra = function DeleteExtra(_ref13) {
  var _data$refData;

  var data = _ref13.data,
      inTopLevel = _ref13.inTopLevel,
      locked = _ref13.locked,
      fieldInfo = _ref13.fieldInfo,
      parentId = _ref13.parentId,
      highlightColor = _ref13.highlightColor,
      menuType = _ref13.menuType;
  var deleteFunc = (0, _ProgrammingContext.useProgrammingStore)(function (state) {
    return state.deleteBlock;
  });
  var canDeleteInstance = parentId === 'spawner' && data.dataType === _.DATA_TYPES.REFERENCE && ((_data$refData = data.refData) === null || _data$refData === void 0 ? void 0 : _data$refData.canDelete);
  var canDelete = !locked && data.canDelete || canDeleteInstance;
  var Wrapper = menuType === MENU_TYPES.DROPDOWN ? _Utility.DropdownMenuCheckboxItem : _Utility.ContextMenuCheckboxItem;
  var Indicator = menuType === MENU_TYPES.DROPDOWN ? _Utility.DropdownMenuItemIndicator : _Utility.ContextMenuItemIndicator;

  var inner = /*#__PURE__*/_react.default.createElement(_grommet.Button, {
    size: "small",
    plain: true,
    focusIndicator: false,
    hoverIndicator: false,
    disabled: !canDelete,
    style: {
      padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt'
    },
    icon: inTopLevel ? /*#__PURE__*/_react.default.createElement(_fi.FiTrash2, null) : null,
    label: inTopLevel ? null : 'Delete',
    onClick: function onClick() {
      return deleteFunc(data, parentId, fieldInfo);
    }
  });

  if (inTopLevel) {
    return inner;
  } else {
    return /*#__PURE__*/_react.default.createElement(Wrapper, {
      checked: true,
      highlightColor: highlightColor,
      disabled: !canDelete,
      onSelect: function onSelect() {
        return deleteFunc(data, parentId, fieldInfo);
      }
    }, /*#__PURE__*/_react.default.createElement(Indicator, null, /*#__PURE__*/_react.default.createElement(_fi.FiTrash2, null)), inner);
  }
};

var DropdownExtra = function DropdownExtra(_ref14) {
  var icon = _ref14.icon,
      contents = _ref14.contents,
      label = _ref14.label,
      inTopLevel = _ref14.inTopLevel,
      data = _ref14.data,
      blockSpec = _ref14.blockSpec,
      isEditing = _ref14.isEditing,
      isCollapsed = _ref14.isCollapsed,
      isSelected = _ref14.isSelected,
      isDebugging = _ref14.isDebugging,
      setIsEditing = _ref14.setIsEditing,
      setIsCollapsed = _ref14.setIsCollapsed,
      setIsSelected = _ref14.setIsSelected,
      setIsDebugging = _ref14.setIsDebugging,
      interactionDisabled = _ref14.interactionDisabled,
      parentId = _ref14.parentId,
      fieldInfo = _ref14.fieldInfo,
      highlightColor = _ref14.highlightColor,
      menuType = _ref14.menuType;
  var DropIcon = icon ? icon : inTopLevel ? _fi.FiMoreHorizontal : _fi.FiChevronRight;
  var TriggerComponent = menuType === MENU_TYPES.CONTEXT ? _Utility.ContextMenuTriggerItem : inTopLevel ? _Utility.DropdownMenuTrigger : _Utility.DropdownMenuTriggerItem;
  var ContentComponent = menuType === MENU_TYPES.CONTEXT ? _Utility.ContextMenuContent : _Utility.DropdownMenuContent;
  var MenuComponent = menuType === MENU_TYPES.CONTEXT ? _Utility.ContextMenu : _Utility.DropdownMenu;
  var usedLabel = label ? label : 'More Options';
  return /*#__PURE__*/_react.default.createElement(MenuComponent, null, /*#__PURE__*/_react.default.createElement(TriggerComponent, {
    asChild: inTopLevel,
    highlightColor: highlightColor
  }, inTopLevel ? /*#__PURE__*/_react.default.createElement(_grommet.Button, {
    size: "small",
    as: "div",
    focusIndicator: false,
    hoverIndicator: false,
    plain: true,
    style: {
      padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt'
    },
    icon: inTopLevel ? /*#__PURE__*/_react.default.createElement(DropIcon, null) : null,
    label: inTopLevel ? null : usedLabel
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_grommet.Button, {
    size: "small",
    as: "div",
    focusIndicator: false,
    hoverIndicator: false,
    plain: true,
    style: {
      padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt'
    },
    icon: inTopLevel ? /*#__PURE__*/_react.default.createElement(DropIcon, null) : null,
    label: inTopLevel ? null : usedLabel
  }), /*#__PURE__*/_react.default.createElement(_Utility.RightSlot, null, /*#__PURE__*/_react.default.createElement(DropIcon, null)))), /*#__PURE__*/_react.default.createElement(ContentComponent, null, contents === null || contents === void 0 ? void 0 : contents.map(function (feature, featureIdx) {
    return /*#__PURE__*/_react.default.createElement(ButtonSwitch, {
      key: featureIdx,
      feature: feature,
      data: data,
      blockSpec: blockSpec,
      inTopLevel: false,
      isEditing: isEditing,
      isCollapsed: isCollapsed,
      isSelected: isSelected,
      isDebugging: isDebugging,
      setIsEditing: setIsEditing,
      setIsCollapsed: setIsCollapsed,
      setIsSelected: setIsSelected,
      setIsDebugging: setIsDebugging,
      interactionDisabled: interactionDisabled,
      fieldInfo: fieldInfo,
      parentId: parentId,
      highlightColor: highlightColor,
      menuType: menuType
    });
  })));
};

var ButtonSwitch = function ButtonSwitch(_ref15) {
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
      inTopLevel = _ref15.inTopLevel,
      feature = _ref15.feature,
      fieldInfo = _ref15.fieldInfo,
      parentId = _ref15.parentId,
      menuType = _ref15.menuType;
  // console.log(highlightColor)
  var inner = null;

  if (feature === _.EXTRA_TYPES.LOCKED_INDICATOR) {
    inner = /*#__PURE__*/_react.default.createElement(LockIndicatorExtra, {
      highlightColor: highlightColor,
      locked: !data.canEdit,
      inTopLevel: inTopLevel,
      interactionDisabled: interactionDisabled,
      menuType: menuType
    });
  } else if (feature === _.EXTRA_TYPES.NAME_EDIT_TOGGLE) {
    inner = /*#__PURE__*/_react.default.createElement(NameEditToggleExtra, {
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
    inner = /*#__PURE__*/_react.default.createElement(CollapseToggleExtra, {
      highlightColor: highlightColor,
      isCollapsed: isCollapsed,
      setIsCollapsed: setIsCollapsed,
      inTopLevel: inTopLevel,
      interactionDisabled: interactionDisabled,
      menuType: menuType
    });
  } else if (feature === _.EXTRA_TYPES.SELECTION_TOGGLE) {
    inner = /*#__PURE__*/_react.default.createElement(SelectionToggleExtra, {
      highlightColor: highlightColor,
      locked: interactionDisabled,
      data: data,
      isSelected: isSelected,
      setIsSelected: setIsSelected,
      inTopLevel: inTopLevel,
      menuType: menuType
    });
  } else if (feature === _.EXTRA_TYPES.DEBUG_TOGGLE) {
    inner = /*#__PURE__*/_react.default.createElement(DebugToggleExtra, {
      highlightColor: highlightColor,
      isDebugging: isDebugging,
      setIsDebugging: setIsDebugging,
      inTopLevel: inTopLevel,
      menuType: menuType
    });
  } else if (feature === _.EXTRA_TYPES.DELETE_BUTTON) {
    inner = /*#__PURE__*/_react.default.createElement(DeleteExtra, {
      highlightColor: highlightColor,
      data: data,
      inTopLevel: inTopLevel,
      locked: interactionDisabled,
      fieldInfo: fieldInfo,
      parentId: parentId,
      menuType: menuType
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.LABEL) {
    inner = /*#__PURE__*/_react.default.createElement(LabelExtra, {
      inTopLevel: inTopLevel,
      label: feature.label,
      menuType: menuType
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.ADD_ARGUMENT) {
    inner = /*#__PURE__*/_react.default.createElement(AddArgumentExtra, {
      highlightColor: highlightColor,
      data: data,
      argumentType: feature === null || feature === void 0 ? void 0 : feature.argumentType,
      interactionDisabled: interactionDisabled,
      inTopLevel: inTopLevel,
      menuType: menuType
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.ADD_ARGUMENT_GROUP) {
    inner = /*#__PURE__*/_react.default.createElement(AddArgumentGroupExtra, {
      highlightColor: highlightColor,
      data: data,
      allowed: feature === null || feature === void 0 ? void 0 : feature.allowed,
      interactionDisabled: interactionDisabled,
      inTopLevel: inTopLevel,
      menuType: menuType
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.FUNCTION_BUTTON) {
    inner = /*#__PURE__*/_react.default.createElement(FunctionButtonExtra, {
      highlightColor: highlightColor,
      actionInfo: feature,
      data: data,
      blockSpec: blockSpec,
      interactionDisabled: interactionDisabled,
      inTopLevel: inTopLevel,
      menuType: menuType
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.INDICATOR_TEXT) {
    inner = /*#__PURE__*/_react.default.createElement(IndicatorTextExtra, {
      highlightColor: highlightColor,
      value: feature.accessor(data),
      label: feature.label,
      inTopLevel: inTopLevel,
      interactionDisabled: interactionDisabled,
      menuType: menuType
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.INDICATOR_ICON) {
    inner = /*#__PURE__*/_react.default.createElement(IndicatorIconExtra, {
      highlightColor: highlightColor,
      value: feature.accessor(data),
      label: feature.label,
      inTopLevel: inTopLevel,
      interactionDisabled: interactionDisabled,
      menuType: menuType
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.ADD_ARGUMENT) {
    inner = /*#__PURE__*/_react.default.createElement(AddArgumentGroupExtra, {
      data: data,
      allowed: feature === null || feature === void 0 ? void 0 : feature.allowed,
      interactionDisabled: interactionDisabled,
      inTopLevel: inTopLevel,
      highlightColor: highlightColor,
      menuType: menuType
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.DROPDOWN) {
    inner = /*#__PURE__*/_react.default.createElement(DropdownExtra, {
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
  } else if (feature === _.EXTRA_TYPES.DIVIDER && !inTopLevel) {
    inner = menuType === MENU_TYPES.DROPDOWN ? /*#__PURE__*/_react.default.createElement(_Utility.DropdownMenuSeparator, null) : /*#__PURE__*/_react.default.createElement(_Utility.ContextMenuSeparator, null);
  } else if (feature === _.EXTRA_TYPES.DIVIDER && inTopLevel) {
    inner = /*#__PURE__*/_react.default.createElement(_Utility.OtherStyledSeparator, {
      decorative: true,
      orientation: "vertical",
      css: {
        margin: '4px',
        '&[data-orientation=vertical]': {
          height: '15pt',
          width: 1
        }
      }
    });
  }

  return inner;
};

var ExtraBar = function ExtraBar(_ref16) {
  var _blockSpec$extras;

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
  return /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    direction: "row",
    margin: {
      left: 'xsmall'
    },
    gap: "none",
    align: "center",
    alignContent: "center",
    justify: "between",
    flex: false
  }, /*#__PURE__*/_react.default.createElement(_Utility.DropdownMenu, null, blockSpec === null || blockSpec === void 0 ? void 0 : (_blockSpec$extras = blockSpec.extras) === null || _blockSpec$extras === void 0 ? void 0 : _blockSpec$extras.map(function (extra, extraIdx) {
    return /*#__PURE__*/_react.default.createElement(ButtonSwitch, {
      key: extraIdx,
      data: data,
      blockSpec: blockSpec,
      inTopLevel: true,
      isEditing: isEditing,
      isCollapsed: isCollapsed,
      isSelected: isSelected,
      isDebugging: isDebugging,
      setIsEditing: setIsEditing,
      setIsCollapsed: setIsCollapsed,
      setIsSelected: setIsSelected,
      setIsDebugging: setIsDebugging,
      interactionDisabled: interactionDisabled,
      feature: extra,
      fieldInfo: fieldInfo,
      parentId: parentId,
      highlightColor: highlightColor,
      menuType: MENU_TYPES.DROPDOWN
    });
  })));
};

exports.ExtraBar = ExtraBar;

var flattenMenuOnce = function flattenMenuOnce(extras) {
  var pancaked = [];
  extras.forEach(function (extra) {
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


  return pancaked;
};

var RightClickMenu = function RightClickMenu(_ref17) {
  var data = _ref17.data,
      blockSpec = _ref17.blockSpec,
      highlightColor = _ref17.highlightColor,
      isEditing = _ref17.isEditing,
      setIsEditing = _ref17.setIsEditing,
      isCollapsed = _ref17.isCollapsed,
      setIsCollapsed = _ref17.setIsCollapsed,
      isSelected = _ref17.isSelected,
      setIsSelected = _ref17.setIsSelected,
      isDebugging = _ref17.isDebugging,
      setIsDebugging = _ref17.setIsDebugging,
      interactionDisabled = _ref17.interactionDisabled,
      fieldInfo = _ref17.fieldInfo,
      parentId = _ref17.parentId;
  var flattenedExtras = flattenMenuOnce(blockSpec === null || blockSpec === void 0 ? void 0 : blockSpec.extras);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, flattenedExtras.map(function (extra, extraIdx) {
    return /*#__PURE__*/_react.default.createElement(ButtonSwitch, {
      key: extraIdx,
      data: data,
      blockSpec: blockSpec,
      inTopLevel: false,
      isEditing: isEditing,
      isCollapsed: isCollapsed,
      isSelected: isSelected,
      isDebugging: isDebugging,
      setIsEditing: setIsEditing,
      setIsCollapsed: setIsCollapsed,
      setIsSelected: setIsSelected,
      setIsDebugging: setIsDebugging,
      interactionDisabled: interactionDisabled,
      feature: extra,
      fieldInfo: fieldInfo,
      parentId: parentId,
      highlightColor: highlightColor,
      menuType: MENU_TYPES.CONTEXT
    });
  }));
};

exports.RightClickMenu = RightClickMenu;