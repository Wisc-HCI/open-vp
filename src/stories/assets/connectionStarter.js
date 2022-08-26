import {
    DATA_TYPES, SIMPLE_PROPERTY_TYPES
  } from "../../components";

const basicStarter = {
    executionData: {
        "45535153s":1,
        "655sssefs":null,
        "2dfsessfs":(time)=>Math.sin(time/5000)/2+0.3
      },
      programData: {
        "45535153s": {
          id: "45535153s",
          name: 'MyProgram',
          type: "programType",
          dataType: DATA_TYPES.INSTANCE,
          position: { x: 0, y: 10 },
          canDelete: false,
          canEdit: true,
          selected: false,
          editing: false
        },
        "655sssefs": {
          id: "655sssefs",
          name: 'MyFunction',
          type: "functionType",
          dataType: DATA_TYPES.INSTANCE,
          arguments: ['s3siakawme'],
          properties: {
            children: []
          },
          position: { x: 400, y: 10 },
          canDelete: true,
          canEdit: true,
          selected: false,
          editing: false
          
        },
        "s3siakawme" : {
          id: "s3siakawme",
          name: 'Passed Hat',
          type: "hatType",
          dataType: DATA_TYPES.ARGUMENT,
          canDelete: true,
          canEdit: true,
          selected: false,
          editing: false,
        },
        "2dfsessfs": {
          id: "2dfsessfs",
          name: 'MyOperation',
          type: "operationType",
          dataType: DATA_TYPES.INSTANCE,
          properties: {
            hat: null,
            boot: null,
            speed: 1,
            doFunky: true,
            greeting: 'Hello!',
            time: 'am',
            position: [0,1,2]
          },
          position: { x: 0, y: 150 },
          canDelete: true,
          canEdit: true,
          selected: false,
          editing: false,
        },
        "6dewwwwww": {
          id: "6dewwwwww",
          name: 'Sombrero',
          type: "hatType",
          dataType: DATA_TYPES.INSTANCE,
          position: { x: 400, y: 200 },
          canDelete: true,
          canEdit: true,
          selected: false,
          editing: false,
        },
        "pspssse32": {
          id: "pspssse32",
          name: 'Fur Boots',
          type: "bootType",
          dataType: DATA_TYPES.INSTANCE,
          position: { x: 400, y: 270 },
          canDelete: true,
          canEdit: true,
          selected: false,
          editing: false,
        },
        "slkdhfslk": {
          id: "slkdhfslk",
          name: 3.14,
          dataType: DATA_TYPES.CONNECTION,
          parent: {id:"45535153s",handle:'bottom'},
          child: {id:"2dfsessfs",handle:'top'},
          mode: SIMPLE_PROPERTY_TYPES.NUMBER
        }
      }
}

export default basicStarter;