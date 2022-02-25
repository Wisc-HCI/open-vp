"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TAP = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _components = require("../components");

var _fi = require("react-icons/fi");

var _reactUseMeasure = _interopRequireDefault(require("react-use-measure"));

var _excluded = ["drawers", "objectTypes", "programData", "drawerWidth"];
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
var _default = {
  title: 'TAP',
  component: _components.Environment
}; // More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

exports.default = _default;

var Template = function Template(args) {
  var drawers = args.drawers,
      objectTypes = args.objectTypes,
      programData = args.programData,
      drawerWidth = args.drawerWidth,
      otherArgs = (0, _objectWithoutProperties2.default)(args, _excluded);

  var _useMeasure = (0, _reactUseMeasure.default)(),
      _useMeasure2 = (0, _slicedToArray2.default)(_useMeasure, 2),
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
  }, /*#__PURE__*/_react.default.createElement(_components.Environment, Object.assign({}, otherArgs, {
    store: _components.useDefaultProgrammingStore,
    height: bounds.height,
    width: bounds.width,
    drawerWidth: drawerWidth
  })));
};

var TAP = Template.bind({}); // More on args: https://storybook.js.org/docs/react/writing-stories/args

exports.TAP = TAP;
TAP.args = {
  highlightColor: '#ff00ff',
  drawerWidth: 235,
  drawers: [{
    title: "Rules",
    dataType: _components.DATA_TYPES.INSTANCE,
    objectTypes: ["whenType", "wheneverType", "whileType"],
    icon: _fi.FiClipboard
  }, {
    title: "Actions",
    dataType: _components.DATA_TYPES.REFERENCE,
    objectType: 'actionType',
    icon: _fi.FiBox
  }, {
    title: "States",
    dataType: _components.DATA_TYPES.REFERENCE,
    objectType: 'stateType',
    icon: _fi.FiGrid
  }, {
    title: "Events",
    dataType: _components.DATA_TYPES.REFERENCE,
    objectType: 'eventType',
    icon: _fi.FiGrid
  } // { title: "Action Expressions", dataType: DATA_TYPES.INSTANCE, objectTypes: [], icon: FiClipboard },
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
          contents: [_components.EXTRA_TYPES.NAME_EDIT_TOGGLE, _components.EXTRA_TYPES.COLLAPSE_TOGGLE]
        }]
      },
      referenceBlock: null,
      properties: {
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
    wheneverType: {
      name: 'Whenever',
      type: _components.TYPES.OBJECT,
      instanceBlock: {
        onCanvas: true,
        color: "#a3879e",
        icon: _fi.FiBriefcase,
        hideNewPrefix: true,
        extras: [{
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          contents: [_components.EXTRA_TYPES.NAME_EDIT_TOGGLE, _components.EXTRA_TYPES.COLLAPSE_TOGGLE]
        }]
      },
      referenceBlock: null,
      properties: {
        stateExpression: {
          name: 'Whenever',
          accepts: ['stateType', "notStateType", "isConstantStateType", "andStateType", "orStateType", "toStateType", "constantStateType"],
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
          contents: [_components.EXTRA_TYPES.NAME_EDIT_TOGGLE, _components.EXTRA_TYPES.COLLAPSE_TOGGLE]
        }]
      },
      referenceBlock: null,
      properties: {
        stateExpression: {
          name: 'While',
          accepts: ['stateType', "notStateType", "isConstantStateType", "andStateType", "orStateType", "toStateType", "constantStateType"],
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