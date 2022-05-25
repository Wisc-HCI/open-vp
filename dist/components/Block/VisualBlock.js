"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualBlock = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _DropZone = require("./DropZone");

var _List = require("./List");

var _Constants = require("../Constants");

var _fi = require("react-icons/fi");

var _grommet = require("grommet");

var _ProgrammingContext = require("../ProgrammingContext");

var _ExtraBar = require("./ExtraBar");

var _Selectable = require("./Selectable");

var _2 = require(".");

var _lodash = require("lodash");

var _ExpandCarrot = require("./ExpandCarrot");

var _Progress = require("./Progress");

var _Utility = require("./Utility");

var VisualBlock = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _data$refData, _data$refData2, _data$refData3, _data$refData4, _Object$entries, _Object$entries2;

  var data = _ref.data,
      x = _ref.x,
      y = _ref.y,
      scale = _ref.scale,
      typeSpec = _ref.typeSpec,
      _ref$onCanvas = _ref.onCanvas,
      onCanvas = _ref$onCanvas === void 0 ? false : _ref$onCanvas,
      _ref$interactionDisab = _ref.interactionDisabled,
      interactionDisabled = _ref$interactionDisab === void 0 ? false : _ref$interactionDisab,
      _ref$bounded = _ref.bounded,
      bounded = _ref$bounded === void 0 ? false : _ref$bounded,
      highlightColor = _ref.highlightColor,
      context = _ref.context,
      fieldInfo = _ref.fieldInfo,
      parentId = _ref.parentId,
      style = _ref.style,
      progress = _ref.progress;
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
  var setIsEditing = (0, _ProgrammingContext.useProgrammingStore)(function (store) {
    return store.updateItemEditing;
  });
  var setIsSelected = (0, _ProgrammingContext.useProgrammingStore)(function (store) {
    return store.updateItemSelected;
  });
  var updateItemSimpleProperty = (0, _ProgrammingContext.useProgrammingStore)(function (store) {
    return store.updateItemSimpleProperty;
  });
  var setLocked = (0, _ProgrammingContext.useProgrammingStore)(function (state) {
    return state.setLocked;
  });
  var locked = (0, _ProgrammingContext.useProgrammingStore)(function (state) {
    return state.locked;
  });
  var minified = blockSpec.minified && data.dataType === _Constants.DATA_TYPES.INSTANCE;
  var simpleProperties = typeSpec.properties ? (0, _lodash.pickBy)(typeSpec.properties, function (entry) {
    return Object.values(_Constants.SIMPLE_PROPERTY_TYPES).includes(entry.type) && entry.type !== _Constants.SIMPLE_PROPERTY_TYPES.IGNORED;
  }) : {};
  var standardProperties = typeSpec.properties ? (0, _lodash.omitBy)(typeSpec.properties, function (entry) {
    return Object.values(_Constants.SIMPLE_PROPERTY_TYPES).includes(entry.type);
  }) : {};
  var Icon = blockSpec.icon ? blockSpec.icon : _fi.FiSquare;
  var name = [_Constants.DATA_TYPES.CALL, _Constants.DATA_TYPES.REFERENCE].includes(data.dataType) ? data === null || data === void 0 ? void 0 : (_data$refData = data.refData) === null || _data$refData === void 0 ? void 0 : _data$refData.name : data === null || data === void 0 ? void 0 : data.name;
  var editing = data.editing || ((_data$refData2 = data.refData) === null || _data$refData2 === void 0 ? void 0 : _data$refData2.editing);
  var selected = data.selected || ((_data$refData3 = data.refData) === null || _data$refData3 === void 0 ? void 0 : _data$refData3.selected);
  var canDragBlockRFR = onCanvas && blockSpec.onCanvas && !editing && !locked; // console.log("canDrag", { canDragBlockRFR, data, onCanvas, blockspecCanvas:blockSpec.onCanvas, editing, locked });

  var stopPropFn = function stopPropFn(e) {
    e.stopPropagation();
  };

  var stopPropArgs = {
    onClick: stopPropFn,
    onMouseDown: stopPropFn,
    onDrag: stopPropFn // focusIndicator: false,
    // hoverIndicator: false

  };
  return /*#__PURE__*/_react.default.createElement(_Utility.ContextMenu, null, /*#__PURE__*/_react.default.createElement(_Utility.ContextMenuTrigger, {
    asChild: true
  }, /*#__PURE__*/_react.default.createElement(_Selectable.Selectable // role="Handle"
  , {
    selected: selected,
    highlightColor: highlightColor,
    className: canDragBlockRFR ? null : "nodrag",
    ref: ref,
    style: (0, _objectSpread2.default)({
      minWidth: 175,
      width: bounded ? "inherit" : "max-content",
      backgroundColor: blockSpec.color,
      borderRadius: 3,
      padding: minified ? 0 : 4,
      flex: bounded ? 1 : null,
      transform: "translate(".concat(x ? x : 0, "px, ").concat(y ? y : 0, "px) scale(").concat(scale ? scale : 1, ")"),
      WebkitTransform: "translate(".concat(x ? x : 0, "px, ").concat(y ? y : 0, "px) scale(").concat(scale ? scale : 1, ")")
    }, blockStyle)
  }, /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    className: canDragBlockRFR ? null : "nodrag",
    flex: true,
    gap: "xsmall",
    direction: "row",
    justify: "between",
    margin: "".concat(minified ? 1 : 4, "pt"),
    alignContent: "between",
    align: "center"
  }, !minified && /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    flex: true,
    align: "center",
    direction: "row",
    gap: "xsmall"
  }, /*#__PURE__*/_react.default.createElement(Icon, Object.assign({}, stopPropArgs, {
    style: {
      backgroundColor: "#22222299",
      color: "white",
      padding: 9,
      borderRadius: 5,
      boxShadow: "0 0 0 1px #222222"
    }
  })), /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    flex: true
  }, /*#__PURE__*/_react.default.createElement(_Utility.Input, {
    className: canDragBlockRFR ? null : "nodrag",
    onMouseEnter: editing ? function (_) {
      return setLocked(true);
    } : null,
    onMouseLeave: editing ? function (_) {
      return setLocked(false);
    } : null,
    value: name // textAlign='start'
    // focusIndicator={false}
    ,
    disabled: !data.editing && !((_data$refData4 = data.refData) !== null && _data$refData4 !== void 0 && _data$refData4.editing),
    css: {
      boxShadow: editing ? "0 0 0 1px ".concat(highlightColor) : "0 0 0 1px #222222",
      "&:focus": {
        boxShadow: "0 0 0 2px ".concat(highlightColor)
      },
      backgroundColor: editing ? "".concat(highlightColor, "99") : "#22222299"
    },
    onChange: function onChange(e) {
      console.log("changing", e);
      updateItemName(data.refData ? data.refData.id : data.id, e.target.value);
    }
  }))), minified && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Utility.ScrollRegion, {
    className: canDragBlockRFR ? null : "nodrag",
    width: "100%",
    horizontal: true
  }, /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    className: canDragBlockRFR ? null : "nodrag",
    direction: "row",
    gap: "xxsmall" // pad={{ top: "none", bottom: "none", left: "xxsmall" }}
    ,
    border: "right",
    alignContent: "center",
    align: "center"
  }, (_Object$entries = Object.entries(typeSpec.properties)) === null || _Object$entries === void 0 ? void 0 : _Object$entries.map(function (_ref2) {
    var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
        fieldKey = _ref3[0],
        fieldInfo = _ref3[1];

    if (Object.values(_Constants.SIMPLE_PROPERTY_TYPES).includes(fieldInfo.type) && fieldInfo.type !== _Constants.SIMPLE_PROPERTY_TYPES.IGNORED) {
      if (fieldInfo.type === _Constants.SIMPLE_PROPERTY_TYPES.OPTIONS) {
        var currentText = fieldInfo.options.filter(function (option) {
          return option.value === data.properties[fieldKey];
        }).map(function (option) {
          return option.label;
        })[0];
        return /*#__PURE__*/_react.default.createElement(_Utility.DropdownMenu, {
          key: fieldKey
        }, /*#__PURE__*/_react.default.createElement(_Utility.DropdownMenuTrigger, {
          asChild: true
        }, /*#__PURE__*/_react.default.createElement(_grommet.Box, {
          as: "div",
          style: {
            minWidth: currentText.length * 12
          },
          direction: "row",
          align: "center",
          hoverIndicator: "#00000055",
          focusIndicator: false,
          onClick: function onClick() {},
          alignContent: "center",
          background: "#00000022",
          round: "xxsmall",
          margin: "xxsmall",
          height: "30pt",
          pad: {
            left: "xxsmall",
            right: "xxsmall"
          }
        }, currentText)), /*#__PURE__*/_react.default.createElement(_Utility.DropdownMenuContent, null, /*#__PURE__*/_react.default.createElement(_Utility.DropdownMenuRadioGroup, {
          value: data.properties[fieldKey],
          onValueChange: function onValueChange(value) {
            return updateItemSimpleProperty(data.id, fieldKey, value);
          }
        }, fieldInfo.options.map(function (option, idx) {
          return /*#__PURE__*/_react.default.createElement(_Utility.DropdownMenuRadioItem, {
            key: idx,
            value: option.value,
            highlightColor: highlightColor,
            disabled: interactionDisabled
          }, /*#__PURE__*/_react.default.createElement(_Utility.DropdownMenuItemIndicator, null, /*#__PURE__*/_react.default.createElement(_fi.FiCheck, null)), option.label);
        }))));
      } else if (fieldInfo.type === _Constants.SIMPLE_PROPERTY_TYPES.BOOLEAN) {
        return /*#__PURE__*/_react.default.createElement(_grommet.Box, {
          key: fieldKey,
          style: {
            minWidth: 43
          }
        }, /*#__PURE__*/_react.default.createElement(_Utility.ToolTip, {
          key: fieldKey,
          content: /*#__PURE__*/_react.default.createElement("div", {
            key: "label",
            style: {
              textAlign: "center"
            }
          }, fieldInfo.name)
        }, /*#__PURE__*/_react.default.createElement(_grommet.Box, {
          key: "sliderContainer",
          style: {
            minWidth: 43
          },
          focusIndicator: false
        }, /*#__PURE__*/_react.default.createElement(_Utility.Switch, {
          value: data.properties[fieldKey],
          onCheckedChange: function onCheckedChange(value) {
            return updateItemSimpleProperty(data.id, fieldKey, value);
          },
          highlightColor: highlightColor,
          disabled: interactionDisabled
        }))));
      } else if (fieldInfo.type === _Constants.SIMPLE_PROPERTY_TYPES.STRING) {
        var currentValue = data.properties[fieldKey];
        return /*#__PURE__*/_react.default.createElement(_grommet.Box, {
          key: fieldKey,
          style: {
            minWidth: currentValue.length * 11 + 3,
            maxWidth: currentValue.length * 11 + 5
          }
        }, /*#__PURE__*/_react.default.createElement(_Utility.ToolTip, {
          content: /*#__PURE__*/_react.default.createElement("div", {
            key: "label",
            style: {
              textAlign: "center"
            }
          }, fieldInfo.name)
        }, /*#__PURE__*/_react.default.createElement(_Utility.Input, {
          className: "nodrag",
          key: fieldKey,
          placeholder: fieldInfo.name,
          onMouseEnter: function onMouseEnter(_) {
            return setLocked(true);
          },
          onMouseLeave: function onMouseLeave(_) {
            return setLocked(false);
          } // css={{
          //   fontSize: 14,
          //   minWidth: 30,
          //   textAlign: "center",
          //   color: "#00000088",
          //   backgroundColor: "#efefef50",
          //   boxShadow: `0 0 0 1px #efefef`,
          // }}
          ,
          value: currentValue,
          disabled: interactionDisabled,
          onChange: function onChange(e) {
            return updateItemSimpleProperty(data.id, fieldKey, e.target.value);
          }
        })));
      } else if (fieldInfo.type === _Constants.SIMPLE_PROPERTY_TYPES.NUMBER) {
        return /*#__PURE__*/_react.default.createElement(_grommet.Box, {
          key: fieldKey,
          style: {
            minWidth: 40
          }
        }, /*#__PURE__*/_react.default.createElement(_Utility.ToolTip, {
          content: /*#__PURE__*/_react.default.createElement("div", {
            key: "label",
            style: {
              textAlign: "center"
            }
          }, fieldInfo.name)
        }, /*#__PURE__*/_react.default.createElement(_grommet.Box, {
          focusIndicator: false
        }, /*#__PURE__*/_react.default.createElement(_Utility.NumberInput, {
          onMouseEnter: function onMouseEnter(_) {
            return setLocked(true);
          },
          onMouseLeave: function onMouseLeave(_) {
            return setLocked(false);
          },
          className: "nodrag",
          key: fieldKey,
          style: {
            width: 105,
            marginRight: 3
          },
          min: fieldInfo.min !== undefined ? fieldInfo.min : 0,
          max: fieldInfo.max !== undefined ? fieldInfo.max : 10,
          step: fieldInfo.step,
          suffix: fieldInfo.units,
          value: data.properties[fieldKey],
          disabled: interactionDisabled,
          visualScaling: fieldInfo.visualScaling,
          onChange: function onChange(value) {
            return updateItemSimpleProperty(data.id, fieldKey, value);
          }
        }))));
      }
    } else {
      // const innerLabel = !fieldInfo.fullWidth ? fieldInfo.name : '';
      return /*#__PURE__*/_react.default.createElement(_Utility.ToolTip, {
        key: fieldKey,
        content: /*#__PURE__*/_react.default.createElement("div", {
          key: "label",
          style: {
            textAlign: "center"
          }
        }, fieldInfo.name)
      }, /*#__PURE__*/_react.default.createElement(_grommet.Box, {
        key: fieldKey,
        focusIndicator: false
      }, fieldInfo.isList ? /*#__PURE__*/_react.default.createElement(_List.List, {
        ids: data.properties[fieldKey],
        fieldInfo: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, fieldInfo), {}, {
          value: fieldKey
        }),
        parentId: data.id,
        interactionDisabled: interactionDisabled,
        highlightColor: highlightColor,
        context: context
      }) : /*#__PURE__*/_react.default.createElement(_DropZone.DropZone, {
        id: data.properties[fieldKey],
        fieldInfo: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, fieldInfo), {}, {
          value: fieldKey,
          name: !fieldInfo.fullWidth ? "" : fieldInfo.name
        }),
        parentId: data.id,
        interactionDisabled: interactionDisabled,
        highlightColor: highlightColor,
        context: context
      })));
    }

    return null;
  })))), (blockSpec === null || blockSpec === void 0 ? void 0 : blockSpec.extras) && /*#__PURE__*/_react.default.createElement(_ExtraBar.ExtraBar, {
    highlightColor: highlightColor,
    fieldInfo: fieldInfo,
    parentId: parentId,
    interactionDisabled: interactionDisabled,
    data: data,
    blockSpec: blockSpec,
    isEditing: editing,
    isCollapsed: isCollapsed,
    isSelected: selected,
    isDebugging: isDebugging,
    setIsEditing: data.dataType === _Constants.DATA_TYPES.REFERENCE || data.dataType === _Constants.DATA_TYPES.CALL ? function (v) {
      return setIsEditing(data.ref, v);
    } : function (v) {
      return setIsEditing(data.id, v);
    },
    setIsSelected: data.dataType === _Constants.DATA_TYPES.REFERENCE || data.dataType === _Constants.DATA_TYPES.CALL ? function (v) {
      // console.log(data);
      setIsSelected(data.ref, v);
    } : function (v) {
      // console.log(data);
      setIsSelected(data.id, v);
    },
    setIsCollapsed: setIsCollapsed,
    setIsDebugging: setIsDebugging
  })), /*#__PURE__*/_react.default.createElement(_Progress.ProgressBar, {
    progress: progress,
    color: highlightColor
  }), !isCollapsed && !minified && /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    animation: ["fadeIn", "zoomIn"]
  }, data.dataType === _Constants.DATA_TYPES.INSTANCE && typeSpec.type === _Constants.TYPES.FUNCTION && data.arguments && Object.keys(data.arguments).length > 0 && /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    gap: "xsmall",
    direction: "column",
    style: {
      borderRadius: 4,
      display: "flex",
      margin: 4,
      padding: 5,
      backgroundColor: "rgba(0,0,0,0.2)"
    }
  }, data.argumentBlockData.map(function (argBlockData, argIdx) {
    return /*#__PURE__*/_react.default.createElement(_2.Block, {
      key: argIdx,
      staticData: argBlockData,
      parentId: data.id,
      bounded: true,
      highlightColor: highlightColor,
      context: context,
      fieldInfo: {
        name: "",
        value: null,
        accepts: [],
        isSpawner: true
      }
    });
  })), Object.keys(simpleProperties).length > 0 && data.dataType === _Constants.DATA_TYPES.INSTANCE && /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    margin: "xsmall",
    background: "#ffffff50",
    round: "xxsmall",
    align: "center",
    justify: "between",
    direction: "column",
    pad: "xsmall",
    flex: true
  }, /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    justify: "between",
    flex: true,
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/_react.default.createElement(_grommet.Text, {
    margin: {
      left: "medium"
    }
  }, "Settings"), /*#__PURE__*/_react.default.createElement(_grommet.Button, {
    plain: true,
    style: {
      padding: "5pt 10pt 5pt 10pt"
    },
    icon: /*#__PURE__*/_react.default.createElement(_ExpandCarrot.ExpandCarrot, {
      expanded: !simplePropertiesCollapsed
    }),
    onClick: interactionDisabled ? function (e) {
      e.stopPropagation();
    } : function (e) {
      setSimplePropertiesCollapsed(!simplePropertiesCollapsed);
      e.stopPropagation();
    }
  })), !simplePropertiesCollapsed && /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    flex: true,
    animation: ["fadeIn", "slideDown"],
    style: {
      width: "100%"
    }
  }, Object.entries(simpleProperties).map(function (_ref4) {
    var _ref5 = (0, _slicedToArray2.default)(_ref4, 2),
        propKey = _ref5[0],
        propInfo = _ref5[1];

    return /*#__PURE__*/_react.default.createElement(_grommet.Box, {
      key: propKey,
      direction: "row",
      background: "#ffffff50",
      round: "xsmall",
      flex: true,
      pad: "small",
      justify: "between",
      align: "center",
      margin: {
        bottom: "xsmall"
      }
    }, /*#__PURE__*/_react.default.createElement(_grommet.Text, {
      size: "small",
      color: "#00000088"
    }, propInfo.name), propInfo.type === _Constants.SIMPLE_PROPERTY_TYPES.BOOLEAN && /*#__PURE__*/_react.default.createElement(_Utility.Switch, {
      value: data.properties[propKey],
      onCheckedChange: function onCheckedChange(value) {
        return updateItemSimpleProperty(data.id, propKey, value);
      },
      highlightColor: highlightColor,
      disabled: interactionDisabled
    }), propInfo.type === _Constants.SIMPLE_PROPERTY_TYPES.NUMBER && /*#__PURE__*/_react.default.createElement(_grommet.Box, {
      width: "small",
      align: "end"
    }, /*#__PURE__*/_react.default.createElement(_Utility.NumberInput, {
      onMouseEnter: function onMouseEnter(_) {
        return setLocked(true);
      },
      onMouseLeave: function onMouseLeave(_) {
        return setLocked(false);
      },
      className: "nodrag",
      min: propInfo.min !== undefined ? propInfo.min : 0,
      max: propInfo.max !== undefined ? propInfo.max : 10,
      style: {
        width: 105
      },
      step: propInfo.step,
      suffix: propInfo.units,
      value: data.properties[propKey],
      disabled: interactionDisabled,
      visualScaling: propInfo.visualScaling,
      onChange: function onChange(value) {
        return updateItemSimpleProperty(data.id, propKey, value);
      }
    })), propInfo.type === _Constants.SIMPLE_PROPERTY_TYPES.STRING && /*#__PURE__*/_react.default.createElement(_grommet.Box, {
      width: "xsmall"
    }, /*#__PURE__*/_react.default.createElement(_Utility.Input, {
      className: "nodrag",
      onMouseEnter: function onMouseEnter(_) {
        return setLocked(true);
      },
      onMouseLeave: function onMouseLeave(_) {
        return setLocked(false);
      },
      size: "xsmall",
      textAlign: "right" // style={{ color: "#00000088" }}
      ,
      value: data.properties[propKey],
      disabled: interactionDisabled,
      onChange: function onChange(e) {
        return updateItemSimpleProperty(data.id, propKey, e.target.value);
      }
    })), propInfo.type === _Constants.SIMPLE_PROPERTY_TYPES.OPTIONS && /*#__PURE__*/_react.default.createElement(_grommet.RadioButtonGroup, {
      name: propInfo.name,
      disabled: interactionDisabled,
      size: "xsmall",
      style: {
        color: "#00000088",
        fontSize: 13
      },
      options: propInfo.options,
      value: data.properties[propKey],
      onChange: function onChange(e) {
        return updateItemSimpleProperty(data.id, propKey, e.target.value);
      }
    }));
  }))), data.dataType === _Constants.DATA_TYPES.CALL && data.argumentBlockData.map(function (argInfo, argIdx) {
    return /*#__PURE__*/_react.default.createElement(_grommet.Box, {
      key: argIdx,
      direction: "row",
      margin: "xsmall",
      background: "#ffffff20",
      round: "xxsmall",
      alignContent: "between",
      align: "center",
      justify: "between",
      flex: true
    }, /*#__PURE__*/_react.default.createElement(_grommet.Box, {
      pad: "xsmall",
      alignContent: "center",
      align: "center"
    }, argInfo.name), /*#__PURE__*/_react.default.createElement(_DropZone.DropZone, {
      id: data.properties[argInfo.ref],
      fieldInfo: {
        name: "",
        value: argInfo.ref,
        accepts: [argInfo.type]
      },
      parentId: data.id,
      interactionDisabled: interactionDisabled,
      highlightColor: highlightColor,
      context: context
    }));
  }), data.dataType === _Constants.DATA_TYPES.INSTANCE && ((_Object$entries2 = Object.entries(standardProperties)) === null || _Object$entries2 === void 0 ? void 0 : _Object$entries2.map(function (_ref6) {
    var _ref7 = (0, _slicedToArray2.default)(_ref6, 2),
        fieldKey = _ref7[0],
        fieldInfo = _ref7[1];

    var innerLabel = !fieldInfo.fullWidth ? fieldInfo.name : "";
    return /*#__PURE__*/_react.default.createElement(_grommet.Box, {
      key: fieldKey,
      direction: "row",
      margin: fieldInfo.fullWidth ? "none" : "xsmall",
      background: fieldInfo.fullWidth ? null : "#ffffff20",
      round: "xxsmall",
      alignContent: "between",
      align: "center",
      justify: "between",
      flex: true
    }, /*#__PURE__*/_react.default.createElement(_grommet.Box, {
      pad: fieldInfo.fullWidth ? "none" : "xsmall",
      alignContent: "center",
      align: "center"
    }, innerLabel), fieldInfo.isList ? /*#__PURE__*/_react.default.createElement(_List.List, {
      ids: data.properties[fieldKey],
      fieldInfo: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, fieldInfo), {}, {
        value: fieldKey
      }),
      parentId: data.id,
      interactionDisabled: interactionDisabled,
      highlightColor: highlightColor,
      context: context
    }) : /*#__PURE__*/_react.default.createElement(_DropZone.DropZone, {
      id: data.properties[fieldKey],
      fieldInfo: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, fieldInfo), {}, {
        value: fieldKey,
        name: !fieldInfo.fullWidth ? "" : fieldInfo.name
      }),
      parentId: data.id,
      interactionDisabled: interactionDisabled,
      highlightColor: highlightColor,
      context: context
    }));
  }))), isDebugging && /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    round: "small",
    pad: "small",
    background: "#00000044",
    style: {
      whiteSpace: "pre",
      color: "white",
      fontFamily: "monospace"
    }
  }, JSON.stringify((0, _objectSpread2.default)((0, _objectSpread2.default)({}, data), {}, {
    interactionDisabled: interactionDisabled ? true : false
  }), null, "  ")))), /*#__PURE__*/_react.default.createElement(_Utility.ContextMenuContent, null, /*#__PURE__*/_react.default.createElement(_ExtraBar.RightClickMenu, {
    highlightColor: highlightColor,
    fieldInfo: fieldInfo,
    parentId: parentId,
    interactionDisabled: interactionDisabled,
    data: data,
    blockSpec: blockSpec,
    isEditing: editing,
    isCollapsed: isCollapsed,
    isSelected: selected,
    isDebugging: isDebugging,
    setIsEditing: data.dataType === _Constants.DATA_TYPES.REFERENCE || data.dataType === _Constants.DATA_TYPES.CALL ? function (v) {
      return setIsEditing(data.ref, v);
    } : function (v) {
      return setIsEditing(data.id, v);
    },
    setIsSelected: data.dataType === _Constants.DATA_TYPES.REFERENCE || data.dataType === _Constants.DATA_TYPES.CALL ? function (v) {
      console.log(data);
      setIsSelected(data.ref, v);
    } : function (v) {
      console.log(data);
      setIsSelected(data.id, v);
    },
    setIsCollapsed: setIsCollapsed,
    setIsDebugging: setIsDebugging
  })));
}));
exports.VisualBlock = VisualBlock;