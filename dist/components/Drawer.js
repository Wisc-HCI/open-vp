"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Drawer = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _Block = require("./Block");

var _web = require("@react-spring/web");

var _reactSpring = require("react-spring");

var _ProgrammingContext = require("./ProgrammingContext");

var _grommet = require("grommet");

var _fi = require("react-icons/fi");

var _Constants = require("./Constants");

var _Generators = require("./Generators");

var _reactUseMeasure = _interopRequireDefault(require("react-use-measure"));

var TipContent = function TipContent(_ref) {
  var message = _ref.message;
  return /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    direction: "row",
    align: "center"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    viewBox: "0 0 22 22",
    version: "1.1",
    width: "22px",
    height: "22px"
  }, /*#__PURE__*/_react.default.createElement("polygon", {
    fill: "grey",
    points: "6 2 18 12 6 22",
    transform: "matrix(-1 0 0 1 30 0)"
  })), /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    background: "grey",
    direction: "row",
    pad: "small",
    round: "xxsmall"
  }, /*#__PURE__*/_react.default.createElement(_grommet.Text, {
    color: "#313131"
  }, message)));
};

var Drawer = function Drawer(_ref2) {
  var highlightColor = _ref2.highlightColor,
      drawerWidth = _ref2.drawerWidth;

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      searchTerm = _useState2[0],
      setSearchTerm = _useState2[1];

  var _useMeasure = (0, _reactUseMeasure.default)(),
      _useMeasure2 = (0, _slicedToArray2.default)(_useMeasure, 2),
      drawerRef = _useMeasure2[0],
      drawerBounds = _useMeasure2[1];

  var _useMeasure3 = (0, _reactUseMeasure.default)(),
      _useMeasure4 = (0, _slicedToArray2.default)(_useMeasure3, 2),
      headerRef = _useMeasure4[0],
      headerBounds = _useMeasure4[1];

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
      return block.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '';
    });
  });
  var hlcolor = highlightColor ? highlightColor : 'cyan';
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
  });
  var drawerStyle = (0, _web.useSpring)({
    width: activeDrawer !== null ? drawerWidth : 0,
    config: _reactSpring.config.stiff
  });
  var sidebarStyle = (0, _web.useSpring)({
    width: activeDrawer !== null ? drawerWidth + 52 : 52,
    config: _reactSpring.config.stiff
  });
  return /*#__PURE__*/_react.default.createElement(_web.animated.div, {
    style: (0, _objectSpread2.default)({
      backgroundColor: "black",
      display: 'flex',
      padding: 0
    }, sidebarStyle)
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'flex',
      height: '100%',
      width: 52,
      backgroundColor: "#212121",
      padding: 0
    }
  }, /*#__PURE__*/_react.default.createElement(_grommet.List, {
    data: drawers,
    border: false,
    align: "center",
    margin: "none",
    pad: "none",
    radius: "none"
  }, function (drawer, drawerIdx) {
    var Icon = drawer.icon;
    return /*#__PURE__*/_react.default.createElement(_grommet.Button, {
      primary: true,
      tip: {
        content: /*#__PURE__*/_react.default.createElement(TipContent, {
          message: drawer.title
        }),
        plain: true,
        dropProps: {
          align: {
            left: 'right'
          }
        }
      },
      focusIndicator: false,
      hoverIndicator: activeDrawer === drawerIdx ? hlcolor : '#414141',
      color: activeDrawer === drawerIdx ? hlcolor : '#313131',
      margin: {
        top: 'xsmall',
        bottom: 'none',
        left: 'xsmall',
        right: 'xsmall'
      },
      round: "small",
      onClick: function onClick() {
        setSearchTerm('');
        setActiveDrawer(activeDrawer === drawerIdx ? null : drawerIdx);
      },
      icon: /*#__PURE__*/_react.default.createElement(Icon, null)
    });
  })), /*#__PURE__*/_react.default.createElement(_web.animated.div, {
    ref: drawerRef,
    style: (0, _objectSpread2.default)({
      height: '100%',
      backgroundColor: '#2f2f2f',
      overflow: 'hidden'
    }, drawerStyle)
  }, activeDrawer !== null && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    ref: headerRef,
    background: "#444444",
    direction: "column",
    pad: "small",
    animation: "fadeIn"
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
  })), /*#__PURE__*/_react.default.createElement(_grommet.TextInput, {
    size: "small",
    icon: /*#__PURE__*/_react.default.createElement(_fi.FiSearch, {
      style: {
        height: 15
      }
    }),
    placeholder: "search ...",
    focusIndicator: false,
    value: searchTerm,
    onChange: function onChange(e) {
      return setSearchTerm(e.target.value);
    }
  })), /*#__PURE__*/_react.default.createElement(_grommet.Box, {
    style: {
      height: drawerBounds.height - headerBounds.height,
      overflowY: 'scroll'
    }
  }, /*#__PURE__*/_react.default.createElement(_grommet.List, {
    data: blocks,
    border: false,
    style: {
      padding: 5
    },
    margin: "none",
    pad: "none"
  }, function (block, idx) {
    return /*#__PURE__*/_react.default.createElement(_grommet.Box, {
      key: idx,
      animation: {
        type: 'fadeIn',
        delay: idx * 100
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
        name: '',
        value: null,
        accepts: [],
        isSpawner: true
      }
    }));
  })))));
};

exports.Drawer = Drawer;