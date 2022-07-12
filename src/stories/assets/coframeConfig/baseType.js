
import { SIMPLE_PROPERTY_TYPES } from '../../../components/Constants';
import { STATUS } from "./Constants";
import "./rotate.css";

export const baseTypeData = {
    properties: {
      description: {
        name: "Description",
        type: SIMPLE_PROPERTY_TYPES.IGNORED,
        isList: false,
        fullWidth: true,
      },
      status: {
        name: "Status",
        type: SIMPLE_PROPERTY_TYPES.IGNORED,
        default: STATUS.PENDING,
      },
      errorCode: {
        name: "Error Code",
        type: SIMPLE_PROPERTY_TYPES.IGNORED,
        nullValid: true,
        default: null
      },
      compileFn: {
        name: "Compile Function",
        type: SIMPLE_PROPERTY_TYPES.IGNORED,
      },
      compiled: {
        name: "Compiled",
        type: SIMPLE_PROPERTY_TYPES.IGNORED,
        default: {},
      },
      updateFields: {
        name: "Update Fields",
        type: SIMPLE_PROPERTY_TYPES.IGNORED,
      },
      singleton: {
        name: "singleton",
        type: SIMPLE_PROPERTY_TYPES.IGNORED,
        default: false,
      },
    },
  };