import React, { memo } from "react";
import { useCallback } from "react";
import { VisualBlock } from "./VisualBlock";
import {
  useProgrammingStore,
  ProgrammingState,
  BlockData,
  TypeSpec,
  ExecutionState,
  RegionInfo,
  combinedBlockData,
  OUTSIDE,
  MetaType,
  PropertyType,
  CommentData,
} from "@people_and_robots/open-core";
import { CommentBlock } from "./CommentBlock";

export interface PreviewBlockProps {
  id: string;
  staticData: any;
  bounded?: boolean;
  context: any[];
  style?: React.CSSProperties;
}

export const PreviewBlock = memo(
  ({ id, staticData, bounded, context, style }: PreviewBlockProps) => {
    const [data, typeSpec, _eState, _blockData]: [
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
      BlockData | null
    ];

    const blockContext =
      data?.metaType === MetaType.FunctionDeclaration ? data.arguments : [];
    const wholeContext: string[] = [...context, ...blockContext];

    const regionInfo: RegionInfo = {
      parentId: OUTSIDE,
      fieldInfo: {
        id: "PREVIEW",
        name: "PREVIEW",
        accepts: [data ? data.type : 'null'],
        default: null,
        isList: false,
        fullWidth: false,
        type: PropertyType.Block,
      },
    };

    

    if (!data) {
      return null;
    } else if (data.metaType === MetaType.Comment) {
      return (
        <CommentBlock data={data} bounded regionInfo={regionInfo}/>
      )
    } else {
      return (
        <VisualBlock
          data={data}
          regionInfo={regionInfo}
          typeSpec={typeSpec}
          interactionDisabled
          bounded={bounded}
          context={wholeContext}
          style={style}
          limitedRender
        />
      );
    }
  }
);
