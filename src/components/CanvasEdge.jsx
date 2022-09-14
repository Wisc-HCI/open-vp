import React, { useCallback, useState } from "react";
import {
  getSmoothStepPath,
  getEdgeCenter,
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
  const edgePath = getSmoothStepPath({
    sourceX: fromX,
    sourceY: fromY,
    sourcePosition: fromPosition,
    targetX: toX,
    targetY: toY,
    targetPosition: toPosition,
  });

  // console.log('edgePath',props)

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

  const bounds = { width: 165, height: 30 };

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
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [visible, setVisible] = useState(null);

  // console.log(groupRef)

  const handleHover = (_) => {
    setVisible((previousVisible) => !previousVisible);
    
  };

  return (
    edge && (
      <g
        style={{ zIndex: visible ? 100 : 1 }}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        onClick={() => {
          onClick(edge);
        }}
      >
        <motion.path
          id={id}
          style={{ ...style, strokeWidth: 3.5, fill: "transparent" }}
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
          style={{ ...style, fill: "transparent" }}
          // stroke={visible ? "red" : "grey"}
          opacity={0.5}
          d={edgePath}
          markerEnd={markerEnd}
          strokeLinecap="round"
          variants={mainVariants}
          animate={visible ? "highlighted" : "default"}
        />
        <g>
          <animateMotion
            dur="30s"
            repeatCount="indefinite"
            path={edgePath}
            // variants={{visible:{dur:"1000s"},invisible:{dur:'30s'}}}
            // animate={visible?'visible':'invisible'}
            // transition={{duration:1}}
          />
          <foreignObject
            // style={{ offsetPath: `path(${edgePath})` }}
            width={`${bounds.width}pt`}
            height={`${bounds.height}pt`}
            x={`-${bounds.width / 2}px`}
            y={`-${bounds.height / 2}px`}
            requiredExtensions="http://www.w3.org/1999/xhtml"
          >
            <div
              className="nodrag"
              style={{
                unset: "all",
                display: "inline-block",
                width: `${bounds.width}px`,
                height: `${bounds.height}px`,
                backgroundColor: visible ? "#555" : "#333",
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
                  color: "white",
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
            </div>
          </foreignObject>
        </g>
        {/* <path
          id={id}
          style={{ ...style, strokeWidth: 2 }}
          className="react-flow__edge-path animated"
          d={edgePath2}
          markerEnd={markerEnd}
        /> */}
        {/* {["0s", "0.5s", "1.0s", "1.5s", "2.0s", "2.5s"].map((begin) => (
          <circle key={begin} r="4" fill="grey">
            <animateMotion
              dur="3s"
              begin={begin}
              repeatCount="indefinite"
              path={edgePath}
            />
          </circle>
        ))} */}
        {/* <SvgTooltip.Tooltip triggerRef={pathRef}> */}
        {/* <motion.g 
          style={{offsetPath:`path(${edgePath})`}}
          
          // animate={{offsetPath:edgePath}}
          initial={{ offset: "0%"}}
          animate={{ offset: "100%"}}
          transition={{ duration: 4, repeat:true, ease: "easeInOut" }}
        >
          <circle r="100" fill="green"/> */}
        {/* <animateMotion
              ref={groupRef}
              dur="60s"
              path={edgePath}
              repeatCount="indefinite"
            /> */}
        {/* <foreignObject width='100px' height='100px'>
        
        </foreignObject> */}
      </g>
    )
  );
};
