import React, { memo, useCallback, useEffect } from "react";
import { useProgrammingStore } from "../ProgrammingContext";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { PreviewBlock } from "./PreviewBlock";
import { VisualBlock } from "./VisualBlock";
import { DATA_TYPES } from "..";
import { combinedBlockData } from "../Generators";
import { stringEquality } from "./Utility";
import { shallow } from "zustand/shallow";
import { CLIPBOARD_ACTION } from "../Constants";

const Block = memo(
  ({
    id,
    staticData,
    parentId,
    fieldInfo,
    idx,
    dragDisabled,
    bounded,
    after,
    highlightColor,
    context,
    interactionDisabled,
    limitedRender,
  }) => {
    const [data, typeSpec, progress] = useProgrammingStore(
      useCallback(
        (state) => combinedBlockData(state, staticData, id),
        [id, staticData]
      ),
      stringEquality
    );
    
    const locked = useProgrammingStore((state) => state.locked, shallow);
    // const action = useProgrammingStore(state=>state.clipboard.action,shallow);
    const isCut = useProgrammingStore(useCallback((state)=>state.clipboard.block?.data?.id === data.id && state.clipboard.action === CLIPBOARD_ACTION.CUT,[data.id]),shallow);
    const copy = useProgrammingStore(state=>state.copy);
    const cut = useProgrammingStore(state=>state.cut);

    const copyFn = ()=>copy({data, parentId, fieldInfo, idx, context});
    const cutFn = ()=>cut({data, parentId, fieldInfo, idx, context});
    // console.log({isCut,data,action})

    const blockContext = data.arguments ? data.arguments : [];
    const wholeContext = [...context, ...blockContext];
    
    const onCanvas =
      data.dataType === DATA_TYPES.REFERENCE
        ? typeSpec.referenceBlock.onCanvas
        : data.dataType === DATA_TYPES.CALL
        ? typeSpec.callBlock.onCanvas
        : data.dataType === DATA_TYPES.INSTANCE
        ? typeSpec.instanceBlock.onCanvas
        : "null";

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
        canDrag: !dragDisabled && !data.editing && !data.docActive && !locked,
        collect: (monitor) => ({ isDragging: monitor.isDragging() }),
      }),
      [data, typeSpec, parentId, fieldInfo, idx, dragDisabled, locked]
    );

    const hidden = (!fieldInfo?.isSpawner && dragProps.isDragging) || isCut;

    useEffect(() => {
      preview(getEmptyImage(), { captureDraggingState: false });
    }, [preview]);

    if (!data || onCanvas === "null") {
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
              highlightColor={highlightColor}
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

export { Block, VisualBlock, PreviewBlock };
