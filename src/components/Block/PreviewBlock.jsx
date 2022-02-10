import React from 'react';
import { useCallback } from "react";
import { useProgrammingStore } from "../ProgrammingContext";
import { VisualBlock } from './VisualBlock';
import { referenceTemplateFromSpec } from "../Generators";

export const PreviewBlock = ({ id, staticData, bounded, highlightColor, context, style}) => {
  const [data, typeSpec] = useProgrammingStore(
    useCallback(
      (state) => {
        const data = staticData ? staticData : state.programData[id] ? state.programData[id] : null;
        const typeSpec = state.programSpec.objectTypes[data?.type];
        const refData = data.ref ? state.programData[data.ref] : {};
        const selected = data?.selected || refData.selected;
        const argumentBlocks = data?.arguments ? data.arguments : refData?.arguments ? refData.arguments: [];
        const argumentBlockData = argumentBlocks.map((instanceId)=>{
          const inst = state.programData[instanceId];
          const instType = state.programSpec.objectTypes[inst.type];
          return referenceTemplateFromSpec(inst.type,inst,instType)
        })
        return [{...data,refData,selected,argumentBlockData}, typeSpec]
      },
      [id, staticData]
    )
  );

  const blockContext = data.arguments ? data.arguments : [];
  const wholeContext = [...context,...blockContext];
  
    if (!data) {
      return null;
    } else {
      return <VisualBlock data={data} typeSpec={typeSpec} interactionDisabled bounded={bounded} highlightColor={highlightColor} context={wholeContext} style={style}/>;
    }
  };