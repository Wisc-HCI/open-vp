"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtraBar = void 0;

var _react = require("react");

var _fi = require("react-icons/fi");

var _grommet = require("grommet");

var _ProgrammingContext = require("../ProgrammingContext");

var _web = require("@react-spring/web");

var _reactSpring = require("react-spring");

var _ = require("..");

var _ExpandCarrot = require("./ExpandCarrot");

var FunctionButtonExtra = function FunctionButtonExtra(_ref) {
  var actionInfo = _ref.actionInfo,
      data = _ref.data,
      blockSpec = _ref.blockSpec;

  var _onClick = (0, _ProgrammingContext.useProgrammingStore)((0, _react.useCallback)(function (state) {
    if (typeof actionInfo.onClick === 'function') {
      return actionInfo.onClick;
    } else {
      return state[actionInfo.onClick];
    }
  }, [actionInfo]));

  var ExtraActionIcon = actionInfo.icon ? actionInfo.icon : _fi.FiCircle;
  return /*#__PURE__*/React.createElement(_grommet.Button, {
    plain: true,
    style: {
      padding: '5pt 10pt 5pt 10pt'
    },
    icon: /*#__PURE__*/React.createElement(ExtraActionIcon, null),
    label: actionInfo.label,
    onClick: function onClick() {
      return _onClick(data, blockSpec);
    }
  });
};

var LockIndicatorExtra = function LockIndicatorExtra(_ref2) {
  var locked = _ref2.locked,
      inTopLevel = _ref2.inTopLevel;

  if (locked && inTopLevel) {
    return /*#__PURE__*/React.createElement(_grommet.Box, {
      height: "25px",
      width: "25px",
      justify: "center",
      align: "end"
    }, /*#__PURE__*/React.createElement(_fi.FiLock, null));
  } else if (!locked && inTopLevel) {
    return null;
  } else if (locked && !inTopLevel) {
    return /*#__PURE__*/React.createElement(_grommet.Button, {
      plain: true,
      disabled: true,
      style: {
        padding: '5pt 10pt 5pt 10pt'
      },
      icon: /*#__PURE__*/React.createElement(_fi.FiLock, null),
      label: "Locked"
    });
  } else if (!locked && !inTopLevel) {
    return /*#__PURE__*/React.createElement(_grommet.Button, {
      plain: true,
      disabled: true,
      style: {
        padding: '5pt 10pt 5pt 10pt'
      },
      icon: /*#__PURE__*/React.createElement(_fi.FiUnlock, null),
      label: "Unlocked"
    });
  }
};

var NameEditToggleExtra = function NameEditToggleExtra(_ref3) {
  var isEditing = _ref3.isEditing,
      setIsEditing = _ref3.setIsEditing,
      locked = _ref3.locked,
      inTopLevel = _ref3.inTopLevel;

  if (isEditing && inTopLevel) {
    return /*#__PURE__*/React.createElement(_grommet.Box, {
      height: "25px",
      width: "25px",
      justify: "center",
      align: "end",
      onClick: function onClick() {
        return setIsEditing(!isEditing);
      }
    }, /*#__PURE__*/React.createElement(_fi.FiSave, null));
  } else if (!isEditing && inTopLevel) {
    return /*#__PURE__*/React.createElement(_grommet.Box, {
      height: "25px",
      width: "25px",
      justify: "center",
      align: "end",
      onClick: function onClick() {
        return setIsEditing(!isEditing);
      }
    }, /*#__PURE__*/React.createElement(_fi.FiEdit3, null));
  } else if (isEditing && !inTopLevel) {
    return /*#__PURE__*/React.createElement(_grommet.Button, {
      plain: true,
      disabled: locked,
      style: {
        padding: '5pt 10pt 5pt 10pt'
      },
      icon: /*#__PURE__*/React.createElement(_fi.FiSave, null),
      label: "Save",
      onClick: function onClick() {
        return setIsEditing(!isEditing);
      }
    });
  } else if (!isEditing && !inTopLevel) {
    return /*#__PURE__*/React.createElement(_grommet.Button, {
      plain: true,
      disabled: locked,
      style: {
        padding: '5pt 10pt 5pt 10pt'
      },
      icon: /*#__PURE__*/React.createElement(_fi.FiEdit3, null),
      label: "Edit",
      onClick: function onClick() {
        return setIsEditing(!isEditing);
      }
    });
  }
};

var CollapseToggleExtra = function CollapseToggleExtra(_ref4) {
  var isCollapsed = _ref4.isCollapsed,
      setIsCollapsed = _ref4.setIsCollapsed,
      inTopLevel = _ref4.inTopLevel;

  if (inTopLevel) {
    return /*#__PURE__*/React.createElement(_grommet.Box, {
      height: "25px",
      width: "25px",
      justify: "center",
      align: "end",
      onClick: function onClick() {
        return setIsCollapsed(!isCollapsed);
      }
    }, /*#__PURE__*/React.createElement(_ExpandCarrot.ExpandCarrot, {
      expanded: !isCollapsed
    }));
  } else {
    return /*#__PURE__*/React.createElement(_grommet.Button, {
      plain: true,
      style: {
        padding: '5pt 10pt 5pt 10pt'
      },
      icon: /*#__PURE__*/React.createElement(_ExpandCarrot.ExpandCarrot, {
        expanded: !isCollapsed
      }),
      label: isCollapsed ? 'Expand' : 'Minimize',
      onClick: function onClick() {
        return setIsCollapsed(!isCollapsed);
      }
    });
  }
};

var IndicatorExtra = function IndicatorExtra(_ref5) {
  var value = _ref5.value,
      label = _ref5.label,
      inTopLevel = _ref5.inTopLevel;

  if (inTopLevel) {
    return /*#__PURE__*/React.createElement(_grommet.Box, {
      height: "25px",
      justify: "center",
      align: "end",
      border: {
        color: '#00000088'
      },
      background: "#00000011",
      round: "full",
      style: {
        color: 'white'
      }
    }, value);
  } else {
    return /*#__PURE__*/React.createElement(_grommet.Button, {
      plain: true,
      style: {
        padding: '5pt 10pt 5pt 10pt'
      },
      icon: /*#__PURE__*/React.createElement(_grommet.Box, {
        height: "25px",
        justify: "center",
        align: "end",
        border: {
          color: '#00000088'
        },
        background: "#00000011",
        round: "full",
        style: {
          color: 'white'
        }
      }, value),
      label: label
    });
  }
};

var DropdownExtra = function DropdownExtra(_ref6) {
  var icon = _ref6.icon,
      contents = _ref6.contents,
      label = _ref6.label,
      inTopLevel = _ref6.inTopLevel,
      data = _ref6.data,
      blockSpec = _ref6.blockSpec,
      isEditing = _ref6.isEditing,
      isCollapsed = _ref6.isCollapsed,
      setIsEditing = _ref6.setIsEditing,
      setIsCollapsed = _ref6.setIsCollapsed,
      interactionDisabled = _ref6.interactionDisabled;
  var DropIcon = icon ? icon : _fi.FiMoreHorizontal;
  return /*#__PURE__*/React.createElement(_grommet.DropButton, {
    disabled: interactionDisabled,
    dropContent: /*#__PURE__*/React.createElement(_grommet.Box, {
      round: "xsmall",
      background: "grey",
      direction: "column",
      align: "start"
    }, contents === null || contents === void 0 ? void 0 : contents.map(function (feature, featureIdx) {
      return /*#__PURE__*/React.createElement(ButtonSwitch, {
        key: featureIdx,
        feature: feature,
        data: data,
        blockSpec: blockSpec,
        inTopLevel: false,
        isEditing: isEditing,
        isCollapsed: isCollapsed,
        setIsEditing: setIsEditing,
        setIsCollapsed: setIsCollapsed,
        interactionDisabled: interactionDisabled
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
  }, inTopLevel ? /*#__PURE__*/React.createElement(_grommet.Box, {
    height: "25px",
    width: "25px",
    justify: "center",
    align: "end"
  }, /*#__PURE__*/React.createElement(DropIcon, null)) : /*#__PURE__*/React.createElement(_grommet.Button, {
    as: "div",
    plain: true,
    style: {
      padding: '5pt 10pt 5pt 10pt'
    },
    icon: /*#__PURE__*/React.createElement(DropIcon, null),
    label: label
  }));
};

var ButtonSwitch = function ButtonSwitch(_ref7) {
  var data = _ref7.data,
      blockSpec = _ref7.blockSpec,
      isEditing = _ref7.isEditing,
      setIsEditing = _ref7.setIsEditing,
      isCollapsed = _ref7.isCollapsed,
      setIsCollapsed = _ref7.setIsCollapsed,
      interactionDisabled = _ref7.interactionDisabled,
      inTopLevel = _ref7.inTopLevel,
      feature = _ref7.feature;

  if (feature === _.EXTRA_TYPES.LOCKED_INDICATOR) {
    return /*#__PURE__*/React.createElement(LockIndicatorExtra, {
      locked: !data.canEdit,
      inTopLevel: inTopLevel,
      interactionDisabled: interactionDisabled
    });
  } else if (feature === _.EXTRA_TYPES.NAME_EDIT_TOGGLE) {
    return /*#__PURE__*/React.createElement(NameEditToggleExtra, {
      isEditing: isEditing,
      setIsEditing: setIsEditing,
      locked: !data.canEdit,
      inTopLevel: inTopLevel,
      interactionDisabled: interactionDisabled
    });
  } else if (feature === _.EXTRA_TYPES.COLLAPSE_TOGGLE) {
    return /*#__PURE__*/React.createElement(CollapseToggleExtra, {
      isCollapsed: isCollapsed,
      setIsCollapsed: setIsCollapsed,
      inTopLevel: inTopLevel,
      interactionDisabled: interactionDisabled
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.FUNCTION_BUTTON) {
    return /*#__PURE__*/React.createElement(FunctionButtonExtra, {
      actionInfo: feature,
      data: data,
      blockSpec: blockSpec,
      interactionDisabled: interactionDisabled
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.INDICATOR) {
    return /*#__PURE__*/React.createElement(IndicatorExtra, {
      value: feature.accessor(data),
      label: feature.label,
      inTopLevel: inTopLevel,
      interactionDisabled: interactionDisabled
    });
  } else if ((feature === null || feature === void 0 ? void 0 : feature.type) === _.EXTRA_TYPES.DROPDOWN) {
    return /*#__PURE__*/React.createElement(DropdownExtra, {
      data: data,
      blockSpec: blockSpec,
      icon: feature === null || feature === void 0 ? void 0 : feature.icon,
      contents: feature === null || feature === void 0 ? void 0 : feature.contents,
      label: feature === null || feature === void 0 ? void 0 : feature.label,
      inTopLevel: false,
      isEditing: isEditing,
      isCollapsed: isCollapsed,
      setIsEditing: setIsEditing,
      setIsCollapsed: setIsCollapsed,
      interactionDisabled: interactionDisabled
    });
  } else {
    return null;
  }
};

var ExtraBar = function ExtraBar(_ref8) {
  var _blockSpec$extras;

  var data = _ref8.data,
      blockSpec = _ref8.blockSpec,
      isEditing = _ref8.isEditing,
      setIsEditing = _ref8.setIsEditing,
      isCollapsed = _ref8.isCollapsed,
      setIsCollapsed = _ref8.setIsCollapsed,
      interactionDisabled = _ref8.interactionDisabled;
  return /*#__PURE__*/React.createElement(_grommet.Box, {
    direction: "row"
  }, blockSpec === null || blockSpec === void 0 ? void 0 : (_blockSpec$extras = blockSpec.extras) === null || _blockSpec$extras === void 0 ? void 0 : _blockSpec$extras.map(function (extra, extraIdx) {
    return /*#__PURE__*/React.createElement(ButtonSwitch, {
      key: extraIdx,
      data: data,
      blockSpec: blockSpec,
      inTopLevel: true,
      isEditing: isEditing,
      isCollapsed: isCollapsed,
      setIsEditing: setIsEditing,
      setIsCollapsed: setIsCollapsed,
      interactionDisabled: interactionDisabled,
      feature: extra
    });
  }));
};

exports.ExtraBar = ExtraBar;