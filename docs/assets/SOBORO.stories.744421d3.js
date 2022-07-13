import{r as P}from"./index.f5e52dc0.js";import{e as p,D as a,g as _,j as N,i as n,T as o,k as E,d as s,E as e,S as t,u as m,f as l}from"./index.11cdcd49.js";import{j as r}from"./jsx-runtime.b61bc1cc.js";import"./iframe.c5b5eaa5.js";import"./index.582370b9.js";import"./objectWithoutPropertiesLoose.d29fb19f.js";import"./index.850a68d8.js";var Y={parameters:{storySource:{source:`import React, { useLayoutEffect } from 'react';
import {Environment, useDefaultProgrammingStore, DATA_TYPES, TYPES, EXTRA_TYPES, SIMPLE_PROPERTY_TYPES } from '../components';
import { FiClipboard, FiBriefcase, FiGrid, FiBox, FiMoreHorizontal } from "react-icons/fi";
import useMeasure from 'react-use-measure';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SOBORO',
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
    <div ref={ref} style={{display:'flex',height:'100vh',flexDirection:'row',backgroundColor:otherArgs.highlightColor}}>
      <Environment {...otherArgs} store={useDefaultProgrammingStore} height={bounds.height} width={bounds.width} drawerWidth={drawerWidth}/>
    </div>
    )
};

const STATE_EXPRESSIONS = ['notStateExprType','allStateExprType','anyStateExprType'];
// const EVENT_EXPRESSIONS = [];
// const RETURNS_EVENT = [];
const RETURNS_STATE = ['stateType',...STATE_EXPRESSIONS];
// const RETURNS_ACTION = [];
// const RETURNS_CONTROLLER = [];

export const SOBORO = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SOBORO.args = {
  highlightColor: '#ff00ff',
  drawerWidth: 235,
  drawers: [
    // Rules
    { title: "Rules", dataType: DATA_TYPES.INSTANCE, objectTypes: ["whenType", "whileType"], icon: FiClipboard },
    // Action Expressions
    { title: "Actions", dataType: DATA_TYPES.REFERENCE, objectType: 'actionType', icon: FiBox },
    // { title: "Action Expressions", dataType: DATA_TYPES.INSTANCE, objectTypes: ['notStateType'], icon: FiGrid},
    // State Expressions
    { title: "States", dataType: DATA_TYPES.REFERENCE, objectType: 'stateType', icon: FiGrid },
    { title: "State Expressions", dataType: DATA_TYPES.INSTANCE, objectTypes: STATE_EXPRESSIONS, icon: FiGrid},
    { title: "Events", dataType: DATA_TYPES.REFERENCE, objectType: 'eventType', icon: FiGrid },
    // { title: "Event Expressions", dataType: DATA_TYPES.INSTANCE, objectTypes: ['notStateType'], icon: FiGrid},
    // { title: "Action Expressions", dataType: DATA_TYPES.INSTANCE, objectTypes: [], icon: FiClipboard },
    // { title: "State Expressions", dataType: DATA_TYPES.INSTANCE, objectTypes: ["notStateType", "isConstantStateType", "andStateType", "orStateType", "toStateType", "constantStateType"], icon: FiClipboard },
    // { title: "Event Expressions", dataType: DATA_TYPES.INSTANCE, objectTypes: ["notEventType", "isConstantEventType", "orEventType", "toEventType", "constantEventType", "emptyEventType"], icon: FiClipboard },
    // { title: "Controllers", dataType: DATA_TYPES.INSTANCE, objectTypes: ["negationControllerType","sinControllerType","cosControllerType","addControllerType","subtractControllerType"], icon: FiClipboard },
  ],
  objectTypes: {
    whenType: {
      name: 'When',
      type: TYPES.OBJECT,
      instanceBlock: {
        onCanvas: true,
        color: "#8790a3",
        icon: FiBriefcase,
        hideNewPrefix: true,
        extras: [
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.SELECTION_TOGGLE,
              EXTRA_TYPES.COLLAPSE_TOGGLE
            ]
          }
        ]
      },
      referenceBlock: null,
      properties: {
        listenFor: {
          name:'Listen For',
          type:SIMPLE_PROPERTY_TYPES.OPTIONS,
          options: [{value:'first',label:'First Occurance'},{value:'all',label:'All Occurances'}],
          default: 'first'
        },
        eventExpression: {
          name: 'When',
          accepts: ['eventType', "notEventType", "isConstantEventType", "orEventType", "toEventType", "constantEventType", "emptyEventType"],
          default: null,
          isList: false,
          fullWidth: false
        },
        actionExpression: {
          name: 'Do',
          accepts: ['actionType'],
          default: null,
          isList: false,
          fullWidth: false
        }
      }
    },
    whileType: {
      name: 'While',
      type: TYPES.OBJECT,
      instanceBlock: {
        onCanvas: true,
        color: "#6C5799",
        icon: FiBriefcase,
        hideNewPrefix: true,
        extras: [
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.SELECTION_TOGGLE,
              EXTRA_TYPES.COLLAPSE_TOGGLE
            ]
          }
        ]
      },
      referenceBlock: null,
      properties: {
        stateExpression: {
          name: 'While',
          accepts: RETURNS_STATE,
          default: null,
          isList: false,
          fullWidth: false
        },
        actionExpression: {
          name: 'Do',
          accepts: ['actionType'],
          default: null,
          isList: false,
          fullWidth: false
        }
      }
    },
    actionType: {
      name: 'Action',
      type: TYPES.OBJECT,
      instanceBlock: null,
      referenceBlock: {
        onCanvas: false,
        color: "#fa7645",
        icon: FiGrid,
        extras: [
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.DELETE_BUTTON,
              EXTRA_TYPES.NAME_EDIT_TOGGLE,
              EXTRA_TYPES.DEBUG_TOGGLE
            ]
          }
        ]
      }
    },
    eventType: {
      name: 'Event',
      type: TYPES.OBJECT,
      instanceBlock: null,
      referenceBlock: {
        onCanvas: false,
        color: "#8a645f",
        icon: FiGrid,
        extras: [
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.DELETE_BUTTON,
              EXTRA_TYPES.NAME_EDIT_TOGGLE,
              EXTRA_TYPES.DEBUG_TOGGLE
            ]
          }
        ]
      }
    },
    stateType: {
      name: 'State',
      type: TYPES.OBJECT,
      instanceBlock: null,
      referenceBlock: {
        onCanvas: false,
        color: "#89b18d",
        icon: FiGrid,
        extras: [
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.DELETE_BUTTON,
              EXTRA_TYPES.NAME_EDIT_TOGGLE,
              EXTRA_TYPES.DEBUG_TOGGLE
            ]
          }
        ]
      }
    },
    notStateExprType: {
      name: 'Not-State',
      type: TYPES.OBJECT,
      instanceBlock: {
        onCanvas: false,
        minified: true,
        color: "#677a69",
        icon: FiGrid,
        extras: [
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.DELETE_BUTTON,
              EXTRA_TYPES.NAME_EDIT_TOGGLE,
              EXTRA_TYPES.DEBUG_TOGGLE
            ]
          }
        ]
      },
      referenceBlock: null,
      properties: {
        stateExpression: {
          name: 'Not',
          accepts: ['stateType', "notStateType", "isConstantStateType", "notStateExprType", "anyStateExprType", "toStateType", "constantStateType"],
          default: null,
          isList: false,
          fullWidth: false
        },
        
      }
    },
    allStateExprType: {
      name: 'Not-State',
      type: TYPES.OBJECT,
      instanceBlock: {
        onCanvas: false,
        minified: true,
        color: "#677a69",
        icon: FiGrid,
        extras: [
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.DELETE_BUTTON,
              EXTRA_TYPES.NAME_EDIT_TOGGLE,
              EXTRA_TYPES.DEBUG_TOGGLE
            ]
          }
        ]
      },
      referenceBlock: null,
      properties: {
        expressionType: {
          name: "Type",
          type: SIMPLE_PROPERTY_TYPES.OPTIONS,
          options: [{value:'not',label:'Not'},{value:'is',label:'Is'}],
          default: 'not'
        },
        doFunky: {
          name: "Do Funky",
          type: SIMPLE_PROPERTY_TYPES.BOOLEAN,
          default: false
        },
        speed: {
          name: "Speed",
          type: SIMPLE_PROPERTY_TYPES.NUMBER,
          default: 1,
          min: -2,
          max: 2,
          step: 0.1,
          units: 'm/s',
          visualScaling: 0.1,
          visualPrecision: 1
        },
        hat: {
          name: "Hat",
          type: SIMPLE_PROPERTY_TYPES.STRING,
          default: 'Funny'
        },
        stateExpression: {
          name: 'State',
          accepts: ['stateType', "notStateType", "isConstantStateType", "andStateType", "orStateType", "toStateType", "constantStateType"],
          default: null,
          isList: false,
          fullWidth: false
        },
        
      }
    },
    anyStateExprType: {
      name: 'Not-State',
      type: TYPES.OBJECT,
      instanceBlock: {
        onCanvas: false,
        minified: true,
        color: "#677a69",
        icon: FiGrid,
        extras: [
          {
            icon: FiMoreHorizontal,
            type: EXTRA_TYPES.DROPDOWN,
            contents: [
              EXTRA_TYPES.DELETE_BUTTON,
              EXTRA_TYPES.NAME_EDIT_TOGGLE,
              EXTRA_TYPES.DEBUG_TOGGLE
            ]
          }
        ]
      },
      referenceBlock: null,
      properties: {
        expressionType: {
          name: "Type",
          type: SIMPLE_PROPERTY_TYPES.OPTIONS,
          options: [{value:'not',label:'Not'},{value:'is',label:'Is'}],
          default: 'not'
        },
        doFunky: {
          name: "Do Funky",
          type: SIMPLE_PROPERTY_TYPES.BOOLEAN,
          default: false
        },
        speed: {
          name: "Speed",
          type: SIMPLE_PROPERTY_TYPES.NUMBER,
          default: 1,
          min: -2,
          max: 2,
          step: 0.1,
          units: 'm/s',
          visualScaling: 0.1,
          visualPrecision: 1
        },
        hat: {
          name: "Hat",
          type: SIMPLE_PROPERTY_TYPES.STRING,
          default: 'Funny'
        },
        stateExpression: {
          name: 'State',
          accepts: ['stateType', "notStateType", "isConstantStateType", "andStateType", "orStateType", "toStateType", "constantStateType"],
          default: null,
          isList: false,
          fullWidth: false
        },
        
      }
    }
  },
  programData: {
    "6dewwwwww": {
      id: "6dewwwwww",
      name: 'Play Music',
      type: "actionType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "pspssse32": {
      id: "pspssse32",
      name: 'Human Speech',
      type: "eventType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    },
    "sgssdds32": {
      id: "sgssdds32",
      name: 'Human Face',
      type: "stateType",
      dataType: DATA_TYPES.INSTANCE,
      canDelete: true,
      canEdit: true,
      selected: false,
      editing: false,
    }
  },
};`,locationsMap:{soboro:{startLoc:{col:17,line:13},endLoc:{col:1,line:26},startBody:{col:17,line:13},endBody:{col:1,line:26}}}}},title:"SOBORO",component:p};const A=y=>{const{drawers:S,objectTypes:d,programData:u,drawerWidth:f,...T}=y,[O,i]=m();return P.exports.useLayoutEffect(()=>{l.setState({programSpec:{drawers:S,objectTypes:d},programData:u})}),r("div",{ref:O,style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:T.highlightColor},children:r(p,{...T,store:l,height:i.height,width:i.width,drawerWidth:f})})},c=["notStateExprType","allStateExprType","anyStateExprType"],R=["stateType",...c],D=A.bind({});D.args={highlightColor:"#ff00ff",drawerWidth:235,drawers:[{title:"Rules",dataType:a.INSTANCE,objectTypes:["whenType","whileType"],icon:_},{title:"Actions",dataType:a.REFERENCE,objectType:"actionType",icon:N},{title:"States",dataType:a.REFERENCE,objectType:"stateType",icon:n},{title:"State Expressions",dataType:a.INSTANCE,objectTypes:c,icon:n},{title:"Events",dataType:a.REFERENCE,objectType:"eventType",icon:n}],objectTypes:{whenType:{name:"When",type:o.OBJECT,instanceBlock:{onCanvas:!0,color:"#8790a3",icon:E,hideNewPrefix:!0,extras:[{icon:s,type:e.DROPDOWN,contents:[e.SELECTION_TOGGLE,e.COLLAPSE_TOGGLE]}]},referenceBlock:null,properties:{listenFor:{name:"Listen For",type:t.OPTIONS,options:[{value:"first",label:"First Occurance"},{value:"all",label:"All Occurances"}],default:"first"},eventExpression:{name:"When",accepts:["eventType","notEventType","isConstantEventType","orEventType","toEventType","constantEventType","emptyEventType"],default:null,isList:!1,fullWidth:!1},actionExpression:{name:"Do",accepts:["actionType"],default:null,isList:!1,fullWidth:!1}}},whileType:{name:"While",type:o.OBJECT,instanceBlock:{onCanvas:!0,color:"#6C5799",icon:E,hideNewPrefix:!0,extras:[{icon:s,type:e.DROPDOWN,contents:[e.SELECTION_TOGGLE,e.COLLAPSE_TOGGLE]}]},referenceBlock:null,properties:{stateExpression:{name:"While",accepts:R,default:null,isList:!1,fullWidth:!1},actionExpression:{name:"Do",accepts:["actionType"],default:null,isList:!1,fullWidth:!1}}},actionType:{name:"Action",type:o.OBJECT,instanceBlock:null,referenceBlock:{onCanvas:!1,color:"#fa7645",icon:n,extras:[{icon:s,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.NAME_EDIT_TOGGLE,e.DEBUG_TOGGLE]}]}},eventType:{name:"Event",type:o.OBJECT,instanceBlock:null,referenceBlock:{onCanvas:!1,color:"#8a645f",icon:n,extras:[{icon:s,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.NAME_EDIT_TOGGLE,e.DEBUG_TOGGLE]}]}},stateType:{name:"State",type:o.OBJECT,instanceBlock:null,referenceBlock:{onCanvas:!1,color:"#89b18d",icon:n,extras:[{icon:s,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.NAME_EDIT_TOGGLE,e.DEBUG_TOGGLE]}]}},notStateExprType:{name:"Not-State",type:o.OBJECT,instanceBlock:{onCanvas:!1,minified:!0,color:"#677a69",icon:n,extras:[{icon:s,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.NAME_EDIT_TOGGLE,e.DEBUG_TOGGLE]}]},referenceBlock:null,properties:{stateExpression:{name:"Not",accepts:["stateType","notStateType","isConstantStateType","notStateExprType","anyStateExprType","toStateType","constantStateType"],default:null,isList:!1,fullWidth:!1}}},allStateExprType:{name:"Not-State",type:o.OBJECT,instanceBlock:{onCanvas:!1,minified:!0,color:"#677a69",icon:n,extras:[{icon:s,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.NAME_EDIT_TOGGLE,e.DEBUG_TOGGLE]}]},referenceBlock:null,properties:{expressionType:{name:"Type",type:t.OPTIONS,options:[{value:"not",label:"Not"},{value:"is",label:"Is"}],default:"not"},doFunky:{name:"Do Funky",type:t.BOOLEAN,default:!1},speed:{name:"Speed",type:t.NUMBER,default:1,min:-2,max:2,step:.1,units:"m/s",visualScaling:.1,visualPrecision:1},hat:{name:"Hat",type:t.STRING,default:"Funny"},stateExpression:{name:"State",accepts:["stateType","notStateType","isConstantStateType","andStateType","orStateType","toStateType","constantStateType"],default:null,isList:!1,fullWidth:!1}}},anyStateExprType:{name:"Not-State",type:o.OBJECT,instanceBlock:{onCanvas:!1,minified:!0,color:"#677a69",icon:n,extras:[{icon:s,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.NAME_EDIT_TOGGLE,e.DEBUG_TOGGLE]}]},referenceBlock:null,properties:{expressionType:{name:"Type",type:t.OPTIONS,options:[{value:"not",label:"Not"},{value:"is",label:"Is"}],default:"not"},doFunky:{name:"Do Funky",type:t.BOOLEAN,default:!1},speed:{name:"Speed",type:t.NUMBER,default:1,min:-2,max:2,step:.1,units:"m/s",visualScaling:.1,visualPrecision:1},hat:{name:"Hat",type:t.STRING,default:"Funny"},stateExpression:{name:"State",accepts:["stateType","notStateType","isConstantStateType","andStateType","orStateType","toStateType","constantStateType"],default:null,isList:!1,fullWidth:!1}}}},programData:{"6dewwwwww":{id:"6dewwwwww",name:"Play Music",type:"actionType",dataType:a.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},pspssse32:{id:"pspssse32",name:"Human Speech",type:"eventType",dataType:a.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},sgssdds32:{id:"sgssdds32",name:"Human Face",type:"stateType",dataType:a.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1}}};const g=["SOBORO"];export{D as SOBORO,g as __namedExportsOrder,Y as default};
//# sourceMappingURL=SOBORO.stories.744421d3.js.map
