import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    ReactFlowProvider
  } from "react-flow-renderer";
  import { useProgrammingStore } from "./ProgrammingContext";
  import { useMemo } from "react";
  import { VisualBlock } from "./Block";
  import { DATA_TYPES } from "./Constants";
  
  const CanvasNode = ({ data }) => (
    <VisualBlock data={data} x={0} y={0} typeSpec={data.typeSpec} onCanvas />
  );
  
  export const Canvas = () => {
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
            data: { ...data, ref, typeSpec: {...typeSpec, color, onCanvas}}
          }
        })
        .filter((data) => data.data.typeSpec?.onCanvas)
    );
    
    const moveNode = useProgrammingStore((store) => store.moveBlock);
  
    return (
      <ReactFlowProvider>
        <div style={{ backgroundColor: "black", display:'flex', flex:1 }}>
          <ReactFlow
            maxZoom={1.5}
            nodesConnectable={false}
            elementsSelectable={false}
            nodesDraggable={true}
            nodeTypes={useMemo(() => ({ canvasNode: CanvasNode }), [])}
            nodes={nodes}
            onConnect={(_) => {}}
            onNodesChange={moveNode}
            // onLoad={(reactFlowInstance) => {
            //   reactFlowInstance.fitView();
            //   reactFlowInstance.zoomTo(1);
            // }}
            fitViewOnInit
            defaultZoom={1}
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
      </ReactFlowProvider>
    );
  };
  