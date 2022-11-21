import { remove, pickBy, omitBy, mapValues } from "lodash";
import { DATA_TYPES, TYPES } from "./Constants";
import { v4 as uuidv4 } from "uuid";

export const generateUuid = (type) => {
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

export const pruneEdgesFromBlock = (state, blockId) => {
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
  if (parentData && parentData.dataType === DATA_TYPES.CALL) {
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
  } else if (parentData) {
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
                if (
                  entry &&
                  entry.properies &&
                  entry.properties[propName]?.includes(callIds[i])
                ) {
                  let removed_elems = remove(
                    state.programData[entryId].properties[propName],
                    (field) => field === callIds[i]
                  );
                }
              }
            } else if (
              property &&
              entry &&
              entry.properties &&
              entry.properties[propName]
            ) {
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
      if (data.dataType === DATA_TYPES.INSTANCE) {
        state = deleteFromProgram(state, [data.id]);
        delete state.programData[data.id];
        state = pruneEdgesFromBlock(state, data.id);
      } else {
        state = deleteFromProgram(state, [data.ref]);
        delete state.programData[data.ref];
        state = pruneEdgesFromBlock(state, data.ref);
      }
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
    parentId !== "spawner" &&
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

export function parseBlock(
  block,
  typeSpec,
  language,
  depth,
  context,
  storeParser
) {
  if (
    block.dataType === DATA_TYPES.REFERENCE ||
    (block.dataType === DATA_TYPES.ARGUMENT &&
      typeSpec[block.type]?.namePolicy?.[language])
  ) {
    return typeSpec[block.type].namePolicy[language](block);
  } else if (
    (block.dataType === DATA_TYPES.INSTANCE ||
      block.dataType === DATA_TYPES.CALL) &&
    typeSpec[block.type]?.parsers?.[language] &&
    typeSpec[block.type]?.namePolicy?.[language]
  ) {
    const name = typeSpec[block.type].namePolicy[language](block);
    return typeSpec[block.type].parsers[language]({
      block,
      name,
      depth,
      context,
      storeParser,
    });
  } else {
    console.warn(
      `Block "${block.id}" of type "${block.type}" does not have a valid parser or name policy for language "${language}". Ignoring.`
    );
    return "";
  }
}

export const applyTransfer = (state, data, sourceInfo, destInfo) => {
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
  if (destIsList && sourceIsList && sourceInfo.parentId === destInfo.parentId) {
    state.programData[destInfo.parentId].properties[destInfo.fieldInfo.value] =
      move(
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
};

export const deepCopy = (programData, typeSpec, id) => {
  let newBlocks = {};
  const toCopy = programData[id];
  const typeSpecCopy = typeSpec[toCopy.type];
  const newId = generateUuid(toCopy.type);
  let newBlock = {
    ...toCopy,
    id: newId,
    properties: toCopy.properties
      ? mapValues(toCopy.properties, (propValue, propKey) => {
          const fieldInfo = typeSpecCopy.properties[propKey];
          if (fieldInfo.accepts && fieldInfo.isList) {
            let propList = [];
            propValue.forEach((listValue) => {
              const [newInnerBlocks, newInnerId] = deepCopy(
                programData,
                typeSpec,
                listValue
              );
              newBlocks = { ...newInnerBlocks, ...newBlocks };
              propList.push(newInnerId);
            });
            return propList;
          } else if (fieldInfo.accepts) {
            if (propValue) {
              const [newInnerBlocks, newInnerId] = deepCopy(
                programData,
                typeSpec,
                propValue
              );
              newBlocks = { ...newInnerBlocks, ...newBlocks };
              return newInnerId;
            } else {
              return null;
            }
          } else {
            return propValue;
          }
        })
      : undefined,
      arguments: toCopy.arguments
      ? toCopy.arguments.map((arg) => {
            const [newInnerBlocks, newInnerId] = deepCopy(
            programData,
            typeSpec,
            arg
          );
          newBlocks = { ...newInnerBlocks, ...newBlocks };
          return newInnerId;
        })
      : undefined,
  };

  newBlocks = { ...newBlocks, [newId]: newBlock };

  return [newBlocks, newId];
};
