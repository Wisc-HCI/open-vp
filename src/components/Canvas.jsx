import React, { memo, useState, useEffect, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  ControlButton,
  useViewport,
} from "reactflow";
import { useDrop } from "react-dnd";
import { useProgrammingStore } from "./ProgrammingContext";
import { useMemo } from "react";
import { VisualBlock } from "./Block";
import { CanvasEdge, DrawingCanvasEdge } from "./CanvasEdge";
import { CLIPBOARD_ACTION, DATA_TYPES } from "./Constants";
import { referenceTemplateFromSpec } from "./Generators";
import useMeasure from "react-use-measure";
import { FiLock, FiUnlock, FiClipboard } from "react-icons/fi";
// import { isEqual, pick } from "lodash";
import { stringEquality } from "./Block/Utility";
import shallow from "zustand/shallow";
import { compareBlockData } from "./Block/Utility";
import "reactflow/dist/style.css";
// import './canvas.css';
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { debounce } from "lodash";

const typeToBlockField = (dataType) =>
  dataType === DATA_TYPES.INSTANCE
    ? "instanceBlock"
    : dataType === DATA_TYPES.CALL
    ? "callBlock"
    : dataType === DATA_TYPES.REFERENCE
    ? "referenceBlock"
    : null;

const CanvasNode = memo(
  ({ data }) => {
    const { highlightColor, progress, ...rest } = data;

    const copy = useProgrammingStore((state) => state.copy);
    const cut = useProgrammingStore((state) => state.cut);

    const copyFn = () => copy({ data, context: rest.context, onCanvas: true });
    const cutFn = () => cut({ data, context: rest.context, onCanvas: true });

    // const {zoom} = useViewport();

    return (
      <VisualBlock
        data={rest}
        x={0}
        y={0}
        typeSpec={rest.typeSpec}
        onCanvas
        highlightColor={highlightColor}
        context={rest.context}
        progress={progress}
        copyFn={copyFn}
        cutFn={cutFn}
        // limitedRender={zoom < 0.5}
      />
    );
  },
  // Prevent rerenders when only position or something ignored changes
  (previous, next) =>
    compareBlockData(previous.data, next.data, next.data.typeSpec.properties)
);
// return stringEquality(current.data,previous.data)});

export const Canvas = ({ highlightColor, snapToGrid }) => {
  const locked = useProgrammingStore((state) => state.locked, shallow);
  const setTabViewport = useProgrammingStore(
    (state) => state.setTabViewport,
    shallow
  );
  const setClipboardBlock = useProgrammingStore(
    (state) => state.setClipboardBlock,
    shallow
  );

  const activeTabData = useProgrammingStore((state) => {
    let tabData = null;
    state.tabs.some((tab) => {
      if (tab.id === state.activeTab) {
        tabData = tab;
        return true;
      } else {
        return false;
      }
    });
    return {id:tabData.id,blocks:tabData.blocks};
  }, shallow);
  const setLocked = useProgrammingStore((state) => state.setLocked, shallow);
  const createEdge = useProgrammingStore((state) => state.createEdge, shallow);

  const paste = useProgrammingStore((state) => state.paste, shallow);

  const onCanvasPastable = useProgrammingStore(
    (state) =>
      state.clipboard?.block?.onCanvas === true &&
      [
        CLIPBOARD_ACTION.PASTE,
        CLIPBOARD_ACTION.COPY,
        CLIPBOARD_ACTION.CUT,
      ].includes(state.clipboard.action),
    shallow
  );

  const validateEdge = useProgrammingStore(
    (state) => state.validateEdge,
    shallow
  );
  const onOffClick = useProgrammingStore(
    (state) => state.onOffVPEClick,
    shallow
  );
  const setConnectionInfo = useProgrammingStore(
    (state) => state.setConnectionInfo,
    shallow
  );
  const getTabViewport = useProgrammingStore(
    (state) => state.getTabViewport,
    shallow
  );
  const nodes = useProgrammingStore(
    useCallback(
      (state) =>
        activeTabData?.blocks
          ?.filter(
            (blockId) =>
              state.programSpec.objectTypes[state.programData[blockId]?.type][
                typeToBlockField(state.programData[blockId]?.dataType)
              ]?.onCanvas &&
              !(
                blockId === state.clipboard.block?.data?.id &&
                state.clipboard.action === CLIPBOARD_ACTION.CUT
              )
          )
          ?.map((blockId) => {
            const data = state.programData[blockId] || {};
            const typeSpec = state.programSpec.objectTypes[data.type];
            const progress = state.executionData[data.id];
            const blockType = typeToBlockField(data.dataType);
            const color =
              state.programSpec.objectTypes[data.type][blockType]?.color;
            const onCanvas =
              state.programSpec.objectTypes[data.type][blockType]?.onCanvas;
            const ref = data.ref ? state.programData[data.ref] : null;
            const argumentBlocks = data?.arguments
              ? data.arguments
              : ref?.arguments
              ? ref.arguments
              : [];
            const argumentBlockData = argumentBlocks.map((instanceId) => {
              const inst = state.programData[instanceId];
              const instType = state.programSpec.objectTypes[inst.type];
              return referenceTemplateFromSpec(inst.type, inst, instType);
            });
            return {
              id: data.id,
              position: data.position,
              type: "canvasNode",
              // draggable:!locked,
              data: {
                ...data,
                highlightColor,
                ref,
                typeSpec: { ...typeSpec, color, onCanvas },
                context: data.arguments ? data.arguments : [],
                argumentBlockData,
                progress,
              },
            };
          })
          ?.filter((data) => data.data.typeSpec?.onCanvas) || [],
      [activeTabData]
    ),
    stringEquality
  );

  const edges = useProgrammingStore((state) => {
    return Object.values(state.programData)
      .filter((data) => data.dataType === DATA_TYPES.CONNECTION)
      .map((data) => ({
        id: data.id,
        source: data.parent.id,
        target: data.child.id,
        sourceHandle: data.parent.handle,
        targetHandle: data.child.handle,
        data: { label: data.name },
        type: "canvasEdge",
      }));
  }, stringEquality);

  const acceptTypes = useProgrammingStore(
    (state) =>
      Object.entries(state.programSpec.objectTypes)
        .filter(
          ([_, objectType]) =>
            objectType.instanceBlock?.onCanvas ||
            objectType.referenceBlock?.onCanvas ||
            objectType.callBlock?.onCanvas
        )
        .map(([objectKey]) => objectKey),
    stringEquality
  );

  const moveNodes = useProgrammingStore((state) => state.moveBlocks, shallow);
  const createPlacedNode = useProgrammingStore(
    (state) => state.createPlacedBlock,
    shallow
  );

  const { project, fitView, setViewport, getViewport } = useReactFlow();
  // const { zoom } = useViewport();

  const [ref, bounds] = useMeasure();

  const drop = useDrop({
    accept: acceptTypes,
    canDrop: (item) => item.onCanvas,
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      // const viewport = getTabViewport(activeTabData?.id);
      // console.log(monitor)
      // const zoom = getZoom();
      const position = project({
        x: clientOffset.x - bounds.left - 50,
        y: clientOffset.y - bounds.top,
      });
      createPlacedNode(item.data, position.x, position.y);
    },
  })[1];

  // console.log({ nodes, edges });
  useEffect(() => {
    // console.log('fitting view',activeTabData)
    // fitView();
    const viewport = getTabViewport(activeTabData?.id);
    if (viewport) {
      // console.log('setting viewport',activeTabData.viewport)
      setViewport(viewport);
    } else {
      fitView();
    }
    return () => {};
  }, [activeTabData?.id]);

  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    );
    event.stopPropagation();
  };

  const handleContextMenuClose = () => {
    setContextMenu(null);
  };

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: onCanvasPastable ? "#252525" : "black",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flex: 1,
        height: "100%",
        width: "100%",
      }}
      onContextMenu={handleContextMenu}
    >
      <ReactFlow
        ref={drop}
        maxZoom={1}
        minZoom={0.25}
        nodesConnectable
        // defaultViewport={activeTabData?.viewport}
        onClick={(e) => {
          onOffClick();
          setClipboardBlock(null);
          handleContextMenuClose();
          e.stopPropagation();
        }}
        onMove={debounce((_, viewport) => {
          if (activeTabData) {
            setTabViewport(activeTabData.id, viewport);
          }
        },3000)}
        elementsSelectable={false}
        nodeTypes={useMemo(() => ({ canvasNode: CanvasNode }), [])}
        edgeTypes={useMemo(() => ({ canvasEdge: CanvasEdge }), [])}
        nodes={nodes}
        edges={edges}
        connectionLineComponent={DrawingCanvasEdge}
        onConnect={(data) => {
          if (
            validateEdge(
              data.source,
              data.sourceHandle,
              data.target,
              data.targetHandle
            )
          ) {
            // console.log('valid edge found')
            createEdge(
              data.source,
              data.sourceHandle,
              data.target,
              data.targetHandle
            );
          }
        }}
        onConnectStart={(_, data) => {
          setConnectionInfo(data);
        }}
        onConnectEnd={(_) => {
          setConnectionInfo(null);
        }}
        // onConnectStop={(_) => {
        //   setConnectionInfo(null);
        // }}
        onNodesChange={moveNodes}
        fitView
        snapToGrid={snapToGrid}
        snapGrid={[30, 30]}
      >
        <MiniMap
          style={{ opacity: 0.75, borderRadius: 5 }}
          // maskColor="#1a192b44"
          maskColor="transparent"
          nodeStrokeColor={(n) => {
            // if (n.type==='input') return 'black';
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
        <Controls
          showInteractive={false}
          style={{ backgroundColor: "#555", borderRadius: 5 }}
        >
          <ControlButton onClick={() => setLocked(!locked)}>
            {locked ? <FiLock /> : <FiUnlock />}
          </ControlButton>
        </Controls>
        <Background variant="dots" color="#555" gap={30} size={2} />
      </ReactFlow>
      <Menu
        open={onCanvasPastable && contextMenu !== null}
        onClose={handleContextMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem
          onClick={(e) => {
            // const { zoom } = getViewport();
            const viewport = getTabViewport(activeTabData?.id);
            const zoom = viewport?.zoom || 1;
            const { x, y } = project({
              x: e.clientX,
              y: e.clientY,
            });
            const coordinates = { x: x - 100 / zoom, y: y - 100 / zoom };
            paste({ coordinates, tab: activeTabData?.id });
            handleContextMenuClose();
            e.stopPropagation();
          }}
        >
          <ListItemIcon>
            <FiClipboard />
          </ListItemIcon>
          <ListItemText primary="Paste"></ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};
