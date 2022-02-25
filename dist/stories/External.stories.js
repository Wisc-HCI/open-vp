"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.External = void 0;

var _react = _interopRequireWildcard(require("react"));

var _components = require("../components");

var _fi = require("react-icons/fi");

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
var _default = {
  title: 'External',
  component: _components.ExternalBlock
}; // More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

exports.default = _default;

var Template = function Template(args) {
  var drawers = args.drawers,
      objectTypes = args.objectTypes,
      programData = args.programData,
      highlightColor = args.highlightColor;
  (0, _react.useLayoutEffect)(function () {
    _components.useDefaultProgrammingStore.setState({
      programSpec: {
        drawers: drawers,
        objectTypes: objectTypes
      },
      programData: programData
    });
  });
  var instRef = (0, _components.referenceTemplateFromSpec)('hatType', programData['6dewwwwww'], objectTypes.hatType);
  console.log(instRef);
  console.log(programData['2dfsessfs']);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 300,
      padding: 4
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      paddingBottom: 4
    }
  }, /*#__PURE__*/_react.default.createElement(_components.ExternalBlock, {
    store: _components.useDefaultProgrammingStore,
    data: programData['2dfsessfs'],
    highlightColor: highlightColor,
    context: {}
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      paddingBottom: 4
    }
  }, /*#__PURE__*/_react.default.createElement(_components.ExternalBlock, {
    store: _components.useDefaultProgrammingStore,
    data: instRef,
    highlightColor: highlightColor,
    context: {}
  })));
};

var External = Template.bind({}); // More on args: https://storybook.js.org/docs/react/writing-stories/args

exports.External = External;
External.args = {
  highlightColor: '#ff00ff',
  drawerWidth: 235,
  drawers: [{
    title: "Structures",
    dataType: _components.DATA_TYPES.INSTANCE,
    objectTypes: ["functionType", "operationType", "blockType"],
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
        extras: [{
          type: _components.EXTRA_TYPES.INDICATOR,
          accessor: function accessor(data) {
            return data.properties.children.length;
          },
          label: 'Size'
        }, {
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          contents: [_components.EXTRA_TYPES.NAME_EDIT_TOGGLE, _components.EXTRA_TYPES.LOCKED_INDICATOR, {
            icon: _fi.FiMoreHorizontal,
            label: 'More Options',
            type: _components.EXTRA_TYPES.DROPDOWN,
            contents: [_components.EXTRA_TYPES.NAME_EDIT_TOGGLE, _components.EXTRA_TYPES.COLLAPSE_TOGGLE, _components.EXTRA_TYPES.LOCKED_INDICATOR, {
              type: _components.EXTRA_TYPES.INDICATOR,
              accessor: function accessor(data) {
                return data.properties.children.length;
              },
              label: 'Size'
            }, {
              type: _components.EXTRA_TYPES.FUNCTION_BUTTON,
              onClick: 'updateItemBlockColors',
              label: 'Cycle Color',
              icon: _fi.FiFeather
            }]
          }]
        }, _components.EXTRA_TYPES.LOCKED_INDICATOR]
      },
      referenceBlock: null,
      properties: {
        children: {
          name: 'Children',
          accepts: ['operationType', 'functionType', 'blockType'],
          default: [],
          isList: true,
          fullWidth: true
        }
      }
    },
    blockType: {
      name: "Block",
      type: _components.TYPES.OBJECT,
      instanceBlock: {
        onCanvas: false,
        color: '#7f7f7f',
        icon: _fi.FiLayers,
        extras: [_components.EXTRA_TYPES.COLLAPSE_TOGGLE, {
          type: _components.EXTRA_TYPES.INDICATOR,
          accessor: function accessor(data) {
            return data.properties.children.length;
          },
          label: 'Size'
        }, {
          type: _components.EXTRA_TYPES.FUNCTION_BUTTON,
          onClick: 'updateItemBlockColors',
          label: 'Cycle Color',
          icon: _fi.FiFeather
        }, _components.EXTRA_TYPES.LOCKED_INDICATOR]
      },
      referenceBlock: null,
      properties: {
        children: {
          name: 'Children',
          accepts: ['operationType', 'functionType', 'blockType'],
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
        extras: [_components.EXTRA_TYPES.LOCKED_INDICATOR, {
          icon: _fi.FiMoreHorizontal,
          type: _components.EXTRA_TYPES.DROPDOWN,
          contents: [_components.EXTRA_TYPES.SELECTION_TOGGLE, _components.EXTRA_TYPES.DELETE_BUTTON, _components.EXTRA_TYPES.LOCKED_INDICATOR, _components.EXTRA_TYPES.DEBUG_TOGGLE, {
            type: _components.EXTRA_TYPES.ADD_ARGUMENT_GROUP,
            allowed: ['hatType', 'bootType']
          }, {
            type: _components.EXTRA_TYPES.ADD_ARGUMENT,
            argumentType: 'hatType'
          }]
        }, {
          type: _components.EXTRA_TYPES.ADD_ARGUMENT_GROUP,
          allowed: ['hatType', 'bootType']
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
          accepts: ['functionType', 'blockType', 'operationType'],
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
          contents: [_components.EXTRA_TYPES.DELETE_BUTTON, _components.EXTRA_TYPES.DEBUG_TOGGLE]
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
          type: _components.SIMPLE_PROPERTY_TYPES.NUMBER,
          default: 1,
          min: 0,
          max: 2
        },
        doFunky: {
          name: "Do Funky",
          type: _components.SIMPLE_PROPERTY_TYPES.BOOLEAN,
          default: false
        },
        greeting: {
          name: "Greeting",
          type: _components.SIMPLE_PROPERTY_TYPES.STRING,
          default: ''
        },
        time: {
          name: "Time",
          type: _components.SIMPLE_PROPERTY_TYPES.OPTIONS,
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
          contents: [_components.EXTRA_TYPES.DELETE_BUTTON, _components.EXTRA_TYPES.DEBUG_TOGGLE]
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
          contents: [_components.EXTRA_TYPES.DELETE_BUTTON, _components.EXTRA_TYPES.DEBUG_TOGGLE]
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
      arguments: [],
      properties: {
        children: []
      },
      position: {
        x: 400,
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