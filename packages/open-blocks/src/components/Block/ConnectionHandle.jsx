import React from "react";
import { useProgrammingStore } from "../ProgrammingContext";
import { Handle } from "reactflow";
import { CONNECTIONS, DATA_TYPES } from "../Constants";
import { shallow } from "zustand/shallow";
import { stringEquality } from "./Utility";

const handleTypeToDirection = (handleType) =>
  handleType === "target" ? CONNECTIONS.INBOUND : CONNECTIONS.OUTBOUND;

const checkValid = (connectionInfo, nodeData, direction, position, validateEdge) => {
  if (!connectionInfo) {
    // No connection being formed, so not valid
    return false;
  } else if (direction === handleTypeToDirection(connectionInfo.handleType)) {
    // Targets need to match with Sources
    return false;
  }
  const otherIsTarget = connectionInfo.handleType === 'target';
  const target = otherIsTarget ? connectionInfo.nodeId : nodeData.id;
  const targetHandle = otherIsTarget ? connectionInfo.handleId : position;
  const source = otherIsTarget ? nodeData.id : connectionInfo.nodeId;
  const sourceHandle = otherIsTarget ? position : connectionInfo.handleId;
  return validateEdge(source, sourceHandle, target, targetHandle);
};

export const ConnectionHandle = ({
  nodeData,
  position = "top",
  direction = CONNECTIONS.INBOUND,
  highlightColor,
}) => {
  const validateEdge = useProgrammingStore((state) => state.validateEdge,shallow);
  const connectionInfo = useProgrammingStore((state) => {
    if (state.connectionInfo) {
      const node = state.programData[state.connectionInfo.nodeId];
      const nodeType = node.type;
      const typeSpec = state.programSpec.objectTypes[nodeType];
      const nodeDataType = node.dataType;
      const blockSpec =
        nodeDataType === DATA_TYPES.REFERENCE
          ? typeSpec.referenceBlock
          : nodeDataType === DATA_TYPES.CALL
          ? typeSpec.callBlock
          : typeSpec.instanceBlock;
      return {
        ...state.connectionInfo,
        nodeType,
        connectionSpec: blockSpec.connections[state.connectionInfo.handleId],
        existing: Object.values(state.programData).filter(
          (d) => d.dataType === DATA_TYPES.CONNECTION
        ),
      };
    } else {
      return null;
    }
  },stringEquality);
  const isValidConnectionOption = checkValid(
    connectionInfo,
    nodeData,
    direction,
    position,
    validateEdge
  );
  return (
    <Handle
      isConnectable={!connectionInfo || isValidConnectionOption}
      id={position}
      position={position}
      type={direction === CONNECTIONS.INBOUND ? "target" : "source"}
      style={{
        boxShadow: isValidConnectionOption
          ? `0pt 0pt 3pt 1pt ${highlightColor}`
          : null,
        backgroundColor: isValidConnectionOption ? highlightColor : "grey",
        opacity: !connectionInfo || isValidConnectionOption ? 1 : 0.5,
      }}
    />
  );
};
