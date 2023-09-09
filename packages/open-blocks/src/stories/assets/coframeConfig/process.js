import { EXTRA_TYPES, TYPES, SIMPLE_PROPERTY_TYPES } from "../../../components/Constants";
import { STATUS, COMPILE_FUNCTIONS } from "./Constants";
import { ProcessIconStyled } from "./icons";
import { FiMoreHorizontal } from "react-icons/fi";
import { baseTypeData } from "./baseType";
import { merge } from "lodash";

const processFeatures = {
    name: 'Process',
    type: TYPES.OBJECT,
    instanceBlock: null,
    referenceBlock: {
      onCanvas: false,
      color: "#a83832",
      icon: ProcessIconStyled,
      extras: [
        EXTRA_TYPES.LOCKED_INDICATOR,
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
      gizmo: {
        name: 'Gizmo',
        accepts: ['machineType','toolType'],
        default: null,
        isList: false,
        fullWidth: false,
        nullValid: true
      },
      processTime: {
        name: 'Duration',
        type: SIMPLE_PROPERTY_TYPES.NUMBER,
        default: 0,
        min: 0,
        max: Infinity,
        visualScaling: 1/1000
      },
      inputs: {
        name: 'Inputs',
        default: [],
        accepts: ["inputOutputType"],
        isList: true,
        fullWidth: false
      },
      outputs: {
        name: 'Outputs',
        default: [],
        accepts: ["inputOutputType"],
        isList: true,
        fullWidth: false
      },
      compileFn: {
        default: COMPILE_FUNCTIONS.PROPERTY
      },
      updateFields: {
        default: ['gizmo','processTime','inputs','outputs']
      },
      singleton: {
        default: true
      }
    }
  }

export const processType = merge(processFeatures, baseTypeData);