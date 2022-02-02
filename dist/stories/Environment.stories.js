"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Simple = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _components = require("../components");

var _fi = require("react-icons/fi");

var _Constants = require("../components/Constants");

var _excluded = ["drawers", "objectTypes", "programData"];
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
var _default = {
  title: 'Environment',
  component: _components.Environment
}; // More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

exports.default = _default;

var Template = function Template(args) {
  var drawers = args.drawers,
      objectTypes = args.objectTypes,
      programData = args.programData,
      otherArgs = (0, _objectWithoutProperties2.default)(args, _excluded);
  (0, _react.useLayoutEffect)(function () {
    _components.useDefaultProgrammingStore.setState({
      programSpec: {
        drawers: drawers,
        objectTypes: objectTypes
      },
      programData: programData
    });
  });
  return /*#__PURE__*/_react.default.createElement(_components.Environment, Object.assign({}, otherArgs, {
    store: _components.useDefaultProgrammingStore
  }));
};

var Simple = Template.bind({}); // More on args: https://storybook.js.org/docs/react/writing-stories/args

exports.Simple = Simple;
Simple.args = {
  highlightColor: '#ff00ff',
  drawers: [{
    title: "Structures",
    dataType: _components.DATA_TYPES.INSTANCE,
    objectTypes: ["functionType", "operationType"],
    icon: _fi.FiClipboard
  }, {
    title: "Functions",
    dataType: _components.DATA_TYPES.CALL,
    objectType: 'functionType',
    icon: _fi.FiLogOut
  }, {
    title: "Hats",
    dataType: _components.DATA_TYPES.REFERENCE,
    objectType: 'hatType',
    icon: _fi.FiGrid
  }, {
    title: "Boots",
    dataType: _components.DATA_TYPES.REFERENCE,
    objectType: 'bootType',
    icon: _fi.FiBox
  }],
  objectTypes: {
    programType: {
      name: 'Program',
      type: _components.TYPES.OBJECT,
      instanceBlock: {
        onCanvas: true,
        color: "#3f3f3f",
        icon: _fi.FiBriefcase,
        collapse: true,
        extras: [{
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          contents: [_components.EXTRA_TYPES.NAME_EDIT_TOGGLE, _components.EXTRA_TYPES.LOCKED_INDICATOR, {
            icon: _fi.FiMoreHorizontal,
            label: 'More Options',
            type: _components.EXTRA_TYPES.DROPDOWN,
            contents: [_components.EXTRA_TYPES.NAME_EDIT_TOGGLE, _components.EXTRA_TYPES.LOCKED_INDICATOR]
          }]
        }, _components.EXTRA_TYPES.LOCKED_INDICATOR]
      },
      referenceBlock: null,
      properties: {
        children: {
          name: 'Children',
          accepts: ['operationType', 'functionType'],
          default: [],
          isList: true,
          fullWidth: true
        }
      }
    },
    functionType: {
      name: 'Function',
      type: _components.TYPES.FUNCTION,
      instanceBlock: {
        onCanvas: true,
        color: "#62869e",
        icon: _fi.FiLogOut,
        collapse: true,
        extras: [_components.EXTRA_TYPES.LOCKED_INDICATOR, {
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          contents: [_components.EXTRA_TYPES.LOCKED_INDICATOR]
        }]
      },
      callBlock: {
        onCanvas: false,
        color: "#62869e",
        icon: _fi.FiLogOut
      },
      properties: {
        children: {
          name: 'Children',
          accepts: ['operationType'],
          default: [],
          isList: true,
          fullWidth: true
        }
      }
    },
    operationType: {
      name: 'Operation',
      type: _components.TYPES.OBJECT,
      instanceBlock: {
        onCanvas: false,
        color: "#629e6c",
        icon: _fi.FiClipboard,
        extras: [_components.EXTRA_TYPES.LOCKED_INDICATOR, {
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          actions: []
        }]
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
        children: {
          name: "Children",
          accepts: ["operationType", 'functionType'],
          default: [],
          isList: true
        },
        speed: {
          name: "Speed",
          type: _Constants.SIMPLE_PROPERTY_TYPES.NUMBER,
          default: 1,
          min: 0,
          max: 2
        },
        doFunky: {
          name: "Do Funky",
          type: _Constants.SIMPLE_PROPERTY_TYPES.BOOLEAN,
          default: false
        },
        greeting: {
          name: "Greeting",
          type: _Constants.SIMPLE_PROPERTY_TYPES.STRING,
          default: ''
        },
        time: {
          name: "Time",
          type: _Constants.SIMPLE_PROPERTY_TYPES.OPTIONS,
          options: [{
            value: 'am',
            label: 'AM'
          }, {
            value: 'pm',
            label: 'PM'
          }],
          default: 'am'
        }
      }
    },
    hatType: {
      name: 'Hat',
      type: _components.TYPES.OBJECT,
      instanceBlock: null,
      referenceBlock: {
        onCanvas: false,
        color: "#AD1FDE",
        icon: _fi.FiGrid,
        extras: [_components.EXTRA_TYPES.LOCKED_INDICATOR, {
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          actions: []
        }]
      }
    },
    bootType: {
      name: 'Boot',
      type: _components.TYPES.OBJECT,
      instanceBlock: null,
      referenceBlock: {
        onCanvas: false,
        color: "#B3A533",
        icon: _fi.FiGrid,
        extras: [_components.EXTRA_TYPES.LOCKED_INDICATOR, {
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          actions: []
        }]
      }
    }
  },
  programData: {
    "45535153s": {
      id: "45535153s",
      name: 'MyProgram',
      type: "programType",
      dataType: _components.DATA_TYPES.INSTANCE,
      properties: {
        children: ['2dfsessfs']
      },
      position: {
        x: 0,
        y: 10
      },
      canDelete: false,
      canEdit: true,
      selected: false,
      editing: false
    },
    "655sssefs": {
      id: "655sssefs",
      name: 'MyFunction',
      type: "functionType",
      dataType: _components.DATA_TYPES.INSTANCE,
      arguments: ['s3siakawme'],
      properties: {
        children: []
      },
      position: {
        x: 300,
        y: 10
      },
      canDelete: true,
      canEdit: true,
      selected: true,
      editing: false
    },
    "s3siakawme": {
      id: "s3siakawme",
      name: 'Passed Hat',
      type: "hatType",
      dataType: _components.DATA_TYPES.ARGUMENT,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false
    },
    "2dfsessfs": {
      id: "2dfsessfs",
      name: 'MyOperation',
      type: "operationType",
      dataType: _components.DATA_TYPES.INSTANCE,
      properties: {
        hat: null,
        boot: null,
        children: [],
        speed: 1,
        doFunky: true,
        greeting: 'Hello!'
      },
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false
    },
    "6dewwwwww": {
      id: "6dewwwwww",
      name: 'Sombrero',
      type: "hatType",
      dataType: _components.DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false
    },
    "pspssse32": {
      id: "pspssse32",
      name: 'Fur Boots',
      type: "bootType",
      dataType: _components.DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false
    }
  }
};