import React from 'react';
import { useDragLayer } from "react-dnd";
import { VisualBlock } from "./Block";

export const DragLayer = ({highlightColor}) => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }));

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
      {item && (
        <VisualBlock
          x={currentOffset?.x}
          y={currentOffset?.y}
          data={item.data}
          isDragging={isDragging}
          typeSpec={item.typeSpec}
          highlightColor={highlightColor}
          context={item.context}
          interactionDisabled
          limitedRender
        />
      )}
    </div>
  );
};
