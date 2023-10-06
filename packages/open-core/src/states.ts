// import { proxy } from "valtio";
// import { derive } from "valtio/utils";
// import {
//   DrawerSpec,
//   BlockData,
//   ConnectionData,
//   TypeSpec,
//   Tab,
//   FieldInfo,
//   ClipboardAction,
//   ObjectData,
//   ObjectReferenceData,
//   FunctionDeclarationData,
//   FunctionCallData,
//   ExecutionState,
//   BackReference,
//   ArgumentData,
//   RegionInfo,
//   ProgrammingStateStructures,
//   ProgrammingStateActions,
//   BlockFieldInfo,
// } from "./types";
// import { OnConnectStartParams, NodeChange, Viewport } from "reactflow";
// import { Timer } from "./timer";

// export const state = proxy<ProgrammingStateStructures>({
//   programSpec: {
//     drawers: [],
//     objectTypes: {},
//   },
//   programData: {},
//   executionData: {},
//   tabs: [],
//   activeTab: null,
//   featuredDocs: {},
//   activeDoc: null,
//   activeDrawer: null,
//   clipboard: {},
//   connectionInfo: null,
//   clock: new Timer(undefined, undefined, undefined),
// });

// export const drawers = proxy<DrawerSpec[]>([]);
// export const tabs = proxy<Tab[]>([]);
// export const types = proxy<{ [id: string]: TypeSpec }>({});
// export const programData = proxy<{ [id: string]: BlockData | ConnectionData }>(
//   {}
// );
// export const executionState = proxy<{ [id: string]: ExecutionState }>({});

// export const guiState = proxy<{
//   activeDrawer: string | null;
//   connectionInfo: OnConnectStartParams | null;
//   activeTab: string | null;
//   featuredDocs: { [key: string]: string };
//   activeDoc: string | null;
//   clipboard: {
//     block: BlockData | null;
//     fieldInfo: FieldInfo | null;
//     parentId: string | null;
//     idx: number | null;
//     context: { [key: string]: BlockData } | null;
//     onCanvas: boolean | null;
//     action: ClipboardAction | null;
//   };
//   clock: Timer;
// }>({
//   activeDrawer: null,
//   connectionInfo: null,
//   activeTab: null,
//   featuredDocs: {},
//   activeDoc: null,
//   clipboard: {
//     block: null,
//     fieldInfo: null,
//     parentId: null,
//     idx: null,
//     context: null,
//     onCanvas: null,
//     action: null,
//   },
//   clock: new Timer(undefined, undefined, undefined),
// });

// function createBackReference(
//   target: BlockData,
//   regionInfo: RegionInfo,
//   programData: { [id: string]: BlockData | ConnectionData }
// ): [string, BackReference] {
//   if (target.metaType === "OBJECT-INSTANCE") {
//     return [
//       target.id,
//       {
//         id: target.id,
//         regionInfo,
//         pattern: "EMBEDDED-OBJECT",
//       },
//     ];
//   } else if (
//     target.metaType === "OBJECT-REFERENCE" &&
//     programData[target.ref] &&
//     programData[target.ref].metaType === "OBJECT-INSTANCE"
//   ) {
//     return [
//       target.ref,
//       {
//         id: target.id,
//         regionInfo,
//         pattern: "REFERENCE-OBJECT",
//       },
//     ];
//   } else if (
//     target.metaType === "OBJECT-REFERENCE" &&
//     programData[target.ref] &&
//     programData[target.ref].metaType === "OBJECT-REFERENCE"
//   ) {
//     return [
//       target.ref,
//       {
//         id: target.id,
//         regionInfo,
//         pattern: "REFERENCE-REFERENCE",
//       },
//     ];
//   } else if (
//     target.metaType === "OBJECT-REFERENCE" &&
//     programData[target.ref] &&
//     programData[target.ref].metaType === "ARGUMENT"
//   ) {
//     return [
//       target.ref,
//       {
//         id: target.id,
//         regionInfo,
//         pattern: "REFERENCE-REFERENCE",
//       },
//     ];
//   } else if (target.metaType === "FUNCTION-CALL") {
//     return [
//       target.ref,
//       {
//         id: target.id,
//         regionInfo,
//         pattern: "CALL-FUNCTION",
//       },
//     ];
//   } else {
//     throw new Error("Unknown target type for back reference");
//   }
// }

// export const derivedState = derive({
//   backReferences: (get) => {
//     const typeInfo = get(state.programSpec.objectTypes);
//     const program: { [key: string]: BlockData | ConnectionData } = get(
//       state.programData
//     );
//     let refs: { [key: string]: BackReference[] } = {};
//     (
//       Object.values(program).filter(
//         (d: BlockData | ConnectionData) =>
//           d.metaType === "OBJECT-INSTANCE" ||
//           d.metaType === "FUNCTION-DECLARATION" ||
//           d.metaType === "FUNCTION-CALL"
//       ) as (ObjectData | FunctionDeclarationData | FunctionCallData)[]
//     ).forEach(
//       (
//         candidateParent: ObjectData | FunctionDeclarationData | FunctionCallData
//       ) => {
//         Object.entries(candidateParent.properties).forEach(
//           ([key, value]: [string, any]) => {
//             let fieldInfo: FieldInfo =
//               typeInfo[candidateParent.id].properties[key];
//             if (fieldInfo.type === "BLOCK" && fieldInfo.isList) {
//               value.forEach((refId: string, idx: number) => {
//                 const target = program[refId];
//                 if (!target || target.metaType === "CONNECTION") return;
//                 const [targetId, backReference] = createBackReference(
//                   target,
//                   {
//                     parentId: candidateParent.id,
//                     fieldInfo,
//                     idx,
//                   },
//                   program
//                 );
//                 if (!refs[targetId]) refs[targetId] = [];
//                 refs[targetId].push(backReference);
//               });
//             } else if (fieldInfo.type === "BLOCK" && !fieldInfo.isList) {
//               const target = program[value];
//               if (!target || target.metaType === "CONNECTION") return;
//               const [targetId, backReference] = createBackReference(
//                 target,
//                 {
//                   parentId: candidateParent.id,
//                   fieldInfo,
//                   idx: undefined,
//                 },
//                 program
//               );
//               if (!refs[targetId]) refs[targetId] = [];
//               refs[targetId].push(backReference);
//             }
//           }
//         );
//       }
//     );
//     return refs;
//   },
// });

// export const ProgrammingActions:ProgrammingStateActions = {
//   moveBlocks: (changes: NodeChange[]) => {
//     changes.forEach((change) => {
//       if (
//         change.type === "position" &&
//         state.programData[change.id] &&
//         change.position
//       ) {
//         let block: ObjectData | FunctionDeclarationData | FunctionCallData =
//           state.programData[change.id] as
//             | ObjectData
//             | FunctionDeclarationData
//             | FunctionCallData;
//         block.position = change.position;
//         state.programData[change.id] = block;
//       }
//     });
//   },
//   deleteBlock: (id: string) => {
//     // Remove the block from all tabs, if present
//     state.tabs = state.tabs.map((t: Tab) => ({
//       ...t,
//       blocks: t.blocks.filter((b) => b !== id),
//     }));
//     // Remove the block from the parent
//     // Start by finding the usage of the block in the back references
//     const backReferences: BackReference[] | undefined = derivedState.backReferences[id];
//     if (backReferences) {
//       backReferences.forEach((backReference) => {
//         const parent: ObjectData | FunctionCallData | FunctionDeclarationData | undefined = 
//             state.programData[backReference.id] as ObjectData | FunctionCallData | FunctionDeclarationData | undefined;
//         if (parent) {
//           // It has to be a blockFieldInfo; otherwise, it would not be in the back references
//           const fieldInfo: BlockFieldInfo = backReference.regionInfo.fieldInfo as BlockFieldInfo;
//           if (fieldInfo.isList && backReference.pattern === "EMBEDDED-OBJECT") {
//             // Remove the block from the list
//             const list = parent.properties[fieldInfo.id] as string[];
//             const idx = backReference.regionInfo.idx;
//             if (idx !== undefined) {
//               parent.properties[fieldInfo.id] = [
//                 ...list.slice(0, idx),
//                 ...list.slice(idx + 1),
//               ];
//             }
//           } else if (backReference.pattern === "EMBEDDED-OBJECT") {
//             // Remove the block from the field
//             parent.properties[fieldInfo.id] = null;
//           }
//           state.programData[parent.id] = parent;
//         }
//       });
//     }


//   },
// };
