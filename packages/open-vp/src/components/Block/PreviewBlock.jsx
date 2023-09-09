import React, {memo} from 'react';
import { useCallback } from "react";
import { useProgrammingStore } from "../ProgrammingContext";
import { VisualBlock } from './VisualBlock';
import { combinedBlockData } from "../Generators";
import { stringEquality } from './Utility';

export const PreviewBlock = memo(({ id, staticData, bounded, highlightColor, context, style}) => {
  const [data, typeSpec] = useProgrammingStore(
    useCallback(
      (state) => combinedBlockData(state,staticData,id),
      [id, staticData]
    ),stringEquality
  );

  const blockContext = data.arguments ? data.arguments : [];
  const wholeContext = [...context,...blockContext];
  
    if (!data) {
      return null;
    } else {
      return <VisualBlock data={data} typeSpec={typeSpec} interactionDisabled bounded={bounded} highlightColor={highlightColor} context={wholeContext} style={style} limitedRender/>;
    }
  });