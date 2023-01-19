import React from "react";
import { useDragLayer } from "react-dnd";
import { VisualBlock } from "./Block";
import { useViewport } from "reactflow";

export const DragLayer = ({ highlightColor }) => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const { zoom } = useViewport();

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
        opacity: 0.5
      }}
    >
      {item?.data?.dataType && (
        <div
          style={{
            transform: `translate(${currentOffset ? currentOffset.x : 0}px, ${
              currentOffset ? currentOffset.y : 0
            }px) scale(${zoom})`,
          }}
        >
          <VisualBlock
            data={item.data}
            isDragging={isDragging}
            typeSpec={item.typeSpec}
            highlightColor={highlightColor}
            context={item.context}
            interactionDisabled
            limitedRender
          />
        </div>
      )}
    </div>
  );
};
