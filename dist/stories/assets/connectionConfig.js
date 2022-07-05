"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _components = require("../../components");

var _fi = require("react-icons/fi");

var _Constants = require("../../components/Constants");

require("../rotate.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Synchonizing = function Synchonizing() {
  return /*#__PURE__*/_react.default.createElement(_fi.FiRefreshCw, {
    className: "rotate"
  });
};

var connectionConfig = {
  drawers: [{
    title: "Structures",
    dataType: _components.DATA_TYPES.INSTANCE,
    objectTypes: ["functionType", "operationType"],
    icon: _fi.FiClipboard
  }, {
    title: "Functions",
    dataType: _components.DATA_TYPES.CALL,
    objectType: "functionType",
    icon: _fi.FiLogOut
  }, {
    title: "Hats",
    dataType: _components.DATA_TYPES.INSTANCE,
    objectTypes: ["hatType"],
    icon: _fi.FiGrid
  }, {
    title: "Boots",
    dataType: _components.DATA_TYPES.INSTANCE,
    objectTypes: ["bootType"],
    icon: _fi.FiBox
  }],
  objectTypes: {
    programType: {
      name: "Root",
      type: _components.TYPES.OBJECT,
      instanceBlock: {
        onCanvas: true,
        color: "#3f3f3f",
        icon: _fi.FiBriefcase,
        connections: {
          bottom: {
            direction: _components.CONNECTIONS.OUTBOUND,
            allowed: ["operationType"]
          }
        },
        extras: [{
          type: _components.EXTRA_TYPES.INDICATOR_ICON,
          accessor: function accessor(data) {
            return /*#__PURE__*/_react.default.createElement(Synchonizing, null);
          },
          label: "Status"
        }, {
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          label: "Custom More...",
          contents: [_components.EXTRA_TYPES.NAME_EDIT_TOGGLE, _components.EXTRA_TYPES.LOCKED_INDICATOR, _components.EXTRA_TYPES.SELECTION_TOGGLE, _components.EXTRA_TYPES.DIVIDER, {
            // icon: FiMoreHorizontal,
            label: "More Options",
            type: _components.EXTRA_TYPES.DROPDOWN,
            contents: [_components.EXTRA_TYPES.NAME_EDIT_TOGGLE, _components.EXTRA_TYPES.COLLAPSE_TOGGLE, _components.EXTRA_TYPES.LOCKED_INDICATOR, {
              type: _components.EXTRA_TYPES.FUNCTION_BUTTON,
              onClick: "updateItemBlockColors",
              label: "Cycle Color",
              icon: _fi.FiFeather
            }, {
              type: _components.EXTRA_TYPES.INDICATOR_ICON,
              accessor: function accessor(data) {
                return /*#__PURE__*/_react.default.createElement(Synchonizing, null);
              },
              label: "Synchronizing"
            }]
          }]
        }, _components.EXTRA_TYPES.DIVIDER, _components.EXTRA_TYPES.LOCKED_INDICATOR]
      },
      referenceBlock: null
    },
    functionType: {
      name: "Function",
      type: _components.TYPES.FUNCTION,
      instanceBlock: {
        onCanvas: true,
        color: "#62869e",
        icon: _fi.FiLogOut,
        extras: [_components.EXTRA_TYPES.LOCKED_INDICATOR, {
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          contents: [_components.EXTRA_TYPES.SELECTION_TOGGLE, _components.EXTRA_TYPES.NAME_EDIT_TOGGLE, _components.EXTRA_TYPES.DELETE_BUTTON, _components.EXTRA_TYPES.LOCKED_INDICATOR, _components.EXTRA_TYPES.DEBUG_TOGGLE, {
            type: _components.EXTRA_TYPES.ADD_ARGUMENT_GROUP,
            allowed: ["hatType", "bootType"]
          }, {
            type: _components.EXTRA_TYPES.ADD_ARGUMENT,
            argumentType: "hatType"
          }]
        }, {
          type: _components.EXTRA_TYPES.ADD_ARGUMENT_GROUP,
          allowed: ["hatType", "bootType"]
        }]
      },
      callBlock: {
        onCanvas: false,
        color: "#62869e",
        icon: _fi.FiLogOut,
        extras: [{
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          contents: [_components.EXTRA_TYPES.DEBUG_TOGGLE]
        }]
      },
      properties: {
        children: {
          name: "Children",
          accepts: ["functionType", "blockType", "operationType"],
          default: [],
          isList: true,
          fullWidth: true
        }
      }
    },
    operationType: {
      name: "Operation",
      type: _components.TYPES.OBJECT,
      instanceBlock: {
        onCanvas: true,
        color: "#629e6c",
        icon: _fi.FiClipboard,
        connections: {
          bottom: {
            direction: _components.CONNECTIONS.OUTBOUND,
            allowed: ["operationType"],
            limitOne: true
          },
          top: {
            direction: _components.CONNECTIONS.INBOUND,
            allowed: ["operationType", "programType"],
            limitOne: false
          }
        },
        extras: [_components.EXTRA_TYPES.LOCKED_INDICATOR, {
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          contents: [_components.EXTRA_TYPES.DELETE_BUTTON, _components.EXTRA_TYPES.DEBUG_TOGGLE, _components.EXTRA_TYPES.SELECTION_TOGGLE]
        }],
        hideNewPrefix: true
      },
      properties: {
        hat: {
          name: "Hat",
          accepts: ["hatType"],
          default: null,
          isList: false
        },
        boot: {
          name: "Boot",
          accepts: ["bootType"],
          default: null,
          isList: false
        },
        speed: {
          name: "Speed",
          type: _Constants.SIMPLE_PROPERTY_TYPES.NUMBER,
          default: 1,
          min: 0,
          max: 20,
          step: 0.1,
          units: "m/s",
          visualScaling: 0.1,
          visualPrecision: 1
        },
        doFunky: {
          name: "Do Funky",
          type: _Constants.SIMPLE_PROPERTY_TYPES.BOOLEAN,
          default: false
        },
        greeting: {
          name: "Greeting",
          type: _Constants.SIMPLE_PROPERTY_TYPES.STRING,
          default: ""
        },
        time: {
          name: "Time",
          type: _Constants.SIMPLE_PROPERTY_TYPES.OPTIONS,
          options: [{
            value: "am",
            label: "AM"
          }, {
            value: "pm",
            label: "PM"
          }],
          default: "am"
        }
      }
    },
    hatType: {
      name: "Hat",
      type: _components.TYPES.OBJECT,
      referenceBlock: {
        onCanvas: false,
        color: "#AD1FDE",
        icon: _fi.FiGrid,
        extras: [_components.EXTRA_TYPES.LOCKED_INDICATOR, {
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          contents: [_components.EXTRA_TYPES.DELETE_BUTTON, _components.EXTRA_TYPES.DEBUG_TOGGLE, _components.EXTRA_TYPES.NAME_EDIT_TOGGLE, _components.EXTRA_TYPES.SELECTION_TOGGLE]
        }]
      },
      instanceBlock: {
        onCanvas: true,
        color: "#AD1FDE",
        icon: _fi.FiGrid,
        extras: [_components.EXTRA_TYPES.LOCKED_INDICATOR, {
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          contents: [_components.EXTRA_TYPES.DELETE_BUTTON, _components.EXTRA_TYPES.DEBUG_TOGGLE, _components.EXTRA_TYPES.NAME_EDIT_TOGGLE, _components.EXTRA_TYPES.SELECTION_TOGGLE]
        }]
      }
    },
    bootType: {
      name: "Boot",
      type: _components.TYPES.OBJECT,
      referenceBlock: {
        onCanvas: false,
        color: "#B3A533",
        icon: _fi.FiGrid,
        extras: [_components.EXTRA_TYPES.LOCKED_INDICATOR, {
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          contents: [_components.EXTRA_TYPES.DELETE_BUTTON, _components.EXTRA_TYPES.DEBUG_TOGGLE, _components.EXTRA_TYPES.SELECTION_TOGGLE]
        }]
      },
      instanceBlock: {
        onCanvas: true,
        color: "#B3A533",
        icon: _fi.FiGrid,
        extras: [_components.EXTRA_TYPES.LOCKED_INDICATOR, {
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          contents: [_components.EXTRA_TYPES.DELETE_BUTTON, _components.EXTRA_TYPES.DEBUG_TOGGLE, _components.EXTRA_TYPES.SELECTION_TOGGLE]
        }]
      }
    }
  }
};
var _default = connectionConfig;
exports.default = _default;