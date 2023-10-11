import React, { memo, useCallback, useState } from "react";
import { useProgrammingStore, ProgrammingState, RegionInfo, CANVAS, ClipboardAction } from "@people_and_robots/open-core";
import { useDrop } from "react-dnd";
import { Block } from "../Block";
import { PreviewBlock } from "../PreviewBlock";
import { isEqual, intersection } from "lodash";
import { motion } from "framer-motion";
// import { stringEquality } from "../Utility";
import { shallow } from "zustand/shallow";
import {
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { TypeDescription, ChipMimic } from "./Doc";
// import { CLIPBOARD_ACTION } from "../Constants";
import { FiClipboard } from "react-icons/fi";
import { BlockData, BlockFieldInfo } from "@people_and_robots/open-core";
import { NestedContextMenu } from "@people_and_robots/open-gui";
// import { useHover } from '@use-gesture/react';

const DISABLED_STYLES = {
  backgroundColor:'#88888800',
  boxShadow: 'none'
}

const VALID_DROP_STYLES = {
  backgroundColor:'#88888888',
  boxShadow: "inset 0pt 0pt 0pt 3pt #dddddd55"
}

const PERIPHERAL_STYLES = {
  height: 8
}

const DEFAULT_STYLES = {
  height: 30,
}

const FILLED_STYLES = {
  height: 'auto'
}

const REGION_VARIANTS = {
  disabledPeripheralEmpty:{
    ...DEFAULT_STYLES,
    ...PERIPHERAL_STYLES,
    ...DISABLED_STYLES
  },
  disabledNonPeripheralEmpty:{
    ...DEFAULT_STYLES,
    ...DISABLED_STYLES
  },
  validDropPeripheralEmpty:{
    ...DEFAULT_STYLES,
    ...PERIPHERAL_STYLES,
    ...VALID_DROP_STYLES
  },
  validDropNonPeripheralEmpty:{
    ...DEFAULT_STYLES,
    ...VALID_DROP_STYLES
  },
  defaultPeripheralEmpty:{
    ...DEFAULT_STYLES,
    ...PERIPHERAL_STYLES
  },
  defaultNonPeripheralEmpty:{
    ...DEFAULT_STYLES
  },
  disabledPeripheralFilled:{
    ...DEFAULT_STYLES,
    ...PERIPHERAL_STYLES,
    ...DISABLED_STYLES,
    ...FILLED_STYLES
  },
  disabledNonPeripheralFilled:{
    ...DEFAULT_STYLES,
    ...DISABLED_STYLES,
    ...FILLED_STYLES
  },
  validDropPeripheralFilled:{
    ...DEFAULT_STYLES,
    ...PERIPHERAL_STYLES,
    ...VALID_DROP_STYLES,
    ...FILLED_STYLES
  },
  validDropNonPeripheralFilled:{
    ...DEFAULT_STYLES,
    ...VALID_DROP_STYLES,
    ...FILLED_STYLES
  },
  defaultPeripheralFilled:{
    ...DEFAULT_STYLES,
    ...PERIPHERAL_STYLES,
    ...FILLED_STYLES
  },
  defaultNonPeripheralFilled:{
    ...DEFAULT_STYLES,
    ...FILLED_STYLES
  }
}

const transferBlockSelector = (state: ProgrammingState) => state.transferBlock;

export interface DropRegionProps {
  id?: string;
  regionInfo: RegionInfo;
  context: string[];
  peripheral?: boolean;
  hideText?: boolean;
  disabled?: boolean;
  limitedRender?: boolean;
}

export const DropRegion = memo(
  ({
    id,
    regionInfo,
    peripheral = false,
    hideText = false,
    disabled = false,
    context = [],
    limitedRender = false
  }: DropRegionProps) => {
    const transferBlock = useProgrammingStore(transferBlockSelector);

    const fieldInfo = regionInfo.fieldInfo as BlockFieldInfo;

    const data: BlockData | null = useProgrammingStore(
      useCallback((state:ProgrammingState) => id ? state.programData[id] : null, [id])
    );
    
    const validClipboard = useProgrammingStore(
      useCallback(
        (state: ProgrammingState) =>
          fieldInfo.accepts.includes(state.clipboard.block?.type || "") &&
          !state.clipboard.onCanvas &&
          isEqual(
            intersection(context, state.clipboard.context),
            state.clipboard.context
          ),
        [regionInfo.parentId]
      )
    );

    const lastAction = useProgrammingStore((state: ProgrammingState) => state.clipboard.action);

    const paste = useProgrammingStore((state: ProgrammingState) => state.paste);

    const [dropProps, drop] = useDrop(
      () => ({
        accept: fieldInfo.accepts,
        drop: (item: {data: BlockData, regionInfo: RegionInfo, }, _) => {
          console.log("DROP",item)
          transferBlock(item.data, item.regionInfo, regionInfo);
        },
        canDrop: (item:{data: BlockData, regionInfo: RegionInfo, context: string[] }) =>
          !disabled &&
          item.regionInfo.parentId !== CANVAS && 
          isEqual(intersection(context, item.context), item.context),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          item: monitor.getItem(),
        }),
      }),
      [fieldInfo, regionInfo, context, disabled]
    );

    const validDropType =
      fieldInfo.accepts.includes(dropProps.item?.data?.type) &&
      dropProps.item?.regionInfo.parentId !== CANVAS &&
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
      lastAction === ClipboardAction.Copy ||
      lastAction === ClipboardAction.Paste ||
      lastAction === ClipboardAction.Cut;
    // console.log({activeClipboard,lastAction,validClipboard,inClipboard})
    const [contextMenu, setContextMenu] = useState(null);

    // const handleContextMenu = (event) => {
    //   event.preventDefault();
    //   setContextMenu(
    //     contextMenu === null
    //       ? {
    //           mouseX: event.clientX + 2,
    //           mouseY: event.clientY - 6,
    //         }
    //       : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
    //         // Other native context menus might behave different.
    //         // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
    //         null
    //   );
    //   event.stopPropagation();
    // };

    // const handleContextMenuClose = () => {
    //   setContextMenu(null);
    // };

    const [expandedTooltip, setExpandedTooltip] = useState(false);


    const filled = renderedData || !hideText;

    const matched = validDropType || (validClipboard && activeClipboard);
    
    const variant = 
      filled && disabled && peripheral
      ? 'disabledPeripheralFilled'
      : filled && disabled && !peripheral
      ? 'disabledNonPeripheralFilled'
      : filled && matched && peripheral
      ? 'validDropPeripheralFilled'
      : filled && matched && !peripheral
      ? 'validDropNonPeripheralFilled'
      : filled && peripheral
      ? 'defaultPeripheralFilled'
      : filled 
      ? 'defaultNonPeripheralFilled'
      : !filled && disabled && peripheral
      ? 'disabledPeripheralEmpty'
      : !filled && disabled && !peripheral
      ? 'disabledNonPeripheralEmpty'
      : !filled && matched && peripheral
      ? 'validDropPeripheralEmpty'
      : !filled && matched && !peripheral
      ? 'validDropNonPeripheralEmpty'
      : !filled && peripheral
      ? 'defaultPeripheralEmpty'
      : 'defaultNonPeripheralEmpty';


    const accepts = expandedTooltip ? fieldInfo.accepts : fieldInfo.accepts ? fieldInfo.accepts.slice(0,3) : [];

    return (
      <Tooltip
        onClose={()=>setExpandedTooltip(false)}
        title={
          <div>
            {accepts.map((accept) => (
              <TypeDescription key={accept} type={accept} />
            ))}
            {!expandedTooltip && (fieldInfo.accepts?.length - accepts.length > 0) && (
              <ChipMimic onClick={()=>setExpandedTooltip(true)}>+ {fieldInfo.accepts.length - accepts.length}</ChipMimic>
            )}
          </div>
        }
        arrow disableFocusListener={Boolean(contextMenu)}
      >
        <NestedContextMenu data={{}} inner={[
          { disabled: !validClipboard, left:FiClipboard, type: "ENTRY", label: "Paste", onClick: (d,e) => {
            paste({ fieldInfo, idx: 0, context, parentId: regionInfo.parentId });
            e.stopPropagation();
          }}
        ]}>
        <div
          className="nodrag"
          ref={drop}
          style={{
            borderRadius: 4,
            minWidth: 100,
            display: "flex",
            flex: 1,
            ...REGION_VARIANTS[variant]
          }}
          // animate={variant}
          // variants={REGION_VARIANTS}
          // onContextMenu={validClipboard ? handleContextMenu : null}
        >
          {renderedData && !isPreview ? (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              // exit={{ scaleY: 0 }}
              style={{ flex: 1, minHeight: peripheral ? 8 : 30, paddingTop: 4, paddingBottom: 4 }}
              key="not-preview-rendered-data"
            >
              <Block
                staticData={renderedData}
                regionInfo={regionInfo}
                bounded
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
                id={renderedData.id}
                staticData={renderedData}
                context={context}
                bounded
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
          {/* <Menu
            open={contextMenu !== null}
            // onClose={handleContextMenuClose}
            anchorReference="anchorPosition"
            anchorPosition={
              contextMenu !== null
                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                : undefined
            }
          >
            <MenuItem
              onClick={(e) => {
                paste({ fieldInfo, idx, context, parentId });
                // handleContextMenuClose();
                e.stopPropagation();
              }}
            >
              <ListItemIcon>
                <FiClipboard />
              </ListItemIcon>
              <ListItemText primary="Paste"></ListItemText>
            </MenuItem>
          </Menu> */}
        </div>
        </NestedContextMenu>
      </Tooltip>
    );
  }
);
