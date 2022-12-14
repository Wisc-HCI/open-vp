import{a as L}from"./index.839b8c6b.js";import{D as t,i as T,k as c,m as s,n as _,T as i,o as b,C as l,E as e,f as o,p as A,e as a,g as u,u as w,h as d,j as E}from"./Environment.23f1abc1.js";import{S as O}from"./Synchronizing.874ac528.js";import"./_commonjsHelpers.712cc82f.js";import"./assertThisInitialized.1f262959.js";import"./index.63e724c3.js";import"./debounce.d0c7c84f.js";import"./isSymbol.e585a1e8.js";const B={drawers:[{title:"Structures",dataType:t.INSTANCE,objectTypes:["functionType","operationType"],icon:T},{title:"Functions",dataType:t.CALL,objectType:"functionType",icon:c},{title:"Hats",dataType:t.INSTANCE,objectTypes:["hatType"],icon:s},{title:"Boots",dataType:t.INSTANCE,objectTypes:["bootType"],icon:_}],objectTypes:{programType:{name:"Root",type:i.OBJECT,description:`# The Program
The **program** does things. It also allows you to include [Operations](operationType) in their set of *children*. It does a lot of fancy things:
- Basketball
- Cribbage
- Snorkelling
    1. Eating pie

You should always follow these steps:
1. Live
1. Laugh
1. Love

Equivalent code may look like this in javascript:
  \`\`\`javascript
function main() {
    // Contents of the program
}
  \`\`\`
      `,instanceBlock:{onCanvas:!0,color:"#3f3f3f",icon:b,connections:{bottom:{direction:l.OUTBOUND,allowed:["operationType"]}},extras:[{type:e.INDICATOR_ICON,accessor:n=>O,label:"Status"},{icon:o,type:e.DROPDOWN,label:"Custom More...",contents:[e.DOC_TOGGLE,e.NAME_EDIT_TOGGLE,e.LOCKED_INDICATOR,e.SELECTION_TOGGLE,e.DIVIDER,{label:"More Options",type:e.DROPDOWN,contents:[e.NAME_EDIT_TOGGLE,e.COLLAPSE_TOGGLE,e.LOCKED_INDICATOR,{type:e.FUNCTION_BUTTON,onClick:"updateItemBlockColors",label:"Cycle Color",icon:A},{type:e.INDICATOR_ICON,accessor:n=>O,label:"Synchronizing"}]}]},e.DIVIDER,e.LOCKED_INDICATOR]},referenceBlock:null},functionType:{name:"Function",type:i.FUNCTION,instanceBlock:{onCanvas:!0,color:"#62869e",icon:c,extras:[e.LOCKED_INDICATOR,{icon:o,type:e.DROPDOWN,contents:[e.SELECTION_TOGGLE,e.NAME_EDIT_TOGGLE,e.DELETE_BUTTON,e.LOCKED_INDICATOR,e.DEBUG_TOGGLE,{type:e.ADD_ARGUMENT_GROUP,allowed:["hatType","bootType"]},{type:e.ADD_ARGUMENT,argumentType:"hatType"}]},{type:e.ADD_ARGUMENT_GROUP,allowed:["hatType","bootType"]}]},callBlock:{onCanvas:!1,color:"#62869e",icon:c,extras:[{icon:o,type:e.DROPDOWN,contents:[e.DEBUG_TOGGLE]}]},properties:{children:{name:"Children",accepts:["functionType","blockType","operationType"],default:[],isList:!0,fullWidth:!0}}},operationType:{name:"Operation",type:i.OBJECT,instanceBlock:{onCanvas:!0,color:"#629e6c",icon:T,connections:{bottom:{direction:l.OUTBOUND,allowed:["operationType"],limitOne:!0},top:{direction:l.INBOUND,allowed:["operationType","programType"],limitOne:!1}},extras:[e.LOCKED_INDICATOR,{icon:o,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE,e.SELECTION_TOGGLE]}],hideNewPrefix:!0},properties:{hat:{name:"Hat",accepts:["hatType"],default:null,isList:!1},boot:{name:"Boot",accepts:["bootType"],default:null,isList:!1},speed:{name:"Speed",type:a.NUMBER,default:1,min:0,max:20,step:.1,units:"m/s",visualScaling:.1,visualPrecision:1},doFunky:{name:"Do Funky",type:a.BOOLEAN,default:!1},greeting:{name:"Greeting",type:a.STRING,default:""},time:{name:"Time",type:a.OPTIONS,options:[{value:"am",label:"AM"},{value:"pm",label:"PM"}],default:"am"},position:{name:"Position",type:a.VECTOR3,max:[20,20,20],default:[0,0,0]}}},hatType:{name:"Hat",type:i.OBJECT,referenceBlock:{onCanvas:!1,color:"#AD1FDE",icon:s,extras:[e.LOCKED_INDICATOR,{icon:o,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE,e.NAME_EDIT_TOGGLE,e.SELECTION_TOGGLE]}]},instanceBlock:{onCanvas:!0,color:"#AD1FDE",icon:s,extras:[e.LOCKED_INDICATOR,{icon:o,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE,e.NAME_EDIT_TOGGLE,e.SELECTION_TOGGLE]}]}},bootType:{name:"Boot",type:i.OBJECT,referenceBlock:{onCanvas:!1,color:"#B3A533",icon:s,extras:[e.LOCKED_INDICATOR,{icon:o,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE,e.SELECTION_TOGGLE]}]},instanceBlock:{onCanvas:!0,color:"#B3A533",icon:s,extras:[e.LOCKED_INDICATOR,{icon:o,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE,e.SELECTION_TOGGLE]}]}}}},S={executionData:{"45535153s":1,"655sssefs":null,"2dfsessfs":n=>Math.sin(n/5e3)/2+.3},tabs:[{title:"Main",id:"default",visible:!0,blocks:["45535153s","655sssefs","2dfsessfs","6dewwwwww","pspssse32"]}],activeTab:"default",programData:{"45535153s":{id:"45535153s",name:"MyProgram",type:"programType",dataType:t.INSTANCE,position:{x:0,y:10},canDelete:!1,canEdit:!0,selected:!1,editing:!1},"655sssefs":{id:"655sssefs",name:"MyFunction",type:"functionType",dataType:t.INSTANCE,arguments:["s3siakawme"],properties:{children:[]},position:{x:400,y:10},canDelete:!0,canEdit:!0,selected:!1,editing:!1},s3siakawme:{id:"s3siakawme",name:"Passed Hat",type:"hatType",dataType:t.ARGUMENT,canDelete:!0,canEdit:!0,selected:!1,editing:!1},"2dfsessfs":{id:"2dfsessfs",name:"MyOperation",type:"operationType",dataType:t.INSTANCE,properties:{hat:null,boot:null,speed:1,doFunky:!0,greeting:"Hello!",time:"am",position:[0,1,2]},position:{x:0,y:150},canDelete:!0,canEdit:!0,selected:!1,editing:!1},"6dewwwwww":{id:"6dewwwwww",name:"Sombrero",type:"hatType",dataType:t.INSTANCE,position:{x:400,y:200},canDelete:!0,canEdit:!0,selected:!1,editing:!1},pspssse32:{id:"pspssse32",name:"Fur Boots",type:"bootType",dataType:t.INSTANCE,position:{x:400,y:270},canDelete:!0,canEdit:!0,selected:!1,editing:!1},slkdhfslk:{id:"slkdhfslk",name:3.14,dataType:t.CONNECTION,parent:{id:"45535153s",handle:"bottom"},child:{id:"2dfsessfs",handle:"top"},mode:a.NUMBER}}},j={title:"Connections",component:u},R=n=>{const{drawers:D,objectTypes:f,programData:m,executionData:N,drawerWidth:C,tabs:h,activeTab:I,...g}=n,[G,p]=w();return L.exports.useLayoutEffect(()=>{d.setState({programSpec:{drawers:D,objectTypes:f},programData:m,executionData:N,tabs:h,activeTab:I})}),E("div",{ref:G,style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:"#333"},children:E(u,{...g,store:d,height:p.height,width:p.width,drawerWidth:C})})},r=R.bind({});r.args={highlightColor:"#ff00ff",drawerWidth:235,snapToGrid:!0,...B,...S};var y;r.parameters={...r.parameters,storySource:{source:`args => {
  const {
    drawers,
    objectTypes,
    programData,
    executionData,
    drawerWidth,
    tabs,
    activeTab,
    ...otherArgs
  } = args;
  const [ref, bounds] = useMeasure();
  useLayoutEffect(() => {
    useDefaultProgrammingStore.setState({
      programSpec: {
        drawers,
        objectTypes
      },
      programData,
      executionData,
      tabs,
      activeTab
    });
  });
  return <div ref={ref} style={{
    display: 'flex',
    height: '100vh',
    flexDirection: 'row',
    backgroundColor: '#333'
  }}>
      <Environment {...otherArgs} store={useDefaultProgrammingStore} height={bounds.height} width={bounds.width} drawerWidth={drawerWidth} />
    </div>;
}`,...(y=r.parameters)==null?void 0:y.storySource}};const K=["Connections"];export{r as Connections,K as __namedExportsOrder,j as default};
//# sourceMappingURL=Connections.stories.41194dbb.js.map
