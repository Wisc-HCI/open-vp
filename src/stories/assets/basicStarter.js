import { DATA_TYPES } from "../../components";

const basicStarter = {
  executionData: {
    "45535153s": 1,
    "655sssefs": null,
    "2dfsessfs": (time) => Math.sin(time / 5000) / 2 + 0.3,
  },
  programData: {
    "45535153s": {
      id: "45535153s",
      name: "MyProgram",
      type: "programType",
      dataType: DATA_TYPES.INSTANCE,
      properties: {
        children: ["2dfsessfs"],
      },
      position: { x: 0, y: 10 },
      canDelete: false,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "655sssefs": {
      id: "655sssefs",
      name: "MyFunction",
      type: "functionType",
      dataType: DATA_TYPES.INSTANCE,
      arguments: ["s3siakawme"],
      properties: {
        children: [],
      },
      position: { x: 0, y: 400 },
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false
    },
    s3siakawme: {
      id: "s3siakawme",
      name: "Passed Hat",
      type: "hatType",
      dataType: DATA_TYPES.ARGUMENT,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "2dfsessfs": {
      id: "2dfsessfs",
      name: "MyOperation",
      type: "operationType",
      dataType: DATA_TYPES.INSTANCE,
      properties: {
        hat: null,
        boot: null,
        speed: 1,
        doFunky: true,
        greeting: "Hello!",
        time: "am",
      },
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "6dewwwwww": {
      id: "6dewwwwww",
      name: "Sombrero",
      type: "hatType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    pspssse32: {
      id: "pspssse32",
      name: "Fur Boots",
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
  },
};

export default basicStarter;
