"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Environment;

var _react = _interopRequireDefault(require("react"));

var _Canvas = require("./Canvas");

var _Drawer = require("./Drawer");

var _DragLayer = require("./DragLayer");

var _rdndmbHtml5ToTouch = require("rdndmb-html5-to-touch");

var _reactDndMultiBackend = require("react-dnd-multi-backend");

var _reactDnd = require("react-dnd");

var _ProgrammingContext = require("./ProgrammingContext");

var _grommet = require("grommet");

var _reactFlowRenderer = require("react-flow-renderer");

// import { HTML5Backend } from "react-dnd-html5-backend";
function Environment(_ref) {
  var store = _ref.store,
      highlightColor = _ref.highlightColor,
      height = _ref.height,
      width = _ref.width,
      drawerWidth = _ref.drawerWidth;
  var theme = {
    name: 'SimpleVP',
    rounding: 4,
    defaultMode: 'dark',
    global: {
      colors: {
        brand: highlightColor,
        background: '#111111',
        control: highlightColor
      },
      font: {
        family: "Helvetica"
      },
      focus: {
        border: {
          color: highlightColor
        }
      },
      input: {
        padding: 4,
        extend: {
          backgroundColor: '#FFFFFF55'
        }
      } // edgeSize: {large: 50, small: 10, medium: 15}

    },
    button: {
      border: {
        radius: "10px"
      }
    },
    radioButton: {
      size: "16px",
      border: {
        color: '#00000088'
      }
    },
    checkBox: {
      size: "20px",
      border: {
        color: '#00000088'
      },
      color: highlightColor,
      hover: {
        border: {
          color: '#00000088'
        }
      }
    },
    textInput: {
      disabled: {
        opacity: 1
      }
    }
  };
  return /*#__PURE__*/_react.default.createElement(_grommet.Grommet, {
    theme: theme
  }, /*#__PURE__*/_react.default.createElement(_ProgrammingContext.ProgrammingProvider, {
    store: store
  }, /*#__PURE__*/_react.default.createElement(_reactDnd.DndProvider, {
    backend: _reactDndMultiBackend.MultiBackend,
    options: _rdndmbHtml5ToTouch.HTML5toTouch
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: 0,
      margin: 0,
      display: 'flex',
      height: height,
      width: width
    }
  }, /*#__PURE__*/_react.default.createElement(_Drawer.Drawer, {
    highlightColor: highlightColor,
    drawerWidth: drawerWidth ? drawerWidth : 235
  }), /*#__PURE__*/_react.default.createElement(_reactFlowRenderer.ReactFlowProvider, null, /*#__PURE__*/_react.default.createElement(_Canvas.Canvas, {
    highlightColor: highlightColor,
    drawerWidth: drawerWidth ? drawerWidth : 235
  }))), /*#__PURE__*/_react.default.createElement(_DragLayer.DragLayer, {
    highlightColor: highlightColor
  }))));
}