import React from "react";
import { useDragLayer } from "react-dnd";
import { VisualBlock } from "@people_and_robots/open-blocks";
import { useViewport } from "reactflow";
import useMeasure, { RectReadOnly } from "react-use-measure";
import { CommentBlock } from "@people_and_robots/open-blocks/src/CommentBlock";
import { MetaType } from "@people_and_robots/open-core";

export const DragLayer = ({bounds}:{bounds:RectReadOnly}) => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || !item) return null

  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 100,
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        opacity: 0.5,
        WebkitBackdropFilter: "blur(10px)",
        backdropFilter: "blur(10px)",
      }}
    >
      {item.data && item.data.metaType === MetaType.Comment && (
        <div
          style={{
            transform: `translate(${currentOffset ? currentOffset.x - bounds.top : 0}px, ${
              currentOffset ? currentOffset.y - bounds.left : 0
            }px)`,
          }}
        >
          <CommentBlock
            data={item.data}
            regionInfo={item.regionInfo}
            // isDragging={isDragging}
            interactionDisabled
            limitedRender
          />
        </div>
      )}
      {item.data && item.data.metaType !== MetaType.Comment && (
        <div
          style={{
            transform: `translate(${currentOffset ? currentOffset.x - bounds.top : 0}px, ${
              currentOffset ? currentOffset.y - bounds.left : 0
            }px)`,
          }}
        >
          <VisualBlock
            data={item.data}
            regionInfo={item.regionInfo}
            // isDragging={isDragging}
            typeSpec={item.typeSpec}
            context={item.context}
            interactionDisabled
            limitedRender
          />
        </div>
      )}
    </div>
  );
};
