import { useProgrammingStore } from "../ProgrammingContext";
import { useDrag } from "react-dnd";
import { useCallback, useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { PreviewBlock } from './PreviewBlock';
import { VisualBlock } from "./VisualBlock";
import { DATA_TYPES } from "..";

const Block = ({
  id,
  staticData,
  parentId,
  fieldInfo,
  idx,
  dragDisabled,
  bounded,
  after,
  highlightColor
}) => {
  const [data, typeSpec] = useProgrammingStore(
    useCallback(
      (state) => {
        const data = staticData ? staticData : state.programData[id] ? state.programData[id] : null;
        const typeSpec = state.programSpec.objectTypes[data?.type];
        const refData = data?.ref ? state.programData[data?.ref] : {};
        const selected = data?.selected || refData.selected;
        return [{...data,refData,selected}, typeSpec]
      },
      [id, staticData]
    )
  );

  const onCanvas = data.dataType === DATA_TYPES.REFERENCE
        ? typeSpec.referenceBlock.onCanvas
        : data.dataType === DATA_TYPES.CALL 
        ? typeSpec.callBlock.onCanvas
        : typeSpec.instanceBlock.onCanvas;

  const [dragProps, drag, preview] = useDrag(
    () => ({
      type: data?.type ? data.type : "null",
      item: () => {
        return { data, typeSpec, parentId, fieldInfo, idx, onCanvas };
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
        <div hidden={parentId !== "drawer" && dragProps.isDragging} style={{display:'flex',flex:1}}>
          <VisualBlock data={data} ref={drag} typeSpec={typeSpec} bounded={bounded} highlightColor={highlightColor}/>
        </div>
        <div hidden={parentId !== "drawer" && dragProps.isDragging} style={{display:'flex'}}>
          {after}
        </div>
      </>
      
    );
  }
};

export { Block, VisualBlock, PreviewBlock }