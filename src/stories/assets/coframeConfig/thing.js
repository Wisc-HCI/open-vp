import { EXTRA_TYPES, TYPES, SIMPLE_PROPERTY_TYPES } from "../../../components/Constants";
import { ThingIconStyled } from "./icons";
import { FiMoreHorizontal } from "react-icons/fi";
import { COMPILE_FUNCTIONS } from "./Constants";
import { baseTypeData } from "./baseType";
import { merge } from "lodash";

const thingFeatures = {
    name: 'Thing',
    type: TYPES.OBJECT,
    instanceBlock: null,
    referenceBlock: {
      onCanvas: false,
      color: "#E08024",
      icon: ThingIconStyled,
      extras: [
        EXTRA_TYPES.LOCKED_INDICATOR,
        EXTRA_TYPES.NAME_EDIT_TOGGLE,
        {
          icon: FiMoreHorizontal,
          type: EXTRA_TYPES.DROPDOWN,
          contents: [
            EXTRA_TYPES.DELETE_BUTTON,
            EXTRA_TYPES.DEBUG_TOGGLE,
            EXTRA_TYPES.SELECTION_TOGGLE
          ]
        }
      ]
    },
    properties: {
      graspPoints: {
        name: 'Grasp Points',
        accepts: ['graspPointType'],
        default: [],
        isList: true
      },
      safe: {
        name: 'Safe',
        type: SIMPLE_PROPERTY_TYPES.IGNORED, 
        default: false,
        isList: false,
        fullWidth: true
      },
      weight: {
        name: 'Weight',
        type: SIMPLE_PROPERTY_TYPES.IGNORED, 
        default: 0,
        isList: false,
        fullWidth: true
      },
      mesh: {
        name: 'Mesh',
        type: SIMPLE_PROPERTY_TYPES.IGNORED,
        default: "",
        isList: false,
        fullWidth: true
      },
      compileFn: {
        default: COMPILE_FUNCTIONS.PROPERTY
      },
      updateFields: {
        default: ['safe','weight','graspPoints']
      },
      singleton: {
        default: true
      }
    }
  }

export const thingType = merge(thingFeatures, baseTypeData);