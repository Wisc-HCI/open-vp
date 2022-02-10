import React from 'react';
import { useProgrammingStore } from "../ProgrammingContext";
import { useDrop } from "react-dnd";
import { Block, PreviewBlock } from "./index";
import { useCallback } from "react";
import { isEqual, intersection } from 'lodash';

const transferBlockSelector = (state) => state.transferBlock;

export const DropRegion = ({
  id,
  parentId,
  fieldInfo,
  idx,
  minHeight,
  hideText,
  disabled,
  highlightColor,
  context,
  showBuffer
}) => {
  const transferBlock = useProgrammingStore(transferBlockSelector);

  const data = useProgrammingStore(useCallback((store) => store.programData[id], [id]));

  const [dropProps, drop] = useDrop(
    () => ({
      accept: fieldInfo.accepts,
      drop: (item, _) => {
        transferBlock(item.data, item, {
          fieldInfo,
          parentId,
          idx
        });
      },
      canDrop: (item) => !disabled && !item.onCanvas && isEqual(intersection(context,item.context),item.context),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        item: monitor.getItem()
      })
    }),
    [fieldInfo, parentId, idx, disabled]
  );

  const validDropType = fieldInfo.accepts.includes(dropProps.item?.data?.type) && !dropProps.item?.onCanvas && isEqual(intersection(context,dropProps.item.context),dropProps.item.context);

  const renderedData = data
    ? data
    : dropProps.item && validDropType && !disabled && dropProps.isOver
    ? dropProps.item.data
    : null;

  const isPreview = renderedData && renderedData !== data;

  return (
    <div
      className="nodrag"
      ref={drop}
      style={{
        borderRadius: 4,
        backgroundColor:
          dropProps.isOver && validDropType
            ? "#44884488"
            : validDropType
            ? "#88888888"
            : null,
        minHeight: minHeight,
        minWidth: 100,
        display:'flex',
        flex:1
      }}
    >
      {renderedData && !isPreview ? (
        <Block
          staticData={renderedData}
          idx={idx}
          parentId={parentId}
          fieldInfo={fieldInfo}
          bounded
          highlightColor={highlightColor}
          context={context}
        />
      ) : renderedData ? (
        <PreviewBlock
          staticData={renderedData}
          idx={idx}
          parentId={parentId}
          fieldInfo={fieldInfo}
          bounded
          highlightColor={highlightColor}
          context={context}
          style={{marginBottom:showBuffer?minHeight:null,marginTop:showBuffer?minHeight:null}}
        />
      ) : hideText ? null : (
        fieldInfo.name
      )}
    </div>
  );
};
