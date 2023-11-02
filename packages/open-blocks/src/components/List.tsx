import React, {memo} from 'react';
import { Block } from "../Block";
import { DropRegion } from "./DropRegion";
import { RegionInfo } from '@people_and_robots/open-core';

export interface ListProps {
  ids: string[],
  regionInfo: RegionInfo,
  context: string[],
  interactionDisabled: boolean,
  limitedRender: boolean
}

export const List = memo(({ ids = [], regionInfo, interactionDisabled, context, limitedRender }: ListProps) => {
  // const setField = useStore((store) => store.setField);
  if (ids.length === 0) {
    return (
      <div
      className="nodrag"
      style={{
        padding: 4,
        backgroundColor: "#00000088",
        borderRadius: 3,
        minHeight: 30,
        minWidth: 100,
        margin: 4,
        flex:1
      }}
    >
      <DropRegion
        key="initial"
        regionInfo={regionInfo}
        peripheral={false}
        disabled={interactionDisabled}
        hideText
        context={context}
        limitedRender={limitedRender}
      />
    </div>
    )
  } else {
    return (
      <div
        className="nodrag"
        style={{
          padding: 4,
          backgroundColor: "#00000088",
          borderRadius: 3,
          minHeight: 30,
          minWidth: 100,
          margin: 4,
          flex:1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DropRegion
          key="initial"
          regionInfo={{...regionInfo, idx: 0}}
          peripheral={true}
          disabled={interactionDisabled}
          hideText
          context={context}
          limitedRender={limitedRender}
        />
        {ids.map((id, idx) => (
          <Block
            key={id}
            id={id}
            regionInfo={{...regionInfo, idx}}
            bounded
            context={context}
            limitedRender={limitedRender}
            after={
              <DropRegion
                key={`dropzone-${idx}`}
                regionInfo={{
                  ...regionInfo,
                  idx: idx + 1,
                }}
                peripheral={true}
                disabled={interactionDisabled}
                hideText
                context={context}
                limitedRender={limitedRender}
              />
            }
          />
        ))}
      </div>
    );
  }
});
