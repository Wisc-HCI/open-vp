"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgrammingSlice = exports.ImmerProgrammingSlice = void 0;
exports.move = move;
exports.useDefaultProgrammingStore = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/toConsumableArray"));

var _zustand = _interopRequireDefault(require("zustand"));

var _immer = _interopRequireDefault(require("immer"));

var _uuid = require("uuid");

var _ = require(".");

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

var immer = function immer(config) {
  return function (set, get, api) {
    return config(function (partial, replace) {
      var nextState = typeof partial === "function" ? (0, _immer.default)(partial) : partial;
      return set(nextState, replace);
    }, get, api);
  };
};

var ProgrammingSlice = function ProgrammingSlice(set) {
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
    }
  };
};

exports.ProgrammingSlice = ProgrammingSlice;
var ImmerProgrammingSlice = immer(ProgrammingSlice);
exports.ImmerProgrammingSlice = ImmerProgrammingSlice;
var useDefaultProgrammingStore = (0, _zustand.default)(ImmerProgrammingSlice);
exports.useDefaultProgrammingStore = useDefaultProgrammingStore;