import{r as g}from"./index.f5e52dc0.js";import{D as t,g as d,h as c,i as a,j as h,T as s,k as I,C as l,E as e,d as o,m as G,S as r,c as L,e as y,u as _,f as E}from"./index.65b20a5a.js";/* empty css               */import{j as i}from"./jsx-runtime.b61bc1cc.js";import"./iframe.12d350d5.js";import"./index.582370b9.js";import"./objectWithoutPropertiesLoose.d29fb19f.js";import"./index.850a68d8.js";const u=()=>i(L,{className:"rotate"}),A={drawers:[{title:"Structures",dataType:t.INSTANCE,objectTypes:["functionType","operationType"],icon:d},{title:"Functions",dataType:t.CALL,objectType:"functionType",icon:c},{title:"Hats",dataType:t.INSTANCE,objectTypes:["hatType"],icon:a},{title:"Boots",dataType:t.INSTANCE,objectTypes:["bootType"],icon:h}],objectTypes:{programType:{name:"Root",type:s.OBJECT,instanceBlock:{onCanvas:!0,color:"#3f3f3f",icon:I,connections:{bottom:{direction:l.OUTBOUND,allowed:["operationType"]}},extras:[{type:e.INDICATOR_ICON,accessor:n=>i(u,{}),label:"Status"},{icon:o,type:e.DROPDOWN,label:"Custom More...",contents:[e.NAME_EDIT_TOGGLE,e.LOCKED_INDICATOR,e.SELECTION_TOGGLE,e.DIVIDER,{label:"More Options",type:e.DROPDOWN,contents:[e.NAME_EDIT_TOGGLE,e.COLLAPSE_TOGGLE,e.LOCKED_INDICATOR,{type:e.FUNCTION_BUTTON,onClick:"updateItemBlockColors",label:"Cycle Color",icon:G},{type:e.INDICATOR_ICON,accessor:n=>i(u,{}),label:"Synchronizing"}]}]},e.DIVIDER,e.LOCKED_INDICATOR]},referenceBlock:null},functionType:{name:"Function",type:s.FUNCTION,instanceBlock:{onCanvas:!0,color:"#62869e",icon:c,extras:[e.LOCKED_INDICATOR,{icon:o,type:e.DROPDOWN,contents:[e.SELECTION_TOGGLE,e.NAME_EDIT_TOGGLE,e.DELETE_BUTTON,e.LOCKED_INDICATOR,e.DEBUG_TOGGLE,{type:e.ADD_ARGUMENT_GROUP,allowed:["hatType","bootType"]},{type:e.ADD_ARGUMENT,argumentType:"hatType"}]},{type:e.ADD_ARGUMENT_GROUP,allowed:["hatType","bootType"]}]},callBlock:{onCanvas:!1,color:"#62869e",icon:c,extras:[{icon:o,type:e.DROPDOWN,contents:[e.DEBUG_TOGGLE]}]},properties:{children:{name:"Children",accepts:["functionType","blockType","operationType"],default:[],isList:!0,fullWidth:!0}}},operationType:{name:"Operation",type:s.OBJECT,instanceBlock:{onCanvas:!0,color:"#629e6c",icon:d,connections:{bottom:{direction:l.OUTBOUND,allowed:["operationType"],limitOne:!0},top:{direction:l.INBOUND,allowed:["operationType","programType"],limitOne:!1}},extras:[e.LOCKED_INDICATOR,{icon:o,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE,e.SELECTION_TOGGLE]}],hideNewPrefix:!0},properties:{hat:{name:"Hat",accepts:["hatType"],default:null,isList:!1},boot:{name:"Boot",accepts:["bootType"],default:null,isList:!1},speed:{name:"Speed",type:r.NUMBER,default:1,min:0,max:20,step:.1,units:"m/s",visualScaling:.1,visualPrecision:1},doFunky:{name:"Do Funky",type:r.BOOLEAN,default:!1},greeting:{name:"Greeting",type:r.STRING,default:""},time:{name:"Time",type:r.OPTIONS,options:[{value:"am",label:"AM"},{value:"pm",label:"PM"}],default:"am"}}},hatType:{name:"Hat",type:s.OBJECT,referenceBlock:{onCanvas:!1,color:"#AD1FDE",icon:a,extras:[e.LOCKED_INDICATOR,{icon:o,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE,e.NAME_EDIT_TOGGLE,e.SELECTION_TOGGLE]}]},instanceBlock:{onCanvas:!0,color:"#AD1FDE",icon:a,extras:[e.LOCKED_INDICATOR,{icon:o,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE,e.NAME_EDIT_TOGGLE,e.SELECTION_TOGGLE]}]}},bootType:{name:"Boot",type:s.OBJECT,referenceBlock:{onCanvas:!1,color:"#B3A533",icon:a,extras:[e.LOCKED_INDICATOR,{icon:o,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE,e.SELECTION_TOGGLE]}]},instanceBlock:{onCanvas:!0,color:"#B3A533",icon:a,extras:[e.LOCKED_INDICATOR,{icon:o,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE,e.SELECTION_TOGGLE]}]}}}},S={executionData:{"45535153s":1,"655sssefs":null,"2dfsessfs":n=>Math.sin(n/5e3)/2+.3},programData:{"45535153s":{id:"45535153s",name:"MyProgram",type:"programType",dataType:t.INSTANCE,position:{x:0,y:10},canDelete:!1,canEdit:!0,selected:!1,editing:!1},"655sssefs":{id:"655sssefs",name:"MyFunction",type:"functionType",dataType:t.INSTANCE,arguments:["s3siakawme"],properties:{children:[]},position:{x:400,y:10},canDelete:!0,canEdit:!0,selected:!1,editing:!1},s3siakawme:{id:"s3siakawme",name:"Passed Hat",type:"hatType",dataType:t.ARGUMENT,canDelete:!0,canEdit:!0,selected:!1,editing:!1},"2dfsessfs":{id:"2dfsessfs",name:"MyOperation",type:"operationType",dataType:t.INSTANCE,properties:{hat:null,boot:null,speed:1,doFunky:!0,greeting:"Hello!",time:"am"},position:{x:0,y:150},canDelete:!0,canEdit:!0,selected:!1,editing:!1},"6dewwwwww":{id:"6dewwwwww",name:"Sombrero",type:"hatType",dataType:t.INSTANCE,position:{x:400,y:200},canDelete:!0,canEdit:!0,selected:!1,editing:!1},pspssse32:{id:"pspssse32",name:"Fur Boots",type:"bootType",dataType:t.INSTANCE,position:{x:400,y:270},canDelete:!0,canEdit:!0,selected:!1,editing:!1},slkdhfslk:{id:"slkdhfslk",name:3.14,dataType:t.CONNECTION,parent:{id:"45535153s",handle:"bottom"},child:{id:"2dfsessfs",handle:"top"},mode:r.NUMBER}}};var F={parameters:{storySource:{source:`import React, { useLayoutEffect } from 'react';
import {Environment, useDefaultProgrammingStore } from '../components';
import useMeasure from 'react-use-measure';
import connectionConfig from './assets/connectionConfig';
import connectionStarter from './assets/connectionStarter';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Connections',
  component: Environment
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  const { drawers, objectTypes, programData, executionData, drawerWidth, ...otherArgs } = args;

  const [ref, bounds] = useMeasure();
  
  useLayoutEffect(()=>{
    useDefaultProgrammingStore.setState({programSpec:{drawers,objectTypes},programData,executionData});
  })
  return (
    <div ref={ref} style={{display:'flex',height:'100vh',flexDirection:'row',backgroundColor:otherArgs.highlightColor}}>
      <Environment {...otherArgs} store={useDefaultProgrammingStore} height={bounds.height} width={bounds.width} drawerWidth={drawerWidth}/>
    </div>
    )
};

export const Connections = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Connections.args = {
  highlightColor: '#ff00ff',
  drawerWidth: 235,
  snapToGrid: true,
  ...connectionConfig,
  ...connectionStarter
};`,locationsMap:{connections:{startLoc:{col:17,line:14},endLoc:{col:1,line:27},startBody:{col:17,line:14},endBody:{col:1,line:27}}}}},title:"Connections",component:y};const B=n=>{const{drawers:O,objectTypes:m,programData:f,executionData:D,drawerWidth:C,...p}=n,[N,T]=_();return g.exports.useLayoutEffect(()=>{E.setState({programSpec:{drawers:O,objectTypes:m},programData:f,executionData:D})}),i("div",{ref:N,style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:p.highlightColor},children:i(y,{...p,store:E,height:T.height,width:T.width,drawerWidth:C})})},b=B.bind({});b.args={highlightColor:"#ff00ff",drawerWidth:235,snapToGrid:!0,...A,...S};const W=["Connections"];export{b as Connections,W as __namedExportsOrder,F as default};
//# sourceMappingURL=Connections.stories.6d7d9a20.js.map
