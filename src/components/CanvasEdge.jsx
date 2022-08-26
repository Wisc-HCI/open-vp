import React, { useCallback } from "react";
import { getSmoothStepPath, getEdgeCenter } from "react-flow-renderer";
import { useProgrammingStore } from "./ProgrammingContext";
import { FiTrash2, FiType, FiHash } from "react-icons/fi";
import styled from "@emotion/styled";
import { SIMPLE_PROPERTY_TYPES } from "./Constants";
import { Spinner } from "./Block/Utility";

const EdgeButton = styled.button({
  all: "unset",
  fontFamily: "inherit",
  userSelect: "none",
  borderRadius: "100%",
  height: "23px",
  width: "23px",
  display: "inherit",
  padding: "3px",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  cursor: "pointer",
  // backgroundColor: 'darkgrey',
  "&:hover": {
    backgroundColor: "#ffffff22",
  },
  "&:focus": {
    boxShadow: "0 0 0 2px darkgrey",
  },
});

const EdgeField = styled.input`
  border-width: 0;
  // user-select: none;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 10px;
  height: 25px;
  // max-width: 80px;
  font-size: 12px;
  line-height: 1;
  color: white;
  background-color: #22222299;
  box-shadow: 0 0 0 1px #222222;
  &:focus: {
    box-shadow: 0 0 0 2px #222222;
  }
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
`;

export const DrawingCanvasEdge = ({
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  style = {},
  // connectionLineType,
  // connectionLineStyle,
}) => {
  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <g>
      <path
        fill="none"
        stroke="#ffffff99"
        strokeWidth={1.5}
        className="animated"
        d={edgePath}
      />
      <circle
        cx={targetX}
        cy={targetY}
        fill="#fff"
        r={3}
        stroke="#222"
        strokeWidth={1.5}
      />
    </g>
  );
};

export const CanvasEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const updateEdgeName = useProgrammingStore((state) => state.updateEdgeName);
  const deleteEdge = useProgrammingStore((state) => state.deleteEdge);
  const toggleEdgeMode = useProgrammingStore((state) => state.toggleEdgeMode);
  const onClick = useProgrammingStore((state) => state.onClick);
  const edge = useProgrammingStore(
    useCallback((state) => state.programData[id], [id])
  );

  const bounds = { width: 165, height: 30 };
  // const [ref, bounds] = useMeasure();
  // console.log(bounds);

  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    edge && (
      <g
        onClick={() => {
          onClick(edge);
        }}
      >
        <path
          id={id}
          style={{ ...style, strokeWidth: 2 }}
          className="animated react-flow__edge-path"
          d={edgePath}
          markerEnd={markerEnd}
        />
        <foreignObject
          width={`${bounds.width}pt`}
          height={`${bounds.height}pt`}
          x={`${edgeCenterX - bounds.width / 2}px`}
          y={`${edgeCenterY - bounds.height / 2}px`}
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <div
            className="nodrag"
            style={{
              unset: "all",
              display: "inline-block",
              width: `${bounds.width}px`,
              height: `${bounds.height}px`,
              backgroundColor: "grey",
              borderRadius: 5,
              borderColor: "white",
              flexDirection: "row",
              padding: 5,
            }}
          >
            <div
              style={{
                height: `${bounds.height}px`,
                width: `${bounds.width}px`,
                justifyContent: "space-around",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                color: 'white'
              }}
            >
              <EdgeField
                type={
                  edge.mode === SIMPLE_PROPERTY_TYPES.NUMBER ? "number" : null
                }
                className="nodrag"
                value={edge.name}
                style={{ maxWidth: edge.mode === SIMPLE_PROPERTY_TYPES.NUMBER ? bounds.width - 110 : bounds.width - 90}}
                onChange={(v) => updateEdgeName(edge.id, v.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
              {edge.mode === SIMPLE_PROPERTY_TYPES.NUMBER && (
                <Spinner above={false} below={false} onClickDown={v=>updateEdgeName(edge.id, Number(v.target.value) - 0.1)} onClickUp={v=>updateEdgeName(edge.id, Number(v.target.value) + 0.1)}/>
              )}
              <EdgeButton
                onClick={(e) => {
                  toggleEdgeMode(edge.id);
                  e.stopPropagation();
                }}
              >
                {edge.mode === SIMPLE_PROPERTY_TYPES.NUMBER ? (
                  <FiType />
                ) : (
                  <FiHash />
                )}
              </EdgeButton>
              <EdgeButton
                onClick={(e) => {
                  deleteEdge(edge.id);
                  e.stopPropagation();
                }}
              >
                <FiTrash2 />
              </EdgeButton>
            </div>
          </div>
        </foreignObject>
      </g>
    )
  );
};
