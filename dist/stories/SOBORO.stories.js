"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SOBORO = void 0;

var _react = _interopRequireWildcard(require("react"));

var _components = require("../components");

var _fi = require("react-icons/fi");

var _reactUseMeasure = _interopRequireDefault(require("react-use-measure"));

var _excluded = ["drawers", "objectTypes", "programData", "drawerWidth"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
var _default = {
  title: 'SOBORO',
  component: _components.Environment
}; // More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

exports.default = _default;

var Template = function Template(args) {
  var drawers = args.drawers,
      objectTypes = args.objectTypes,
      programData = args.programData,
      drawerWidth = args.drawerWidth,
      otherArgs = _objectWithoutProperties(args, _excluded);

  var _useMeasure = (0, _reactUseMeasure.default)(),
      _useMeasure2 = _slicedToArray(_useMeasure, 2),
      ref = _useMeasure2[0],
      bounds = _useMeasure2[1];

  (0, _react.useLayoutEffect)(function () {
    _components.useDefaultProgrammingStore.setState({
      programSpec: {
        drawers: drawers,
        objectTypes: objectTypes
      },
      programData: programData
    });
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    style: {
      display: 'flex',
      height: '100vh',
      flexDirection: 'row',
      backgroundColor: otherArgs.highlightColor
    }
  }, /*#__PURE__*/_react.default.createElement(_components.Environment, _extends({}, otherArgs, {
    store: _components.useDefaultProgrammingStore,
    height: bounds.height,
    width: bounds.width,
    drawerWidth: drawerWidth
  })));
};

var STATE_EXPRESSIONS = ['notStateExprType', 'allStateExprType', 'anyStateExprType']; // const EVENT_EXPRESSIONS = [];
// const RETURNS_EVENT = [];

var RETURNS_STATE = ['stateType'].concat(STATE_EXPRESSIONS); // const RETURNS_ACTION = [];
// const RETURNS_CONTROLLER = [];

var SOBORO = Template.bind({}); // More on args: https://storybook.js.org/docs/react/writing-stories/args

exports.SOBORO = SOBORO;
SOBORO.args = {
  highlightColor: '#ff00ff',
  drawerWidth: 235,
  drawers: [// Rules
  {
    title: "Rules",
    dataType: _components.DATA_TYPES.INSTANCE,
    objectTypes: ["whenType", "whileType"],
    icon: _fi.FiClipboard
  }, // Action Expressions
  {
    title: "Actions",
    dataType: _components.DATA_TYPES.REFERENCE,
    objectType: 'actionType',
    icon: _fi.FiBox
  }, // { title: "Action Expressions", dataType: DATA_TYPES.INSTANCE, objectTypes: ['notStateType'], icon: FiGrid},
  // State Expressions
  {
    title: "States",
    dataType: _components.DATA_TYPES.REFERENCE,
    objectType: 'stateType',
    icon: _fi.FiGrid
  }, {
    title: "State Expressions",
    dataType: _components.DATA_TYPES.INSTANCE,
    objectTypes: STATE_EXPRESSIONS,
    icon: _fi.FiGrid
  }, {
    title: "Events",
    dataType: _components.DATA_TYPES.REFERENCE,
    objectType: 'eventType',
    icon: _fi.FiGrid
  } // { title: "Event Expressions", dataType: DATA_TYPES.INSTANCE, objectTypes: ['notStateType'], icon: FiGrid},
  // { title: "Action Expressions", dataType: DATA_TYPES.INSTANCE, objectTypes: [], icon: FiClipboard },
  // { title: "State Expressions", dataType: DATA_TYPES.INSTANCE, objectTypes: ["notStateType", "isConstantStateType", "andStateType", "orStateType", "toStateType", "constantStateType"], icon: FiClipboard },
  // { title: "Event Expressions", dataType: DATA_TYPES.INSTANCE, objectTypes: ["notEventType", "isConstantEventType", "orEventType", "toEventType", "constantEventType", "emptyEventType"], icon: FiClipboard },
  // { title: "Controllers", dataType: DATA_TYPES.INSTANCE, objectTypes: ["negationControllerType","sinControllerType","cosControllerType","addControllerType","subtractControllerType"], icon: FiClipboard },
  ],
  objectTypes: {
    whenType: {
      name: 'When',
      type: _components.TYPES.OBJECT,
      instanceBlock: {
        onCanvas: true,
        color: "#8790a3",
        icon: _fi.FiBriefcase,
        hideNewPrefix: true,
        extras: [{
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          contents: [_components.EXTRA_TYPES.SELECTION_TOGGLE, _components.EXTRA_TYPES.COLLAPSE_TOGGLE]
        }]
      },
      referenceBlock: null,
      properties: {
        listenFor: {
          name: 'Listen For',
          type: _components.SIMPLE_PROPERTY_TYPES.OPTIONS,
          options: [{
            value: 'first',
            label: 'First Occurance'
          }, {
            value: 'all',
            label: 'All Occurances'
          }],
          default: 'first'
        },
        eventExpression: {
          name: 'When',
          accepts: ['eventType', "notEventType", "isConstantEventType", "orEventType", "toEventType", "constantEventType", "emptyEventType"],
          default: null,
          isList: false,
          fullWidth: false
        },
        actionExpression: {
          name: 'Do',
          accepts: ['actionType'],
          default: null,
          isList: false,
          fullWidth: false
        }
      }
    },
    whileType: {
      name: 'While',
      type: _components.TYPES.OBJECT,
      instanceBlock: {
        onCanvas: true,
        color: "#6C5799",
        icon: _fi.FiBriefcase,
        hideNewPrefix: true,
        extras: [{
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          contents: [_components.EXTRA_TYPES.SELECTION_TOGGLE, _components.EXTRA_TYPES.COLLAPSE_TOGGLE]
        }]
      },
      referenceBlock: null,
      properties: {
        stateExpression: {
          name: 'While',
          accepts: RETURNS_STATE,
          default: null,
          isList: false,
          fullWidth: false
        },
        actionExpression: {
          name: 'Do',
          accepts: ['actionType'],
          default: null,
          isList: false,
          fullWidth: false
        }
      }
    },
    actionType: {
      name: 'Action',
      type: _components.TYPES.OBJECT,
      instanceBlock: null,
      referenceBlock: {
        onCanvas: false,
        color: "#fa7645",
        icon: _fi.FiGrid,
        extras: [{
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          contents: [_components.EXTRA_TYPES.DELETE_BUTTON, _components.EXTRA_TYPES.NAME_EDIT_TOGGLE, _components.EXTRA_TYPES.DEBUG_TOGGLE]
        }]
      }
    },
    eventType: {
      name: 'Event',
      type: _components.TYPES.OBJECT,
      instanceBlock: null,
      referenceBlock: {
        onCanvas: false,
        color: "#8a645f",
        icon: _fi.FiGrid,
        extras: [{
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          contents: [_components.EXTRA_TYPES.DELETE_BUTTON, _components.EXTRA_TYPES.NAME_EDIT_TOGGLE, _components.EXTRA_TYPES.DEBUG_TOGGLE]
        }]
      }
    },
    stateType: {
      name: 'State',
      type: _components.TYPES.OBJECT,
      instanceBlock: null,
      referenceBlock: {
        onCanvas: false,
        color: "#89b18d",
        icon: _fi.FiGrid,
        extras: [{
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          contents: [_components.EXTRA_TYPES.DELETE_BUTTON, _components.EXTRA_TYPES.NAME_EDIT_TOGGLE, _components.EXTRA_TYPES.DEBUG_TOGGLE]
        }]
      }
    },
    notStateExprType: {
      name: 'Not-State',
      type: _components.TYPES.OBJECT,
      instanceBlock: {
        onCanvas: false,
        minified: true,
        color: "#677a69",
        icon: _fi.FiGrid,
        extras: [{
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          contents: [_components.EXTRA_TYPES.DELETE_BUTTON, _components.EXTRA_TYPES.NAME_EDIT_TOGGLE, _components.EXTRA_TYPES.DEBUG_TOGGLE]
        }]
      },
      referenceBlock: null,
      properties: {
        stateExpression: {
          name: 'Not',
          accepts: ['stateType', "notStateType", "isConstantStateType", "notStateExprType", "anyStateExprType", "toStateType", "constantStateType"],
          default: null,
          isList: false,
          fullWidth: false
        }
      }
    },
    allStateExprType: {
      name: 'Not-State',
      type: _components.TYPES.OBJECT,
      instanceBlock: {
        onCanvas: false,
        minified: true,
        color: "#677a69",
        icon: _fi.FiGrid,
        extras: [{
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          contents: [_components.EXTRA_TYPES.DELETE_BUTTON, _components.EXTRA_TYPES.NAME_EDIT_TOGGLE, _components.EXTRA_TYPES.DEBUG_TOGGLE]
        }]
      },
      referenceBlock: null,
      properties: {
        expressionType: {
          name: "Type",
          type: _components.SIMPLE_PROPERTY_TYPES.OPTIONS,
          options: [{
            value: 'not',
            label: 'Not'
          }, {
            value: 'is',
            label: 'Is'
          }],
          default: 'not'
        },
        doFunky: {
          name: "Do Funky",
          type: _components.SIMPLE_PROPERTY_TYPES.BOOLEAN,
          default: false
        },
        speed: {
          name: "Speed",
          type: _components.SIMPLE_PROPERTY_TYPES.NUMBER,
          default: 1,
          min: -2,
          max: 2,
          step: 0.1,
          units: 'm/s',
          visualScaling: 0.1,
          visualPrecision: 1
        },
        hat: {
          name: "Hat",
          type: _components.SIMPLE_PROPERTY_TYPES.STRING,
          default: 'Funny'
        },
        stateExpression: {
          name: 'State',
          accepts: ['stateType', "notStateType", "isConstantStateType", "andStateType", "orStateType", "toStateType", "constantStateType"],
          default: null,
          isList: false,
          fullWidth: false
        }
      }
    },
    anyStateExprType: {
      name: 'Not-State',
      type: _components.TYPES.OBJECT,
      instanceBlock: {
        onCanvas: false,
        minified: true,
        color: "#677a69",
        icon: _fi.FiGrid,
        extras: [{
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          contents: [_components.EXTRA_TYPES.DELETE_BUTTON, _components.EXTRA_TYPES.NAME_EDIT_TOGGLE, _components.EXTRA_TYPES.DEBUG_TOGGLE]
        }]
      },
      referenceBlock: null,
      properties: {
        expressionType: {
          name: "Type",
          type: _components.SIMPLE_PROPERTY_TYPES.OPTIONS,
          options: [{
            value: 'not',
            label: 'Not'
          }, {
            value: 'is',
            label: 'Is'
          }],
          default: 'not'
        },
        doFunky: {
          name: "Do Funky",
          type: _components.SIMPLE_PROPERTY_TYPES.BOOLEAN,
          default: false
        },
        speed: {
          name: "Speed",
          type: _components.SIMPLE_PROPERTY_TYPES.NUMBER,
          default: 1,
          min: -2,
          max: 2,
          step: 0.1,
          units: 'm/s',
          visualScaling: 0.1,
          visualPrecision: 1
        },
        hat: {
          name: "Hat",
          type: _components.SIMPLE_PROPERTY_TYPES.STRING,
          default: 'Funny'
        },
        stateExpression: {
          name: 'State',
          accepts: ['stateType', "notStateType", "isConstantStateType", "andStateType", "orStateType", "toStateType", "constantStateType"],
          default: null,
          isList: false,
          fullWidth: false
        }
      }
    }
  },
  programData: {
    "6dewwwwww": {
      id: "6dewwwwww",
      name: 'Play Music',
      type: "actionType",
      dataType: _components.DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false
    },
    "pspssse32": {
      id: "pspssse32",
      name: 'Human Speech',
      type: "eventType",
      dataType: _components.DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false
    },
    "sgssdds32": {
      id: "sgssdds32",
      name: 'Human Face',
      type: "stateType",
      dataType: _components.DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false
    }
  }
};