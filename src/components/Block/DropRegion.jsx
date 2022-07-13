import React from "react";
import { useProgrammingStore } from "../ProgrammingContext";
import { useDrop } from "react-dnd";
import { Block, PreviewBlock } from "./index";
import { useCallback } from "react";
import { isEqual, intersection } from "lodash";
import { motion, AnimatePresence } from "framer-motion";

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
  showBuffer,
  limitedRender,
}) => {
  const transferBlock = useProgrammingStore(transferBlockSelector);

  const data = useProgrammingStore(
    useCallback((store) => store.programData[id], [id])
  );

  const [dropProps, drop] = useDrop(
    () => ({
      accept: fieldInfo.accepts,
      drop: (item, _) => {
        // console.log(item)
        transferBlock(item.data, item, {
          fieldInfo,
          parentId,
          idx,
        });
      },
      canDrop: (item) =>
        !disabled &&
        !item.onCanvas &&
        isEqual(intersection(context, item.context), item.context),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        item: monitor.getItem(),
      }),
    }),
    [fieldInfo, parentId, idx, disabled]
  );

  const validDropType =
    fieldInfo.accepts.includes(dropProps.item?.data?.type) &&
    !dropProps.item?.onCanvas &&
    isEqual(
      intersection(context, dropProps.item.context),
      dropProps.item.context
    );
  // console.log({validDropType,disabled})

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
        display: "flex",
        flex: 1,
      }}
    >
      <AnimatePresence>
        {renderedData && !isPreview ? (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            // exit={{ scaleY: 0 }}
            style={{ flex: 1, minHeight:minHeight}}
            key="not-preview-rendered-data"
          >
            <Block
              staticData={renderedData}
              idx={idx}
              parentId={parentId}
              fieldInfo={fieldInfo}
              bounded
              style={{ marginTop: 4, marginBottom: 4 }}
              highlightColor={highlightColor}
              context={context}
              limitedRender={limitedRender}
            />
          </motion.div>
        ) : renderedData ? (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            // exit={{ scaleY: 0 }}
            style={{ flex: 1 }}
            key="preview-rendered-data"
          >
            <PreviewBlock
              staticData={renderedData}
              idx={idx}
              parentId={parentId}
              fieldInfo={fieldInfo}
              bounded
              highlightColor={highlightColor}
              context={context}
              style={{
                marginBottom: showBuffer ? minHeight : null,
                marginTop: showBuffer ? minHeight : null,
              }}
            />
          </motion.div>
        ) : hideText ? null : (
          <motion.span
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            style={{ flex: 1 }}
            key="field-empty"
          >
            {fieldInfo.name}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};
