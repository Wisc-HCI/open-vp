import { useState, forwardRef, useCallback, Ref, ChangeEvent, CSSProperties } from "react";
import { FiMoreVertical } from "react-icons/fi";
import {
  useProgrammingStore,
  BlockData,
  ProgrammingState,
  RegionInfo,
  MetaType,
  PropertyType,
  FieldInfo,
  CommentData,
} from "@people_and_robots/open-core";
import { useTheme, Skeleton } from "@mui/material";
import {
  CommentContainer
} from "./components/BlockContainers";
import {
  NestedContextMenu,
  ActionIconButton,
  TextArea,
} from "@people_and_robots/open-gui";

export interface CommentBlockProps {
  data: CommentData;
  interactionDisabled?: boolean;
  bounded?: boolean;
  regionInfo: RegionInfo;
  limitedRender?: boolean;
  copyFn?: () => void;
  cutFn?: () => void;
  style?: CSSProperties;
}

const validateProp = (data: BlockData, fieldInfo: FieldInfo) => {
  if (fieldInfo.type !== PropertyType.Block) return false;
  if (data.metaType === MetaType.FunctionCall && fieldInfo.isFunctionArgument)
    return true;
  if (
    data.metaType === MetaType.FunctionDeclaration &&
    !fieldInfo.isFunctionArgument
  )
    return true;
  if (data.metaType === MetaType.ObjectInstance) return true;
  return false;
};

export const CommentBlock = forwardRef(
  (
    {
      data,
      bounded = false,
      limitedRender,
      copyFn = () => {},
      cutFn = () => {},
      style,
    }: CommentBlockProps,
    ref: Ref<HTMLElement | SVGElement> | undefined
  ) => {
    // const fieldInfo = regionInfo.fieldInfo as BlockFieldInfo;
    const [isCollapsed, setIsCollapsed] = useState(false);

    const deleteBlock = useProgrammingStore(
      (state: ProgrammingState) => state.deleteBlock
    );

    const updateCommentText = useProgrammingStore(
      (state: ProgrammingState) => state.updateCommentText
    );

    const isCopying = useProgrammingStore(
      useCallback(
        (state) =>
          state.clipboard?.block?.id === data.id &&
          state.clipboard.action === "COPY",
        [data.id]
      )
    );

    const onClick = useProgrammingStore((state: ProgrammingState) => state.onVPEClick);

    const theme = useTheme();

    if (!data) {
      return null;
    }

    // console.log(ref?.current)
    // const menuData: MenuData & CommentData = {
    //   ...data,
    //   isCollapsed,
    // };

    return (
      <NestedContextMenu
        // data={menuData}
        data={{}}
        inner={[]}
      >
        <CommentContainer
          // contentEditable
          ref={ref}
          direction="row"
          aria-labelledby={`comment: ${data.text}`}
          onClick={(e) => {
            onClick(data);
            // setClipboardBlock({data,fieldInfo,parentId,onCanvas,context});
            e.stopPropagation();
          }}
          className={"nodrag nopan"}
          // onContextMenu={(e)=>e.stopPropagation()}
          bounded={bounded}
          focused={isCopying}
          style={style}
        >
          {limitedRender ? <Skeleton /> : (
            <TextArea
            value={data.text}
            label="#"
            extra={
              <ActionIconButton>
                <FiMoreVertical />
              </ActionIconButton>
            }
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => updateCommentText(data.id, event.target.value)}
          />
          )}
          

          {/* {!limitedRender && (
              <FancyMenu
                key={`${data.id}-contextmenu`}
                open={contextMenu !== null}
                onClose={handleContextMenuClose}
                anchorReference="anchorPosition"
                anchorPosition={
                  contextMenu !== null
                    ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                    : undefined
                }
              >
                <RightClickMenu
                  key={`${data.id}-inner-contextmenu`}
                  fieldInfo={fieldInfo}
                  parentId={parentId}
                  copyFn={copyFn}
                  cutFn={cutFn}
                  interactionDisabled={interactionDisabled}
                  data={data}
                  blockSpec={blockSpec}
                  isEditing={editing}
                  isCollapsed={isCollapsed}
                  isSelected={selected}
                  isDebugging={isDebugging}
                  docActive={docActive}
                  setDocActive={(v) => setDocActive(data.id, v)}
                  setIsEditing={
                    data.dataType === DATA_TYPES.REFERENCE ||
                    data.dataType === DATA_TYPES.CALL
                      ? (v) => setIsEditing(data.ref, v)
                      : (v) => setIsEditing(data.id, v)
                  }
                  setIsSelected={
                    data.dataType === DATA_TYPES.REFERENCE ||
                    data.dataType === DATA_TYPES.CALL
                      ? (v) => {
                          // console.log(data);
                          setIsSelected(data.ref, v);
                        }
                      : (v) => {
                          // console.log(data);
                          setIsSelected(data.id, v);
                        }
                  }
                  setIsCollapsed={setIsCollapsed}
                  setIsDebugging={setIsDebugging}
                />
              </FancyMenu>
            )} */}

          {/* <Stack
            justifyContent="space-between"
            className="nodrag"
            alignItems="center"
            spacing={1}
            direction="row"
            sx={{
              display: "flex",
              margin: "4px",
            }}
          >

            
              <FullWidthStack>
                Comment 
                {/* <MinifiedBar
                    id={data.id}
                    propertyInfo={typeSpec.properties}
                    properties={data.properties}
                    canDragBlockRFR={canDragBlockRFR}
                    interactionDisabled={interactionDisabled}
                    context={context}
                    bounded={inDrawer}
                    limitedRender={limitedRender}
                  /> */}

          {/* {blockSpec.extras && !limitedRender && (
              <MenuSection
                data={data}
                inDrawer={inDrawer}
                copyFn={copyFn}
                cutFn={cutFn}
                deleteFn={() =>
                  deleteBlock(data, regionInfo.parentId, regionInfo.fieldInfo)
                }
                interactionDisabled={interactionDisabled}
                blockSpec={blockSpec}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                isSelected={selected}
                setIsSelected={
                  data.metaType === MetaType.ObjectReference ||
                  data.metaType === MetaType.FunctionCall
                    ? (v: boolean) => {
                        // console.log(data);
                        setIsSelected(data.ref, v);
                      }
                    : (v: boolean) => {
                        // console.log(data);
                        setIsSelected(data.id, v);
                      }
                }
                docActive={docActive}
                setDocActive={(v: boolean) => setDocActive(data.id, v)}
                isDebugging={isDebugging}
                setIsDebugging={setIsDebugging}
              />
            )} */}
          {/* </Stack>
          {data.text} */}
        </CommentContainer>
      </NestedContextMenu>
    );
  }
);
