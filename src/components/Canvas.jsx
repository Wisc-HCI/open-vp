import React from 'react';
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
import { referenceTemplateFromSpec } from "./Generators";
import useMeasure from 'react-use-measure';

const CanvasNode = ({ data }) => {
  const { highlightColor, ...rest } = data;
  return (
    <VisualBlock data={rest} x={0} y={0} typeSpec={rest.typeSpec} onCanvas highlightColor={highlightColor} context={rest.context} />
  )
};

export const Canvas = ({ highlightColor, drawerWidth }) => {

  const nodes = useProgrammingStore((state) =>
    Object.values(state.programData)
      .map((data) => {
        const typeSpec = state.programSpec.objectTypes[data.type];
        const blockType = data.dataType === DATA_TYPES.INSTANCE
          ? 'instanceBlock'
          : data.dataType === DATA_TYPES.CALL
            ? 'callBlock'
            : data.dataType === DATA_TYPES.REFERENCE
              ? 'referenceBlock'
              : 'nullBlock'
        const color = state.programSpec.objectTypes[data.type][blockType]?.color;
        const onCanvas = state.programSpec.objectTypes[data.type][blockType]?.onCanvas;
        const ref = data.ref ? state.programData[data.ref] : {};
        const argumentBlocks = data?.arguments ? data.arguments : ref?.arguments ? ref.arguments : [];
        const argumentBlockData = argumentBlocks.map((instanceId) => {
          const inst = state.programData[instanceId];
          const instType = state.programSpec.objectTypes[inst.type];
          return referenceTemplateFromSpec(inst.type, inst, instType)
        })
        return {
          id: data.id,
          position: data.position,
          type: 'canvasNode',
          data: { ...data, highlightColor, ref, typeSpec: { ...typeSpec, color, onCanvas }, context: data.arguments ? data.arguments : [], argumentBlockData }
        }
      })
      .filter((data) => data.data.typeSpec?.onCanvas)
  );

  const acceptTypes = useProgrammingStore(state => Object.entries(state.programSpec.objectTypes)
    .filter(([_, objectType]) => objectType.instanceBlock?.onCanvas || objectType.referenceBlock?.onCanvas || objectType.callBlock?.onCanvas)
    .map(([objectKey]) => objectKey))

  const moveNode = useProgrammingStore((state) => state.moveBlock);
  const createPlacedNode = useProgrammingStore((state) => state.createPlacedBlock);

  const { project, getZoom } = useReactFlow();

  const [ref, bounds] = useMeasure();

  const drop = useDrop({
    accept: acceptTypes,
    canDrop: (item) => item.onCanvas,
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      console.log(monitor)
      // const zoom = getZoom();
      const position = project({
        x: clientOffset.x - bounds.left - 50,
        y: clientOffset.y - bounds.top,
      });
      createPlacedNode(item.data, position.x, position.y)
    }
  })[1]

  

  return (

    <div ref={ref} style={{ backgroundColor: "black", display: 'flex', flex: 1 }}>
      <ReactFlow
        ref={drop}
        maxZoom={1.5}
        minZoom={0.5}
        nodesConnectable={false}
        elementsSelectable={false}
        nodesDraggable={true}
        
        nodeTypes={useMemo(() => ({ canvasNode: CanvasNode }), [])}
        nodes={nodes}
        onConnect={(_) => { }}
        onNodesChange={moveNode}
        defaultZoom={1}
        fitView
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
