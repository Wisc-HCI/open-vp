import { useProgrammingStore } from "../ProgrammingContext";
import { useDrag } from "react-dnd";
import { useCallback, useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { PreviewBlock } from './PreviewBlock';
import { VisualBlock } from "./VisualBlock";

const Block = ({
  id,
  staticData,
  parentId,
  fieldInfo,
  idx,
  dragDisabled,
  bounded,
  after
}) => {
  const [data, typeSpec] = useProgrammingStore(
    useCallback(
      (state) => {
        const data = staticData ? staticData : state.programData[id] ? state.programData[id] : null
        const typeSpec = state.programSpec.objectTypes[data?.type]
        const refData = data?.ref ? state.programData[data?.ref] : {};
        return [{...data,refData}, typeSpec]
      },
      [id, staticData]
    )
  );

  const [dragProps, drag, preview] = useDrag(
    () => ({
      type: data?.type ? data.type : "null",
      item: () => {
        return { data, typeSpec, parentId, fieldInfo, idx };
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
          <VisualBlock data={data} ref={drag} typeSpec={typeSpec} bounded={bounded}/>
        </div>
        <div hidden={parentId !== "drawer" && dragProps.isDragging} style={{display:'flex'}}>
          {after}
        </div>
      </>
      
    );
  }
};

export { Block, VisualBlock, PreviewBlock }