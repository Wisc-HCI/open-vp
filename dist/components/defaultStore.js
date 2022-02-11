"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgrammingSlice = exports.ImmerProgrammingSlice = void 0;
exports.deleteChildren = deleteChildren;
exports.deleteFromChildren = deleteFromChildren;
exports.deleteFromProgram = deleteFromProgram;
exports.deleteSelfBlock = deleteSelfBlock;
exports.move = move;
exports.useDefaultProgrammingStore = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/toConsumableArray"));

var _zustand = _interopRequireDefault(require("zustand"));

var _immer = _interopRequireDefault(require("immer"));

var _uuid = require("uuid");

var _ = require(".");

var _lodash = require("lodash");

var _Generators = require("./Generators");

var randInt8 = function randInt8() {
  return Math.floor(Math.random() * 256);
};

var randomColor = function randomColor() {
  return "rgb(".concat(randInt8(), ",").concat(randInt8(), ",").concat(randInt8(), ")");
};

var DEFAULT_PROGRAM_SPEC = {
  drawers: [],
  objectTypes: {}
};

var generateUuid = function generateUuid(type) {
  return "".concat(type, "-").concat((0, _uuid.v4)());
}; // Credit: https://www.npmjs.com/package/lodash-move


function move(array, moveIndex, toIndex) {
  /* #move - Moves an array item from one position in an array to another.
     Note: This is a pure function so a new array will be returned, instead
     of altering the array argument.
    Arguments:
    1. array     (String) : Array in which to move an item.         (required)
    2. moveIndex (Object) : The index of the item to move.          (required)
    3. toIndex   (Object) : The index to move item at moveIndex to. (required)
  */
  var item = array[moveIndex];
  var length = array.length;
  var diff = moveIndex - toIndex;

  if (diff > 0) {
    // move left
    return [].concat((0, _toConsumableArray2.default)(array.slice(0, toIndex)), [item], (0, _toConsumableArray2.default)(array.slice(toIndex, moveIndex)), (0, _toConsumableArray2.default)(array.slice(moveIndex + 1, length)));
  } else if (diff < 0) {
    // move right
    var targetIndex = toIndex + 1;
    return [].concat((0, _toConsumableArray2.default)(array.slice(0, moveIndex)), (0, _toConsumableArray2.default)(array.slice(moveIndex + 1, targetIndex)), [item], (0, _toConsumableArray2.default)(array.slice(targetIndex, length)));
  }

  return array;
}

function deleteFromChildren(state, idsToDelete, parentData) {
  var _state$programSpec$ob;

  // Clear children and properties (if applicable)
  if ((_state$programSpec$ob = state.programSpec.objectTypes[parentData.type]) !== null && _state$programSpec$ob !== void 0 && _state$programSpec$ob.properties) {
    Object.keys(state.programSpec.objectTypes[parentData.type].properties).forEach(function (propName) {
      if (propName) {
        var _state$programData$pa;

        var property = state.programSpec.objectTypes[parentData.type].properties[propName]; // Clearing child fields/references

        if (property && (property.type || property.type === _.TYPES.OBJECT)) {// Ignore SIMPLE types.
        } else if (property && property.isList) {
          parentData.properties[propName].forEach(function (child) {
            state = deleteFromChildren(state, idsToDelete, state.programData[child]);
          });

          var _loop = function _loop(i) {
            (0, _lodash.remove)(state.programData[parentData.id].properties[propName], function (field) {
              var _state$programData$fi;

              return ((_state$programData$fi = state.programData[field]) === null || _state$programData$fi === void 0 ? void 0 : _state$programData$fi.ref) === idsToDelete[i];
            });
          };

          for (var i = 0; i < idsToDelete.length; i++) {
            _loop(i);
          }
        } else if (property && parentData.properties[propName] && idsToDelete.includes((_state$programData$pa = state.programData[parentData.properties[propName]]) === null || _state$programData$pa === void 0 ? void 0 : _state$programData$pa.ref)) {
          // Delete Reference to Child
          delete state.programData[parentData.properties[propName]]; // entry.properties[propName] = null;

          state.programData[parentData.id].properties[propName] = null;
        }
      }
    });
  }

  return state;
}

function deleteFromProgram(state, idsToDelete) {
  var searches = (0, _lodash.pickBy)(state.programData, function (entry) {
    return entry.dataType === _.DATA_TYPES.INSTANCE;
  }); // Search through all instances for occurances of the ids we're deleting

  Object.keys(searches).forEach(function (entry) {
    if (state.programData[entry]) {
      state = deleteFromChildren(state, idsToDelete, state.programData[entry]);
    }
  });
  return state;
}

function deleteSelfBlock(state, data, parentId, fieldInfo) {
  var _data$typeSpec;

  if (((_data$typeSpec = data.typeSpec) === null || _data$typeSpec === void 0 ? void 0 : _data$typeSpec.type) === _.TYPES.FUNCTION) {
    // Find all references to the function
    var callReferences = (0, _lodash.pickBy)(state.programData, function (entry) {
      return entry.dataType === _.DATA_TYPES.CALL && entry.refData.id === data.id;
    });
    var callIds = Object.keys(callReferences); // Find the parent's of the references, and remove the references from them

    Object.keys(state.programData).forEach(function (entryId) {
      var entry = state.programData[entryId];

      if (state.programSpec.objectTypes[entry.type].properties) {
        // Iterate through properties
        Object.keys(state.programSpec.objectTypes[entry.type].properties).forEach(function (propName) {
          if (propName) {
            var property = state.programSpec.objectTypes[entry.type].properties[propName];

            if (property && (property.type || property.type === _.TYPES.OBJECT)) {// Ignore SIMPLE types.
            } else if (property && property.isList) {
              var _loop2 = function _loop2(i) {
                var _entry$properties$pro;

                if ((_entry$properties$pro = entry.properties[propName]) !== null && _entry$properties$pro !== void 0 && _entry$properties$pro.includes(callIds[i])) {
                  (0, _lodash.remove)(state.programData[entryId].properties[propName], function (field) {
                    return field === callIds[i];
                  });
                }
              };

              // Iterate through property list and remove all applicable references
              for (var i = 0; i < callIds.length; i++) {
                _loop2(i);
              }
            } else if (property && entry.properties[propName]) {
              // Delete reference from property
              if (callIds.includes(entry.properties[propName])) {
                entry.properties[propName] = null;
                state.programData[entryId].properties[propName] = null;
              }
            }
          }
        });
      }
    }); // Delete the reference and any children

    callIds.forEach(function (reference) {
      state = deleteChildren(state, state.programData[reference]);
      delete state.programData[reference];
    });
  } else if (fieldInfo !== null && fieldInfo !== void 0 && fieldInfo.isSpawner) {
    if (parentId === "spawner") {
      // Drawer deletion
      state = deleteFromProgram(state, [data.ref]);
      delete state.programData[data.ref];
    } else {
      var _state$programData$pa2;

      // Argument deletion
      state = deleteFromChildren(state, [data.ref], state.programData[parentId]); // Remove argument from function

      if ((_state$programData$pa2 = state.programData[parentId]) !== null && _state$programData$pa2 !== void 0 && _state$programData$pa2.arguments) {
        var _state$programData$pa3;

        (0, _lodash.remove)((_state$programData$pa3 = state.programData[parentId]) === null || _state$programData$pa3 === void 0 ? void 0 : _state$programData$pa3.arguments, function (field) {
          return field === data.ref;
        });
      }
    }
  } // Remove self from state


  delete state.programData[data.id];
  return state;
}

function deleteChildren(state, data, parentId, fieldInfo) {
  // Clear arguments if function
  if (data.arguments) {
    data.arguments.forEach(function (argumentId) {
      delete state.programData[argumentId];
    });
  } // Clear children and properties (if applicable)


  if (state.programSpec.objectTypes[data.type].properties) {
    Object.keys(state.programSpec.objectTypes[data.type].properties).forEach(function (propName) {
      if (propName) {
        var property = state.programSpec.objectTypes[data.type].properties[propName]; // Clearing child fields/references

        if (property && (property.type || property.type === _.TYPES.OBJECT)) {// Ignore SIMPLE types.
        } else if (property && property.isList) {
          // Iterate over list and remove each entry (probably recursively)
          if (data.properties[propName]) {
            data.properties[propName].forEach(function (child) {
              // Recursively delete children
              state = deleteChildren(state, state.programData[child], parentId, fieldInfo);
              state = deleteSelfBlock(state, state.programData[child], parentId, fieldInfo);
            });
          }
        } else if (property && data.properties[propName]) {
          // Delete Reference to Child
          delete state.programData[data.properties[propName]];
        }
      }
    });
  }

  return state;
}

var immer = function immer(config) {
  return function (set, get, api) {
    return config(function (partial, replace) {
      var nextState = typeof partial === "function" ? (0, _immer.default)(partial) : partial;
      return set(nextState, replace);
    }, get, api);
  };
};

var ProgrammingSlice = function ProgrammingSlice(set, get) {
  return {
    activeDrawer: null,
    setActiveDrawer: function setActiveDrawer(activeDrawer) {
      return set({
        activeDrawer: activeDrawer
      });
    },
    programSpec: DEFAULT_PROGRAM_SPEC,
    programData: {},
    transferBlock: function transferBlock(data, sourceInfo, destInfo) {
      console.log({
        sourceInfo: sourceInfo,
        destInfo: destInfo
      });
      set(function (state) {
        var _sourceInfo$fieldInfo;

        var newSpawn = false;
        var id = data.id;

        if (!state.programData[data.id]) {
          // Clone the data with a new id
          id = generateUuid(data.type);
          state.programData[id] = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, data), {}, {
            id: id
          });
          newSpawn = true;
        }

        var sourceIsList = (_sourceInfo$fieldInfo = sourceInfo.fieldInfo) === null || _sourceInfo$fieldInfo === void 0 ? void 0 : _sourceInfo$fieldInfo.isList;
        var destIsList = destInfo.fieldInfo.isList; // If both source and dest are the same list, handle this specially

        if (destIsList && sourceIsList && sourceInfo.parentId === destInfo.parentId) {
          state.programData[destInfo.parentId].properties[destInfo.fieldInfo.value] = move(state.programData[destInfo.parentId].properties[destInfo.fieldInfo.value], sourceInfo.idx, destInfo.idx);
        } else {
          // Place the value in its new location
          if (destIsList) {
            state.programData[destInfo.parentId].properties[destInfo.fieldInfo.value].splice(destInfo.idx, 0, id);
          } else {
            state.programData[destInfo.parentId].properties[destInfo.fieldInfo.value] = id;
          } // If existing, remove from the previous location


          if (!newSpawn && sourceInfo.parentId === destInfo.parentId && sourceInfo.fieldInfo === destInfo.fieldInfo) {// ignore if dropped in the source
          } else if (!newSpawn && sourceIsList) {
            // Insert at the right location
            state.programData[sourceInfo.parentId].properties[destInfo.fieldInfo.value].splice(sourceInfo.idx, 1);
          } else if (!newSpawn && !sourceIsList) {
            console.log('removing from previous by setting to null');
            state.programData[sourceInfo.parentId].properties[sourceInfo.fieldInfo.value] = null;
          }
        }
      });
    },
    moveBlock: function moveBlock(changes) {
      return set(function (state) {
        changes.forEach(function (change) {
          if (change.dragging && state.programData[change.id]) {
            state.programData[change.id].position = change.position;
          }
        });
      });
    },
    deleteBlock: function deleteBlock(data, parentId, fieldInfo) {
      set(function (state) {
        // Delete block's children and parameters
        state = deleteChildren(state, data, parentId, fieldInfo); // Delete current block

        state = deleteSelfBlock(state, data, parentId, fieldInfo); // Clear parent properties

        if (parentId !== "spawner") {
          if (parentId && fieldInfo && !fieldInfo.isList) {
            // Clear parent's field value (to null)
            state.programData[parentId].properties[fieldInfo.value] = null;
          } else if (parentId && fieldInfo && fieldInfo.isList) {
            // Erase self from the parent's list
            (0, _lodash.remove)(state.programData[parentId].properties[fieldInfo.value], function (entry) {
              return entry === data.id;
            });
          }
        }
      });
    },
    createPlacedBlock: function createPlacedBlock(data, x, y) {
      set(function (state) {
        var id = data.id;

        if (!state.programData[data.id]) {
          // Clone the data with a new id
          id = generateUuid(data.type);
          state.programData[id] = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, data), {}, {
            id: id
          });
        }

        state.programData[id].position = {
          x: x,
          y: y
        };
      });
    },
    addArgument: function addArgument(parentFunctionId, argumentType) {
      set(function (state) {
        var id = generateUuid(argumentType);
        var template = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, (0, _Generators.instanceTemplateFromSpec)(argumentType, state.programSpec.objectTypes[argumentType], true)), {}, {
          id: id,
          dataType: _.DATA_TYPES.REFERENCE
        });
        state.programData[id] = template;
        state.programData[parentFunctionId].arguments.push(id);
      });
    },
    updateItemName: function updateItemName(id, value) {
      set(function (state) {
        var item = state.programData[id];
        var usedId = item.dataType === _.DATA_TYPES.REFERENCE || item.dataType === _.DATA_TYPES.CALL ? item.ref : id;
        state.programData[usedId].name = value;
      });
    },
    updateItemSelected: function updateItemSelected(id, value) {
      set(function (state) {
        var item = state.programData[id];
        var usedId = item.dataType === _.DATA_TYPES.REFERENCE || item.dataType === _.DATA_TYPES.CALL ? item.ref : id;
        state.programData[usedId].selected = value;
      });
    },
    updateItemEditing: function updateItemEditing(id, value) {
      set(function (state) {
        state.programData[id].editing = value;
      });
    },
    updateItemSimpleProperty: function updateItemSimpleProperty(id, property, value) {
      set(function (state) {
        state.programData[id].properties[property] = value;
      });
    },
    // Just to illustrate alternative functionExtraTypes
    updateItemBlockColors: function updateItemBlockColors(data) {
      set(function (state) {
        var color = randomColor();
        ['instanceBlock', 'referenceBlock', 'callBlock'].forEach(function (blockType) {
          if (state.programSpec.objectTypes[data.type][blockType]) {
            state.programSpec.objectTypes[data.type][blockType].color = color;
          }
        });
      });
    }
  };
};

exports.ProgrammingSlice = ProgrammingSlice;
var ImmerProgrammingSlice = immer(ProgrammingSlice);
exports.ImmerProgrammingSlice = ImmerProgrammingSlice;
var useDefaultProgrammingStore = (0, _zustand.default)(ImmerProgrammingSlice);
exports.useDefaultProgrammingStore = useDefaultProgrammingStore;