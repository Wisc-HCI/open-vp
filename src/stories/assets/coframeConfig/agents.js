import { TYPES, SIMPLE_PROPERTY_TYPES } from "../../../components/Constants";
import { merge } from "lodash";
import { COMPILE_FUNCTIONS, REFERENCEABLE_OBJECTS } from "./Constants";
import { baseTypeData } from "./baseType";

const basicAgentData = {
  type: TYPES.OBJECT,
  instanceBlock: {
    color: "#629e6c",
  },
  referenceBlock: null,
  properties: {
    position: {
      name: "Position",
      type: SIMPLE_PROPERTY_TYPES.IGNORED,
      default: { x: 0, y: 0, z: 0 },
      isList: false,
      fullWidth: true,
    },
    rotation: {
      name: "Rotation",
      type: SIMPLE_PROPERTY_TYPES.IGNORED,
      default: { w: 1, x: 0, y: 0, z: 0 },
      isList: false,
      fullWidth: true,
    },
    relativeTo: {
      name: "Relative To Object",
      accepts: REFERENCEABLE_OBJECTS,
      default: null,
      isList: false,
      nullValid: true,
    },
    singleton: {
      default: true,
    },
  },
};

const robotAgentFeatures = {
  name: "Robot Agent",
  properties: {
    description: { default: "Robot Agent" },
    initialJointState: {
      name: "Initial Joint State",
      type: SIMPLE_PROPERTY_TYPES.IGNORED,
      default: {},
    },
    jointLinkMap: {
      name: "List of joint names mapping to link names",
      type: SIMPLE_PROPERTY_TYPES.IGNORED,
      default: [],
    },
    pinchPointPairLinks: {
      name: "Tuple Pairs of Links for Pinch Points",
      type: SIMPLE_PROPERTY_TYPES.IGNORED,
      default: [],
    },
    urdf: {
      name: "URDF",
      type: SIMPLE_PROPERTY_TYPES.STRING,
      default: `<?xml version="1.0" ?><robot name="default_robot"><link name="base_link"/><link name="link1"/><joint name="joint1" type="revolute"><parent link="base_link"/><child link="link1"/><origin rpy="0 0 0" xyz="-0.24365 0 0"/><axis xyz="0 0 1"/><limit effort="28.0" lower="-3.141592653589793" upper="3.141592653589793" velocity="3.141592653589793"/></joint></robot>`,
    },
    compileFn: { default: COMPILE_FUNCTIONS.ROBOT_AGENT },
    updateFields: {
      default: [
        "initialJointState",
        "position",
        "rotation",
        "relativeTo",
        "urdf",
      ],
    },
  },
};

const gripperFeatures = {
  name: "Gripper",
  properties: {
    description: { default: "Gripper" },
    initialGripState: {
      name: "Initial Grip State",
      type: SIMPLE_PROPERTY_TYPES.IGNORED,
      default: 50,
    },
    gripperIndex: {
      name: "Gripper Indices",
      type: SIMPLE_PROPERTY_TYPES.IGNORED,
      default: [],
    },
    gripperFrames: {
      name: "Gripper Frames",
      type: SIMPLE_PROPERTY_TYPES.IGNORED,
      default: {},
    },
    gripOffset: {
      name: "Gripper Offset",
      type: SIMPLE_PROPERTY_TYPES.IGNORED,
      default: { x: 0, y: 0, z: 0 },
    },
    compileFn: { default: COMPILE_FUNCTIONS.GRIPPER },
    updateFields: {
      default: [
        "initialGripState",
        "position",
        "rotation",
        "relativeTo",
        "gripperIndex",
        "gripperFrames",
        "gripOffset",
      ],
    },
  },
};

const humanAgentFeatures = {
  name: "Human Agent",
  properties: {
    description: { default: "Human Agent" },
    updateFields: { default: ["position", "rotation", "relativeTo"] },
    compileFn: { default: COMPILE_FUNCTIONS.HUMAN_AGENT },
  },
};

const agentTypes = {
  robotAgentType: merge(robotAgentFeatures, basicAgentData, baseTypeData),
  humanAgentType: merge(humanAgentFeatures, basicAgentData, baseTypeData),
  gripperType: merge(gripperFeatures, basicAgentData, baseTypeData),
};

export default agentTypes;
