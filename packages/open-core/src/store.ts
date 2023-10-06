import React, { createContext, useContext, ReactNode } from "react";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { immer } from "zustand/middleware/immer";
import { produce } from "immer";
import { remove, throttle } from "lodash";
import { instanceTemplateFromSpec } from "./generators";
import { Timer } from "./timer";
import {
  generateId,
  deleteChildren,
  deleteSelfBlock,
  parseBlock,
  applyTransfer,
  deepCopy,
} from "./functions";
import {
  BlockData,
  ProgramSpec,
  FieldInfo,
  RegionInfo,
  Tab,
  ConnectionData,
  FunctionDeclarationData,
  ArgumentData,
  FunctionCallData,
  ObjectData,
  TypeSpec,
  ConnectionHandle,
  ConnectionDirection,
  ObjectReferenceData,
  ClipboardProps,
  ProgrammingState,
} from "./types";
import { SPAWNER } from "./constants";

import { OnConnectStartParams, NodeChange, Viewport } from "reactflow";
// import { temporal } from "zundo";
// import type { TemporalState } from "zundo";

const randInt8 = () => {
  return Math.floor(Math.random() * 256);
};

const randomColor = () => {
  return `rgb(${randInt8()},${randInt8()},${randInt8()})`;
};

const DEFAULT_PROGRAM_SPEC: ProgramSpec = {
  drawers: [],
  objectTypes: {},
};

export const ProgrammingSlice = (
  set: (partial: ProgrammingState | Partial<ProgrammingState> | ((state: ProgrammingState) => ProgrammingState | Partial<ProgrammingState>), replace?: boolean | undefined) => void, 
  get: ()=> ProgrammingState
) => ({
  onVPEClick: (entryInfo: BlockData | ConnectionData) => console.log(`Clicked Entry:`, entryInfo),
  onOffVPEClick: () => console.log(`Missed VPE Click:`),
  activeDrawer: null,
  connectionInfo: null,
  setConnectionInfo: (info: OnConnectStartParams | null) =>
    set({ connectionInfo: info }),
  setActiveDrawer: (activeDrawer: string | null) => set({ activeDrawer }),
  programSpec: DEFAULT_PROGRAM_SPEC,
  programData: {},
  executionData: {},
  featuredDocs: {},
  activeDoc: null,
  setActiveDoc: (id: string, value: boolean) => {
    set({activeDoc: value ? id : null});
  },
  tabs: [],
  setTabs: (newTabs: Tab[]) => set({ tabs: newTabs }),
  activeTab: null,
  parse: (
    language: string,
    nodeId: undefined | string,
    depth: undefined | number,
    context: undefined | { [key: string]: BlockData }
  ) => {
    let parsed = "";
    const typeSpec = get().programSpec.objectTypes;
    const programData = get().programData;
    const storeParser = get().parse;
    const tabs = get().tabs;
    if (!nodeId) {
      tabs.forEach((tab: Tab) => {
        tab.blocks
          .map((blockId: string) => programData[blockId] as BlockData)
          .forEach((block: BlockData) => {
            parsed += parseBlock(
              block,
              typeSpec,
              language,
              depth || 0,
              block.metaType === "FUNCTION-CALL" ||
                block.metaType === "OBJECT-REFERENCE"
                ? { ...context, [block.ref]: programData[block.ref] as BlockData }
                : context || {} as { [key: string]: BlockData },
              storeParser
            );
          });
      });
    } else {
      const block = programData[nodeId];
      parsed += parseBlock(
        block as BlockData,
        typeSpec,
        language,
        depth || 0,
        block.metaType === "FUNCTION-CALL" ||
          block.metaType === "OBJECT-REFERENCE"
          ? { ...context, [block.ref]: programData[block.ref] as BlockData }
          : context || {} as { [key: string]: BlockData },
        storeParser
      );
    }
    return parsed;
  },
  transferBlock: (
    data: BlockData,
    sourceInfo: RegionInfo,
    destInfo: RegionInfo
  ) => {
    set(produce((state: ProgrammingState) =>
      applyTransfer(state, data, sourceInfo, destInfo)
    ));
  },
  moveBlocks: (changes: NodeChange[]) =>
    set(produce((state: ProgrammingState) => {
      changes.forEach((change) => {
        if (
          change.type === "position" &&
          state.programData[change.id] &&
          change.position
        ) {
          let block: ObjectData | FunctionDeclarationData | FunctionCallData =
            state.programData[change.id] as
              | ObjectData
              | FunctionDeclarationData
              | FunctionCallData;
          block.position = change.position;
          state.programData[change.id] = block;
        }
      });
    })),
  deleteBlock: (data: BlockData, parentId: string, fieldInfo: FieldInfo) => {
    set(produce((state: ProgrammingState) => {
      // Delete block's children and parameters
      state.tabs = state.tabs.map((t) => ({
        ...t,
        blocks: t.blocks.filter((b) => b !== data.id),
      }));
      state = deleteChildren(state, data, parentId, fieldInfo);

      // Delete current block
      state = deleteSelfBlock(state, data, parentId, fieldInfo);

      // Clear parent properties
      if (parentId !== SPAWNER) {
        if (parentId && fieldInfo.type === "BLOCK" && !fieldInfo.isList) {
          // Clear parent's field value (to null)
          let block: ObjectData | FunctionDeclarationData | FunctionCallData =
            state.programData[parentId] as
              | ObjectData
              | FunctionDeclarationData
              | FunctionCallData;
          block.properties[fieldInfo.name] = null;
          state.programData[parentId] = block;
        } else if (parentId && fieldInfo.type === "BLOCK" && fieldInfo.isList) {
          // Erase self from the parent's list
          let block: ObjectData | FunctionDeclarationData | FunctionCallData =
            state.programData[parentId] as
              | ObjectData
              | FunctionDeclarationData
              | FunctionCallData;
          remove(
            block.properties[fieldInfo.name],
            (entry) => entry === data.id
          );
        }
      }
    }));
  },
  createPlacedBlock: (data: BlockData, x: number, y: number) => {
    set(produce((state: ProgrammingState) => {
      let id = data.id;

      let block: ObjectData | FunctionCallData | FunctionDeclarationData =
        (state.programData[id] as
          | ObjectData
          | FunctionCallData
          | FunctionDeclarationData) ||
        ({ ...data, id: generateId(data.type) } as
          | ObjectData
          | FunctionCallData
          | FunctionDeclarationData);
      id = block.id;

      // Add Block to the programData at that place

      block.position = { x, y };
      state.programData[id] = block;

      // Add Block to the current tab
      state.tabs = state.tabs.map((t) =>
        t.id === state.activeTab ? { ...t, blocks: [...t.blocks, id] } : t
      );
    }));
  },
  addInstance: (instanceType: string) => {
    set(produce((state: ProgrammingState) => {
      const id = generateId(instanceType);
      const template: ObjectData | FunctionDeclarationData | ArgumentData = {
        ...instanceTemplateFromSpec(
          instanceType,
          state.programSpec.objectTypes[instanceType],
          false
        ),
        id,
      };
      state.programData[id] = template;
    }));
  },
  addArgument: (parentFunctionId: string, argumentType: string) => {
    set(produce((state: ProgrammingState) => {
      const id = generateId(argumentType);
      const template: ArgumentData = {
        ...(instanceTemplateFromSpec(
          argumentType,
          state.programSpec.objectTypes[argumentType],
          true
        ) as ArgumentData),
        id,
      };
      state.programData[id] = template;
      let parentFunction: FunctionDeclarationData = state.programData[
        parentFunctionId
      ] as FunctionDeclarationData;
      parentFunction.arguments.push(id);
      state.programData[parentFunctionId] = parentFunction;
    }));
  },
  updateItemName: (id: string, value: string) => {
    set(produce((state: ProgrammingState) => {
      const item = state.programData[id];
      const usedId =
        item.metaType === "FUNCTION-CALL" ||
        item.metaType === "OBJECT-REFERENCE"
          ? item.ref
          : id;
      state.programData[usedId].name = value;
    }));
  },
  updateItemSelected: (id: string, value: boolean) => {
    set(produce((state: ProgrammingState) => {
      const item: BlockData = state.programData[id] as BlockData;
      const usedId =
        item.metaType === "FUNCTION-CALL" ||
        item.metaType === "OBJECT-REFERENCE"
          ? item.ref
          : id;

      let updatedItem: BlockData = state.programData[usedId] as BlockData;
      updatedItem.selected = value;
      state.programData[usedId] = updatedItem;
    }));
  },
  updateItemEditing: (id: string, value: boolean) => {
    set(produce((state: ProgrammingState) => {
      let item: BlockData | undefined = state.programData[id] as
        | BlockData
        | undefined;
      if (item) {
        item.editing = value;
        state.programData[id] = item;
      }
    }));
  },
  updateItemSimpleProperty: (id: string, property: string, value: any) => {
    set(produce((state: ProgrammingState) => {
      (
        state.programData[id] as
          | ObjectData
          | FunctionDeclarationData
          | FunctionCallData
      ).properties[property] = value;
    }));
  },
  updateEdgeName: (id: string, value: string) => {
    set(produce((state: ProgrammingState) => {
      state.programData[id].name = value;
    }));
  },
  deleteEdge: (id: string) => {
    set(produce((state: ProgrammingState) => {
      delete state.programData[id];
    }));
  },
  createEdge: (
    source: string,
    sourceHandle: ConnectionHandle,
    target: string,
    targetHandle: ConnectionHandle
  ) => {
    set(produce((state: ProgrammingState) => {
      // console.log("createEdge", { source, sourceHandle, target, targetHandle });
      const edgeCount = Object.values(state.programData).filter(
        (d) => d.metaType === "CONNECTION"
      ).length;
      const newEdge: ConnectionData = {
        id: generateId("edge"),
        name: `Connection ${edgeCount + 1}`,
        metaType: "CONNECTION",
        parent: { id: source, handle: sourceHandle },
        child: { id: target, handle: targetHandle },
        mode: "STRING",
      };
      state.programData[newEdge.id] = newEdge;
      // console.log('createEdge',{source,sourceHandle,target,targetHandle})
    }));
  },
  validateEdge: (
    source: string,
    sourceHandle: ConnectionHandle,
    target: string,
    targetHandle: ConnectionHandle
  ) => {
    if (source === target) {
      return false;
    }
    const edges: ConnectionData[] = Object.values(
      get().programData as { [key: string]: BlockData | ConnectionData }
    ).filter(
      (value: BlockData | ConnectionData) => value.metaType === "CONNECTION"
    ) as ConnectionData[];

    // Get info on source
    const sourceNode: BlockData = get().programData[source] as BlockData;
    const sourceTypeInfo: TypeSpec =
      get().programSpec.objectTypes[sourceNode.type];
    let sourceConnectionInfo: {
      direction: ConnectionDirection;
      allowed: string[];
    };

    // Based on the type of the block, get the connection info
    if (
      sourceTypeInfo.metaType === "FUNCTION" &&
      sourceNode.metaType === "FUNCTION-DECLARATION" &&
      sourceTypeInfo.functionBlock.connections?.[sourceHandle]
    ) {
      sourceConnectionInfo =
        sourceTypeInfo.functionBlock.connections[sourceHandle];
    } else if (
      sourceTypeInfo.metaType === "FUNCTION" &&
      sourceNode.metaType === "FUNCTION-CALL" &&
      sourceTypeInfo.callBlock.connections?.[sourceHandle]
    ) {
      sourceConnectionInfo = sourceTypeInfo.callBlock.connections[sourceHandle];
    } else if (
      sourceTypeInfo.metaType === "OBJECT" &&
      sourceNode.metaType === "OBJECT-REFERENCE" &&
      sourceTypeInfo.referenceBlock.connections?.[sourceHandle]
    ) {
      sourceConnectionInfo =
        sourceTypeInfo.referenceBlock.connections[sourceHandle];
    } else if (
      sourceTypeInfo.metaType === "OBJECT" &&
      sourceNode.metaType === "OBJECT-INSTANCE" &&
      sourceTypeInfo.instanceBlock.connections?.[sourceHandle]
    ) {
      sourceConnectionInfo =
        sourceTypeInfo.instanceBlock.connections[sourceHandle];
    } else {
      // The only way this could be done is if the user is trying to connect an argument to something, which isn't allowed.
      return false;
    }

    // Get info on target
    const targetNode: BlockData = get().programData[target] as BlockData;
    const targetTypeInfo: TypeSpec =
      get().programSpec.objectTypes[targetNode.type];
    let targetConnectionInfo: {
      direction: ConnectionDirection;
      allowed: string[];
    };

    if (
      targetTypeInfo.metaType === "FUNCTION" &&
      targetNode.metaType === "FUNCTION-DECLARATION" &&
      targetTypeInfo.functionBlock.connections?.[targetHandle]
    ) {
      targetConnectionInfo =
        targetTypeInfo.functionBlock.connections[targetHandle];
    } else if (
      targetTypeInfo.metaType === "FUNCTION" &&
      targetNode.metaType === "FUNCTION-CALL" &&
      targetTypeInfo.callBlock.connections?.[targetHandle]
    ) {
      targetConnectionInfo = targetTypeInfo.callBlock.connections[targetHandle];
    } else if (
      targetTypeInfo.metaType === "OBJECT" &&
      targetNode.metaType === "OBJECT-REFERENCE" &&
      targetTypeInfo.referenceBlock.connections?.[targetHandle]
    ) {
      targetConnectionInfo =
        targetTypeInfo.referenceBlock.connections[targetHandle];
    } else if (
      targetTypeInfo.metaType === "OBJECT" &&
      targetNode.metaType === "OBJECT-INSTANCE" &&
      targetTypeInfo.instanceBlock.connections?.[targetHandle]
    ) {
      targetConnectionInfo =
        targetTypeInfo.instanceBlock.connections[targetHandle];
    } else {
      // The only way this could be done is if the user is trying to connect something to an argument, which isn't allowed.
      return false;
    }

    if (sourceConnectionInfo.direction === targetConnectionInfo.direction) {
      return false;
    }
    if (!sourceConnectionInfo.allowed.includes(targetNode.type)) {
      return false;
    } else if (!targetConnectionInfo.allowed.includes(sourceNode.type)) {
      return false;
    } else if (
      edges.some(
        (edge) => edge.parent.id === source && edge.child.id === target
      )
    ) {
      return false;
    }
    return true;
  },
  toggleEdgeMode: (id: string) => {
    set(produce((state: ProgrammingState) => {
      const edgeMode = (state.programData[id] as ConnectionData).mode;
      if (edgeMode === "STRING") {
        (state.programData[id] as ConnectionData).mode = "NUMBER";
        (state.programData[id] as ConnectionData).name = 0;
      } else {
        const edgeCount = Object.values(state.programData).filter(
          (d) => d.metaType === "CONNECTION"
        ).length;
        (state.programData[id] as ConnectionData).mode = "STRING";
        (state.programData[id] as ConnectionData).name = `Connection ${
          edgeCount + 1
        }`;
      }
    }));
  },
  // Just to illustrate alternative functionExtraTypes
  updateItemBlockColors: (data: BlockData) => {
    set(produce((state:ProgrammingState) => {
      const color = randomColor();
      const thisTypeSpec = state.programSpec.objectTypes[data.type];
      if (thisTypeSpec.metaType === "FUNCTION") {
        thisTypeSpec.callBlock.color = color;
        thisTypeSpec.functionBlock.color = color;
      } else {
        thisTypeSpec.instanceBlock.color = color;
        thisTypeSpec.referenceBlock.color = color;
      }
      state.programSpec.objectTypes[data.type] = thisTypeSpec;
    }));
  },
  clock: new Timer(undefined, undefined, undefined),
  pause: () => {
    get().clock.setTimescale(0);
  },
  play: (speed: number) => {
    get().clock.setTimescale(speed ? speed : 1);
  },
  reset: (time: number) => {
    get().clock._elapsed = time ? time * 1000 : 0;
  },
  setActiveTab: (tab: Tab) => set({ activeTab: tab.id }),
  removeTab: (tab: string) =>
    set(produce((state: ProgrammingState) => {
      // console.log(get().programData)
      let newTabs: Tab[] = [];
      let activeTab: string | null = null;
      let found = false;
      state.tabs.forEach((t: Tab) => {
        if (t.id === tab) {
          found = true;
          t.blocks?.forEach((b) => {
            // Delete code for
            state = deleteChildren(state, state.programData[b]);

            // Delete current block
            state = deleteSelfBlock(state, state.programData[b] as BlockData);
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
    })),
  addTab: () =>
    set(produce((state: ProgrammingState) => {
      const id = generateId("tab");
      return {
        tabs: [
          ...state.tabs,
          { title: "New Tab", id, visible: true, blocks: [] },
        ],
        activeTab: id,
      };
    })),
  renameTab: (id: string, title: string) =>
    set(produce((state: ProgrammingState) => ({
      tabs: state.tabs.map((t: Tab) => (t.id === id ? { ...t, title } : t)),
    }))),
  setTabViewport: (id: string, viewport: Viewport) =>
    set(produce((state: ProgrammingState) => ({
      tabs: state.tabs.map((t: Tab) => (t.id === id ? { ...t, viewport } : t)),
    }))),
  getTabViewport: (id: string) =>
    get().tabs.filter((t: Tab) => t.id === id)[0]?.viewport,
  setTabVisibility: (id: string, visible: boolean) =>
    set(produce((state:ProgrammingState) => {
      if (visible) {
        state.tabs = state.tabs.map((t: Tab) =>
          t.id === id ? { ...t, visible } : t
        );
        state.activeTab = id;
      } else {
        let newTabs: Tab[] = [];
        let activeTab: string | null = null;
        let found = false;
        state.tabs.forEach((t: Tab) => {
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
    })),
  clipboard: {},
  copy: (clipboardProps: ClipboardProps) =>
    set(produce((state: ProgrammingState) => {
      state.clipboard.block = clipboardProps.data;
      state.clipboard.fieldInfo = clipboardProps.fieldInfo;
      state.clipboard.parentId = clipboardProps.parentId;
      state.clipboard.idx = clipboardProps.idx;
      state.clipboard.context = clipboardProps.context;
      state.clipboard.onCanvas = clipboardProps.onCanvas;
      state.clipboard.action = "COPY";
    })),
  cut: (clipboardProps: ClipboardProps) =>
    set(produce((state: ProgrammingState) => {
      if (!clipboardProps.data) {
        return;
      }
      const block = state.programData[clipboardProps.data.id];
      if (block !== null && block.id && state.clipboard.action === "CUT") {
        // Remove the current block in the clipboard
        // Clear from tabs if it is there
        state.tabs = state.tabs.map((t) => ({
          ...t,
          blocks: t.blocks.filter((b) => b !== block.id),
        }));
        state = deleteChildren(
          state,
          block,
          state.clipboard.parentId || undefined,
          state.clipboard.fieldInfo || undefined
        );
        // Delete current block
        state = deleteSelfBlock(
          state,
          block,
          state.clipboard.parentId || undefined,
          state.clipboard.fieldInfo || undefined
        );
      }
      state.clipboard.block = clipboardProps.data;
      state.clipboard.parentId = clipboardProps.parentId;
      state.clipboard.idx = clipboardProps.idx;
      state.clipboard.context = clipboardProps.context;
      state.clipboard.onCanvas = clipboardProps.onCanvas;
      state.clipboard.fieldInfo = clipboardProps.fieldInfo;
      state.clipboard.action = "CUT";
    })),
  paste: (clipboardProps: ClipboardProps) =>
    set(produce((state: ProgrammingState) => {
      // console.log("handling paste...");
      if (
        (state.clipboard.block?.id && clipboardProps.fieldInfo) ||
        (state.clipboard.block?.id && state.clipboard.onCanvas)
      ) {
        if (
          state.clipboard.action === "COPY" ||
          state.clipboard.action === "PASTE"
        ) {
          const [newBlocks, newId] = deepCopy(
            state.programData,
            state.programSpec.objectTypes,
            state.clipboard.block.id
          );
          if (state.clipboard.onCanvas) {
            (
              newBlocks[newId] as
                | ObjectData
                | ObjectReferenceData
                | FunctionDeclarationData
                | FunctionCallData
            ).position = clipboardProps.coordinates;
            state.tabs = state.tabs.map((t) =>
              t.id === state.activeTab
                ? { ...t, blocks: [...t.blocks, newId] }
                : t
            );
          }
          // console.log({newBlocks,newId})
          state.programData = { ...state.programData, ...newBlocks };
          if (
            state.clipboard.onCanvas ||
            clipboardProps.fieldInfo.type !== "BLOCK"
          ) {
          } else if (clipboardProps.fieldInfo.isList) {
            (
              state.programData[clipboardProps.parentId] as
                | ObjectData
                | FunctionDeclarationData
                | FunctionCallData
            ).properties[clipboardProps.fieldInfo.name].splice(
              clipboardProps.idx,
              0,
              newId
            );
          } else {
            (
              state.programData[clipboardProps.parentId] as
                | ObjectData
                | FunctionDeclarationData
                | FunctionCallData
            ).properties[clipboardProps.fieldInfo.name] = newId;
          }
        } else if (
          state.clipboard.action === "CUT" &&
          !state.clipboard.onCanvas &&
          state.clipboard.fieldInfo &&
          state.clipboard.parentId
        ) {
          applyTransfer(
            state,
            state.clipboard.block,
            {
              fieldInfo: state.clipboard.fieldInfo,
              parentId: state.clipboard.parentId,
              idx: state.clipboard.idx || undefined,
            },
            {
              fieldInfo: clipboardProps.fieldInfo,
              parentId: clipboardProps.parentId,
              idx: clipboardProps.idx,
            }
          );
        } else if (
          state.clipboard.action === "CUT" &&
          state.clipboard.onCanvas
        ) {
          (
            state.programData[state.clipboard.block.id] as
              | ObjectData
              | ObjectReferenceData
              | FunctionDeclarationData
              | FunctionCallData
          ).position = clipboardProps.coordinates;
          state.tabs = state.tabs.map((t: Tab) => {
            if (t.id === state.activeTab) {
              return {
                ...t,
                blocks: [
                  ...t.blocks.filter((i) => i !== state.clipboard.block?.id),
                  state.clipboard.block?.id || "",
                ],
              };
            } else {
              t.blocks.forEach((b) => {
                if (b === state.clipboard.block?.id) {
                  Object.values(state.programData).forEach((data) => {
                    if (
                      data.metaType === "CONNECTION" &&
                      (data.parent.id === state.clipboard.block?.id ||
                        data.child.id === state.clipboard.block?.id)
                    ) {
                      delete state.programData[data.id];
                    }
                  });
                }
              });
              return {
                ...t,
                blocks: t.blocks.filter((i) => i !== state.clipboard.block?.id),
              };
            }
          });
        }

        state.clipboard.action = "PASTE";
      } else {
        // alert('paste failed');
      }
    })),
  setClipboardBlock: (block: BlockData) =>
    set(produce((state: ProgrammingState) => {
      state.clipboard.block = block;
      state.clipboard.action = "SELECT";
      state.clipboard.fieldInfo = undefined;
    })),
});

// const DefaultSlice = immer(subscribeWithSelector(temporal(ProgrammingSlice, {
//   partialize: (state: ProgrammingState) => {
//     return { programSpec: state.programSpec, programData: state.programData };
//   },
//   limit: 100,
//   handleSet: (handleSet) =>
//     throttle((state) => {
//       handleSet(state);
//     }, 1000),
// })));
// export const DefaultSlice = SelectorSlice;
export const DefaultSlice = subscribeWithSelector<ProgrammingState>(ProgrammingSlice);

export const createProgrammingStore = create<ProgrammingState>()(subscribeWithSelector<ProgrammingState>(ProgrammingSlice));