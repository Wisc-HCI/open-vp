import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { DATA_TYPES } from ".";
import { remove, pickBy, omitBy, mapValues } from "lodash";
import { instanceTemplateFromSpec } from "./Generators";
import { Timer } from "./Timer";
import { SIMPLE_PROPERTY_TYPES } from ".";
import { CLIPBOARD_ACTION } from "./Constants";
import {
  generateUuid,
  deleteChildren,
  deleteSelfBlock,
  parseBlock,
  applyTransfer,
  deepCopy,
} from "./storeFunctions";

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
  featuredDocs: {},
  activeDoc: null,
  setActiveDoc: (id, value) => {
    set((state) => {
      console.log(`setting ${id} doc active to ${value}`);
      state.activeDoc = value ? id : null
    });
  },
  parse: (language, nodeId, depth, context) => {
    let parsed = "";
    if (!depth) {
      depth = 0;
    }
    const typeSpec = get().programSpec.objectTypes;
    const programData = get().programData;
    const storeParser = get().parse;
    const tabs = get().tabs;
    if (!nodeId) {
      tabs.forEach(tab=>{
        tab.blocks.map(blockId=>programData[blockId]).forEach((block) => {
          parsed += parseBlock(
            block,
            typeSpec,
            language,
            depth,
            block.ref ? {...context, [block.ref]:programData[block.ref]} : context,
            storeParser
          );
        });
      })
      
    } else {
      const block = programData[nodeId];
      parsed += parseBlock(
        block,
        typeSpec,
        language,
        depth,
        block.ref ? {...context, [block.ref]:programData[block.ref]} : context,
        storeParser
      );
    }
    return parsed;
  },
  transferBlock: (data, sourceInfo, destInfo) => {
    set((state) => applyTransfer(state, data, sourceInfo, destInfo));
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
      state.tabs = state.tabs.map((t) => ({
        ...t,
        blocks: t.blocks.filter((b) => b !== data.id),
      }));
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
      state.tabs = state.tabs.map((t) =>
        t.id === state.activeTab ? { ...t, blocks: [...t.blocks, id] } : t
      );
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
      if (state.programData[id]) {
        state.programData[id].editing = value;
      }
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
  },
  tabs: [],
  setTabs: (newTabs) => set({ tabs: newTabs }),
  activeTab: null,
  setActiveTab: (tab) => set({ activeTab: tab.id }),
  removeTab: (tab) =>
    set((state) => {
      // console.log(get().programData)
      let newTabs = [];
      let activeTab = undefined;
      let found = false;
      state.tabs.forEach((t) => {
        if (t.id === tab) {
          found = true;
          t.blocks?.forEach((b) => {
            // Delete code for
            state = deleteChildren(state, state.programData[b]);

            // Delete current block
            state = deleteSelfBlock(state, state.programData[b]);
          });
        } else {
          newTabs.push(t);
          if (!found) {
            activeTab = t.id;
          }
        }
      });

      // console.log({activeTab,newTabs})
      if (tab === state.activeTab) {
        state.activeTab = activeTab;
      }
      state.tabs = newTabs;
    }),
  addTab: () =>
    set((state) => {
      const id = generateUuid("tab");
      return {
        tabs: [
          ...state.tabs,
          { title: "New Tab", id, visible: true, blocks: [] },
        ],
        activeTab: id,
      };
    }),
  renameTab: (id, title) =>
    set((state) => ({
      tabs: state.tabs.map((t) => (t.id === id ? { ...t, title } : t)),
    })),
  setTabViewport: (id, viewport) =>
    set((state) => ({
      tabs: state.tabs.map((t) => (t.id === id ? { ...t, viewport } : t)),
    })),
  getTabViewport: (id) => get().tabs.filter(t=>t.id===id)[0]?.viewport,
  setTabVisibility: (id, visible) =>
    set((state) => {
      if (visible) {
        state.tabs = state.tabs.map((t) =>
          t.id === id ? { ...t, visible } : t
        );
        state.activeTab = id;
      } else {
        let newTabs = [];
        let activeTab = undefined;
        let found = false;
        state.tabs.forEach((t) => {
          if (t.id === id) {
            found = true;
            newTabs.push({ ...t, visible: false });
          } else {
            newTabs.push(t);
            if (!found) {
              activeTab = t.id;
            }
          }
        });

        // console.log({activeTab,newTabs})
        if (id === state.activeTab) {
          state.activeTab = activeTab;
        }
        state.tabs = newTabs;
      }
    }),
  clipboard: { block: null, fieldInfo: null, action: null },
  copy: ({data, fieldInfo, parentId, idx, context, onCanvas}) =>
    set((state) => {
      state.clipboard.block = { data, fieldInfo, parentId, idx, context, onCanvas };
      state.clipboard.fieldInfo = null;
      state.clipboard.action = CLIPBOARD_ACTION.COPY;
    }),
  cut: ({data, fieldInfo, parentId, idx, context, onCanvas}) =>
    set((state) => {
      if (
        state.clipboard.block?.data?.id &&
        state.clipboard.action === CLIPBOARD_ACTION.CUT
      ) {
        // Remove the current block in the clipboard
        // Clear from tabs if it is there
        state.tabs = state.tabs.map((t) => ({
          ...t,
          blocks: t.blocks.filter((b) => b !== state.clipboard.block.data.id),
        }));
        state = deleteChildren(
          state,
          state.clipboard.block.data,
          state.clipboard.block.parentId,
          state.clipboard.block.fieldInfo
        );
        // Delete current block
        state = deleteSelfBlock(
          state,
          state.clipboard.block.data,
          state.clipboard.block.parentId,
          state.clipboard.block.fieldInfo
        );
      }
      state.clipboard.block = { data, fieldInfo, parentId, idx, context, onCanvas };
      state.clipboard.fieldInfo = null;
      state.clipboard.action = CLIPBOARD_ACTION.CUT;
    }),
  paste: ({fieldInfo, idx, parentId, context, coordinates}) =>
    set((state) => {
      // console.log("handling paste...");
      if (
        (state.clipboard.block?.data?.id && fieldInfo) ||
        (state.clipboard.block?.data?.id && state.clipboard.block?.onCanvas)
      ) {
        // alert('paste '+state.clipboard.block.data.id);
        // console.log("paste valid...");
        if (
          state.clipboard.action === CLIPBOARD_ACTION.COPY ||
          state.clipboard.action === CLIPBOARD_ACTION.PASTE
        ) {
          const [newBlocks, newId] = deepCopy(
            state.programData,
            state.programSpec.objectTypes,
            state.clipboard.block.data.id
          );
          if (state.clipboard.block.onCanvas) {
            // console.log({ new: newBlocks[newId], coordinates });
            newBlocks[newId].position = coordinates;
            state.tabs = state.tabs.map((t) =>
              t.id === state.activeTab
                ? { ...t, blocks: [...t.blocks, newId] }
                : t
            );
          }
          // console.log({newBlocks,newId})
          state.programData = { ...state.programData, ...newBlocks };
          if (state.clipboard.block.onCanvas) {
          } else if (fieldInfo.isList) {
            state.programData[parentId].properties[
              fieldInfo.value
            ].splice(idx, 0, newId);
          } else {
            state.programData[parentId].properties[
              fieldInfo.value
            ] = newId;
          }
        } else if (
          state.clipboard.action === CLIPBOARD_ACTION.CUT &&
          !state.clipboard.block.onCanvas
        ) {
          applyTransfer(
            state,
            state.clipboard.block.data,
            {
              fieldInfo: state.clipboard.block.fieldInfo,
              parentId: state.clipboard.block.parentId,
              idx: state.clipboard.block.idx,
              context: state.clipboard.block.context
            },
            {fieldInfo,idx,parentId,context}
          );
        } else if (
          state.clipboard.action === CLIPBOARD_ACTION.CUT &&
          state.clipboard.block.onCanvas
        ) {
          state.programData[state.clipboard.block.data.id].position =
            coordinates;
          state.tabs = state.tabs.map((t) => {
            if (t.id === state.activeTab) {
              return { ...t, blocks: [...t.blocks.filter(i=>i!==state.clipboard.block.data.id), state.clipboard.block.data.id] }
            } else {
              t.blocks.forEach(b=>{
                if (b === state.clipboard.block.data.id) {
                  Object.values(state.programData).forEach(data=>{
                    if (data.dataType === DATA_TYPES.CONNECTION && (data.parent.id === state.clipboard.block.data.id || data.child.id === state.clipboard.block.data.id)) {
                      delete state.programData[data.id]
                    }
                  })
                }
              })
              return { ...t, blocks: t.blocks.filter(i=>i!==state.clipboard.block.data.id) }
            }
          });
        }

        state.clipboard.action = CLIPBOARD_ACTION.PASTE;
      } else {
        // alert('paste failed');
      }
    }),
  setClipboardBlock: (block) =>
    set((state) => {
      state.clipboard.block = block;
      state.clipboard.action = CLIPBOARD_ACTION.SELECT;
      state.clipboard.fieldInfo = null;
    }),
});

export const ImmerProgrammingSlice = subscribeWithSelector(
  immer(ProgrammingSlice)
);

export const useDefaultProgrammingStore = create(ImmerProgrammingSlice);
