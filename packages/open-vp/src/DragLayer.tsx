import React from "react";
import { useDragLayer } from "react-dnd";
import { VisualBlock } from "@people_and_robots/open-blocks";
import { useViewport } from "reactflow";

export const DragLayer = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const { zoom } = useViewport();

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
      {item.data && (
        <div
          style={{
            transform: `translate(${currentOffset ? currentOffset.x : 0}px, ${
              currentOffset ? currentOffset.y : 0
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
