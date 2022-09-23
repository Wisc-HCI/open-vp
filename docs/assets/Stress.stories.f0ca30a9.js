import{r as N,j as l}from"./jsx-runtime.59838a7e.js";import{f as E,D as n,h as p,i,j as r,k as m,T as a,m as O,E as e,e as s,n as c,d as o,o as C,u as _,g as d}from"./index.ca677d90.js";import"./iframe.f57aaec5.js";import"./index.5662c9de.js";const h={parameters:{storySource:{source:`import React, { useLayoutEffect } from 'react';
import {Environment, useDefaultProgrammingStore, DATA_TYPES, TYPES, EXTRA_TYPES } from '../components';
import { FiClipboard, FiBriefcase, FiGrid, FiBox, FiLogOut, FiMoreHorizontal, FiLayers, FiFeather } from "react-icons/fi";
import { SIMPLE_PROPERTY_TYPES } from '../components/Constants';
import useMeasure from 'react-use-measure';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Stress',
  component: Environment
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  const { drawers, objectTypes, programData, drawerWidth, ...otherArgs } = args;

  const [ref, bounds] = useMeasure();
  
  useLayoutEffect(()=>{
    useDefaultProgrammingStore.setState({programSpec:{drawers,objectTypes},programData});
  })
  return (
    <div ref={ref} style={{display:'flex',height:'100vh',flexDirection:'row',backgroundColor:'#333'}}>
      <Environment {...otherArgs} store={useDefaultProgrammingStore} height={bounds.height} width={bounds.width} drawerWidth={drawerWidth}/>
    </div>
    )
};

export const Stress = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Stress.args = {
  highlightColor: '#ff00ff',
  drawerWidth: 235,
  drawers: [
    { title: "Structures and Other Blocks", dataType: DATA_TYPES.INSTANCE, objectTypes: ["functionType", "operationType", "blockType"], icon: FiClipboard },
    { title: "Functions", dataType: DATA_TYPES.CALL, objectType: 'functionType', icon: FiLogOut },
    { title: "Hats", dataType: DATA_TYPES.REFERENCE, objectType: 'hatType', icon: FiGrid },
    { title: "Boots", dataType: DATA_TYPES.REFERENCE, objectType: 'bootType', icon: FiBox },
  ],
  objectTypes: {
    programType: {
      name: 'Program',
      type: TYPES.OBJECT,
      instanceBlock: {
        onCanvas: true,
        color: "#3f3f3f",
        icon: FiBriefcase,
        extras: [
          { 
            type: EXTRA_TYPES.INDICATOR_TEXT,
            accessor: (data)=>data.properties.children.length,
            label: 'Size'
          },
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.NAME_EDIT_TOGGLE,
              EXTRA_TYPES.LOCKED_INDICATOR,
              {
                icon: FiMoreHorizontal,
                label: 'More Options',
                type: EXTRA_TYPES.DROPDOWN,
                contents: [
                  EXTRA_TYPES.NAME_EDIT_TOGGLE,
                  EXTRA_TYPES.COLLAPSE_TOGGLE,
                  EXTRA_TYPES.LOCKED_INDICATOR,
                  { 
                    type: EXTRA_TYPES.INDICATOR_TEXT,
                    accessor: (data)=>data.properties.children.length,
                    label: 'Size'
                  },
                  { 
                    type: EXTRA_TYPES.FUNCTION_BUTTON,
                    onClick: 'updateItemBlockColors',
                    label: 'Cycle Color',
                    icon: FiFeather
                  }
                ]
              }
            ]
          },
          EXTRA_TYPES.LOCKED_INDICATOR
        ]
      },
      referenceBlock: null,
      properties: {
        children: {
          name: 'Children',
          accepts: ['operationType', 'functionType', 'blockType'],
          default: [],
          isList: true,
          fullWidth: true
        },
        description: {
          name: "Description",
          type: SIMPLE_PROPERTY_TYPES.IGNORED,
          default: 'Some description text'
        }
      }
    },
    blockType: {
      name: "Block",
      type: TYPES.OBJECT,
      instanceBlock: {
        onCanvas: false,
        color: '#7f7f7f',
        icon: FiLayers,
        extras: [
          EXTRA_TYPES.COLLAPSE_TOGGLE,
          { 
            type: EXTRA_TYPES.INDICATOR_TEXT,
            accessor: (data)=>data.properties.children.length,
            label: 'Size'
          },
          { 
            type: EXTRA_TYPES.FUNCTION_BUTTON,
            onClick: 'updateItemBlockColors',
            label: 'Cycle Color',
            icon: FiFeather
          },
          EXTRA_TYPES.LOCKED_INDICATOR
        ]
      },
      referenceBlock: null,
      properties: {
        children: {
          name: 'Children',
          accepts: ['operationType', 'functionType', 'blockType'],
          default: [],
          isList: true,
          fullWidth: true
        }
      }
    },
    functionType: {
      name: 'Function',
      type: TYPES.FUNCTION,
      instanceBlock: {
        onCanvas: true,
        color: "#62869e",
        icon: FiLogOut,
        extras: [
          EXTRA_TYPES.LOCKED_INDICATOR,
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.SELECTION_TOGGLE,
              EXTRA_TYPES.DELETE_BUTTON,
              EXTRA_TYPES.LOCKED_INDICATOR,
              EXTRA_TYPES.DEBUG_TOGGLE,
              {
                type: EXTRA_TYPES.ADD_ARGUMENT_GROUP,
                allowed: ['hatType','bootType']
              },
              {
                type: EXTRA_TYPES.ADD_ARGUMENT,
                argumentType: 'hatType'
              }
            ]
          },
          {
            type: EXTRA_TYPES.ADD_ARGUMENT_GROUP,
            allowed: ['hatType','bootType']
          }
        ]
      },
      callBlock: {
        onCanvas: false,
        color: "#62869e",
        icon: FiLogOut
      },
      properties: {
        children: {
          name: 'Children',
          accepts: ['functionType', 'blockType', 'operationType'],
          default: [],
          isList: true,
          fullWidth: true
        }
      }
    },
    operationType: {
      name: 'Operation',
      type: TYPES.OBJECT,
      instanceBlock: {
        onCanvas: false,
        color: "#629e6c",
        icon: FiClipboard,
        extras: [
          EXTRA_TYPES.LOCKED_INDICATOR,
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.DELETE_BUTTON,
              EXTRA_TYPES.DEBUG_TOGGLE
            ]
          }
        ],
        hideNewPrefix: true
      },
      properties: {
        hat: {
          name: "Hat",
          accepts: ["hatType"],
          default: null,
          isList: false
        },
        boot: {
          name: "Boot",
          accepts: ["bootType"],
          default: null,
          isList: false
        },
        speed: {
          name: "Speed",
          type: SIMPLE_PROPERTY_TYPES.NUMBER,
          default: 1,
          min: 0,
          max: 2,
          visualScaling: 100
        },
        doFunky: {
          name: "Do Funky",
          type: SIMPLE_PROPERTY_TYPES.BOOLEAN,
          default: false
        },
        greeting: {
          name: "Greeting",
          type: SIMPLE_PROPERTY_TYPES.STRING,
          default: ''
        },
        time: {
          name: "Time",
          type: SIMPLE_PROPERTY_TYPES.OPTIONS,
          options: [{value:'am',label:'AM'},{value:'pm',label:'PM'}],
          default: 'am'
        },
        description: {
          name: "Description",
          type: SIMPLE_PROPERTY_TYPES.IGNORED,
          default: 'Some description text'
        }
      }
    },
    hatType: {
      name: 'Hat',
      type: TYPES.OBJECT,
      instanceBlock: null,
      referenceBlock: {
        onCanvas: false,
        color: "#AD1FDE",
        icon: FiGrid,
        extras: [
          EXTRA_TYPES.LOCKED_INDICATOR,
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.DELETE_BUTTON,
              EXTRA_TYPES.DEBUG_TOGGLE
            ]
          }
        ]
      }
    },
    bootType: {
      name: 'Boot',
      type: TYPES.OBJECT,
      instanceBlock: null,
      referenceBlock: {
        onCanvas: false,
        color: "#B3A533",
        icon: FiGrid,
        extras: [
          EXTRA_TYPES.LOCKED_INDICATOR,
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.DELETE_BUTTON,
              EXTRA_TYPES.DEBUG_TOGGLE
            ]
          }
        ]
      }
    }
  },
  programData: {
    "45535153s": {
      id: "45535153s",
      name: 'MyProgram',
      type: "programType",
      dataType: DATA_TYPES.INSTANCE,
      properties: {
        children: ['2dfsessfs']
      },
      position: { x: 0, y: 10 },
      canDelete: false,
      canEdit: true,
      selected: false,
      editing: false,
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
      selected: true,
      editing: false,
      
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
        greeting: 'Hello!'
      },
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
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "pspssse64": {
      id: "pspssse64",
      name: 'Leather Boots',
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "sdfsdsq64": {
      id: "sdfsdsq64",
      name: 'Funky Boots',
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "8423ljdso8s3": {
      id: "8423ljdso8s3",
      name: 'Magenta Boots',
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "p-pspssse32": {
      id: "p-pspssse32",
      name: 'Pricy Boots',
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "55pspssse64": {
      id: "55pspssse64",
      name: 'Fast Boots',
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "6556sdfsdsq64": {
      id: "6556sdfsdsq64",
      name: 'Jazzy Boots',
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "448423ljdso8s3": {
      id: "448423ljdso8s3",
      name: 'Cute Boots',
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "45p-pspssse32": {
      id: "45p-pspssse32",
      name: 'Black Boots',
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "bb55pspssse64": {
      id: "bb55pspssse64",
      name: 'Brown Boots',
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "yy6556sdfsdsq64": {
      id: "yy6556sdfsdsq64",
      name: 'Ugly Boots',
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "44448423ljdso8s3": {
      id: "44448423ljdso8s3",
      name: 'Ugg Boots',
      type: "bootType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    }
  },
};`,locationsMap:{stress:{startLoc:{col:17,line:14},endLoc:{col:1,line:27},startBody:{col:17,line:14},endBody:{col:1,line:27}}}}},title:"Stress",component:E},P=t=>{const{drawers:y,objectTypes:u,programData:f,drawerWidth:D,...A}=t,[S,T]=_();return N.exports.useLayoutEffect(()=>{d.setState({programSpec:{drawers:y,objectTypes:u},programData:f})}),l("div",{ref:S,style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:"#333"},children:l(E,{...A,store:d,height:T.height,width:T.width,drawerWidth:D})})},g=P.bind({});g.args={highlightColor:"#ff00ff",drawerWidth:235,drawers:[{title:"Structures and Other Blocks",dataType:n.INSTANCE,objectTypes:["functionType","operationType","blockType"],icon:p},{title:"Functions",dataType:n.CALL,objectType:"functionType",icon:i},{title:"Hats",dataType:n.REFERENCE,objectType:"hatType",icon:r},{title:"Boots",dataType:n.REFERENCE,objectType:"bootType",icon:m}],objectTypes:{programType:{name:"Program",type:a.OBJECT,instanceBlock:{onCanvas:!0,color:"#3f3f3f",icon:O,extras:[{type:e.INDICATOR_TEXT,accessor:t=>t.properties.children.length,label:"Size"},{icon:s,type:e.DROPDOWN,contents:[e.NAME_EDIT_TOGGLE,e.LOCKED_INDICATOR,{icon:s,label:"More Options",type:e.DROPDOWN,contents:[e.NAME_EDIT_TOGGLE,e.COLLAPSE_TOGGLE,e.LOCKED_INDICATOR,{type:e.INDICATOR_TEXT,accessor:t=>t.properties.children.length,label:"Size"},{type:e.FUNCTION_BUTTON,onClick:"updateItemBlockColors",label:"Cycle Color",icon:c}]}]},e.LOCKED_INDICATOR]},referenceBlock:null,properties:{children:{name:"Children",accepts:["operationType","functionType","blockType"],default:[],isList:!0,fullWidth:!0},description:{name:"Description",type:o.IGNORED,default:"Some description text"}}},blockType:{name:"Block",type:a.OBJECT,instanceBlock:{onCanvas:!1,color:"#7f7f7f",icon:C,extras:[e.COLLAPSE_TOGGLE,{type:e.INDICATOR_TEXT,accessor:t=>t.properties.children.length,label:"Size"},{type:e.FUNCTION_BUTTON,onClick:"updateItemBlockColors",label:"Cycle Color",icon:c},e.LOCKED_INDICATOR]},referenceBlock:null,properties:{children:{name:"Children",accepts:["operationType","functionType","blockType"],default:[],isList:!0,fullWidth:!0}}},functionType:{name:"Function",type:a.FUNCTION,instanceBlock:{onCanvas:!0,color:"#62869e",icon:i,extras:[e.LOCKED_INDICATOR,{icon:s,type:e.DROPDOWN,contents:[e.SELECTION_TOGGLE,e.DELETE_BUTTON,e.LOCKED_INDICATOR,e.DEBUG_TOGGLE,{type:e.ADD_ARGUMENT_GROUP,allowed:["hatType","bootType"]},{type:e.ADD_ARGUMENT,argumentType:"hatType"}]},{type:e.ADD_ARGUMENT_GROUP,allowed:["hatType","bootType"]}]},callBlock:{onCanvas:!1,color:"#62869e",icon:i},properties:{children:{name:"Children",accepts:["functionType","blockType","operationType"],default:[],isList:!0,fullWidth:!0}}},operationType:{name:"Operation",type:a.OBJECT,instanceBlock:{onCanvas:!1,color:"#629e6c",icon:p,extras:[e.LOCKED_INDICATOR,{icon:s,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE]}],hideNewPrefix:!0},properties:{hat:{name:"Hat",accepts:["hatType"],default:null,isList:!1},boot:{name:"Boot",accepts:["bootType"],default:null,isList:!1},speed:{name:"Speed",type:o.NUMBER,default:1,min:0,max:2,visualScaling:100},doFunky:{name:"Do Funky",type:o.BOOLEAN,default:!1},greeting:{name:"Greeting",type:o.STRING,default:""},time:{name:"Time",type:o.OPTIONS,options:[{value:"am",label:"AM"},{value:"pm",label:"PM"}],default:"am"},description:{name:"Description",type:o.IGNORED,default:"Some description text"}}},hatType:{name:"Hat",type:a.OBJECT,instanceBlock:null,referenceBlock:{onCanvas:!1,color:"#AD1FDE",icon:r,extras:[e.LOCKED_INDICATOR,{icon:s,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE]}]}},bootType:{name:"Boot",type:a.OBJECT,instanceBlock:null,referenceBlock:{onCanvas:!1,color:"#B3A533",icon:r,extras:[e.LOCKED_INDICATOR,{icon:s,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE]}]}}},programData:{"45535153s":{id:"45535153s",name:"MyProgram",type:"programType",dataType:n.INSTANCE,properties:{children:["2dfsessfs"]},position:{x:0,y:10},canDelete:!1,canEdit:!0,selected:!1,editing:!1},"655sssefs":{id:"655sssefs",name:"MyFunction",type:"functionType",dataType:n.INSTANCE,arguments:["s3siakawme"],properties:{children:[]},position:{x:400,y:10},canDelete:!0,canEdit:!0,selected:!0,editing:!1},s3siakawme:{id:"s3siakawme",name:"Passed Hat",type:"hatType",dataType:n.ARGUMENT,canDelete:!0,canEdit:!0,selected:!1,editing:!1},"2dfsessfs":{id:"2dfsessfs",name:"MyOperation",type:"operationType",dataType:n.INSTANCE,properties:{hat:null,boot:null,speed:1,doFunky:!0,greeting:"Hello!"},canDelete:!0,canEdit:!0,selected:!1,editing:!1},"6dewwwwww":{id:"6dewwwwww",name:"Sombrero",type:"hatType",dataType:n.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},pspssse32:{id:"pspssse32",name:"Fur Boots",type:"bootType",dataType:n.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},pspssse64:{id:"pspssse64",name:"Leather Boots",type:"bootType",dataType:n.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},sdfsdsq64:{id:"sdfsdsq64",name:"Funky Boots",type:"bootType",dataType:n.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},"8423ljdso8s3":{id:"8423ljdso8s3",name:"Magenta Boots",type:"bootType",dataType:n.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},"p-pspssse32":{id:"p-pspssse32",name:"Pricy Boots",type:"bootType",dataType:n.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},"55pspssse64":{id:"55pspssse64",name:"Fast Boots",type:"bootType",dataType:n.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},"6556sdfsdsq64":{id:"6556sdfsdsq64",name:"Jazzy Boots",type:"bootType",dataType:n.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},"448423ljdso8s3":{id:"448423ljdso8s3",name:"Cute Boots",type:"bootType",dataType:n.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},"45p-pspssse32":{id:"45p-pspssse32",name:"Black Boots",type:"bootType",dataType:n.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},bb55pspssse64:{id:"bb55pspssse64",name:"Brown Boots",type:"bootType",dataType:n.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},yy6556sdfsdsq64:{id:"yy6556sdfsdsq64",name:"Ugly Boots",type:"bootType",dataType:n.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},"44448423ljdso8s3":{id:"44448423ljdso8s3",name:"Ugg Boots",type:"bootType",dataType:n.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1}}};const L=["Stress"];export{g as Stress,L as __namedExportsOrder,h as default};
//# sourceMappingURL=Stress.stories.f0ca30a9.js.map
