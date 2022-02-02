import { useProgrammingStore } from "../ProgrammingContext";
import { useDrag } from "react-dnd";
import { useCallback, useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { PreviewBlock } from './PreviewBlock';
import { VisualBlock } from "./VisualBlock";
import { DATA_TYPES } from "..";
import { referenceTemplateFromSpec } from "../Generators";

const Block = ({
  id,
  staticData,
  parentId,
  fieldInfo,
  idx,
  dragDisabled,
  bounded,
  after,
  highlightColor,
  context,
  interactionDisabled
}) => {
  const [data, typeSpec] = useProgrammingStore(
    useCallback(
      (state) => {
        const data = staticData ? staticData : state.programData[id] ? state.programData[id] : null;
        const typeSpec = state.programSpec.objectTypes[data?.type];
        const refData = data?.ref ? state.programData[data?.ref] : {};
        const selected = data?.selected || refData.selected;
        const argumentBlocks = data?.arguments ? data.arguments : refData?.arguments ? refData.arguments: [];
        const argumentBlockData = argumentBlocks.map((instanceId)=>{
          const inst = state.programData[instanceId];
          const instType = state.programSpec.objectTypes[inst.type];
          return referenceTemplateFromSpec(inst.type,inst,instType)
        })
        // Package up information on the block, data about the corresponding reference (if applicable), and argument blocks it contains
        return [{...data,refData,selected,argumentBlockData}, typeSpec]
      },
      [id, staticData]
    )
  );

  const blockContext = data.arguments ? data.arguments : [];
  const wholeContext = [...context,...blockContext];

  const onCanvas = data.dataType === DATA_TYPES.REFERENCE
        ? typeSpec.referenceBlock.onCanvas
        : data.dataType === DATA_TYPES.CALL 
        ? typeSpec.callBlock.onCanvas
        : typeSpec.instanceBlock.onCanvas;

  const [dragProps, drag, preview] = useDrag(
    () => ({
      type: data?.type ? data.type : "null",
      item: () => {
        return { data, typeSpec, parentId, fieldInfo, idx, onCanvas, context:wholeContext };
      },
      canDrag: !dragDisabled,
      collect: (monitor) => ({ isDragging: monitor.isDragging() })
    }),
    [data, typeSpec, parentId, fieldInfo, idx, dragDisabled]
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false });
  }, [preview]);

  if (!data) {
    return null;
  } else {
    return (
      <>
        {/* Hide the visual block if it is not coming from a spawner. The "after" is also hidden, if applicable */}
        <div hidden={parentId !== "spawner" && dragProps.isDragging} style={{display:'flex',flex:1}}>
          <VisualBlock data={data} ref={drag} typeSpec={typeSpec} bounded={bounded} highlightColor={highlightColor} context={wholeContext} interactionDisabled={interactionDisabled}/>
        </div>
        <div hidden={parentId !== "spawner" && dragProps.isDragging} style={{display:'flex'}}>
          {/* 'after' is usually a drop region in the case of lists */}
          {after}
        </div>
      </>
      
    );
  }
};

export { Block, VisualBlock, PreviewBlock }