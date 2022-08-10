import{r as g,j as l}from"./jsx-runtime.b0768978.js";import{D as t,h as T,i,j as a,k as h,T as s,m as I,C as c,E as e,e as o,n as G,d as r,f as u,u as L,g as d}from"./index.51fb09e2.js";import{S as E}from"./Synchronizing.1b3709be.js";import"./iframe.8823d13b.js";import"./index.36ec9d20.js";import"./index.63e724c3.js";const _={drawers:[{title:"Structures",dataType:t.INSTANCE,objectTypes:["functionType","operationType"],icon:T},{title:"Functions",dataType:t.CALL,objectType:"functionType",icon:i},{title:"Hats",dataType:t.INSTANCE,objectTypes:["hatType"],icon:a},{title:"Boots",dataType:t.INSTANCE,objectTypes:["bootType"],icon:h}],objectTypes:{programType:{name:"Root",type:s.OBJECT,instanceBlock:{onCanvas:!0,color:"#3f3f3f",icon:I,connections:{bottom:{direction:c.OUTBOUND,allowed:["operationType"]}},extras:[{type:e.INDICATOR_ICON,accessor:n=>E,label:"Status"},{icon:o,type:e.DROPDOWN,label:"Custom More...",contents:[e.NAME_EDIT_TOGGLE,e.LOCKED_INDICATOR,e.SELECTION_TOGGLE,e.DIVIDER,{label:"More Options",type:e.DROPDOWN,contents:[e.NAME_EDIT_TOGGLE,e.COLLAPSE_TOGGLE,e.LOCKED_INDICATOR,{type:e.FUNCTION_BUTTON,onClick:"updateItemBlockColors",label:"Cycle Color",icon:G},{type:e.INDICATOR_ICON,accessor:n=>E,label:"Synchronizing"}]}]},e.DIVIDER,e.LOCKED_INDICATOR]},referenceBlock:null},functionType:{name:"Function",type:s.FUNCTION,instanceBlock:{onCanvas:!0,color:"#62869e",icon:i,extras:[e.LOCKED_INDICATOR,{icon:o,type:e.DROPDOWN,contents:[e.SELECTION_TOGGLE,e.NAME_EDIT_TOGGLE,e.DELETE_BUTTON,e.LOCKED_INDICATOR,e.DEBUG_TOGGLE,{type:e.ADD_ARGUMENT_GROUP,allowed:["hatType","bootType"]},{type:e.ADD_ARGUMENT,argumentType:"hatType"}]},{type:e.ADD_ARGUMENT_GROUP,allowed:["hatType","bootType"]}]},callBlock:{onCanvas:!1,color:"#62869e",icon:i,extras:[{icon:o,type:e.DROPDOWN,contents:[e.DEBUG_TOGGLE]}]},properties:{children:{name:"Children",accepts:["functionType","blockType","operationType"],default:[],isList:!0,fullWidth:!0}}},operationType:{name:"Operation",type:s.OBJECT,instanceBlock:{onCanvas:!0,color:"#629e6c",icon:T,connections:{bottom:{direction:c.OUTBOUND,allowed:["operationType"],limitOne:!0},top:{direction:c.INBOUND,allowed:["operationType","programType"],limitOne:!1}},extras:[e.LOCKED_INDICATOR,{icon:o,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE,e.SELECTION_TOGGLE]}],hideNewPrefix:!0},properties:{hat:{name:"Hat",accepts:["hatType"],default:null,isList:!1},boot:{name:"Boot",accepts:["bootType"],default:null,isList:!1},speed:{name:"Speed",type:r.NUMBER,default:1,min:0,max:20,step:.1,units:"m/s",visualScaling:.1,visualPrecision:1},doFunky:{name:"Do Funky",type:r.BOOLEAN,default:!1},greeting:{name:"Greeting",type:r.STRING,default:""},time:{name:"Time",type:r.OPTIONS,options:[{value:"am",label:"AM"},{value:"pm",label:"PM"}],default:"am"}}},hatType:{name:"Hat",type:s.OBJECT,referenceBlock:{onCanvas:!1,color:"#AD1FDE",icon:a,extras:[e.LOCKED_INDICATOR,{icon:o,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE,e.NAME_EDIT_TOGGLE,e.SELECTION_TOGGLE]}]},instanceBlock:{onCanvas:!0,color:"#AD1FDE",icon:a,extras:[e.LOCKED_INDICATOR,{icon:o,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE,e.NAME_EDIT_TOGGLE,e.SELECTION_TOGGLE]}]}},bootType:{name:"Boot",type:s.OBJECT,referenceBlock:{onCanvas:!1,color:"#B3A533",icon:a,extras:[e.LOCKED_INDICATOR,{icon:o,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE,e.SELECTION_TOGGLE]}]},instanceBlock:{onCanvas:!0,color:"#B3A533",icon:a,extras:[e.LOCKED_INDICATOR,{icon:o,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE,e.SELECTION_TOGGLE]}]}}}},A={executionData:{"45535153s":1,"655sssefs":null,"2dfsessfs":n=>Math.sin(n/5e3)/2+.3},programData:{"45535153s":{id:"45535153s",name:"MyProgram",type:"programType",dataType:t.INSTANCE,position:{x:0,y:10},canDelete:!1,canEdit:!0,selected:!1,editing:!1},"655sssefs":{id:"655sssefs",name:"MyFunction",type:"functionType",dataType:t.INSTANCE,arguments:["s3siakawme"],properties:{children:[]},position:{x:400,y:10},canDelete:!0,canEdit:!0,selected:!1,editing:!1},s3siakawme:{id:"s3siakawme",name:"Passed Hat",type:"hatType",dataType:t.ARGUMENT,canDelete:!0,canEdit:!0,selected:!1,editing:!1},"2dfsessfs":{id:"2dfsessfs",name:"MyOperation",type:"operationType",dataType:t.INSTANCE,properties:{hat:null,boot:null,speed:1,doFunky:!0,greeting:"Hello!",time:"am"},position:{x:0,y:150},canDelete:!0,canEdit:!0,selected:!1,editing:!1},"6dewwwwww":{id:"6dewwwwww",name:"Sombrero",type:"hatType",dataType:t.INSTANCE,position:{x:400,y:200},canDelete:!0,canEdit:!0,selected:!1,editing:!1},pspssse32:{id:"pspssse32",name:"Fur Boots",type:"bootType",dataType:t.INSTANCE,position:{x:400,y:270},canDelete:!0,canEdit:!0,selected:!1,editing:!1},slkdhfslk:{id:"slkdhfslk",name:3.14,dataType:t.CONNECTION,parent:{id:"45535153s",handle:"bottom"},child:{id:"2dfsessfs",handle:"top"},mode:r.NUMBER}}},k={parameters:{storySource:{source:`import React, { useLayoutEffect } from 'react';
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
    <div ref={ref} style={{display:'flex',height:'100vh',flexDirection:'row',backgroundColor:'#333'}}>
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
};`,locationsMap:{connections:{startLoc:{col:17,line:14},endLoc:{col:1,line:27},startBody:{col:17,line:14},endBody:{col:1,line:27}}}}},title:"Connections",component:u},S=n=>{const{drawers:y,objectTypes:O,programData:D,executionData:f,drawerWidth:m,...C}=n,[N,p]=L();return g.exports.useLayoutEffect(()=>{d.setState({programSpec:{drawers:y,objectTypes:O},programData:D,executionData:f})}),l("div",{ref:N,style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:"#333"},children:l(u,{...C,store:d,height:p.height,width:p.width,drawerWidth:m})})},B=S.bind({});B.args={highlightColor:"#ff00ff",drawerWidth:235,snapToGrid:!0,..._,...A};const M=["Connections"];export{B as Connections,M as __namedExportsOrder,k as default};
//# sourceMappingURL=Connections.stories.dd2e1008.js.map
