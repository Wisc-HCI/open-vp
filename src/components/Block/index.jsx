import React, { memo } from "react";
import { useProgrammingStore } from "../ProgrammingContext";
import { useDrag } from "react-dnd";
import { useCallback, useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { PreviewBlock } from "./PreviewBlock";
import { VisualBlock } from "./VisualBlock";
import { DATA_TYPES } from "..";
import { combinedBlockData } from "../Generators";
import { stringEquality } from "./Utility";

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

    const locked = useProgrammingStore((state) => state.locked);

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
        canDrag: !dragDisabled && !data.editing && !locked,
        collect: (monitor) => ({ isDragging: monitor.isDragging() }),
      }),
      [data, typeSpec, parentId, fieldInfo, idx, dragDisabled]
    );

    const hidden = !fieldInfo?.isSpawner && dragProps.isDragging;

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
