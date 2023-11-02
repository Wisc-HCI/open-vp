import React from 'react';
import { DropRegion } from "./DropRegion";
import { RegionInfo } from '@people_and_robots/open-core';

export interface DropZoneProps {
  id?: string;
  regionInfo: RegionInfo;
  interactionDisabled?: boolean;
  context: string[];
  limitedRender?: boolean;
  hideText?: boolean;
}
export const DropZone = ({
  id,
  regionInfo,
  interactionDisabled,
  context,
  limitedRender,
  hideText
}: DropZoneProps) => {
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
        flex:1,
      }}
    >
      <DropRegion
        id={id}
        regionInfo={regionInfo}
        peripheral={false}
        disabled={interactionDisabled || false}
        context={context}
        limitedRender={limitedRender || false}
        hideText={hideText || false}
      />
    </div>
  );
};
