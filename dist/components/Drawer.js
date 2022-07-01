"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Drawer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Block = require("./Block");

var _ProgrammingContext = require("./ProgrammingContext");

var _grommet = require("grommet");

var _fi = require("react-icons/fi");

var _Constants = require("./Constants");

var _Generators = require("./Generators");

var _reactUseMeasure = _interopRequireDefault(require("react-use-measure"));

var _Utility = require("./Block/Utility");

var _Tooltip = _interopRequireDefault(require("@mui/material/Tooltip"));

var _Typography = _interopRequireDefault(require("@mui/material/Typography"));

var _TextField = _interopRequireDefault(require("@mui/material/TextField"));

var _InputAdornment = _interopRequireDefault(require("@mui/material/InputAdornment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Drawer = function Drawer(_ref) {
  var highlightColor = _ref.highlightColor,
      drawerWidth = _ref.drawerWidth;

  var _useState = (0, _react.useState)(""),
      _useState2 = _slicedToArray(_useState, 2),
      searchTerm = _useState2[0],
      setSearchTerm = _useState2[1];

  var _useMeasure = (0, _reactUseMeasure.default)(),
      _useMeasure2 = _slicedToArray(_useMeasure, 2),
      drawerRef = _useMeasure2[0],
      drawerBounds = _useMeasure2[1]; //   const [headerRef, headerBounds] = useMeasure();


  var blocks = (0, _ProgrammingContext.useProgrammingStore)(function (store) {
    var blocks = [];

    if (store.activeDrawer !== null) {
      var drawer = store.programSpec.drawers[store.activeDrawer];

      if (drawer.dataType === _Constants.DATA_TYPES.INSTANCE) {
        drawer.objectTypes.forEach(function (objectType) {
          blocks.push((0, _Generators.instanceTemplateFromSpec)(objectType, store.programSpec.objectTypes[objectType]));
        });
      } else if (drawer.dataType === _Constants.DATA_TYPES.REFERENCE) {
        Object.values(store.programData).filter(function (d) {
          return d.dataType === _Constants.DATA_TYPES.INSTANCE && d.type === drawer.objectType;
        }).forEach(function (instanceReference) {
          blocks.push((0, _Generators.referenceTemplateFromSpec)(drawer.objectType, instanceReference, store.programSpec.objectTypes[drawer.objectType]));
        });
      } else if (drawer.dataType === _Constants.DATA_TYPES.CALL) {
        Object.values(store.programData).filter(function (d) {
          return d.dataType === _Constants.DATA_TYPES.INSTANCE && d.type === drawer.objectType;
        }).forEach(function (functionReference) {
          blocks.push((0, _Generators.callTemplateFromSpec)(drawer.objectType, functionReference, store.programSpec.objectTypes[drawer.objectType]));
        });
      }
    }

    return blocks.filter(function (block) {
      return block.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === "";
    });
  });
  var hlcolor = highlightColor ? highlightColor : "cyan";
  var drawers = (0, _ProgrammingContext.useProgrammingStore)(function (store) {
    return store.programSpec.drawers;
  });
  var activeDrawer = (0, _ProgrammingContext.useProgrammingStore)(function (store) {
    return store.activeDrawer;
  });
  var setActiveDrawer = (0, _ProgrammingContext.useProgrammingStore)(function (store) {
    return store.setActiveDrawer;
  });
  var addInstance = (0, _ProgrammingContext.useProgrammingStore)(function (store) {
    return store.addInstance;
  }); //   const drawerStyle = useSpring({
  //     width: activeDrawer !== null ? drawerWidth : 0,
  //     config: config.stiff,
  //   });
  //   const sidebarStyle = useSpring({
  //     width: activeDrawer !== null ? drawerWidth + 52 : 52,
  //     config: config.stiff,
  //   });

  return /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    ref: drawerRef,
    direction: "row",
    pad: "none",
    background: "#212121"
  }, /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    gap: "xxsmall",
    pad: "xxsmall",
    direction: "column",
    width: "60px"
  }, drawers.map(function (drawer, drawerIdx) {
    var Icon = drawer.icon;
    return /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
      key: drawerIdx,
      title: /*#__PURE__*/_react.default.createElement(_Typography.default, null, drawer.title),
      arrow: true,
      placement: "right"
    }, /*#__PURE__*/_react.default.createElement(_grommet.Button, {
      primary: true,
      focusIndicator: false,
      hoverIndicator: activeDrawer === drawerIdx ? hlcolor : "#414141",
      color: activeDrawer === drawerIdx ? hlcolor : "#313131",
      margin: {
        top: "xsmall",
        bottom: "none",
        left: "xsmall",
        right: "xsmall"
      },
      round: "small",
      onClick: function onClick() {
        setSearchTerm("");
        setActiveDrawer(activeDrawer === drawerIdx ? null : drawerIdx);
      },
      icon: /*#__PURE__*/_react.default.createElement(Icon, null)
    }));
  })), /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    direction: "column"
  }, /*#__PURE__*/_react.default.createElement(_grommet.Collapsible, {
    direction: "horizontal",
    open: activeDrawer !== null
  }, activeDrawer !== null && /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    background: "#2f2f2f",
    flex: true,
    direction: "column",
    width: "".concat(drawerWidth, "px"),
    animation: [{
      type: "slideRight",
      delay: 0,
      duration: 1000
    }, {
      type: "fadeIn",
      delay: 0,
      duration: 1000
    }]
  }, /*#__PURE__*/_react.default.createElement(_grommet.Box //   ref={headerRef}
  , {
    background: "#444444",
    direction: "column",
    pad: "small",
    height: "110px",
    width: "".concat(drawerWidth, "px")
  }, /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    direction: "row",
    justify: "between",
    align: "center"
  }, /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    pad: "small"
  }, /*#__PURE__*/_react.default.createElement(_grommet.Text, null, drawers[activeDrawer].title)), drawers[activeDrawer].dataType === _Constants.DATA_TYPES.REFERENCE && /*#__PURE__*/_react.default.createElement(_grommet.Button, {
    secondary: true,
    onClick: function onClick() {
      return addInstance(drawers[activeDrawer].objectType);
    },
    icon: /*#__PURE__*/_react.default.createElement(_fi.FiPlus, null)
  })), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    size: "small",
    label: "Search",
    color: "highlightColor",
    value: searchTerm,
    onChange: function onChange(e) {
      return setSearchTerm(e.target.value);
    },
    InputProps: {
      startAdornment: /*#__PURE__*/_react.default.createElement(_InputAdornment.default, {
        position: "start"
      }, /*#__PURE__*/_react.default.createElement(_fi.FiSearch, {
        style: {
          height: 15
        }
      }))
    }
  })), /*#__PURE__*/_react.default.createElement(_Utility.ScrollRegion, {
    height: drawerBounds.height - 110,
    width: drawerWidth,
    vertical: true
  }, blocks.map(function (block, idx) {
    return /*#__PURE__*/_react.default.createElement(_grommet.Box, {
      key: idx,
      animation: {
        type: "fadeIn",
        delay: idx * 30
      },
      style: {
        marginBottom: 5,
        width: drawerWidth - 10
      }
    }, /*#__PURE__*/_react.default.createElement(_Block.Block, {
      staticData: block,
      parentId: "spawner",
      bounded: true,
      highlightColor: highlightColor,
      context: [],
      interactionDisabled: true,
      fieldInfo: {
        name: "",
        value: null,
        accepts: [],
        isSpawner: true
      }
    }));
  }))))));
};

exports.Drawer = Drawer;