import React from 'react';
import { DropRegion } from "./DropRegion";

export const DropZone = ({
  id,
  parentId,
  fieldInfo,
  idx,
  interactionDisabled,
  highlightColor,
  context,
  limitedRender
}) => {
  return (
    <div
      className="nodrag"
      style={{
        padding: 4,
        backgroundColor: "#00000088",
        borderRadius: 3,
        minHeight: 30,
        minWidth: "max-content",
        margin: 4,
        flex:1
      }}
    >
      <DropRegion
        id={id}
        parentId={parentId}
        fieldInfo={fieldInfo}
        idx={idx}
        minHeight={30}
        bounded
        disabled={id || interactionDisabled}
        highlightColor={highlightColor}
        context={context}
        limitedRender={limitedRender}
      />
    </div>
  );
};
