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
} from "@people_and_robots/open-core";

export interface PreviewBlockProps {
  id: string;
  staticData: any;
  bounded?: boolean;
  context: any[];
  style?: React.CSSProperties;
}

export const PreviewBlock = memo(
  ({ id, staticData, bounded, context, style }: PreviewBlockProps) => {
    const [data, typeSpec, _eState, _blockData, argumentBlockData]: [
      BlockData,
      TypeSpec,
      ExecutionState,
      BlockData | null,
      BlockData[] | null,
    ] = useProgrammingStore((state: ProgrammingState) =>
      combinedBlockData(
        state.programData,
        state.executionData,
        state.programSpec.objectTypes,
        staticData || id || ""
      )
    ) as [
      BlockData,
      TypeSpec,
      ExecutionState,
      BlockData | null,
      BlockData[] | null,
    ];

    const blockContext =
      data.metaType === MetaType.FunctionDeclaration ? data.arguments : [];
    const wholeContext = [...context, ...blockContext];

    const regionInfo: RegionInfo = {
      parentId: OUTSIDE,
      fieldInfo: {
        id: "PREVIEW",
        name: "PREVIEW",
        accepts: [data.type],
        default: null,
        isList: false,
        fullWidth: false,
        type: PropertyType.Block,
      },
    };

    

    if (!data) {
      return null;
    } else {
      return (
        <VisualBlock
          data={data}
          argumentBlockData={argumentBlockData || []}
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
