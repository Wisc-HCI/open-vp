import { EXTRA_TYPES, TYPES, SIMPLE_PROPERTY_TYPES } from "../../../components/Constants";
import { STATUS, COMPILE_FUNCTIONS } from "./Constants";
import { InputOutputIconStyled } from "./icons";
import { FiMoreHorizontal } from "react-icons/fi";
import { baseTypeData } from "./baseType";
import { merge } from "lodash";

const inputOutputFeatures = {
  name: "Input / Output",
  type: TYPES.OBJECT,
  referenceBlock: {
    onCanvas: false,
    color: "#0072b2",
    icon: InputOutputIconStyled,
    extras: [
      EXTRA_TYPES.LOCKED_INDICATOR,
      {
        icon: FiMoreHorizontal,
        type: EXTRA_TYPES.DROPDOWN,
        contents: [
          EXTRA_TYPES.DELETE_BUTTON,
          EXTRA_TYPES.DEBUG_TOGGLE,
          EXTRA_TYPES.SELECTION_TOGGLE,
        ],
      },
    ],
  },
  properties: {
    relativeTo: {
      name: "Relative to",
      accepts: ["thingType", "machineType", "toolType"],
      default: null,
      isList: false,
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
      default: { x: 0, y: 0, z: 0, w: 0 },
      isList: false,
      fullWidth: true,
    },
    thing: {
      name: "Thing",
      accepts: ["thingType", "toolType"],
      default: null,
      isList: false,
      nullValid: true,
    },
    compileFn: {
      default: COMPILE_FUNCTIONS.PROPERTY,
    },
    updateFields: {
      default: ["relativeTo", "position", "rotation", "thing"],
    },
    singleton: {
      default: true,
    },
  },
};

export const inputOutputType = merge(inputOutputFeatures, baseTypeData);