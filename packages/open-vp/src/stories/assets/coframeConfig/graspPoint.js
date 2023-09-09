import { TYPES, SIMPLE_PROPERTY_TYPES } from "../../../components/Constants";
import { baseTypeData } from "./baseType";
import { COMPILE_FUNCTIONS } from "./Constants";
import { RiSpace } from "react-icons/ri";


const graspPoint = {
  name: "Grasp Point",
  type: TYPES.OBJECT,
  instanceBlock: null,
  referenceBlock: {
    onCanvas: false,
    color: "#6663f0",
    icon: RiSpace,
    extras: [],
  },
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
  gripDistance: {
    name: "Grip Distance",
    type: SIMPLE_PROPERTY_TYPES.NUMBER,
    default: 50,
    isList: false
  },
  singleton: {
    default: true,
  },
  compileFn: {
    default: COMPILE_FUNCTIONS.PROPERTY
  },
};

export const graspPointType = merge(graspPoint, baseTypeData);
