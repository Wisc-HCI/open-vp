"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtraBar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _fi = require("react-icons/fi");

var _grommet = require("grommet");

var _ProgrammingContext = require("../ProgrammingContext");

var _ = require("..");

var _ExpandCarrot = require("./ExpandCarrot");

var Pill = function Pill(_ref) {
  var value = _ref.value;
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      borderRadius: 20,
      minWidth: 9,
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
      interactionDisabled = _ref2.interactionDisabled;

  var _onClick = (0, _ProgrammingContext.useProgrammingStore)((0, _react.useCallback)(function (state) {
    if (typeof actionInfo.onClick === 'function') {
      return actionInfo.onClick;
    } else {
      return state[actionInfo.onClick];
    }
  }, [actionInfo]));

  var ExtraActionIcon = actionInfo.icon ? actionInfo.icon : _fi.FiCircle;
  return /*#__PURE__*/_react.default.createElement(_grommet.Button, {
    size: "small",
    focusIndicator: false,
    hoverIndicator: false,
    disabled: interactionDisabled,
    plain: true,
    style: {
      padding: inTopLevel ? null : '5pt 10pt 5pt 10pt'
    },
    icon: /*#__PURE__*/_react.default.createElement(ExtraActionIcon, null),
    label: inTopLevel ? null : actionInfo.label,
    onClick: function onClick() {
      return _onClick(data, blockSpec);
    }
  });
};

var LockIndicatorExtra = function LockIndicatorExtra(_ref3) {
  var locked = _ref3.locked,
      inTopLevel = _ref3.inTopLevel;
  var Icon = locked ? _fi.FiLock : _fi.FiUnlock;
  return /*#__PURE__*/_react.default.createElement(_grommet.Button, {
    size: "small",
    plain: true,
    focusIndicator: false,
    hoverIndicator: false,
    disabled: true,
    style: {
      padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt'
    },
    icon: /*#__PURE__*/_react.default.createElement(Icon, null),
    label: inTopLevel ? null : locked ? 'Locked' : 'Unlocked'
  });
};

var NameEditToggleExtra = function NameEditToggleExtra(_ref4) {
  var isEditing = _ref4.isEditing,
      setIsEditing = _ref4.setIsEditing,
      locked = _ref4.locked,
      inTopLevel = _ref4.inTopLevel;
  var Icon = isEditing ? _fi.FiSave : _fi.FiEdit3;
  return /*#__PURE__*/_react.default.createElement(_grommet.Button, {
    size: "small",
    plain: true,
    focusIndicator: false,
    hoverIndicator: false,
    disabled: locked,
    style: {
      padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt'
    },
    icon: /*#__PURE__*/_react.default.createElement(Icon, null),
    label: inTopLevel ? null : isEditing ? 'Save' : 'Edit Name',
    onClick: function onClick() {
      return setIsEditing(!isEditing);
    }
  });
};

var SelectionToggleExtra = function SelectionToggleExtra(_ref5) {
  var isSelected = _ref5.isSelected,
      setIsSelected = _ref5.setIsSelected,
      inTopLevel = _ref5.inTopLevel;
  var Icon = isSelected ? _fi.FiEyeOff : _fi.FiEye;
  return /*#__PURE__*/_react.default.createElement(_grommet.Button, {
    plain: true,
    focusIndicator: false,
    hoverIndicator: false,
    size: "small",
    style: {
      padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt'
    },
    icon: /*#__PURE__*/_react.default.createElement(Icon, null),
    label: inTopLevel ? null : isSelected ? 'Deselect' : 'Select',
    onClick: function onClick() {
      return setIsSelected(!isSelected);
    }
  });
};

var CollapseToggleExtra = function CollapseToggleExtra(_ref6) {
  var isCollapsed = _ref6.isCollapsed,
      setIsCollapsed = _ref6.setIsCollapsed,
      inTopLevel = _ref6.inTopLevel;
  return /*#__PURE__*/_react.default.createElement(_grommet.Button, {
    plain: true,
    focusIndicator: false,
    hoverIndicator: false,
    size: "small",
    style: {
      padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt'
    },
    icon: /*#__PURE__*/_react.default.createElement(_ExpandCarrot.ExpandCarrot, {
      expanded: !isCollapsed
    }),
    onClick: function onClick() {
      return setIsCollapsed(!isCollapsed);
    },
    label: inTopLevel ? null : isCollapsed ? "Expand" : "Collapse"
  });
};

var DebugToggleExtra = function DebugToggleExtra(_ref7) {
  var isDebugging = _ref7.isDebugging,
      setIsDebugging = _ref7.setIsDebugging,
      inTopLevel = _ref7.inTopLevel;
  var Icon = isDebugging ? _fi.FiZapOff : _fi.FiZap;
  return /*#__PURE__*/_react.default.createElement(_grommet.Button, {
    plain: true,
    focusIndicator: false,
    hoverIndicator: false,
    size: "small",
    style: {
      padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt'
    },
    icon: /*#__PURE__*/_react.default.createElement(Icon, null),
    onClick: function onClick() {
      return setIsDebugging(!isDebugging);
    },
    label: inTopLevel ? null : isDebugging ? "Cancel Debug" : "Debug"
  });
};

var IndicatorExtra = function IndicatorExtra(_ref8) {
  var value = _ref8.value,
      label = _ref8.label,
      inTopLevel = _ref8.inTopLevel;

  if (inTopLevel) {
    return /*#__PURE__*/_react.default.createElement(Pill, {
      value: value
    });
  } else {
    return /*#__PURE__*/_react.default.createElement(_grommet.Button, {
      size: "small",
      plain: true,
      focusIndicator: false,
      hoverIndicator: false,
      style: {
        padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt'
      },
      icon: /*#__PURE__*/_react.default.createElement(Pill, {
        value: value
      }),
      label: label
    });
  }
};

var AddArgumentExtra = function AddArgumentExtra(_ref9) {
  var _typeSpec$referenceBl;

  var data = _ref9.data,
      argumentType = _ref9.argumentType,
      interactionDisabled = _ref9.interactionDisabled,
      inTopLevel = _ref9.inTopLevel;
  var typeSpec = (0, _ProgrammingContext.useProgrammingStore)((0, _react.useCallback)(function (store) {
    return store.programSpec.objectTypes[argumentType];
  }, [argumentType]));
  var Icon = typeSpec !== null && typeSpec !== void 0 && (_typeSpec$referenceBl = typeSpec.referenceBlock) !== null && _typeSpec$referenceBl !== void 0 && _typeSpec$referenceBl.icon ? typeSpec.referenceBlock.icon : _fi.FiPlus;
  var addArgument = (0, _ProgrammingContext.useProgrammingStore)(function (store) {
    return store.addArgument;
  });
  return /*#__PURE__*/_react.default.createElement(_grommet.Button, {
    size: "small",
    plain: true,
    focusIndicator: false,
    hoverIndicator: false,
    disabled: interactionDisabled,
    style: {
      padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt'
    },
    icon: /*#__PURE__*/_react.default.createElement(Icon, null),
    onClick: function onClick() {
      return addArgument(data.id, argumentType);
    },
    label: inTopLevel ? null : "Add ".concat(typeSpec.name, " Argument")
  });
};

var AddArgumentGroupExtra = function AddArgumentGroupExtra(_ref10) {
  var data = _ref10.data,
      allowed = _ref10.allowed,
      interactionDisabled = _ref10.interactionDisabled,
      inTopLevel = _ref10.inTopLevel;
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
    interactionDisabled: interactionDisabled
  });
};

var DeleteExtra = function DeleteExtra(_ref11) {
  var data = _ref11.data,
      inTopLevel = _ref11.inTopLevel,
      locked = _ref11.locked,
      fieldInfo = _ref11.fieldInfo,
      parentId = _ref11.parentId;
  var deleteFunc = (0, _ProgrammingContext.useProgrammingStore)(function (state) {
    return state.deleteBlock;
  });
  return /*#__PURE__*/_react.default.createElement(_grommet.Button, {
    size: "small",
    plain: true,
    focusIndicator: false,
    hoverIndicator: false,
    disabled: locked,
    style: {
      padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt'
    },
    icon: /*#__PURE__*/_react.default.createElement(_fi.FiTrash2, null),
    label: inTopLevel ? null : 'Delete',
    onClick: function onClick() {
      return deleteFunc(data, parentId, fieldInfo);
    }
  });
};

var DropdownExtra = function DropdownExtra(_ref12) {
  var icon = _ref12.icon,
      contents = _ref12.contents,
      label = _ref12.label,
      inTopLevel = _ref12.inTopLevel,
      data = _ref12.data,
      blockSpec = _ref12.blockSpec,
      isEditing = _ref12.isEditing,
      isCollapsed = _ref12.isCollapsed,
      isSelected = _ref12.isSelected,
      isDebugging = _ref12.isDebugging,
      setIsEditing = _ref12.setIsEditing,
      setIsCollapsed = _ref12.setIsCollapsed,
      setIsSelected = _ref12.setIsSelected,
      setIsDebugging = _ref12.setIsDebugging,
      interactionDisabled = _ref12.interactionDisabled,
      parentId = _ref12.parentId,
      fieldInfo = _ref12.fieldInfo;
  var DropIcon = icon ? icon : _fi.FiMoreHorizontal;
  return /*#__PURE__*/_react.default.createElement(_grommet.DropButton, {
    focusIndicator: false,
    hoverIndicator: false,
    dropContent: /*#__PURE__*/_react.default.createElement(_grommet.Box, {
      round: "xsmall",
      background: "grey",
      direction: "column",
      align: "start",
      border: {
        color: 'lightgrey'
      }
    }, contents === null || contents === void 0 ? void 0 : contents.map(function (feature, featureIdx) {
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
        parentId: parentId
      });
    })),
    dropProps: {
      align: inTopLevel ? {
        top: 'bottom'
      } : {
        left: 'right'
      },
      elevation: 'none',
      background: 'none'
    }
  }, /*#__PURE__*/_react.default.createElement(_grommet.Button, {
    size: "small",
    as: "div",
    focusIndicator: false,
    hoverIndicator: false,
    plain: true,
    style: {
      padding: inTopLevel ? '5pt 2pt 5pt 2pt' : '5pt 10pt 5pt 10pt'
    },
    icon: /*#__PURE__*/_react.default.createElement(DropIcon, null),
    label: inTopLevel ? null : label
  }));
};

var ButtonSwitch = function ButtonSwitch(_ref13) {
  var data = _ref13.data,
      blockSpec = _ref13.blockSpec,
      isEditing = _ref13.isEditing,
      setIsEditing = _ref13.setIsEditing,
      isCollapsed = _ref13.isCollapsed,
      setIsCollapsed = _ref13.setIsCollapsed,
      isSelected = _ref13.isSelected,
      setIsSelected = _ref13.setIsSelected,
      isDebugging = _ref13.isDebugging,
      setIsDebugging = _ref13.setIsDebugging,
      interactionDisabled = _ref13.interactionDisabled,
      inTopLevel = _ref13.inTopLevel,
      feature = _ref13.feature,
      fieldInfo = _ref13.fieldInfo,
      parentId = _ref13.parentId;

  if (feature === _.EXTRA_TYPES.LOCKED_INDICATOR) {
    return /*#__PURE__*/_react.default.createElement(LockIndicatorExtra, {
      locked: !data.canEdit,
      inTopLevel: inTopLevel,
      interactionDisabled: interactionDisabled
    });
  } else if (feature === _.EXTRA_TYPES.NAME_EDIT_TOGGLE) {
    return /*#__PURE__*/_react.default.createElement(NameEditToggleExtra, {
      isEditing: isEditing,
      setIsEditing: setIsEditing,
      locked: !data.canEdit,
      inTopLevel: inTopLevel,
      interactionDisabled: interactionDisabled
    });
  } else if (feature === _.EXTRA_TYPES.COLLAPSE_TOGGLE) {
    return /*#__PURE__*/_react.default.createElement(CollapseToggleExtra, {
      isCollapsed: isCollapsed,
      setIsCollapsed: setIsCollapsed,
      inTopLevel: inTopLevel,
      interactionDisabled: interactionDisabled
    });
  } else if (feature === _.EXTRA_TYPES.SELECTION_TOGGLE) {
    return /*#__PURE__*/_react.default.createElement(SelectionToggleExtra, {
      isSelected: isSelected,
      setIsSelected: setIsSelected,
      inTopLevel: inTopLevel
    });
  } else if (feature === _.EXTRA_TYPES.DEBUG_TOGGLE) {
    return /*#__PURE__*/_react.default.createElement(DebugToggleExtra, {
      isDebugging: isDebugging,
      setIsDebugging: setIsDebugging,
      inTopLevel: inTopLevel
    });
  } else if (feature === _.EXTRA_TYPES.DELETE_BUTTON) {
    return /*#__PURE__*/_react.default.createElement(DeleteExtra, {
      data: data,
      inTopLevel: inTopLevel,
      locked: interactionDisabled,
      fieldInfo: fieldInfo,
      parentId: parentId
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.ADD_ARGUMENT) {
    return /*#__PURE__*/_react.default.createElement(AddArgumentExtra, {
      data: data,
      argumentType: feature === null || feature === void 0 ? void 0 : feature.argumentType,
      interactionDisabled: interactionDisabled,
      inTopLevel: inTopLevel
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.ADD_ARGUMENT_GROUP) {
    return /*#__PURE__*/_react.default.createElement(AddArgumentGroupExtra, {
      data: data,
      allowed: feature === null || feature === void 0 ? void 0 : feature.allowed,
      interactionDisabled: interactionDisabled,
      inTopLevel: inTopLevel
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.FUNCTION_BUTTON) {
    return /*#__PURE__*/_react.default.createElement(FunctionButtonExtra, {
      actionInfo: feature,
      data: data,
      blockSpec: blockSpec,
      interactionDisabled: interactionDisabled,
      inTopLevel: inTopLevel
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.INDICATOR) {
    return /*#__PURE__*/_react.default.createElement(IndicatorExtra, {
      value: feature.accessor(data),
      label: feature.label,
      inTopLevel: inTopLevel,
      interactionDisabled: interactionDisabled
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.ADD_ARGUMENT) {
    return /*#__PURE__*/_react.default.createElement(AddArgumentGroupExtra, {
      data: data,
      allowed: feature === null || feature === void 0 ? void 0 : feature.allowed,
      interactionDisabled: interactionDisabled,
      inTopLevel: inTopLevel
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.DROPDOWN) {
    return /*#__PURE__*/_react.default.createElement(DropdownExtra, {
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
      fieldInfo: fieldInfo
    });
  } else {
    return null;
  }
};

var ExtraBar = function ExtraBar(_ref14) {
  var _blockSpec$extras;

  var data = _ref14.data,
      blockSpec = _ref14.blockSpec,
      isEditing = _ref14.isEditing,
      setIsEditing = _ref14.setIsEditing,
      isCollapsed = _ref14.isCollapsed,
      setIsCollapsed = _ref14.setIsCollapsed,
      isSelected = _ref14.isSelected,
      setIsSelected = _ref14.setIsSelected,
      isDebugging = _ref14.isDebugging,
      setIsDebugging = _ref14.setIsDebugging,
      interactionDisabled = _ref14.interactionDisabled,
      fieldInfo = _ref14.fieldInfo,
      parentId = _ref14.parentId;
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
  }, blockSpec === null || blockSpec === void 0 ? void 0 : (_blockSpec$extras = blockSpec.extras) === null || _blockSpec$extras === void 0 ? void 0 : _blockSpec$extras.map(function (extra, extraIdx) {
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
      parentId: parentId
    });
  }));
};

exports.ExtraBar = ExtraBar;