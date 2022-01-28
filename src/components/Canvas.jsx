import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useReactFlow
  } from "react-flow-renderer";
  import { useDrop } from 'react-dnd';
  import { useProgrammingStore } from "./ProgrammingContext";
  import { useMemo } from "react";
  import { VisualBlock } from "./Block";
  import { DATA_TYPES } from "./Constants";

  const CanvasNode = ({data}) => {
    const {highlightColor, ...rest} = data;
    return (
      <VisualBlock data={rest} x={0} y={0} typeSpec={rest.typeSpec} onCanvas highlightColor={highlightColor}/>
  )};
  
  export const Canvas = ({highlightColor}) => {
    const nodes = useProgrammingStore((store) =>
      Object.values(store.programData)
        .map((data) => {
          const typeSpec = store.programSpec.objectTypes[data.type];
          const blockType = data.dataType === DATA_TYPES.INSTANCE 
            ? 'instanceBlock' 
            : data.dataType === DATA_TYPES.CALL 
            ? 'callBlock' 
            : data.dataType === DATA_TYPES.REFERENCE
            ? 'referenceBlock'
            : 'nullBlock'
          const color = store.programSpec.objectTypes[data.type][blockType]?.color;
          const onCanvas = store.programSpec.objectTypes[data.type][blockType]?.onCanvas;
          const ref = data.ref ? store.programData[data.ref] : {};
          return {
            id: data.id,
            position:data.position,
            type: 'canvasNode',
            data: { ...data, highlightColor, ref, typeSpec: {...typeSpec, color, onCanvas}}
          }
        })
        .filter((data) => data.data.typeSpec?.onCanvas)
    );

    const acceptTypes = useProgrammingStore(store=>Object.entries(store.programSpec.objectTypes)
      .filter(([_,objectType])=>objectType.instanceBlock?.onCanvas || objectType.referenceBlock?.onCanvas || objectType.callBlock?.onCanvas)
      .map(([objectKey])=>objectKey))
    
    const moveNode = useProgrammingStore((store) => store.moveBlock);
    const createPlacedNode = useProgrammingStore((store) => store.createPlacedBlock);

    const {project} = useReactFlow();

    const drop = useDrop({
      accept: acceptTypes,
      canDrop: (item) => item.onCanvas,
      drop: (item, monitor) => {
          const clientOffset = monitor.getClientOffset();
          const position = project({
              x: clientOffset.x - 350,
              y: clientOffset.y,
          });
          createPlacedNode(item.data,position.x,position.y)
      }
    })[1]
  
    return (
      
        <div style={{ backgroundColor: "black", display:'flex', flex:1 }}>
          <ReactFlow
            ref={drop}
            maxZoom={1.5}
            minZoom={0.5}
            nodesConnectable={false}
            elementsSelectable={false}
            nodesDraggable={true}
            nodeTypes={useMemo(() => ({ canvasNode: CanvasNode }), [])}
            nodes={nodes}
            onConnect={(_) => {}}
            onNodesChange={moveNode}
            fitViewOnInit
            defaultZoom={0.5}
            snapToGrid={true}
            snapGrid={[30, 30]}
          >
            <MiniMap
              maskColor="#1a192b44"
              nodeStrokeColor={(n) => {
                if (n.style?.background) return n.style.background;
                if (n.data.typeSpec.color !== null) return n.data.typeSpec.color;
  
                return "#eee";
              }}
              nodeColor={(n) => {
                if (n.data.typeSpec.color !== null) return n.data.typeSpec.color;
                if (n.style?.background) return n.style.background;
  
                return "#fff";
              }}
              nodeBorderRadius={3}
            />
            <Controls />
            <Background variant="lines" color="#555" gap={30} />
          </ReactFlow>
        </div>
    );
  };
  