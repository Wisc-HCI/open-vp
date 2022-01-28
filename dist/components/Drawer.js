"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Drawer = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = require("react");

var _Block = require("./Block");

var _web = require("@react-spring/web");

var _reactSpring = require("react-spring");

var _ProgrammingContext = require("./ProgrammingContext");

var _grommet = require("grommet");

var _fi = require("react-icons/fi");

var _Constants = require("./Constants");

var instanceTemplateFromSpec = function instanceTemplateFromSpec(type, objectSpec) {
  var data = {
    id: type,
    type: type,
    dataType: _Constants.DATA_TYPES.INSTANCE,
    properties: {},
    name: "New ".concat(objectSpec.name),
    canDelete: true,
    canEdit: true
  };

  if (objectSpec.properties) {
    Object.entries(objectSpec.properties).forEach(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          propKey = _ref2[0],
          propInfo = _ref2[1];

      data.properties[propKey] = propInfo.default;
    });
  }

  if (objectSpec.instanceBlock.onCanvas) {
    data.position = {
      x: 0,
      y: 0
    };
  }

  return data;
};

var referenceTemplateFromSpec = function referenceTemplateFromSpec(type, instanceReference, objectSpec) {
  var data = {
    id: type,
    type: type,
    ref: instanceReference.id,
    dataType: _Constants.DATA_TYPES.REFERENCE,
    canDelete: true,
    canEdit: true
  };

  if (objectSpec.referenceBlock.onCanvas) {
    data.position = {
      x: 0,
      y: 0
    };
  }

  return data;
};

var callTemplateFromSpec = function callTemplateFromSpec(type, functionReference, objectSpec) {
  var data = {
    id: type,
    type: type,
    ref: functionReference.id,
    dataType: _Constants.DATA_TYPES.CALL,
    properties: {},
    canDelete: true,
    canEdit: true
  };

  if (objectSpec.callBlock.onCanvas) {
    data.position = {
      x: 0,
      y: 0
    };
  }

  functionReference.arguments && Object.entries(functionReference.arguments).forEach(function (_ref3) {
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
        argKey = _ref4[0],
        argInfo = _ref4[1];

    data.properties[argKey] = argInfo.default;
  });
  return data;
};

var TipContent = function TipContent(_ref5) {
  var message = _ref5.message;
  return /*#__PURE__*/React.createElement(_grommet.Box, {
    direction: "row",
    align: "center"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 22 22",
    version: "1.1",
    width: "22px",
    height: "22px"
  }, /*#__PURE__*/React.createElement("polygon", {
    fill: "grey",
    points: "6 2 18 12 6 22",
    transform: "matrix(-1 0 0 1 30 0)"
  })), /*#__PURE__*/React.createElement(_grommet.Box, {
    background: "grey",
    direction: "row",
    pad: "small",
    round: "xxsmall"
  }, /*#__PURE__*/React.createElement(_grommet.Text, {
    color: "#313131"
  }, message)));
};

var Drawer = function Drawer(_ref6) {
  var highlightColor = _ref6.highlightColor;

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      searchTerm = _useState2[0],
      setSearchTerm = _useState2[1];

  var blocks = (0, _ProgrammingContext.useProgrammingStore)(function (store) {
    var blocks = [];

    if (store.activeDrawer !== null) {
      var drawer = store.programSpec.drawers[store.activeDrawer];

      if (drawer.dataType === _Constants.DATA_TYPES.INSTANCE) {
        drawer.objectTypes.forEach(function (objectType) {
          blocks.push(instanceTemplateFromSpec(objectType, store.programSpec.objectTypes[objectType]));
        });
      } else if (drawer.dataType === _Constants.DATA_TYPES.REFERENCE) {
        Object.values(store.programData).filter(function (d) {
          return d.dataType === _Constants.DATA_TYPES.INSTANCE && d.type === drawer.objectType;
        }).forEach(function (instanceReference) {
          blocks.push(referenceTemplateFromSpec(drawer.objectType, instanceReference, store.programSpec.objectTypes[drawer.objectType]));
        });
      } else if (drawer.dataType === _Constants.DATA_TYPES.CALL) {
        Object.values(store.programData).filter(function (d) {
          return d.dataType === _Constants.DATA_TYPES.INSTANCE && d.type === drawer.objectType;
        }).forEach(function (functionReference) {
          blocks.push(callTemplateFromSpec(drawer.objectType, functionReference, store.programSpec.objectTypes[drawer.objectType]));
        });
      }
    }

    return blocks;
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
  var drawerStyle = (0, _web.useSpring)({
    width: activeDrawer !== null ? 235 : 0,
    config: _reactSpring.config.stiff
  });
  var sidebarStyle = (0, _web.useSpring)({
    width: activeDrawer !== null ? 285 : 50,
    config: _reactSpring.config.stiff
  });
  return /*#__PURE__*/React.createElement(_web.animated.div, {
    style: (0, _objectSpread2.default)({
      backgroundColor: "black",
      display: 'flex',
      padding: 0
    }, sidebarStyle)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100%',
      width: 50,
      backgroundColor: "#212121",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(_grommet.List, {
    data: drawers,
    border: false,
    align: "center",
    margin: "none",
    pad: "none",
    radius: "none"
  }, function (drawer, drawerIdx) {
    var Icon = drawer.icon;
    return /*#__PURE__*/React.createElement(_grommet.Button, {
      primary: true,
      fill: true,
      tip: {
        content: /*#__PURE__*/React.createElement(TipContent, {
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
        left: 'xxsmall',
        right: 'none'
      },
      round: "small",
      onClick: function onClick() {
        setActiveDrawer(activeDrawer === drawerIdx ? null : drawerIdx);
      },
      icon: /*#__PURE__*/React.createElement(Icon, null)
    });
  })), /*#__PURE__*/React.createElement(_web.animated.div, {
    style: (0, _objectSpread2.default)({
      height: '100%',
      backgroundColor: '#2f2f2f',
      overflow: 'hidden'
    }, drawerStyle)
  }, activeDrawer !== null && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_grommet.Box, {
    background: "#444444",
    direction: "column",
    pad: "small",
    animation: "fadeIn"
  }, /*#__PURE__*/React.createElement(_grommet.Box, {
    direction: "row",
    justify: "between",
    align: "center"
  }, /*#__PURE__*/React.createElement(_grommet.Box, {
    pad: "small"
  }, /*#__PURE__*/React.createElement(_grommet.Text, null, drawers[activeDrawer].title)), drawers[activeDrawer].dataType === _Constants.DATA_TYPES.REFERENCE && /*#__PURE__*/React.createElement(_grommet.Button, {
    secondary: true,
    icon: /*#__PURE__*/React.createElement(_fi.FiPlus, null)
  })), /*#__PURE__*/React.createElement(_grommet.TextInput, {
    size: "small",
    icon: /*#__PURE__*/React.createElement(_fi.FiSearch, {
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
  })), /*#__PURE__*/React.createElement(_grommet.List, {
    data: blocks,
    border: false,
    style: {
      padding: 5,
      width: 235
    },
    margin: "none",
    pad: "none"
  }, function (block, idx) {
    return /*#__PURE__*/React.createElement(_grommet.Box, {
      animation: {
        type: 'fadeIn',
        delay: idx * 100
      },
      style: {
        marginBottom: 5,
        width: 225
      }
    }, /*#__PURE__*/React.createElement(_Block.Block, {
      staticData: block,
      parentId: "drawer",
      bounded: true,
      highlightColor: highlightColor
    }));
  }))));
};

exports.Drawer = Drawer;