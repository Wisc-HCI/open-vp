import {
  useState,
  forwardRef,
  useCallback,
  Ref,
  ChangeEvent,
  CSSProperties,
} from "react";
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
import { CommentContainer } from "./components/BlockContainers";
import {
  NestedContextMenu,
  TextArea,
  NestedDropdown,
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
      regionInfo,
      copyFn = () => {},
      cutFn = () => {},
      style,
    }: CommentBlockProps,
    ref: Ref<HTMLElement | SVGElement> | undefined,
  ) => {
    // const fieldInfo = regionInfo.fieldInfo as BlockFieldInfo;
    const deleteBlock = useProgrammingStore(
      (state: ProgrammingState) => state.deleteBlock,
    );

    const updateCommentText = useProgrammingStore(
      (state: ProgrammingState) => state.updateCommentText,
    );

    const isCopying = useProgrammingStore(
      useCallback(
        (state) =>
          state.clipboard?.block?.id === data.id &&
          state.clipboard.action === "COPY",
        [data.id],
      ),
    );

    const setEditing = useProgrammingStore((state) => state.updateItemEditing);

    const onClick = useProgrammingStore(
      (state: ProgrammingState) => state.onVPEClick,
    );

    if (!data) {
      return null;
    }

    return (
      <NestedContextMenu
        data={data}
        inner={[
          {
            label: "Copy",
            left: "ContentCopyRounded",
            type: "ENTRY",
            onClick: () => {
              copyFn();
            },
          },
          {
            label: "Cut",
            left: "ContentCutRounded",
            type: "ENTRY",
            onClick: () => {
              cutFn();
            },
          },
          {
            label: "Delete",
            left: "DeleteOutlineRounded",
            type: "ENTRY",
            onClick: () => {
              deleteBlock(data, regionInfo.parentId, regionInfo.fieldInfo);
            },
          },
        ]}
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
          // onContextMenu={(e)=>e.stopPropagation()}
          bounded={bounded}
          focused={isCopying}
          style={style}
        >
          <TextArea
            value={data.text}
            label="#"
            extra={
              !limitedRender && (
                <NestedDropdown
                  data={data}
                  inner={[
                    {
                      label: "Copy",
                      left: "ContentCopyRounded",
                      type: "ENTRY",
                      onClick: () => {
                        copyFn();
                      },
                    },
                    {
                      label: "Cut",
                      left: "ContentCutRounded",
                      type: "ENTRY",
                      onClick: () => {
                        cutFn;
                      },
                    },
                    {
                      label: "Delete",
                      left: "DeleteOutlineRounded",
                      type: "ENTRY",
                      onClick: () => {
                        deleteBlock(
                          data,
                          regionInfo.parentId,
                          regionInfo.fieldInfo,
                        );
                      },
                    },
                  ]}
                />
              )
            }
            readonly={!data.editing}
            disableDrag={data.editing}
            onFocus={() => setEditing(data.id, true)}
            onBlur={() => setEditing(data.id, false)}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              updateCommentText(data.id, event.target.value)
            }
          />
        </CommentContainer>
      </NestedContextMenu>
    );
  },
);
