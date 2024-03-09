import { remove, pickBy, omitBy, mapValues } from "lodash";
import { v4 as uuidv4 } from "uuid";
import type {
  FieldInfo,
  BlockData,
  TypeSpec,
  RegionInfo,
  FunctionDeclarationData,
  FunctionCallData,
  ObjectReferenceData,
  ConnectionData,
  ObjectData,
  ProgrammingState,
  CommentData,
} from "./types";
import { SPAWNER, MetaType } from "./constants.ts";

export const generateId = (type: string) => {
  return `${type}-${uuidv4()}`;
};

// Credit: https://www.npmjs.com/package/lodash-move
export function move<T>(array: T[], moveIndex: number, toIndex: number): T[] {
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

export function pruneEdgesFromBlock(
  state: ProgrammingState,
  blockId: string,
): ProgrammingState {
  state.programData = omitBy(
    state.programData,
    (data: BlockData | ConnectionData | CommentData) => {
      if (
        data.metaType === MetaType.Connection &&
        (data.parent.id === blockId || data.child.id === blockId)
      ) {
        return true;
      }
      return false;
    },
  );
  return state;
}

export function deleteFromChildren(
  state: ProgrammingState,
  idsToDelete: string[],
  parentData: BlockData | ConnectionData | CommentData,
): ProgrammingState {
  // Corner case for call blocks (don't look at parent's information)
  if (parentData && parentData.metaType === MetaType.FunctionCall) {
    Object.keys(parentData.properties)?.forEach((propName) => {
      if (
        idsToDelete.includes(
          (
            state.programData[parentData.properties[propName]] as
              | ObjectReferenceData
              | FunctionCallData
          ).ref,
        )
      ) {
        delete state.programData[parentData.properties[propName]];
        (state.programData[parentData.id] as FunctionCallData).properties[
          propName
        ] = null;
        state = pruneEdgesFromBlock(state, parentData.properties[propName]);
      }
    });
    for (let i = 0; i < idsToDelete.length; i++) {
      delete (state.programData[parentData.id] as FunctionCallData).properties[
        idsToDelete[i]
      ];
    }
  } else if (
    (parentData && parentData.metaType === MetaType.ObjectInstance) ||
    parentData.metaType === MetaType.FunctionDeclaration
  ) {
    // Clear children and properties (if applicable)
    if (state.programSpec.objectTypes[parentData.type]?.properties) {
      Object.keys(
        state.programSpec.objectTypes[parentData.type].properties,
      ).forEach((propName) => {
        if (propName) {
          const property: FieldInfo =
            state.programSpec.objectTypes[parentData.type].properties[propName];

          // Clearing child fields/references
          if (property && property.type !== "BLOCK") {
            // Ignore SIMPLE types.
          } else if (property && property.isList) {
            parentData.properties[propName].forEach((child: string) => {
              state = deleteFromChildren(
                state,
                idsToDelete,
                state.programData[child],
              );
            });
            idsToDelete.forEach((idToDelete) => {
              const newList = (
                state.programData[parentData.id] as
                  | ObjectData
                  | FunctionDeclarationData
                  | FunctionCallData
              ).properties[propName].filter(
                (field: string) =>
                  (state.programData[field].metaType ===
                    MetaType.ObjectReference ||
                    state.programData[field].metaType ===
                      MetaType.FunctionCall) &&
                  (
                    state.programData[field] as
                      | ObjectReferenceData
                      | FunctionCallData
                  ).ref !== idToDelete,
              );
              (
                state.programData[parentData.id] as
                  | ObjectData
                  | FunctionDeclarationData
                  | FunctionCallData
              ).properties[propName] = newList;
            });
          } else if (
            (property &&
              parentData.properties[propName] &&
              state.programData[parentData.properties[propName]].metaType ===
                MetaType.ObjectReference) ||
            (state.programData[parentData.properties[propName]].metaType ===
              MetaType.FunctionCall &&
              idsToDelete.includes(
                (
                  state.programData[parentData.properties[propName]] as
                    | ObjectReferenceData
                    | FunctionCallData
                ).ref,
              ))
          ) {
            // Delete Reference to Child
            delete state.programData[parentData.properties[propName]];

            (
              state.programData[parentData.id] as
                | ObjectData
                | FunctionDeclarationData
                | FunctionCallData
            ).properties[propName] = null;
            state = pruneEdgesFromBlock(state, parentData.properties[propName]);
          }
        }
      });
    }
  }

  return state;
}

export function deleteFromProgram(
  state: ProgrammingState,
  idsToDelete: string[],
): ProgrammingState {
  const searches = pickBy(
    state.programData,
    (entry) =>
      entry.metaType === MetaType.ObjectInstance ||
      entry.metaType === MetaType.FunctionDeclaration,
  );
  // Search through all instances for occurances of the ids we're deleting
  Object.keys(searches).forEach((entry) => {
    if (state.programData[entry]) {
      state = deleteFromChildren(state, idsToDelete, state.programData[entry]);
    }
  });

  return state;
}

export function deleteSelfBlock(
  state: ProgrammingState,
  data: BlockData | ConnectionData | CommentData,
  parentId?: string,
  fieldInfo?: FieldInfo,
  isSpawner?: boolean,
): ProgrammingState {
  if (data.metaType === MetaType.FunctionDeclaration) {
    // Find all references to the function
    const callReferences: { [key: string]: FunctionCallData } = pickBy(
      state.programData,
      (entry) =>
        entry.metaType === MetaType.FunctionCall &&
        (entry as FunctionCallData).ref === data.id,
    ) as { [key: string]: FunctionCallData };

    Object.values(callReferences).forEach((call: FunctionCallData) => {
      state = deleteChildren(state, call, parentId, fieldInfo);
    });

    // Clear function arguments
    data.arguments.forEach((argumentId) => {
      delete state.programData[argumentId];
      state = pruneEdgesFromBlock(state, argumentId);
    });

    // Find the parents of the references, and remove the references from them
    Object.keys(state.programData).forEach((entryId) => {
      const entry: BlockData | ConnectionData = state.programData[entryId] as
        | BlockData
        | ConnectionData;
      if (!entry) {
        return;
      }
      if (
        entry.metaType !== MetaType.Connection &&
        state.programSpec.objectTypes[entry.type]?.properties
      ) {
        // Iterate through properties
        Object.keys(
          state.programSpec.objectTypes[entry.type].properties,
        ).forEach((propName) => {
          if (propName) {
            const property: FieldInfo =
              state.programSpec.objectTypes[entry.type].properties[propName];

            if (!property || (property && property.type !== "BLOCK")) {
              // Ignore SIMPLE types or missing ones.
            } else if (property.isList) {
              // Iterate through property list and remove all applicable references
              Object.values(callReferences).forEach(
                (callRef: FunctionCallData) => {
                  if (
                    (entry.metaType === MetaType.ObjectInstance ||
                      entry.metaType === MetaType.FunctionCall ||
                      entry.metaType === MetaType.FunctionDeclaration) &&
                    entry.properties[propName]?.includes(callRef.id)
                  ) {
                    remove(
                      entry.properties[propName],
                      (field) => field === callRef.id,
                    );
                  }
                },
              );
            } else if (
              (entry.metaType === MetaType.ObjectInstance ||
                entry.metaType === MetaType.FunctionDeclaration ||
                entry.metaType === MetaType.FunctionCall) &&
              entry.properties[propName]
            ) {
              // Delete reference from property
              if (
                Object.values(callReferences).includes(
                  entry.properties[propName],
                )
              ) {
                entry.properties[propName] = null;
                entry.properties[propName] = null;
              }
            }
          }
        });
      }
    });
  } else if (isSpawner) {
    if (parentId === SPAWNER) {
      // Drawer deletion
      if (data.metaType === MetaType.ObjectInstance) {
        state = deleteFromProgram(state, [data.id]);
        delete state.programData[data.id];
        state = pruneEdgesFromBlock(state, data.id);
      } else if (
        data.metaType === MetaType.FunctionCall ||
        data.metaType === MetaType.ObjectReference
      ) {
        state = deleteFromProgram(state, [
          (data as FunctionCallData | ObjectReferenceData).ref,
        ]);
        delete state.programData[
          (data as FunctionCallData | ObjectReferenceData).ref
        ];
        state = pruneEdgesFromBlock(
          state,
          (data as FunctionCallData | ObjectReferenceData).ref,
        );
      }
    } else if (parentId) {
      // Argument deletion
      state = deleteFromChildren(
        state,
        [(data as FunctionCallData).ref],
        state.programData[parentId],
      );

      // Remove argument from function
      if (
        state.programData[parentId].metaType === MetaType.FunctionDeclaration
      ) {
        remove(
          (state.programData[parentId] as FunctionDeclarationData).arguments,
          (field) => field === (data as FunctionCallData).ref,
        );
      }
    }
  }

  // Remove self from state
  delete state.programData[data.id];
  state = pruneEdgesFromBlock(state, data.id);

  return state;
}

export function deleteChildren(
  state: ProgrammingState,
  data: BlockData | ConnectionData | CommentData,
  parentId?: string,
  fieldInfo?: FieldInfo,
): ProgrammingState {
  if (!data || data.metaType === MetaType.Comment) {
    return state;
  }
  // Clear children and properties (if applicable)
  if (data && data.metaType === MetaType.FunctionCall) {
    let decl: FunctionDeclarationData = state.programData[
      data.ref
    ] as FunctionDeclarationData;
    decl?.arguments?.forEach((argument: string) => {
      if (
        data.properties[argument] &&
        state.programData[data.properties[argument]]
      ) {
        state = deleteSelfBlock(
          state,
          state.programData[data.properties[argument]] as BlockData,
          parentId,
          fieldInfo,
        );
      }
    });
  } else if (
    (data.metaType === MetaType.ObjectInstance ||
      data.metaType === MetaType.FunctionDeclaration) &&
    parentId !== SPAWNER
  ) {
    Object.keys(state.programSpec.objectTypes[data.type].properties).forEach(
      (propName) => {
        if (propName) {
          const property: FieldInfo =
            state.programSpec.objectTypes[data.type].properties[propName];

          // Clearing child fields/references
          if (property && property.type !== "BLOCK") {
            // Ignore SIMPLE types.
          } else if (property && property.isList) {
            // Iterate over list and remove each entry (probably recursively)
            if (data.properties[propName]) {
              data.properties[propName].forEach((child: string) => {
                // Recursively delete children
                state = deleteChildren(
                  state,
                  state.programData[child] as BlockData,
                  parentId,
                  fieldInfo,
                );
                state = deleteSelfBlock(
                  state,
                  state.programData[child] as BlockData,
                  parentId,
                  fieldInfo,
                );
              });
            }
          } else if (property && data.properties[propName]) {
            // Delete Reference to Child
            state = deleteChildren(
              state,
              state.programData[data.properties[propName]] as BlockData,
              parentId,
              fieldInfo,
            );
            state = deleteSelfBlock(
              state,
              state.programData[data.properties[propName]] as BlockData,
              parentId,
              fieldInfo,
            );
          }
        }
      },
    );
  }

  return state;
}

export function parseBlock(
  block: BlockData,
  typeSpec: { [key: string]: TypeSpec },
  language: string,
  depth: number,
  context: { [key: string]: BlockData },
  storeParser: (
    language: string,
    nodeId?: string,
    depth?: number,
    context?: { [key: string]: BlockData },
  ) => string,
): string {
  if (
    (block.metaType === MetaType.ObjectReference ||
      block.metaType === MetaType.FunctionCall ||
      block.metaType === MetaType.Argument) &&
    typeSpec[block.type]?.namePolicy?.[language]
  ) {
    return typeSpec[block.type].namePolicy[language](block);
  } else if (
    (block.metaType === MetaType.ObjectInstance ||
      block.metaType === MetaType.FunctionDeclaration) &&
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
      `Block "${block.id}" of type "${block.type}" does not have a valid parser or name policy for language "${language}". Ignoring.`,
    );
    return "";
  }
}

export function applyTransfer(
  state: ProgrammingState,
  data: BlockData | CommentData,
  sourceInfo: RegionInfo,
  destInfo: RegionInfo,
): void {
  console.log("applyTransfer", data, sourceInfo, destInfo);

  let newSpawn = false;
  let id = data.id;

  if (!state.programData[data.id]) {
    // Clone the data with a new id
    id = generateId(data.type);
    state.programData[id] = { ...data, id };
    newSpawn = true;
  }

  const sourceIsList =
    sourceInfo.fieldInfo.type === "BLOCK" && sourceInfo.fieldInfo.isList;
  const destIsList =
    destInfo.fieldInfo.type === "BLOCK" && destInfo.fieldInfo.isList;

  // If both source and dest are the same list, handle this specially
  if (destIsList && sourceIsList && sourceInfo.parentId === destInfo.parentId) {
    (
      state.programData[destInfo.parentId] as
        | FunctionDeclarationData
        | ObjectData
        | FunctionCallData
    ).properties[destInfo.fieldInfo.id] = move(
      (
        state.programData[destInfo.parentId] as
          | FunctionDeclarationData
          | ObjectData
          | FunctionCallData
      ).properties[destInfo.fieldInfo.id],
      sourceInfo.idx || 0,
      destInfo.idx || 0,
    );
  } else {
    // Place the value in its new location
    if (destIsList) {
      (
        state.programData[destInfo.parentId] as
          | FunctionDeclarationData
          | ObjectData
          | FunctionCallData
      ).properties[destInfo.fieldInfo.id].splice(destInfo.idx, 0, id);
    } else {
      console.log("Placing value...?");
      (
        state.programData[destInfo.parentId] as
          | FunctionDeclarationData
          | ObjectData
          | FunctionCallData
      ).properties[destInfo.fieldInfo.id] = id;
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
      (
        state.programData[sourceInfo.parentId] as
          | FunctionDeclarationData
          | ObjectData
          | FunctionCallData
      ).properties[destInfo.fieldInfo.id].splice(sourceInfo.idx, 1);
    } else if (!newSpawn && !sourceIsList && sourceInfo.parentId !== SPAWNER) {
      console.log("removing from previous by setting to null");
      (
        state.programData[sourceInfo.parentId] as
          | FunctionDeclarationData
          | ObjectData
          | FunctionCallData
      ).properties[sourceInfo.fieldInfo.id] = null;
    }
  }
  console.log(state.programData);
}

export function deepCopy(
  programData: { [key: string]: BlockData | ConnectionData | CommentData },
  typeSpec: { [key: string]: TypeSpec },
  id: string,
): [{ [key: string]: BlockData | CommentData }, string] {
  let newBlocks = {};
  const toCopy = programData[id];
  if (toCopy.metaType === MetaType.Connection) {
    // This shouldn't happen, but just in case, return an empty set
    return [newBlocks, ""];
  }
  const typeSpecCopy = typeSpec[toCopy.type];
  const newId = generateId(toCopy.type);

  let newBlock: BlockData | CommentData = {
    ...toCopy,
    id: newId,
  };

  if (
    toCopy.metaType !== MetaType.ObjectReference &&
    toCopy.metaType !== MetaType.Argument &&
    toCopy.metaType !== MetaType.Comment
  ) {
    (
      newBlock as ObjectData | FunctionDeclarationData | FunctionCallData
    ).properties = mapValues(
      toCopy.properties,
      (propValue: any, propKey: string) => {
        const fieldInfo: FieldInfo = typeSpecCopy.properties[propKey];
        if (fieldInfo.type === "BLOCK" && fieldInfo.isList) {
          let propList: string[] = [];
          propValue.forEach((listValue: string) => {
            const [newInnerBlocks, newInnerId] = deepCopy(
              programData,
              typeSpec,
              listValue,
            );
            newBlocks = { ...newInnerBlocks, ...newBlocks };
            propList.push(newInnerId);
          });
          return propList;
        } else if (fieldInfo.type === "BLOCK") {
          if (propValue) {
            const [newInnerBlocks, newInnerId] = deepCopy(
              programData,
              typeSpec,
              propValue,
            );
            newBlocks = { ...newInnerBlocks, ...newBlocks };
            return newInnerId;
          } else {
            return null;
          }
        } else {
          return propValue;
        }
      },
    );
  }

  if (toCopy.metaType === MetaType.FunctionDeclaration) {
    (newBlock as FunctionDeclarationData).arguments = toCopy.arguments.map(
      (arg) => {
        const [newInnerBlocks, newInnerId] = deepCopy(
          programData,
          typeSpec,
          arg,
        );
        newBlocks = { ...newInnerBlocks, ...newBlocks };
        return newInnerId;
      },
    );
  }

  newBlocks = { ...newBlocks, [newId]: newBlock };

  return [newBlocks, newId];
}

// export const compareBlockData = (data1: BlockData, data2: BlockData, propInfo: {[key:string]:FieldInfo}) => {
//   if (
//     !isEqual(
//       pick(data1, ATTENDED_DATA_PROPERTIES),
//       pick(data2, ATTENDED_DATA_PROPERTIES)
//     )
//   ) {
//     return false;
//   } else {
//     const fields =
//       data2.metaType !== MetaType.FunctionCall
//         ? Object.entries(propInfo ? propInfo : {})
//             .filter(
//               ([_, fieldInfo]) =>
//                 fieldInfo.type !== "IGNORED"
//             )
//             .map(([fieldKey, _]) => fieldKey)
//         : data2.refData.arguments;
//     return isEqual(
//       pick(data1.properties ? data1.properties : {}, fields),
//       pick(data2.properties ? data2.properties : {}, fields)
//     );
//   }
// };
