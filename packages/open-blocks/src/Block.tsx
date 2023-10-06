import React, { memo, useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { VisualBlock } from "./VisualBlock";
import { BlockData, combinedBlockData, ExecutionState, ProgrammingState, TypeSpec, useProgrammingStore, ClipboardProps, CANVAS, SPAWNER, ObjectTypeSpec, FunctionTypeSpec } from "@people_and_robots/open-core";

export interface BlockProps {
  id?: string;
  staticData?: BlockData;
  parentId: string;
  fieldInfo: any;
  idx?: number;
  dragDisabled: boolean;
  bounded: boolean;
  after?: React.ReactNode;
  highlightColor: string;
  context: string[];
  interactionDisabled: boolean;
  limitedRender: boolean;
}

export const Block = memo(
  ({
    id = undefined,
    staticData = undefined,
    parentId = "",
    fieldInfo = {},
    idx = undefined,
    dragDisabled = false,
    bounded = false,
    after = undefined,
    highlightColor = "#ffffff",
    context = [],
    interactionDisabled = false,
    limitedRender = false,
  }: BlockProps) => {
    
    const [data, typeSpec, progress]: [BlockData, TypeSpec, ExecutionState] = useProgrammingStore(
      (state: ProgrammingState) => combinedBlockData(state.programData, state.executionData, state.programSpec.objectTypes, staticData || id || "")
    ) as [BlockData, TypeSpec, ExecutionState];
    
    const isCut: boolean = useProgrammingStore((state: ProgrammingState)=>state.clipboard.block?.id === data.id && state.clipboard.action === "CUT") as boolean;
    const copy: (clipboardProps: ClipboardProps) => void = useProgrammingStore((state: ProgrammingState)=>state.copy) as (clipboardProps: ClipboardProps) => void;
    const cut: (clipboardProps: ClipboardProps) => void = useProgrammingStore((state: ProgrammingState)=>state.cut) as (clipboardProps: ClipboardProps) => void;

    const copyFn = ()=>copy({data, parentId, fieldInfo, idx, context, onCanvas: parentId == CANVAS});
    const cutFn = ()=>cut({data, parentId, fieldInfo, idx, context, onCanvas : parentId == CANVAS});

    const blockContext = data.metaType === "FUNCTION-DECLARATION" ? data.arguments : [];
    const wholeContext: string[] = [...context, ...blockContext];
    
    const onCanvas =
      data.metaType === "OBJECT-INSTANCE"
        ? (typeSpec as ObjectTypeSpec).instanceBlock.onCanvas
        : data.metaType === "FUNCTION-DECLARATION"
        ? (typeSpec as FunctionTypeSpec).functionBlock.onCanvas
        : data.metaType === "OBJECT-REFERENCE"
        ? (typeSpec as ObjectTypeSpec).referenceBlock.onCanvas
        : data.metaType === "FUNCTION-CALL"
        ? (typeSpec as FunctionTypeSpec).callBlock.onCanvas
        : false

    // const setActiveDrawer = useProgrammingStore(state=>state.setActiveDrawer);

    const [dragProps, drag, preview] = useDrag(
      () => ({
        type: data?.type ? data.type : "null",
        item: () => {
          // setActiveDrawer(null);
          return {
            data,
            typeSpec,
            parentId,
            fieldInfo,
            idx,
            onCanvas,
            context: wholeContext,
          };
        },
        canDrag: !dragDisabled && !data.editing && !data.docActive,
        collect: (monitor) => ({ isDragging: monitor.isDragging() }),
      }),
      [data, typeSpec, parentId, fieldInfo, idx, dragDisabled]
    );

    const hidden: boolean = (!fieldInfo?.isSpawner && dragProps.isDragging) || isCut || false;

    useEffect(() => {
      preview(getEmptyImage(), { captureDraggingState: false });
    }, [preview]);

    if (!data) {
      return null;
    } else {
      return (
        <>
          {/* Hide the visual block if it is not coming from a spawner. The "after" is also hidden, if applicable */}
          <div
            hidden={hidden}
            style={{ flex: 1, display: hidden ? "none" : "flex" }}
          >
            <VisualBlock
              data={data}
              ref={drag}
              typeSpec={typeSpec}
              bounded={bounded}
              context={wholeContext}
              interactionDisabled={interactionDisabled}
              fieldInfo={fieldInfo}
              parentId={parentId}
              progress={progress}
              limitedRender={limitedRender}
              copyFn={copyFn}
              cutFn={cutFn}
            />
          </div>
          <div hidden={hidden} style={{ display: hidden ? "none" : "flex" }}>
            {/* 'after' is usually a drop region in the case of lists */}
            {after}
          </div>
        </>
      );
    }
  }
);
