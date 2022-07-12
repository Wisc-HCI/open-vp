import { EXTRA_TYPES, TYPES, SIMPLE_PROPERTY_TYPES } from "../../../components/Constants";
import { WaypointIconStyled, statusIcon } from "./icons";
import { FiMoreHorizontal, FiAlertTriangle, FiAlertOctagon, FiRefreshCw, FiThumbsUp } from "react-icons/fi";
import { COMPILE_FUNCTIONS } from "./Constants";
import { baseTypeData } from "./baseType";
import { merge } from "lodash";

const waypointFeatures = {
    name: 'Waypoint',
    type: TYPES.OBJECT,
    instanceBlock: null,
    referenceBlock: {
      onCanvas: false,
      color: "#AD1FDE",
      icon: WaypointIconStyled,
      extras: [
        EXTRA_TYPES.LOCKED_INDICATOR,
        { 
          type: EXTRA_TYPES.INDICATOR_ICON,
          accessor: statusIcon,
          label: 'Status'
        },
        {
          icon: FiMoreHorizontal,
          type: EXTRA_TYPES.DROPDOWN,
          contents: [
            EXTRA_TYPES.NAME_EDIT_TOGGLE,
            EXTRA_TYPES.DELETE_BUTTON,
            EXTRA_TYPES.DEBUG_TOGGLE,
            EXTRA_TYPES.SELECTION_TOGGLE
          ]
        }
      ]
    },
    properties: {
      position: {
        name: 'Position',
        type: SIMPLE_PROPERTY_TYPES.IGNORED, 
        default: {x: null, y: null, z: null},
        isList: false,
        fullWidth: true
      },
      rotation: {
        name: 'Rotation',
        type: SIMPLE_PROPERTY_TYPES.IGNORED,
        default: {x: null, y: null, z: null, w: null},
        isList: false,
        fullWidth: true
      },
      states: {
        name: 'States',
        type: SIMPLE_PROPERTY_TYPES.IGNORED,
        default: {}
      },
      reachability: {
        name: 'Reachability',
        type: SIMPLE_PROPERTY_TYPES.IGNORED,
        default: {}
      },
      compileFn: {
        default: COMPILE_FUNCTIONS.POSE
      },
      updateFields: {
        default: ['position','rotation']
      },
      singleton: {
        default: true
      }
    }
  }

export const waypointType = merge(waypointFeatures, baseTypeData);