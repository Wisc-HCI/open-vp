import React, { useCallback, useState, useRef } from "react";
import {
  getSmoothStepPath,
  EdgeLabelRenderer,
  EdgeProps,
  ConnectionLineComponentProps,
  // getEdgeCenter,
} from "reactflow";
// import { useProgrammingStore } from "./ProgrammingContext";
import { FiTrash2, FiType, FiHash } from "react-icons/fi";
import styled from "@emotion/styled";
import { strip } from "number-precision";
import { motion } from "framer-motion";
import { Fade, Stack, useTheme } from "@mui/material";
import {
  ProgrammingState,
  useProgrammingStore,
  PropertyType,
  ConnectionData,
  ConnectionType,
} from "@people_and_robots/open-core";
import {
  ActionIconButton,
  NumberInput,
  TextInput,
} from "@people_and_robots/open-gui";

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
}: ConnectionLineComponentProps) => {
  const [edgePath] = getSmoothStepPath({
    sourceX: fromX,
    sourceY: fromY,
    sourcePosition: fromPosition,
    targetX: toX,
    targetY: toY,
    targetPosition: toPosition,
  });

  const theme = useTheme();

  return (
    <g>
      <path
        fill="none"
        stroke={theme.palette.mode === "dark" ? "#ffffff99" : "#00000099"}
        strokeWidth={1.5}
        d={edgePath}
      />
      <circle
        cx={toX}
        cy={toY}
        fill={theme.palette.mode === "dark" ? "#fff" : "#000"}
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
}: EdgeProps) => {
  const updateEdgeValue = useProgrammingStore(
    (state: ProgrammingState) => state.updateEdgeValue
  );
  const deleteEdge = useProgrammingStore(
    (state: ProgrammingState) => state.deleteEdge
  );
  const toggleEdgeMode = useProgrammingStore(
    (state: ProgrammingState) => state.toggleEdgeMode
  );

  const onClick = useProgrammingStore(
    (state: ProgrammingState) => state.onVPEClick
  );
  const edge: ConnectionData = useProgrammingStore(
    useCallback((state: ProgrammingState) => state.programData[id], [id])
  );

  const [isOpen, setIsOpen] = useState(false);

  // const bounds = { width: 165, height: 35 };

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    edge && (
      <g
        style={{ zIndex: isOpen ? 100 : 1, userSelect: "none" }}
        onClick={() => {
          console.log("click");
          setIsOpen(!isOpen);
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
          stroke={isOpen ? "#ccc" : "#aaa"}
          d={edgePath}
          markerEnd={markerEnd}
          strokeDasharray="10 6"
          initial={{ strokeDashoffset: 16 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 0.5, repeat: Infinity, ease: false }}
        />
        <motion.path
          id={`inner-${id}`}
          style={{ ...style, fill: "transparent", userSelect: "none" }}
          opacity={0.5}
          d={edgePath}
          markerEnd={markerEnd}
          strokeLinecap="round"
          variants={mainVariants}
          animate={isOpen ? "highlighted" : "default"}
        />
        <EdgeLabelRenderer>
          <Fade in={isOpen}>
            <div
              className="nodrag nopan"
              style={{
                backgroundColor: "#333",
                position: "absolute",
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                borderRadius: 5,
                borderColor: "white",
                flexDirection: "row",
                padding: 5,
                userSelect: "none",
                pointerEvents: "all",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                onClick={(e) => e.stopPropagation()}
                gap={1}
              >
                {edge.type === ConnectionType.Number ? (
                  <NumberInput
                    label="Edge"
                    value={Number(edge.value)}
                    onChange={(v) => updateEdgeValue(edge.id, v)}
                  />
                ) : (
                  <TextInput
                    label="Edge"
                    value={edge.value}
                    onChange={(v) => updateEdgeValue(edge.id, v.target.value)}
                  />
                )}

                <ActionIconButton
                  title="Toggle edge type"
                  size="medium"
                  onClick={(e) => {
                    toggleEdgeMode(edge.id);
                    e.stopPropagation();
                  }}
                >
                  {edge.type === ConnectionType.Number ? (
                    <FiType />
                  ) : (
                    <FiHash />
                  )}
                </ActionIconButton>
                <ActionIconButton
                  title="Delete edge"
                  size="medium"
                  onClick={(e) => {
                    deleteEdge(edge.id);
                    e.stopPropagation();
                  }}
                >
                  <FiTrash2 />
                </ActionIconButton>
              </Stack>
            </div>
          </Fade>
        </EdgeLabelRenderer>
      </g>
    )
  );
};
