import { memo, useEffect, ReactNode } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { VisualBlock } from "./VisualBlock";
import {
  BlockData,
  combinedBlockData,
  ExecutionState,
  ProgrammingState,
  TypeSpec,
  useProgrammingStore,
  ClipboardProps,
  SPAWNER,
  MetaType,
  RegionInfo,
  CommentData,
} from "@people_and_robots/open-core";
import { CommentBlock } from "./CommentBlock";

export interface BlockProps {
  id?: string;
  staticData?: BlockData | CommentData;
  regionInfo: RegionInfo;
  dragDisabled?: boolean;
  bounded?: boolean;
  after?: ReactNode;
  context: string[];
  interactionDisabled?: boolean;
  limitedRender?: boolean;
}

export const Block = memo(
  ({
    id = undefined,
    staticData = undefined,
    regionInfo,
    dragDisabled = false,
    bounded = false,
    after = undefined,
    context = [],
    interactionDisabled = false,
    limitedRender = false,
  }: BlockProps) => {
    const [data, typeSpec, progress, refData]: [
      null | BlockData | CommentData,
      TypeSpec,
      ExecutionState,
      BlockData | null,
    ] = useProgrammingStore((state: ProgrammingState) =>
      combinedBlockData(
        state.programData,
        state.executionData,
        state.programSpec.objectTypes,
        staticData || id || ""
      )
    ) as [
      null | BlockData | CommentData,
      TypeSpec,
      ExecutionState,
      BlockData | null,
    ];

    const isCut: boolean = useProgrammingStore(
      (state: ProgrammingState) =>
        state.clipboard.block?.id === data?.id &&
        state.clipboard.action === "CUT"
    ) as boolean;
    const copy: (clipboardProps: ClipboardProps) => void = useProgrammingStore(
      (state: ProgrammingState) => state.copy
    ) as (clipboardProps: ClipboardProps) => void;
    const cut: (clipboardProps: ClipboardProps) => void = useProgrammingStore(
      (state: ProgrammingState) => state.cut
    ) as (clipboardProps: ClipboardProps) => void;

    const blockContext =
      data?.metaType === MetaType.FunctionDeclaration ? data.arguments : [];
    const wholeContext: string[] = [...context, ...blockContext];

    const [dragProps, drag, preview] = useDrag(
      () => ({
        type: data?.type ? data.type : "null",
        item: () => {
          // setActiveDrawer(null);
          console.log("Dragging");
          return {
            data,
            typeSpec,
            regionInfo,
            context: wholeContext,
          } as ClipboardProps;
        },
        canDrag:
          !dragDisabled && !data?.editing,
        collect: (monitor) => ({ isDragging: monitor.isDragging() }),
      }),
      [data, typeSpec, regionInfo, dragDisabled]
    );

    useEffect(() => {
      preview(getEmptyImage(), { captureDraggingState: false });
    }, [preview]);

    if (!data) {
      return null;
    }

    const copyFn = () => copy({ data, regionInfo, context });
    const cutFn = () => {
      console.log("cutting", data);
      cut({ data, regionInfo, context });
      console.log("did cut");
    };
    const hidden: boolean =
      (![SPAWNER].includes(regionInfo.parentId) && dragProps.isDragging) ||
      isCut ||
      false;

    // console.log("rendered Block", drag)

    if (data.metaType === MetaType.Comment) {
      return (
        <>
          {/* Hide the visual block if it is not coming from a spawner. The "after" is also hidden, if applicable */}
          <div
            hidden={hidden}
            style={{ flex: 1, display: hidden ? "none" : "flex" }}
            onContextMenu={(e) => e.stopPropagation()}
          >
            <CommentBlock
              ref={drag}
              data={data}
              bounded
              regionInfo={regionInfo}
              copyFn={copyFn}
              cutFn={cutFn}
            />
            
          </div>
          <div hidden={hidden} style={{ display: hidden ? "none" : "flex" }}>
              {/* 'after' is usually a drop region in the case of lists */}
              {after}
            </div>
        </>
      );
    }

    return (
      <>
        {/* Hide the visual block if it is not coming from a spawner. The "after" is also hidden, if applicable */}
        <div
          hidden={hidden}
          style={{ flex: 1, display: hidden ? "none" : "flex" }}
          onContextMenu={(e) => e.stopPropagation()}
        >
          <VisualBlock
            data={data}
            refData={refData || undefined}
            ref={drag}
            typeSpec={typeSpec}
            bounded={bounded}
            context={wholeContext}
            interactionDisabled={interactionDisabled}
            regionInfo={regionInfo}
            progress={progress}
            limitedRender={limitedRender}
            copyFn={copyFn}
            cutFn={cutFn}
          />
        </div>
        <div hidden={hidden} style={{ display: hidden ? "none" : "flex" }}>
          {/* 'after' is usually a drop region in the case of lists */}
          {after}
        </div>
      </>
    );
  }
);
