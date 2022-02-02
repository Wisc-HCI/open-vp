"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Environment;

var _Canvas = require("./Canvas");

var _Drawer = require("./Drawer");

var _DragLayer = require("./DragLayer");

var _reactDndHtml5Backend = require("react-dnd-html5-backend");

var _reactDnd = require("react-dnd");

var _ProgrammingContext = require("./ProgrammingContext");

var _grommet = require("grommet");

var _reactFlowRenderer = require("react-flow-renderer");

function Environment(_ref) {
  var store = _ref.store,
      highlightColor = _ref.highlightColor;
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
      }
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
  return /*#__PURE__*/React.createElement(_grommet.Grommet, {
    theme: theme
  }, /*#__PURE__*/React.createElement(_ProgrammingContext.ProgrammingProvider, {
    store: store
  }, /*#__PURE__*/React.createElement(_reactDnd.DndProvider, {
    backend: _reactDndHtml5Backend.HTML5Backend
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      padding: 0,
      margin: 0,
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "row"
    }
  }, /*#__PURE__*/React.createElement(_Drawer.Drawer, {
    highlightColor: highlightColor
  }), /*#__PURE__*/React.createElement(_reactFlowRenderer.ReactFlowProvider, null, /*#__PURE__*/React.createElement(_Canvas.Canvas, {
    highlightColor: highlightColor
  }))), /*#__PURE__*/React.createElement(_DragLayer.DragLayer, {
    highlightColor: highlightColor
  }))));
}