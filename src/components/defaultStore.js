import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
// import produce from "immer";
import { v4 as uuidv4 } from "uuid";
import { DATA_TYPES, TYPES } from ".";
import { remove, pickBy, omitBy } from "lodash";
import { instanceTemplateFromSpec } from "./Generators";
import { Timer } from "./Timer";
import { SIMPLE_PROPERTY_TYPES } from ".";

const randInt8 = () => {
  return Math.floor(Math.random() * 256);
};

const randomColor = () => {
  return `rgb(${randInt8()},${randInt8()},${randInt8()})`;
};

const DEFAULT_PROGRAM_SPEC = {
  drawers: [],
  objectTypes: {},
};

const log = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log("  applying", args);
      set(...args);
      console.log("  new state", get());
    },
    get,
    api
  );

const subscribeWithCustomSelector = (fn) => (set, get, api) => {
  const origSubscribe = api.subscribe;
  api.subscribe = (selector, optListener, options) => {
    let listener = selector; // if no selector
    const equalityFn = options?.equalityFn || Object.is;
    let currentSlice = selector(api.getState());
    listener = (state) => {
      const nextSlice = selector(state);
      if (!equalityFn(currentSlice, nextSlice)) {
        const previousSlice = currentSlice;
        optListener((currentSlice = nextSlice), previousSlice);
      }
    };
    return origSubscribe(listener);
  };
  const initialState = fn(set, get, api);
  return initialState;
};

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
      ...array.slice(moveIndex + 1, length),
    ];
  } else if (diff < 0) {
    // move right
    const targetIndex = toIndex;
    return [
      ...array.slice(0, moveIndex),
      ...array.slice(moveIndex + 1, targetIndex),
      item,
      ...array.slice(targetIndex, length),
    ];
  }
  return array;
}

const pruneEdgesFromBlock = (state, blockId) => {
  state.programData = omitBy(state.programData, (data) => {
    if (
      data.dataType === DATA_TYPES.CONNECTION &&
      (data.parent.id === blockId || data.child.id === blockId)
    ) {
      return true;
    } else {
      return false;
    }
  });
  return state;
};

export function deleteFromChildren(state, idsToDelete, parentData) {
  // Corner case for call blocks (don't look at parent's information)
  if (parentData.dataType === DATA_TYPES.CALL) {
    Object.keys(parentData.properties)?.forEach((propName) => {
      if (
        idsToDelete.includes(
          state.programData[parentData.properties[propName]]?.ref
        )
      ) {
        delete state.programData[parentData.properties[propName]];
        state.programData[parentData.id].properties[propName] = null;
        state = pruneEdgesFromBlock(state, parentData.properties[propName]);
      }
    });
    for (let i = 0; i < idsToDelete.length; i++) {
      delete state.programData[parentData.id].properties[idsToDelete[i]];
    }
  } else {
    // Clear children and properties (if applicable)
    if (state.programSpec.objectTypes[parentData.type]?.properties) {
      Object.keys(
        state.programSpec.objectTypes[parentData.type].properties
      ).forEach((propName) => {
        if (propName) {
          const property =
            state.programSpec.objectTypes[parentData.type].properties[propName];

          // Clearing child fields/references
          if (property && (property.type || property.type === TYPES.OBJECT)) {
            // Ignore SIMPLE types.
          } else if (property && property.isList) {
            parentData.properties[propName].forEach((child) => {
              state = deleteFromChildren(
                state,
                idsToDelete,
                state.programData[child]
              );
            });
            idsToDelete.forEach((idToDelete) => {
              const newList = state.programData[parentData.id].properties[
                propName
              ].filter((field) => state.programData[field]?.ref !== idToDelete);
              state.programData[parentData.id].properties[propName] = newList;
            });
          } else if (
            property &&
            parentData.properties[propName] &&
            idsToDelete.includes(
              state.programData[parentData.properties[propName]]?.ref
            )
          ) {
            // Delete Reference to Child
            delete state.programData[parentData.properties[propName]];
            // entry.properties[propName] = null;
            state.programData[parentData.id].properties[propName] = null;
            state = pruneEdgesFromBlock(state, parentData.properties[propName]);
          }
        }
      });
    }
  }

  return state;
}

export function deleteFromProgram(state, idsToDelete) {
  const searches = pickBy(
    state.programData,
    (entry) => entry.dataType === DATA_TYPES.INSTANCE
  );
  // Search through all instances for occurances of the ids we're deleting
  Object.keys(searches).forEach((entry) => {
    if (state.programData[entry]) {
      state = deleteFromChildren(state, idsToDelete, state.programData[entry]);
    }
  });

  return state;
}

export function deleteSelfBlock(state, data, parentId, fieldInfo) {
  if (data.typeSpec?.type === TYPES.FUNCTION) {
    // Find all references to the function
    const callReferences = pickBy(
      state.programData,
      (entry) =>
        entry.dataType === DATA_TYPES.CALL && entry.refData.id === data.id
    );
    const callIds = Object.keys(callReferences);

    // Delete the children from the function calls
    callIds.forEach((cID) => {
      state = deleteChildren(
        state,
        state.programData[cID],
        parentId,
        fieldInfo
      );
    });

    // Clear function arguments if function
    if (data.arguments) {
      data.arguments.forEach((argumentId) => {
        delete state.programData[argumentId];
        state = pruneEdgesFromBlock(state, argumentId);
      });
    }

    // Find the parent's of the references, and remove the references from them
    Object.keys(state.programData).forEach((entryId) => {
      const entry = state.programData[entryId];
      if (state.programSpec.objectTypes[entry.type]?.properties) {
        // Iterate through properties
        Object.keys(
          state.programSpec.objectTypes[entry.type].properties
        ).forEach((propName) => {
          if (propName) {
            const property =
              state.programSpec.objectTypes[entry.type].properties[propName];

            if (property && (property.type || property.type === TYPES.OBJECT)) {
              // Ignore SIMPLE types.
            } else if (property && property.isList) {
              // Iterate through property list and remove all applicable references
              for (let i = 0; i < callIds.length; i++) {
                if (entry.properties[propName]?.includes(callIds[i])) {
                  remove(
                    state.programData[entryId].properties[propName],
                    (field) => field === callIds[i]
                  );
                }
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
    });

    // Delete the reference and any children
    callIds.forEach((reference) => {
      state = deleteChildren(state, state.programData[reference]);
      delete state.programData[reference];
      state = pruneEdgesFromBlock(state, reference);
    });
  } else if (fieldInfo?.isSpawner) {
    if (parentId === "spawner") {
      // Drawer deletion
      state = deleteFromProgram(state, [data.ref]);
      delete state.programData[data.ref];
      state = pruneEdgesFromBlock(state, data.ref);
    } else {
      // Argument deletion
      state = deleteFromChildren(
        state,
        [data.ref],
        state.programData[parentId]
      );

      // Remove argument from function
      if (state.programData[parentId]?.arguments) {
        remove(
          state.programData[parentId]?.arguments,
          (field) => field === data.ref
        );
      }
    }
  }

  // Remove self from state
  delete state.programData[data.id];
  state = pruneEdgesFromBlock(state, data.id);

  return state;
}

export function deleteChildren(state, data, parentId, fieldInfo) {
  // Clear children and properties (if applicable)
  if (data.dataType === DATA_TYPES.CALL) {
    state.programData[data.ref].arguments.forEach((argument) => {
      if (
        data.properties[argument] &&
        state.programData[data.properties[argument]]
      ) {
        state = deleteSelfBlock(
          state,
          state.programData[data.properties[argument]],
          parentId,
          fieldInfo
        );
      }
    });
  } else if (
    data.dataType !== DATA_TYPES.REFERENCE &&
    state.programSpec.objectTypes[data.type].properties
  ) {
    Object.keys(state.programSpec.objectTypes[data.type].properties).forEach(
      (propName) => {
        if (propName) {
          const property =
            state.programSpec.objectTypes[data.type].properties[propName];

          // Clearing child fields/references
          if (property && (property.type || property.type === TYPES.OBJECT)) {
            // Ignore SIMPLE types.
          } else if (property && property.isList) {
            // Iterate over list and remove each entry (probably recursively)
            if (data.properties[propName]) {
              data.properties[propName].forEach((child) => {
                // Recursively delete children
                state = deleteChildren(
                  state,
                  state.programData[child],
                  parentId,
                  fieldInfo
                );
                state = deleteSelfBlock(
                  state,
                  state.programData[child],
                  parentId,
                  fieldInfo
                );
              });
            }
          } else if (property && data.properties[propName]) {
            // Delete Reference to Child
            state = deleteChildren(
              state,
              state.programData[data.properties[propName]],
              parentId,
              fieldInfo
            );
            state = deleteSelfBlock(
              state,
              state.programData[data.properties[propName]],
              parentId,
              fieldInfo
            );
          }
        }
      }
    );
  }

  return state;
}

// const immer = (config) => (set, get, api) =>
//   config(
//     (partial, replace) => {
//       const nextState =
//         typeof partial === "function" ? produce(partial) : partial;
//       return set(nextState, replace);
//     },
//     get,
//     api
//   );

export const ProgrammingSlice = (set, get) => ({
  onVPEClick: (entryInfo) => console.log(`Clicked Entry:`, entryInfo),
  onOffVPEClick: () => console.log(`Missed VPE Click:`),
  modalBlock: { block: null, context: [] },
  setModalBlock: (block, context) => set({ modalBlock: { block, context } }),
  locked: false,
  setLocked: (locked) => set({ locked }),
  activeDrawer: null,
  connectionInfo: null,
  setConnectionInfo: (info) => set({ connectionInfo: info }),
  setActiveDrawer: (activeDrawer) => set({ activeDrawer }),
  programSpec: DEFAULT_PROGRAM_SPEC,
  programData: {},
  executionData: {},
  transferBlock: (data, sourceInfo, destInfo) => {
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
        state.programData[destInfo.parentId].properties[
          destInfo.fieldInfo.value
        ] = move(
          state.programData[destInfo.parentId].properties[
            destInfo.fieldInfo.value
          ],
          sourceInfo.idx,
          destInfo.idx
        );
      } else {
        // Place the value in its new location
        if (destIsList) {
          state.programData[destInfo.parentId].properties[
            destInfo.fieldInfo.value
          ].splice(destInfo.idx, 0, id);
        } else {
          state.programData[destInfo.parentId].properties[
            destInfo.fieldInfo.value
          ] = id;
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
          state.programData[sourceInfo.parentId].properties[
            destInfo.fieldInfo.value
          ].splice(sourceInfo.idx, 1);
        } else if (!newSpawn && !sourceIsList) {
          console.log("removing from previous by setting to null");
          state.programData[sourceInfo.parentId].properties[
            sourceInfo.fieldInfo.value
          ] = null;
        }
      }
    });
  },
  moveBlocks: (changes) =>
    set((state) => {
      changes.forEach((change) => {
        if (
          change.type === "position" &&
          state.programData[change.id] &&
          change.position
        ) {
          state.programData[change.id].position = change.position;
        }
      });
    }),
  deleteBlock: (data, parentId, fieldInfo) => {
    set((state) => {
      // Delete block's children and parameters
      state = deleteChildren(state, data, parentId, fieldInfo);

      // Delete current block
      state = deleteSelfBlock(state, data, parentId, fieldInfo);

      // Clear parent properties
      if (parentId !== "spawner") {
        if (parentId && fieldInfo && !fieldInfo.isList) {
          // Clear parent's field value (to null)
          state.programData[parentId].properties[fieldInfo.value] = null;
        } else if (parentId && fieldInfo && fieldInfo.isList) {
          // Erase self from the parent's list
          remove(
            state.programData[parentId].properties[fieldInfo.value],
            (entry) => entry === data.id
          );
        }
      }
    });
  },
  createPlacedBlock: (data, x, y) => {
    set((state) => {
      let id = data.id;

      if (!state.programData[data.id]) {
        // Clone the data with a new id
        id = generateUuid(data.type);
        state.programData[id] = { ...data, id };
      }

      state.programData[id].position = { x, y };
    });
  },
  addInstance: (instanceType) => {
    set((state) => {
      const id = generateUuid(instanceType);
      const template = {
        ...instanceTemplateFromSpec(
          instanceType,
          state.programSpec.objectTypes[instanceType],
          false
        ),
        id,
        dataType: DATA_TYPES.INSTANCE,
      };
      state.programData[id] = template;
    });
  },
  addArgument: (parentFunctionId, argumentType) => {
    set((state) => {
      const id = generateUuid(argumentType);
      const template = {
        ...instanceTemplateFromSpec(
          argumentType,
          state.programSpec.objectTypes[argumentType],
          true
        ),
        id,
        dataType: DATA_TYPES.ARGUMENT,
      };
      state.programData[id] = template;
      state.programData[parentFunctionId].arguments.push(id);
    });
  },
  updateItemName: (id, value) => {
    set((state) => {
      const item = state.programData[id];
      const usedId =
        item.dataType === DATA_TYPES.REFERENCE ||
        item.dataType === DATA_TYPES.CALL
          ? item.ref
          : id;
      state.programData[usedId].name = value;
    });
  },
  updateItemSelected: (id, value) => {
    set((state) => {
      const item = state.programData[id];
      const usedId =
        item.dataType === DATA_TYPES.REFERENCE ||
        item.dataType === DATA_TYPES.CALL
          ? item.ref
          : id;
      state.programData[usedId].selected = value;
    });
  },
  updateItemEditing: (id, value) => {
    set((state) => {
      state.programData[id].editing = value;
    });
  },
  updateItemSimpleProperty: (id, property, value) => {
    set((state) => {
      state.programData[id].properties[property] = value;
    });
  },
  updateEdgeName: (id, value) => {
    set((state) => {
      state.programData[id].name = value;
    });
  },
  deleteEdge: (id) => {
    set((state) => {
      delete state.programData[id];
    });
  },
  createEdge: (source, sourceHandle, target, targetHandle) => {
    set((state) => {
      // console.log("createEdge", { source, sourceHandle, target, targetHandle });
      const edgeCount = Object.values(state.programData).filter(
        (d) => d.dataType === DATA_TYPES.CONNECTION
      ).length;
      const newEdge = {
        id: generateUuid("edge"),
        name: `Connection ${edgeCount + 1}`,
        dataType: DATA_TYPES.CONNECTION,
        parent: { id: source, handle: sourceHandle },
        child: { id: target, handle: targetHandle },
        mode: SIMPLE_PROPERTY_TYPES.STRING,
      };
      state.programData[newEdge.id] = newEdge;
      // console.log('createEdge',{source,sourceHandle,target,targetHandle})
    });
  },
  validateEdge: (source, sourceHandle, target, targetHandle) => {
    // console.log("validateEdge", { source, sourceHandle, target, targetHandle });
    if (source === target) {
      return false;
    }
    const edges = Object.values(get().programData).filter(
      (d) => d.dataType === DATA_TYPES.CONNECTION
    );
    const sourceNode = get().programData[source];
    const sourceTypeInfo = get().programSpec.objectTypes[sourceNode.type];
    // console.log(sourceTypeInfo);
    const sourceConnectionInfo =
      sourceNode.dataType === DATA_TYPES.REFERENCE
        ? sourceTypeInfo.referenceBlock.connections[sourceHandle]
        : sourceNode.dataType === DATA_TYPES.CALL
        ? sourceTypeInfo.callBlock.connections[sourceHandle]
        : sourceTypeInfo.instanceBlock.connections[sourceHandle];
    const targetNode = get().programData[target];
    const targetTypeInfo = get().programSpec.objectTypes[targetNode.type];
    const targetConnectionInfo =
      targetNode.dataType === DATA_TYPES.REFERENCE
        ? targetTypeInfo.referenceBlock.connections[targetHandle]
        : targetNode.dataType === DATA_TYPES.CALL
        ? targetTypeInfo.callBlock.connections[targetHandle]
        : targetTypeInfo.instanceBlock.connections[targetHandle];
    if (sourceConnectionInfo.direction === targetConnectionInfo.direction) {
      return false;
    }
    if (!sourceConnectionInfo.allowed.includes(targetNode.type)) {
      return false;
    } else if (!targetConnectionInfo.allowed.includes(sourceNode.type)) {
      return false;
    } else if (
      edges.some((edge) => {
        const foundMatch =
          edge.parent.id === source &&
          edge.child.id === target &&
          edge.parent.handle === sourceHandle &&
          edge.child.handle === targetHandle;
        // console.log('match search',{foundMatch,edge,source,target,sourceHandle,targetHandle})
        return foundMatch;
      })
    ) {
      // console.log('already existing')
      return false;
    }
    return true;
  },
  toggleEdgeMode: (id) => {
    set((state) => {
      const edgeMode = state.programData[id].mode;
      if (edgeMode === SIMPLE_PROPERTY_TYPES.STRING) {
        state.programData[id].mode = SIMPLE_PROPERTY_TYPES.NUMBER;
        state.programData[id].name = 0;
      } else {
        const edgeCount = Object.values(state.programData).filter(
          (d) => d.dataType === DATA_TYPES.CONNECTION
        ).length;
        state.programData[id].mode = SIMPLE_PROPERTY_TYPES.STRING;
        state.programData[id].name = `Connection ${edgeCount + 1}`;
      }
    });
  },
  // Just to illustrate alternative functionExtraTypes
  updateItemBlockColors: (data) => {
    set((state) => {
      const color = randomColor();
      ["instanceBlock", "referenceBlock", "callBlock"].forEach((blockType) => {
        if (state.programSpec.objectTypes[data.type][blockType]) {
          state.programSpec.objectTypes[data.type][blockType].color = color;
        }
      });
    });
  },
  clock: new Timer(),
  pause: () => {
    get().clock.setTimescale(0);
  },
  play: (speed) => {
    get().clock.setTimescale(speed ? speed : 1);
  },
  reset: (time) => {
    get().clock._elapsed = time ? time * 1000 : 0;
  }
});

export const ImmerProgrammingSlice = subscribeWithSelector(immer(ProgrammingSlice));

export const useDefaultProgrammingStore = create(ImmerProgrammingSlice);
