import { programType } from "./program";
import { locationType } from "./location";
import { waypointType } from "./waypoint";
import { thingType } from "./thing";
import { trajectoryType } from "./trajectory";
import { hierarchicalType } from "./hierarchical";
import { skillType } from "./skill";
import { meshType } from "./mesh";
import { processType } from "./process";
import { inputOutputType } from "./inputOutput";
import actionTypes from "./action";
import agentTypes from "./agents";
import sceneObjects from "./sceneObjects";
import collisionTypes from "./collision";
import { DATA_TYPES } from "../../../components/Constants";

import {
    LocationIconStyled,
    PrimitiveIconStyled,
    MachineIconStyled,
    ProcessIconStyled,
    SkillIconStyled,
    ThingIconStyled,
    WaypointIconStyled,
    ContainerIconStyled,
    ToolIconStyled
  } from './icons';

const typeInfo = {
  inputOutputType,
  programType,
  locationType,
  waypointType,
  thingType,
  trajectoryType,
  hierarchicalType,
  skillType,
  meshType,
  processType,
  ...actionTypes,
  ...agentTypes,
  ...sceneObjects,
  ...collisionTypes,
};

const mod = {
  drawers: [
    // Icon is FiGrid, otherwise no icons show in the drawer
    {
      title: "Machines",
      dataType: DATA_TYPES.REFERENCE,
      objectType: "machineType",
      icon: MachineIconStyled,
    },
    {
      title: "Processes",
      dataType: DATA_TYPES.REFERENCE,
      objectType: "processType",
      icon: ProcessIconStyled,
    },
    {
      title: "Locations",
      dataType: DATA_TYPES.REFERENCE,
      objectType: "locationType",
      icon: LocationIconStyled,
    },
    {
      title: "Waypoints",
      dataType: DATA_TYPES.REFERENCE,
      objectType: "waypointType",
      icon: WaypointIconStyled,
    },
    {
      title: "Things",
      dataType: DATA_TYPES.REFERENCE,
      objectType: "thingType",
      icon: ThingIconStyled,
    },
    {
      title: "Tools",
      dataType: DATA_TYPES.REFERENCE,
      objectType: "toolType",
      icon: ToolIconStyled,
    },
    {
      title: "Containers",
      dataType: DATA_TYPES.INSTANCE,
      objectTypes: ["trajectoryType", "hierarchicalType", "skillType"],
      icon: ContainerIconStyled,
    },
    {
      title: "Skills",
      dataType: DATA_TYPES.CALL,
      objectType: "skillType",
      icon: SkillIconStyled,
    },
    {
      title: "Actions",
      dataType: DATA_TYPES.INSTANCE,
      objectTypes: [
        "delayType",
        "moveGripperType",
        "machineInitType",
        "processStartType",
        "processWaitType",
        "moveTrajectoryType",
        "breakpointType",
      ],
      icon: PrimitiveIconStyled,
    },
  ],
  objectTypes: typeInfo,
};

export default mod;
