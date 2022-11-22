import React, { useCallback, useState, useRef } from "react";
import {
  getSmoothStepPath,
  useReactFlow,
  EdgeLabelRenderer,
  // getEdgeCenter,
} from "reactflow";
import { useProgrammingStore } from "./ProgrammingContext";
import { FiTrash2, FiType, FiHash } from "react-icons/fi";
import styled from "@emotion/styled";
import { SIMPLE_PROPERTY_TYPES } from "./Constants";
import { Spinner } from "./Block/Utility";
import shallow from "zustand/shallow";
import { strip } from "number-precision";
import { motion } from "framer-motion";

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

const mainVariants = {
  highlighted: { strokeWidth: 30, stroke: "#777" },
  default: { strokeWidth: 20, stroke: "#333" },
};

export const DrawingCanvasEdge = ({
  fromX,
  fromY,
  fromPosition,
  toX,
  toY,
  toPosition,
}) => {
  const [edgePath] = getSmoothStepPath({
    sourceX: fromX,
    sourceY: fromY,
    sourcePosition: fromPosition,
    targetX: toX,
    targetY: toY,
    targetPosition: toPosition,
  });

  return (
    <g>
      <path
        fill="none"
        stroke="#ffffff99"
        strokeWidth={1.5}
        d={edgePath}
      />
      <circle
        cx={toX}
        cy={toY}
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
  const updateEdgeName = useProgrammingStore(
    (state) => state.updateEdgeName,
    shallow
  );
  const deleteEdge = useProgrammingStore((state) => state.deleteEdge, shallow);
  const toggleEdgeMode = useProgrammingStore(
    (state) => state.toggleEdgeMode,
    shallow
  );
  const onClick = useProgrammingStore((state) => state.onVPEClick, shallow);
  const edge = useProgrammingStore(
    useCallback((state) => state.programData[id], [id]),
    shallow
  );

  const bounds = { width: 165, height: 35 };

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [hoveredLine, setHoveredLine] = useState(false);
  const [hoveredLabel, setHoveredLabel] = useState(false);
  const [coords, setCoords] = useState([labelX, labelY]);
  const gRef = useRef();
  const { project } = useReactFlow();

  const handleHoverLine = (e) => {
    setHoveredLine((prev) => !prev);
    const { x, y } = project({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
    setCoords([x, y]);
  };

  const handleHoverLabel = (_) => {
    setHoveredLabel((prev) => !prev);
  };

  const visible = hoveredLine || hoveredLabel;

  return (
    edge && (
      <g
        ref={gRef}
        style={{ zIndex: visible ? 100 : 1, userSelect: "none" }}
        onMouseEnter={handleHoverLine}
        onMouseLeave={handleHoverLine}
        onClick={() => {
          onClick(edge);
        }}
      >
        <motion.path
          id={id}
          style={{
            ...style,
            strokeWidth: 3.5,
            fill: "transparent",
            userSelect: "none",
          }}
          stroke={visible ? "#ccc" : "#aaa"}
          d={edgePath}
          markerEnd={markerEnd}
          strokeDasharray="10 6"
          initial={{ strokeDashoffset: 16 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 0.5, repeat: Infinity, ease: false }}
        />
        <motion.path
          id={id}
          style={{ ...style, fill: "transparent", userSelect: "none" }}
          opacity={0.5}
          d={edgePath}
          markerEnd={markerEnd}
          strokeLinecap="round"
          variants={mainVariants}
          animate={visible ? "highlighted" : "default"}
        />
          <EdgeLabelRenderer>
            {visible && (
              <motion.div
              onMouseEnter={handleHoverLabel}
              onMouseLeave={handleHoverLabel}
              className="nodrag nopan"
              initial={{
                opacity:0,
                transform:`translate(-50%, -50%) translate(${labelX}px,${labelY}px) scale(1)`
              }}
              animate={{
                opacity: 1,
                transform:`translate(${coords[0] - bounds.width / 2}px,${
                  coords[1] - bounds.height / 2
                }px)`,
              }}
              style={{
                position: "absolute",
                backgroundColor: visible ? "#555" : "#333",
                borderRadius: 5,
                borderColor: "white",
                flexDirection: "row",
                padding: 5,
                userSelect: "none",
                pointerEvents: 'all'
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
                  color: "white",
                  userSelect: "none",
                }}
              >
                <EdgeField
                  type={
                    edge.mode === SIMPLE_PROPERTY_TYPES.NUMBER ? "number" : null
                  }
                  className="nodrag"
                  value={
                    edge.mode === SIMPLE_PROPERTY_TYPES.NUMBER
                      ? Number(edge.name)
                      : edge.name
                  }
                  style={{
                    maxWidth:
                      edge.mode === SIMPLE_PROPERTY_TYPES.NUMBER
                        ? bounds.width - 110
                        : bounds.width - 90,
                  }}
                  onChange={(v) => updateEdgeName(edge.id, v.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                {edge.mode === SIMPLE_PROPERTY_TYPES.NUMBER && (
                  <Spinner
                    above={false}
                    below={false}
                    onClickDown={(v) =>
                      updateEdgeName(edge.id, strip(Number(edge.name) - 0.1))
                    }
                    onClickUp={(v) =>
                      updateEdgeName(edge.id, strip(Number(edge.name) + 0.1))
                    }
                  />
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
            </motion.div>
            )}
          </EdgeLabelRenderer>
      </g>
    )
  );
};
