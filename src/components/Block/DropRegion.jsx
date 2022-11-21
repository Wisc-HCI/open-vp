import React, { memo, useCallback, useState } from "react";
import { useProgrammingStore } from "../ProgrammingContext";
import { useDrop } from "react-dnd";
import { Block, PreviewBlock } from "./index";
import { isEqual, intersection } from "lodash";
import { motion } from "framer-motion";
import { stringEquality } from "./Utility";
import shallow from "zustand/shallow";
import {
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { TypeDescription } from "./Doc";
import { CLIPBOARD_ACTION } from "../Constants";
import { FiClipboard } from "react-icons/fi";

const transferBlockSelector = (state) => state.transferBlock;

export const DropRegion = memo(
  ({
    id,
    parentId,
    fieldInfo,
    idx,
    minHeight,
    hideText,
    disabled,
    highlightColor,
    context,
    limitedRender,
  }) => {
    const transferBlock = useProgrammingStore(transferBlockSelector, shallow);

    const data = useProgrammingStore(
      useCallback((store) => store.programData[id], [id]),
      stringEquality
    );

    const validClipboard = useProgrammingStore(
      useCallback(
        (state) =>
          fieldInfo.accepts.includes(state.clipboard.block?.data?.type) &&
          !state.clipboard.block?.onCanvas &&
          isEqual(
            intersection(context, state.clipboard.block?.context),
            state.clipboard.block?.context
          ),
        [parentId]
      ),
      shallow
    );

    const lastAction = useProgrammingStore((state) => state.clipboard.action);
    
    const paste = useProgrammingStore(
      (state) => state.paste,
      shallow
    );
    const inClipboard = useProgrammingStore(
      useCallback(
        (state) =>
          state.clipboard.fieldInfo?.parentId === parentId &&
          state.clipboard.fieldInfo?.fieldInfo === fieldInfo &&
          state.clipboard.fieldInfo?.idx === idx,
        [parentId, fieldInfo, idx]
      ),
      shallow
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

    // console.log({ ...fieldInfo, hideText });
    const activeClipboard =
      lastAction === CLIPBOARD_ACTION.COPY ||
      lastAction === CLIPBOARD_ACTION.PASTE ||
      lastAction === CLIPBOARD_ACTION.CUT;
    // console.log({activeClipboard,lastAction,validClipboard,inClipboard})
    const [contextMenu, setContextMenu] = useState(null);

    const handleContextMenu = (event) => {
      event.preventDefault();
      setContextMenu(
        contextMenu === null
          ? {
              mouseX: event.clientX + 2,
              mouseY: event.clientY - 6,
            }
          : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
            // Other native context menus might behave different.
            // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
            null
      );
      event.stopPropagation();
    };

    const handleContextMenuClose = () => {
      setContextMenu(null);
    };

    return (
      <Tooltip
        disableFocusListener={validClipboard}
        disableHoverListener={validClipboard}
        title={
          <div>
            {fieldInfo.accepts?.map((accept) => (
              <TypeDescription key={accept} type={accept} />
            ))}
          </div>
        }
        arrow
      >
        <div
          className="nodrag"
          ref={drop}
          style={{
            borderRadius: 4,
            backgroundColor:
              !disabled &&
              ((dropProps.isOver && validDropType) ||
                (inClipboard && validClipboard && activeClipboard))
                ? "#44884488"
                : !disabled &&
                  (validDropType || (validClipboard && activeClipboard))
                ? "#88888888"
                : null,
            minHeight,
            minWidth: 100,
            display: "flex",
            flex: 1,
            boxShadow:
              !disabled &&
              (validDropType || (validClipboard && activeClipboard))
                ? "inset 0pt 0pt 0pt 3pt #dddddd55"
                : null,
          }}
          onContextMenu={validClipboard?handleContextMenu:null}
        >
          {renderedData && !isPreview ? (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              // exit={{ scaleY: 0 }}
              style={{ flex: 1, minHeight, paddingTop: 4, paddingBottom: 4 }}
              key="not-preview-rendered-data"
            >
              <Block
                staticData={renderedData}
                idx={idx}
                parentId={parentId}
                fieldInfo={fieldInfo}
                bounded
                // style={{ marginTop: 4, marginBottom: 4 }}
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
              style={{ flex: 1, paddingBottom: 4, paddingTop: 4 }}
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
              />
            </motion.div>
          ) : hideText ? null : (
            <motion.span
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              style={{ flex: 1 }}
              key="field-empty"
            >
              <Typography>{fieldInfo.name}</Typography>
            </motion.span>
          )}
          <Menu
            open={contextMenu !== null}
            onClose={handleContextMenuClose}
            anchorReference="anchorPosition"
            anchorPosition={
              contextMenu !== null
                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                : undefined
            }
          >
            <MenuItem onClick={(e) => {
              paste({ fieldInfo, idx, context, parentId });
              handleContextMenuClose();
              e.stopPropagation();
              }}>
              <ListItemIcon>
                <FiClipboard />
              </ListItemIcon>
              <ListItemText primary="Paste"></ListItemText>
            </MenuItem>
          </Menu>
        </div>
      </Tooltip>
    );
  }
);
