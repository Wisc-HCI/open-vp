import create from "zustand";
import produce from "immer";
import { v4 as uuidv4 } from "uuid";
import { DATA_TYPES } from ".";

const DEFAULT_PROGRAM_SPEC = {
    drawers: [],
    objectTypes: {}
}

const generateUuid = (type) => {
  return `${type}-${uuidv4()}`;
};

// Credit: https://www.npmjs.com/package/lodash-move
export function move(array, moveIndex, toIndex) {
  /* #move - Moves an array item from one position in an array to another.
     Note: This is a pure function so a new array will be returned, instead
     of altering the array argument.
    Arguments:
    1. array     (String) : Array in which to move an item.         (required)
    2. moveIndex (Object) : The index of the item to move.          (required)
    3. toIndex   (Object) : The index to move item at moveIndex to. (required)
  */
  const item = array[moveIndex];
  const length = array.length;
  const diff = moveIndex - toIndex;

  if (diff > 0) {
    // move left
    return [
      ...array.slice(0, toIndex),
      item,
      ...array.slice(toIndex, moveIndex),
      ...array.slice(moveIndex + 1, length)
    ];
  } else if (diff < 0) {
    // move right
    const targetIndex = toIndex + 1;
    return [
      ...array.slice(0, moveIndex),
      ...array.slice(moveIndex + 1, targetIndex),
      item,
      ...array.slice(targetIndex, length)
    ];
  }
  return array;
}

const immer = (config) => (set, get, api) =>
  config(
    (partial, replace) => {
      const nextState =
        typeof partial === "function" ? produce(partial) : partial;
      return set(nextState, replace);
    },
    get,
    api
  );

export const ProgrammingSlice = (set) => ({
    activeDrawer: null,
    setActiveDrawer: (activeDrawer) => set({activeDrawer}),
    programSpec: DEFAULT_PROGRAM_SPEC,
    programData: {},
    transferBlock: (data, sourceInfo, destInfo) => {
      console.log({sourceInfo,destInfo})
      set((state) => {
        let newSpawn = false;
        let id = data.id;

        if (!state.programData[data.id]) {
          // Clone the data with a new id
          id = generateUuid(data.type);
          state.programData[id] = { ...data, id };
          newSpawn = true;
        }
        
        const sourceIsList = sourceInfo.fieldInfo?.isList;
        const destIsList = destInfo.fieldInfo.isList;

        // If both source and dest are the same list, handle this specially
        if (
          destIsList &&
          sourceIsList &&
          sourceInfo.parentId === destInfo.parentId
        ) {
          state.programData[destInfo.parentId].properties[destInfo.fieldInfo.value] = move(
            state.programData[destInfo.parentId].properties[destInfo.fieldInfo.value],
            sourceInfo.idx,
            destInfo.idx
          );
        } else {
          // Place the value in its new location
          if (destIsList) {
            state.programData[destInfo.parentId].properties[destInfo.fieldInfo.value].splice(destInfo.idx, 0, id);
          } else {
            state.programData[destInfo.parentId].properties[destInfo.fieldInfo.value] = id;
          }
          // If existing, remove from the previous location
          if (
            !newSpawn &&
            sourceInfo.parentId === destInfo.parentId &&
            sourceInfo.fieldInfo === destInfo.fieldInfo
          ) {
            // ignore if dropped in the source
          } else if (!newSpawn && sourceIsList) {
            // Insert at the right location
            state.programData[sourceInfo.parentId].properties[destInfo.fieldInfo.value].splice(sourceInfo.idx, 1);
          } else if (!newSpawn && !sourceIsList) {
            console.log('removing from previous by setting to null')
            state.programData[sourceInfo.parentId].properties[sourceInfo.fieldInfo.value] = null;
          }
        }
      });
    },
    moveBlock: (changes) =>
      set((state) => {
        changes.forEach((change) => {
          if (change.dragging && state.programData[change.id]) {
            state.programData[change.id].position = change.position;
          }
        });
      }),
    createPlacedBlock: (data, x, y) => {
      set((state) => {
        let id = data.id;

        if (!state.programData[data.id]) {
          // Clone the data with a new id
          id = generateUuid(data.type);
          state.programData[id] = { ...data, id };
        }

        state.programData[id].position = {x, y};
      })
    },
    updateItemName: (id, value) => {
      set((state) => {
        const item = state.programData[id];
        const usedId = (item.dataType === DATA_TYPES.REFERENCE || item.dataType === DATA_TYPES.CALL) ? item.ref : id;
        state.programData[usedId].name = value;
      })
    },
    updateItemSelected: (id, value) => {
      set((state) => {
        const item = state.programData[id];
        const usedId = (item.dataType === DATA_TYPES.REFERENCE || item.dataType === DATA_TYPES.CALL) ? item.ref : id;
        state.programData[usedId].selected = value;
      })
    },
    updateItemEditing: (id, value) => {
      set((state) => {
        state.programData[id].editing = value;
      })
    },
    updateItemSimpleParameter: (id, parameter, value) => {
      set((state) => {
        state.programData[id].parameters[parameter] = value;
      })
    }
  })

export const ImmerProgrammingSlice = immer(ProgrammingSlice)

export const useDefaultProgrammingStore = create(ImmerProgrammingSlice);