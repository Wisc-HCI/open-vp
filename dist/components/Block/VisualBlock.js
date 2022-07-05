"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualBlock = void 0;

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

var _ConnectionHandle = require("./ConnectionHandle");

var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));

var _Menu = _interopRequireDefault(require("@mui/material/Menu"));

var _TextField = _interopRequireDefault(require("@mui/material/TextField"));

var _Switch = _interopRequireDefault(require("@mui/material/Switch"));

var _Select = _interopRequireDefault(require("@mui/material/Select"));

var _Tooltip = _interopRequireDefault(require("@mui/material/Tooltip"));

var _Typography = _interopRequireDefault(require("@mui/material/Typography"));

var _Utility = require("./Utility");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      progress = _ref.progress;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      contextMenu = _useState2[0],
      setContextMenu = _useState2[1];

  var handleContextMenu = function handleContextMenu(event) {
    event.preventDefault();
    setContextMenu(contextMenu === null ? {
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6
    } : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
    // Other native context menus might behave different.
    // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
    null);
    event.stopPropagation();
  };

  var handleContextMenuClose = function handleContextMenuClose() {
    setContextMenu(null);
  }; // console.log(data);


  var blockSpec = data && data.dataType === _Constants.DATA_TYPES.REFERENCE ? typeSpec.referenceBlock : data && data.dataType === _Constants.DATA_TYPES.CALL ? typeSpec.callBlock : data ? typeSpec.instanceBlock : {};

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isCollapsed = _useState4[0],
      setIsCollapsed = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isDebugging = _useState6[0],
      setIsDebugging = _useState6[1];

  var _useState7 = (0, _react.useState)(true),
      _useState8 = _slicedToArray(_useState7, 2),
      simplePropertiesCollapsed = _useState8[0],
      setSimplePropertiesCollapsed = _useState8[1];

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
  var simpleProperties = typeSpec && typeSpec.properties ? (0, _lodash.pickBy)(typeSpec.properties, function (entry) {
    return Object.values(_Constants.SIMPLE_PROPERTY_TYPES).includes(entry.type) && entry.type !== _Constants.SIMPLE_PROPERTY_TYPES.IGNORED;
  }) : {};
  var standardProperties = typeSpec && typeSpec.properties ? (0, _lodash.omitBy)(typeSpec.properties, function (entry) {
    return Object.values(_Constants.SIMPLE_PROPERTY_TYPES).includes(entry.type);
  }) : {};
  var Icon = blockSpec.icon ? blockSpec.icon : _fi.FiSquare;
  var dataType = data ? data.dataType : null;
  var name = [_Constants.DATA_TYPES.CALL, _Constants.DATA_TYPES.REFERENCE].includes(dataType) ? data === null || data === void 0 ? void 0 : (_data$refData = data.refData) === null || _data$refData === void 0 ? void 0 : _data$refData.name : data === null || data === void 0 ? void 0 : data.name;
  var editing = data && data.editing || data && ((_data$refData2 = data.refData) === null || _data$refData2 === void 0 ? void 0 : _data$refData2.editing);
  var selected = data && data.selected || data && ((_data$refData3 = data.refData) === null || _data$refData3 === void 0 ? void 0 : _data$refData3.selected);
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

  if (!data) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Selectable.Selectable // role="Handle"
  , {
    selected: selected,
    highlightColor: highlightColor,
    className: canDragBlockRFR ? null : "nodrag",
    ref: ref,
    style: _objectSpread({
      minWidth: 175,
      width: bounded ? "inherit" : "max-content",
      backgroundColor: blockSpec.color,
      borderRadius: 3,
      padding: minified ? 0 : 4,
      display: "block",
      flex: bounded ? 1 : null,
      transform: "translate(".concat(x ? x : 0, "px, ").concat(y ? y : 0, "px) scale(").concat(scale ? scale : 1, ")"),
      WebkitTransform: "translate(".concat(x ? x : 0, "px, ").concat(y ? y : 0, "px) scale(").concat(scale ? scale : 1, ")")
    }, style),
    onContextMenu: handleContextMenu
  }, /*#__PURE__*/_react.default.createElement(_Menu.default, {
    open: contextMenu !== null,
    onClose: handleContextMenuClose,
    anchorReference: "anchorPosition",
    anchorPosition: contextMenu !== null ? {
      top: contextMenu.mouseY,
      left: contextMenu.mouseX
    } : undefined
  }, /*#__PURE__*/_react.default.createElement(_ExtraBar.RightClickMenu, {
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
  })), /*#__PURE__*/_react.default.createElement(_grommet.Box, {
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
  }, /*#__PURE__*/_react.default.createElement(_grommet.Stack, {
    anchor: "center",
    alignSelf: "center"
  }, /*#__PURE__*/_react.default.createElement(_grommet.Box, _extends({
    align: "center",
    justify: "center"
  }, stopPropArgs, {
    style: {
      backgroundColor: "#22222299",
      color: "white",
      padding: 9,
      borderRadius: 5,
      boxShadow: "0 0 0 1px #dddddd55",
      height: "39px",
      width: "39px"
    }
  }), /*#__PURE__*/_react.default.createElement(Icon, null)), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: 30,
      width: 30
    }
  }, /*#__PURE__*/_react.default.createElement(_Progress.ProgressBar, {
    progress: progress,
    color: highlightColor
  }))), /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    flex: true
  }, /*#__PURE__*/_react.default.createElement(_TextField.default // label='Name'
  , {
    size: "small",
    margin: "none",
    variant: "outlined",
    color: "highlightColor",
    className: canDragBlockRFR ? null : "nodrag",
    onMouseEnter: editing ? function (_) {
      return setLocked(true);
    } : null,
    onMouseLeave: editing ? function (_) {
      return setLocked(false);
    } : null,
    disabled: !data.editing && !((_data$refData4 = data.refData) !== null && _data$refData4 !== void 0 && _data$refData4.editing),
    value: name ? name : '',
    onChange: function onChange(e) {
      // console.log("changing", e);
      updateItemName(data.refData ? data.refData.id : data.id, e.target.value);
    },
    InputProps: {
      style: {
        // boxShadow: editing
        //   ? `0 0 0 1px ${highlightColor}`
        //   : `0 0 0 1px #222222`,
        // "&:focus": {
        //   boxShadow: `0 0 0 2px ${highlightColor}`,
        // },
        borderRadius: 5,
        // borderColor: editing ? highlightColor : '#dddddd55',
        // boxShadow: `0 0 0 ${editing?1:0.5}px ${editing?highlightColor:'#dddddd55'}`,
        backgroundColor: editing ? "".concat(highlightColor, "99") : "#22222299"
      }
    } // style={{
    //   // boxShadow: editing
    //   //   ? `0 0 0 1px ${highlightColor}`
    //   //   : `0 0 0 1px #222222`,
    //   // "&:focus": {
    //   //   boxShadow: `0 0 0 2px ${highlightColor}`,
    //   // },
    //   borderRadius: 5,
    //   backgroundColor: editing
    //     ? `${highlightColor}99`
    //     : "#22222299",
    // }}

  }))), minified && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Utility.ScrollRegion, {
    className: canDragBlockRFR ? null : "nodrag",
    width: "100%",
    horizontal: true
  }, /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    className: canDragBlockRFR ? null : "nodrag",
    direction: "row",
    gap: "xxsmall" // pad={{ top: "none", bottom: "none", left: "xxsmall" }}
    // border="right"
    ,
    alignContent: "center",
    align: "center"
  }, (_Object$entries = Object.entries(typeSpec.properties)) === null || _Object$entries === void 0 ? void 0 : _Object$entries.map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        fieldKey = _ref3[0],
        fieldInfo = _ref3[1];

    if (Object.values(_Constants.SIMPLE_PROPERTY_TYPES).includes(fieldInfo.type) && fieldInfo.type !== _Constants.SIMPLE_PROPERTY_TYPES.IGNORED) {
      if (fieldInfo.type === _Constants.SIMPLE_PROPERTY_TYPES.OPTIONS) {
        // const currentText = fieldInfo.options
        //   .filter(
        //     (option) =>
        //       option.value === data.properties[fieldKey]
        //   )
        //   .map((option) => option.label)[0];
        return /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
          key: fieldKey,
          title: /*#__PURE__*/_react.default.createElement(_Typography.default, null, fieldInfo.name),
          arrow: true,
          placement: "bottom"
        }, /*#__PURE__*/_react.default.createElement(_Select.default, {
          key: fieldKey,
          label: fieldInfo.name,
          disabled: interactionDisabled,
          size: "small",
          color: "highlightColor",
          value: data.properties[fieldKey],
          onChange: function onChange(e) {
            return updateItemSimpleProperty(data.id, fieldKey, e.target.value);
          }
        }, fieldInfo.options.map(function (option) {
          return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
            key: option.value,
            value: option.value
          }, option.label);
        })));
      } else if (fieldInfo.type === _Constants.SIMPLE_PROPERTY_TYPES.BOOLEAN) {
        return /*#__PURE__*/_react.default.createElement(_grommet.Box, {
          key: fieldKey,
          style: {
            minWidth: 70
          },
          pad: {
            left: "xsmall",
            right: "xsmall"
          },
          justify: "center"
        }, /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
          key: fieldKey,
          title: /*#__PURE__*/_react.default.createElement(_Typography.default, null, fieldInfo.name),
          arrow: true,
          placement: "bottom"
        }, /*#__PURE__*/_react.default.createElement(_Switch.default, {
          checked: data.properties[fieldKey],
          onChange: function onChange(event) {
            return updateItemSimpleProperty(data.id, fieldKey, event.target.checked);
          },
          color: "highlightColor",
          disabled: interactionDisabled
        })));
      } else if (fieldInfo.type === _Constants.SIMPLE_PROPERTY_TYPES.STRING) {
        var currentValue = data.properties[fieldKey];
        return /*#__PURE__*/_react.default.createElement(_grommet.Box, {
          key: fieldKey,
          style: {
            minWidth: 43
          }
        }, /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
          key: fieldKey,
          title: /*#__PURE__*/_react.default.createElement(_Typography.default, null, fieldInfo.name),
          arrow: true,
          placement: "bottom"
        }, /*#__PURE__*/_react.default.createElement(_grommet.Box, {
          key: fieldKey,
          style: {
            minWidth: 43,
            maxWidth: 100
          }
        }, /*#__PURE__*/_react.default.createElement(_TextField.default, {
          size: "small",
          label: fieldInfo.name,
          color: "highlightColor",
          className: "nodrag",
          key: fieldKey // placeholder={fieldInfo.name}
          ,
          onMouseEnter: function onMouseEnter(_) {
            return setLocked(true);
          },
          onMouseLeave: function onMouseLeave(_) {
            return setLocked(false);
          },
          value: currentValue ? currentValue : '',
          disabled: interactionDisabled,
          onChange: function onChange(e) {
            return updateItemSimpleProperty(data.id, fieldKey, e.target.value);
          }
        }))));
      } else if (fieldInfo.type === _Constants.SIMPLE_PROPERTY_TYPES.NUMBER) {
        return /*#__PURE__*/_react.default.createElement(_grommet.Box, {
          key: fieldKey,
          style: {
            minWidth: 40
          }
        }, /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
          key: fieldKey,
          title: /*#__PURE__*/_react.default.createElement(_Typography.default, null, fieldInfo.name),
          arrow: true,
          placement: "bottom"
        }, /*#__PURE__*/_react.default.createElement(_grommet.Box, {
          key: fieldKey,
          style: {
            minWidth: 43,
            maxWidth: 100
          }
        }, /*#__PURE__*/_react.default.createElement(_Utility.NumberInput, {
          label: fieldInfo.name,
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
            return !interactionDisabled && updateItemSimpleProperty(data.id, fieldKey, value);
          }
        }))));
      }
    } else {
      // const innerLabel = !fieldInfo.fullWidth ? fieldInfo.name : '';
      return /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
        key: fieldKey,
        title: /*#__PURE__*/_react.default.createElement(_Typography.default, null, fieldInfo.name),
        arrow: true,
        placement: "bottom"
      }, /*#__PURE__*/_react.default.createElement(_grommet.Box, {
        key: fieldKey,
        focusIndicator: false
      }, fieldInfo.isList ? /*#__PURE__*/_react.default.createElement(_List.List, {
        ids: data.properties[fieldKey],
        fieldInfo: _objectSpread(_objectSpread({}, fieldInfo), {}, {
          value: fieldKey
        }),
        parentId: data.id,
        interactionDisabled: interactionDisabled,
        highlightColor: highlightColor,
        context: context
      }) : /*#__PURE__*/_react.default.createElement(_DropZone.DropZone, {
        id: data.properties[fieldKey],
        fieldInfo: _objectSpread(_objectSpread({}, fieldInfo), {}, {
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
  })), /*#__PURE__*/_react.default.createElement(_grommet.Collapsible, {
    open: !isCollapsed && !minified
  }, /*#__PURE__*/_react.default.createElement(_grommet.Box, null, data.dataType === _Constants.DATA_TYPES.INSTANCE && typeSpec.type === _Constants.TYPES.FUNCTION && data.arguments && Object.keys(data.arguments).length > 0 && /*#__PURE__*/_react.default.createElement(_grommet.Box, {
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
  })), onCanvas && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, ["top", "bottom", "left", "right"].filter(function (position) {
    var _blockSpec$connection;

    return (_blockSpec$connection = blockSpec.connections) === null || _blockSpec$connection === void 0 ? void 0 : _blockSpec$connection[position];
  }).map(function (position) {
    return /*#__PURE__*/_react.default.createElement(_ConnectionHandle.ConnectionHandle, {
      key: position,
      nodeData: data,
      position: position,
      direction: blockSpec.connections[position].direction,
      allowed: blockSpec.connections[position].allowed,
      highlightColor: highlightColor
    });
  })), Object.keys(simpleProperties).length > 0 && data.dataType === _Constants.DATA_TYPES.INSTANCE && /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    margin: "xsmall",
    background: "#00000055",
    round: "xxsmall",
    align: "center",
    justify: "between",
    direction: "column",
    pad: "xsmall",
    flex: true,
    gap: simplePropertiesCollapsed ? "none" : "xsmall"
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
  })), /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    flex: true,
    width: "100%"
  }, /*#__PURE__*/_react.default.createElement(_grommet.Collapsible, {
    open: !simplePropertiesCollapsed
  }, Object.entries(simpleProperties).map(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        propKey = _ref5[0],
        propInfo = _ref5[1];

    return /*#__PURE__*/_react.default.createElement(_grommet.Box, {
      key: propKey,
      direction: "row",
      background: "#00000055",
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
      color: "#ffffff"
    }, propInfo.name), propInfo.type === _Constants.SIMPLE_PROPERTY_TYPES.BOOLEAN && /*#__PURE__*/_react.default.createElement(_Switch.default, {
      checked: data.properties[propKey],
      onChange: function onChange(event) {
        return updateItemSimpleProperty(data.id, propKey, event.target.checked);
      },
      color: "highlightColor",
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
        console.log(value);
        updateItemSimpleProperty(data.id, propKey, value);
      }
    })), propInfo.type === _Constants.SIMPLE_PROPERTY_TYPES.STRING && /*#__PURE__*/_react.default.createElement(_grommet.Box, {
      width: "xsmall"
    }, /*#__PURE__*/_react.default.createElement(_TextField.default, {
      className: "nodrag",
      color: "highlightColor",
      onMouseEnter: function onMouseEnter(_) {
        return setLocked(true);
      },
      onMouseLeave: function onMouseLeave(_) {
        return setLocked(false);
      },
      size: "small" // style={{ color: "#00000088" }}
      ,
      value: data.properties[propKey] ? data.properties[propKey] : '',
      disabled: interactionDisabled,
      onChange: function onChange(e) {
        return updateItemSimpleProperty(data.id, propKey, e.target.value);
      }
    })), propInfo.type === _Constants.SIMPLE_PROPERTY_TYPES.OPTIONS && /*#__PURE__*/_react.default.createElement(_Select.default, {
      disabled: interactionDisabled,
      size: "small",
      color: "highlightColor",
      value: data.properties[propKey],
      onChange: function onChange(e) {
        return updateItemSimpleProperty(data.id, propKey, e.target.value);
      }
    }, propInfo.options.map(function (option) {
      return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
        key: option.value,
        value: option.value
      }, option.label);
    })) // <RadioButtonGroup
    //   name={propInfo.name}
    //   disabled={interactionDisabled}
    //   size="xsmall"
    //   style={{
    //     color: "#00000088",
    //     fontSize: 13,
    //   }}
    //   options={propInfo.options}
    //   value={data.properties[propKey]}
    //   onChange={(e) =>
    //     updateItemSimpleProperty(
    //       data.id,
    //       propKey,
    //       e.target.value
    //     )
    //   }
    // />
    );
  })))), data.dataType === _Constants.DATA_TYPES.CALL && data.argumentBlockData.map(function (argInfo, argIdx) {
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
    var _ref7 = _slicedToArray(_ref6, 2),
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
      fieldInfo: _objectSpread(_objectSpread({}, fieldInfo), {}, {
        value: fieldKey
      }),
      parentId: data.id,
      interactionDisabled: interactionDisabled,
      highlightColor: highlightColor,
      context: context
    }) : /*#__PURE__*/_react.default.createElement(_DropZone.DropZone, {
      id: data.properties[fieldKey],
      fieldInfo: _objectSpread(_objectSpread({}, fieldInfo), {}, {
        value: fieldKey,
        name: !fieldInfo.fullWidth ? "" : fieldInfo.name
      }),
      parentId: data.id,
      interactionDisabled: interactionDisabled,
      highlightColor: highlightColor,
      context: context
    }));
  })))), /*#__PURE__*/_react.default.createElement(_grommet.Collapsible, {
    open: isDebugging
  }, /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    round: "xsmall",
    pad: "small",
    margin: "xsmall",
    background: "#00000044",
    style: {
      whiteSpace: "pre",
      color: "white",
      fontFamily: "monospace"
    }
  }, JSON.stringify(_objectSpread(_objectSpread({}, data), {}, {
    interactionDisabled: interactionDisabled ? true : false
  }), null, "  "))));
}));
exports.VisualBlock = VisualBlock;