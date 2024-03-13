import { memo, useEffect, useCallback, ReactNode } from "react";
import ReactFlow, {
  Background,
  MiniMap,
  useReactFlow,
  BackgroundVariant,
  NodeProps,
  Node,
  NodeChange,
  ProOptions,
  Position,
  type Connection,
} from "reactflow";
import { useDrop } from "react-dnd";
import {
  useProgrammingStore,
  ProgrammingState,
  Tab,
  ClipboardAction,
  MetaType,
  ConnectionData,
  BlockData,
  PrimitiveType,
  ClipboardProps,
  CANVAS,
  TypeSpec,
  PropertyType,
  SPAWNER,
  RegionInfo,
  CommentData,
} from "@people_and_robots/open-core";
import { useMemo } from "react";
import { Block, blockSpecQuery } from "@people_and_robots/open-blocks";
import { CanvasEdge, DrawingCanvasEdge } from "./CanvasEdge";
import { RectReadOnly } from "react-use-measure";
import { styled, lighten, darken, alpha, useTheme } from "@mui/material";
import { debounce } from "lodash";
import { ParentSize } from "@visx/responsive";
import ResizePanel from "./ResizePanel";
import { NestedContextMenu } from "@people_and_robots/open-gui";
import "reactflow/dist/style.css";

const CanvasNode = memo(
  ({ id }: NodeProps) => {
    return (
      <Block
        id={id}
        regionInfo={{
          parentId: CANVAS,
          fieldInfo: {
            id: CANVAS,
            name: CANVAS,
            accepts: [],
            default: null,
            type: PropertyType.Block,
          },
        }}
        dragDisabled
        context={[]}
      />
    );
  },
  // Prevent rerenders when only position or something ignored changes
  // (previous, next) =>
  //   compareBlockData(previous.data, next.data, next.data.typeSpec.properties)
);
// return stringEquality(current.data,previous.data)});

export interface CanvasProps {
  snapToGrid?: boolean;
  drawerWidth: number;
  bounds: RectReadOnly;
  reactflowProOptions?: ProOptions;
}
export function Canvas({
  snapToGrid = true,
  drawerWidth,
  bounds,
  reactflowProOptions,
}: CanvasProps): ReactNode {
  const theme = useTheme();
  const setTabViewport = useProgrammingStore(
    (state: ProgrammingState) => state.setTabViewport,
  );
  const setClipboardBlock = useProgrammingStore(
    (state: ProgrammingState) => state.setClipboardBlock,
  );

  const updateItemSelected = useProgrammingStore(
    (state: ProgrammingState) => state.updateItemSelected,
  );
  const setSelections = useProgrammingStore(
    (state: ProgrammingState) => state.setSelections,
  );

  const drawerOpen = useProgrammingStore(
    (state: ProgrammingState) => state.activeDrawer !== null,
  );

  const activeTabData: Tab | null = useProgrammingStore(
    (state: ProgrammingState) => {
      let tabData = null;
      state.tabs.some((tab: Tab) => {
        if (tab.id === state.activeTab) {
          tabData = tab;
          return true;
        } else {
          return false;
        }
      });
      return tabData as Tab | null;
    },
  );
  // const setLocked = useProgrammingStore((state) => state.setLocked);
  const createEdge = useProgrammingStore(
    (state: ProgrammingState) => state.createEdge,
  );

  const paste = useProgrammingStore((state: ProgrammingState) => state.paste);

  // const clipboard = useProgrammingStore((state) => state.clipboard);

  const onCanvasPastable = useProgrammingStore(
    (state: ProgrammingState) =>
      state.clipboard?.regionInfo?.parentId === CANVAS &&
      [
        ClipboardAction.Paste,
        ClipboardAction.Copy,
        ClipboardAction.Cut,
      ].includes(state.clipboard.action || ClipboardAction.Select),
  );

  const validateEdge = useProgrammingStore(
    (state: ProgrammingState) => state.validateEdge,
  );
  const onOffClick = useProgrammingStore(
    (state: ProgrammingState) => state.onOffVPEClick,
  );
  const setConnectionInfo = useProgrammingStore(
    (state: ProgrammingState) => state.setConnectionInfo,
  );
  const getTabViewport = useProgrammingStore(
    (state: ProgrammingState) => state.getTabViewport,
  );

  const nodes: Node[] = useProgrammingStore(
    useCallback(
      (state: ProgrammingState) =>
        ((activeTabData as Tab | null)?.blocks
          ?.map((blockId: string) => {
            const data: BlockData = state.programData[blockId] as BlockData;
            if (!data) return null;
            if (data.metaType === MetaType.Argument) return null;
            return {
              id: data.id,
              position: data.position,
              type: "canvasNode",
              data: { typeSpec: state.programSpec.objectTypes[data.type] },
              selected: data.selected,
            } as Node;
          })
          ?.filter((data: any) => data !== null) as Node[]) || ([] as Node[]),
      [activeTabData],
    ),
  );

  const edges = useProgrammingStore((state: ProgrammingState) => {
    return Object.values(state.programData)
      .filter(
        (data: ConnectionData | BlockData | CommentData) =>
          data.metaType === MetaType.Connection,
      )
      .map((data: ConnectionData | BlockData | CommentData) => ({
        id: data.id,
        source: (data as ConnectionData).parent.id,
        target: (data as ConnectionData).child.id,
        sourceHandle: (data as ConnectionData).parent.handle,
        targetHandle: (data as ConnectionData).child.handle,
        // data: { label: data.name },
        type: "canvasEdge",
      }));
  });

  const acceptTypes = useProgrammingStore((state: ProgrammingState) =>
    Object.entries(state.programSpec.objectTypes)
      .filter(
        ([_, objectType]: [any, TypeSpec]) =>
          (objectType.primitiveType === PrimitiveType.Object &&
            (objectType.instanceBlock.onCanvas ||
              objectType.referenceBlock.onCanvas)) ||
          (objectType.primitiveType === PrimitiveType.Function &&
            (objectType.functionBlock.onCanvas ||
              objectType.callBlock.onCanvas)),
      )
      .map(([objectKey]) => objectKey),
  );

  const canvasRegion: RegionInfo = {
    parentId: CANVAS,
    fieldInfo: {
      id: CANVAS,
      name: CANVAS,
      accepts: acceptTypes,
      default: null,
      type: PropertyType.Block,
    },
  };

  const moveNodes = useProgrammingStore(
    (state: ProgrammingState) => state.moveBlocks,
  );
  const createPlacedNode = useProgrammingStore(
    (state: ProgrammingState) => state.createPlacedBlock,
  );

  const { screenToFlowPosition, fitView, setViewport } = useReactFlow();

  const drop = useDrop(
    {
      accept: acceptTypes,
      canDrop: (item?: ClipboardProps) =>
        item &&
        (item?.regionInfo?.parentId === CANVAS ||
          (item?.regionInfo?.parentId === SPAWNER &&
            item?.typeSpec &&
            blockSpecQuery(item?.typeSpec, "onCanvas", item?.data?.metaType))),
      drop: (item: ClipboardProps | undefined, monitor) => {
        const clientOffset = monitor.getClientOffset();
        if (!clientOffset) return;
        const position = screenToFlowPosition(clientOffset);
        if (item?.data) {
          createPlacedNode(
            (item as ClipboardProps).data as BlockData,
            position.x,
            position.y,
          );
        }
      },
    },
    [drawerWidth, acceptTypes, drawerWidth, bounds, drawerOpen],
  )[1];

  useEffect(() => {
    const viewport = getTabViewport(activeTabData?.id || "");
    if (viewport) {
      // console.log('setting viewport',activeTabData.viewport)
      setViewport(viewport);
    } else {
      fitView();
    }
    return () => {};
  }, [activeTabData?.id]);

  const onNodesChange = (changes: NodeChange[]) => {
    moveNodes(changes);
    // clearSelections();
    // setSelections(changes.nodes.map((node:Node)=>node.id));
    changes.forEach((nodeChange: NodeChange) => {
      if (nodeChange.type !== "select") return;
      console.log(nodeChange);
      // console.log('node selected?', nodeChange..id, node.selected)
      updateItemSelected(nodeChange.id, nodeChange.selected);
    });
  };

  return (
    <Backdrop pastable={onCanvasPastable}>
      <ParentSize>
        {({ width, height }: { width: number; height: number }) => (
          <NestedContextMenu
            data={{}}
            inner={[
              {
                type: "ENTRY",
                label: "Paste",
                left: "ContentCopyRounded",
                disabled: !onCanvasPastable,
                onClick: (_data: {}, e: MouseEvent) => {
                  const viewport = getTabViewport(
                    (activeTabData as Tab | null)?.id || "",
                  );
                  const zoom = viewport?.zoom || 1;
                  const { x, y } = screenToFlowPosition({
                    x: e.clientX,
                    y: e.clientY,
                  });
                  const coordinates = { x: x - 100 / zoom, y: y - 100 / zoom };
                  const clipboardProps: ClipboardProps = {
                    coordinates,
                    tab: (activeTabData as Tab | null)?.id,
                    regionInfo: canvasRegion,
                  };
                  paste(clipboardProps);
                  e.stopPropagation();
                },
              },
            ]}
          >
            <ReactFlow
              ref={drop}
              maxZoom={1}
              style={{ height, width }}
              minZoom={0.25}
              nodesConnectable
              elevateNodesOnSelect
              onDoubleClick={(e) => {
                setClipboardBlock();
                setSelections([]);
              }}
              onClick={(e) => {
                onOffClick(null);
                setClipboardBlock();
                // handleContextMenuClose();
                e.stopPropagation();
              }}
              onMove={debounce((_, viewport) => {
                if (activeTabData) {
                  setTabViewport((activeTabData as Tab).id, viewport);
                }
              }, 3000)}
              elementsSelectable={true}
              nodeTypes={useMemo(() => ({ canvasNode: CanvasNode }), [])}
              edgeTypes={useMemo(() => ({ canvasEdge: CanvasEdge }), [])}
              nodes={nodes}
              edges={edges}
              connectionLineComponent={DrawingCanvasEdge}
              onConnect={(data: Connection) => {
                if (
                  validateEdge(
                    data.source || "",
                    data.sourceHandle as Position,
                    data.target || "",
                    data.targetHandle as Position,
                  )
                ) {
                  // console.log('valid edge found')
                  createEdge(
                    data.source || "",
                    data.sourceHandle as Position,
                    data.target || "",
                    data.targetHandle as Position,
                  );
                }
              }}
              onConnectStart={(_, data) => {
                setConnectionInfo(data);
              }}
              onConnectEnd={(_) => {
                setConnectionInfo(null);
              }}
              onNodesChange={onNodesChange}
              fitView
              snapToGrid={snapToGrid}
              snapGrid={[30, 30]}
              proOptions={reactflowProOptions}
            >
              <MiniMap
                style={{
                  backgroundColor: "transparent",
                  WebkitBackdropFilter: "blur(10px)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 5,
                  overflow: "hidden",
                  padding: 0,
                  height: 100,
                }}
                maskColor={
                  theme.palette.mode === "dark" ? "#d0d0d070" : "#20202070"
                }
                nodeStrokeColor={"transparent"}
                nodeColor={(n: Node) =>
                  blockSpecQuery(n.data.typeSpec, "color", n.data.metaType) ||
                  "#fff"
                }
                nodeBorderRadius={10}
                pannable
                zoomable
              />
              <ResizePanel />
              <Background
                variant={BackgroundVariant.Dots}
                color="#555"
                gap={30}
                size={2}
              />
            </ReactFlow>
          </NestedContextMenu>
        )}
      </ParentSize>
    </Backdrop>
  );
}

export interface BackdropProps {
  pastable?: boolean;
}
export const Backdrop = styled("div")<BackdropProps>(
  {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    height: "100%",
    // width: "100%",
    // backgroundColor: 'blue'
  },
  ({ theme, pastable }) => ({
    backgroundColor: pastable
      ? lighten(theme.palette.background.default, 0.3)
      : theme.palette.background.default,
    "& .react-flow__selection": {
      background: alpha(darken(theme.palette.primary.main, 0.5), 0.3),
      border: `1px dotted ${alpha(theme.palette.primary.main, 0.8)}`,
      borderRadius: 3,
      outline: "none",
    },
    "& .react-flow__nodesselection-rect": {
      background: alpha(darken(theme.palette.primary.main, 0.5), 0.3),
      border: `1px dotted ${alpha(theme.palette.primary.main, 0.8)}`,
      borderRadius: 3,
      outline: "none",
      zIndex: 1,
    },
    "& .react-flow__nodesselection": {
      background: "transparent",
    },
  }),
);
