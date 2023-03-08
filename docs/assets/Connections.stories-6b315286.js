import{r as _}from"./index-f1f749bf.js";import{D as t,m,n as c,o as s,p as w,T as r,q as A,C as l,E as e,f as a,r as B,e as o,g as I,u as S,h as f,j as p,i as R,k}from"./ErrorFallback-164632d3.js";import{S as C}from"./Synchronizing-d6bc1bf5.js";import"./_commonjsHelpers-042e6b4d.js";import"./assertThisInitialized-23f34acf.js";import"./index-96c5f47c.js";import"./index-4d501b15.js";import"./debounce-b7943e1f.js";import"./isSymbol-381e85fc.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-eaaa54fe.js";const v={drawers:[{title:"Structures",dataType:t.INSTANCE,objectTypes:["functionType","operationType"],icon:m},{title:"Functions",dataType:t.CALL,objectType:"functionType",icon:c},{title:"Hats",dataType:t.INSTANCE,objectTypes:["hatType"],icon:s},{title:"Boots",dataType:t.INSTANCE,objectTypes:["bootType"],icon:w}],objectTypes:{programType:{name:"Root",type:r.OBJECT,description:`# The Program
The **program** does things. It also allows you to include [Operations](operationType) in their set of *children*. It does a lot of fancy things:
- Basketball
- Cribbage
- Snorkelling
    1. Eating pie

You should always follow these steps:
1. Live
1. Laugh
1. Love

> [primary] Tip: Do this when it doesn't work

Equivalent code may look like this in javascript:
  \`\`\`javascript
function main() {
    // Contents of the program
}

  \`\`\`
      `,instanceBlock:{onCanvas:!0,color:"#3f3f3f",icon:A,connections:{bottom:{direction:l.OUTBOUND,allowed:["operationType"]}},extras:[{type:e.INDICATOR_ICON,accessor:n=>C,label:"Status"},{icon:a,type:e.DROPDOWN,label:"Custom More...",contents:[e.DOC_TOGGLE,e.NAME_EDIT_TOGGLE,e.LOCKED_INDICATOR,e.SELECTION_TOGGLE,e.DIVIDER,{label:"More Options",type:e.DROPDOWN,contents:[e.NAME_EDIT_TOGGLE,e.COLLAPSE_TOGGLE,e.LOCKED_INDICATOR,{type:e.FUNCTION_BUTTON,onClick:"updateItemBlockColors",label:"Cycle Color",icon:B},{type:e.INDICATOR_ICON,accessor:n=>C,label:"Synchronizing"}]}]},e.DIVIDER,e.LOCKED_INDICATOR]},referenceBlock:null},functionType:{name:"Function",type:r.FUNCTION,instanceBlock:{onCanvas:!0,color:"#62869e",icon:c,extras:[e.LOCKED_INDICATOR,{icon:a,type:e.DROPDOWN,contents:[e.SELECTION_TOGGLE,e.NAME_EDIT_TOGGLE,e.DELETE_BUTTON,e.LOCKED_INDICATOR,e.DOC_TOGGLE,{type:e.ADD_ARGUMENT_GROUP,allowed:["hatType","bootType"]},{type:e.ADD_ARGUMENT,argumentType:"hatType"}]},{type:e.ADD_ARGUMENT_GROUP,allowed:["hatType","bootType"]}]},callBlock:{onCanvas:!1,color:"#62869e",icon:c,extras:[{icon:a,type:e.DROPDOWN,contents:[e.DOC_TOGGLE]}]},properties:{children:{name:"Children",accepts:["functionType","blockType","operationType"],default:[],isList:!0,fullWidth:!0}}},operationType:{name:"Operation",type:r.OBJECT,instanceBlock:{onCanvas:!0,color:"#629e6c",icon:m,connections:{bottom:{direction:l.OUTBOUND,allowed:["operationType"],limitOne:!0},top:{direction:l.INBOUND,allowed:["operationType","programType"],limitOne:!1}},extras:[e.LOCKED_INDICATOR,{icon:a,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE,e.SELECTION_TOGGLE]}],hideNewPrefix:!0},properties:{hat:{name:"Hat",accepts:["hatType"],default:null,isList:!1},boot:{name:"Boot",accepts:["bootType"],default:null,isList:!1},speed:{name:"Speed",type:o.NUMBER,default:1,min:0,max:20,step:.1,units:"m/s",visualScaling:.1,visualPrecision:1},doFunky:{name:"Do Funky",type:o.BOOLEAN,default:!1},greeting:{name:"Greeting",type:o.STRING,default:""},time:{name:"Time",type:o.OPTIONS,options:[{value:"am",label:"AM"},{value:"pm",label:"PM"}],default:"am"},position:{name:"Position",type:o.VECTOR3,max:[20,20,20],default:[0,0,0]}}},hatType:{name:"Hat",type:r.OBJECT,referenceBlock:{onCanvas:!1,color:"#AD1FDE",icon:s,extras:[e.LOCKED_INDICATOR,{icon:a,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE,e.NAME_EDIT_TOGGLE,e.SELECTION_TOGGLE]}]},instanceBlock:{onCanvas:!0,color:"#AD1FDE",icon:s,extras:[e.LOCKED_INDICATOR,{icon:a,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE,e.NAME_EDIT_TOGGLE,e.SELECTION_TOGGLE]}]}},bootType:{name:"Boot",type:r.OBJECT,referenceBlock:{onCanvas:!1,color:"#B3A533",icon:s,extras:[e.LOCKED_INDICATOR,{icon:a,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE,e.SELECTION_TOGGLE]}]},instanceBlock:{onCanvas:!0,color:"#B3A533",icon:s,extras:[e.LOCKED_INDICATOR,{icon:a,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.DEBUG_TOGGLE,e.SELECTION_TOGGLE]}]}}}},x={executionData:{"45535153s":1,"655sssefs":null,"2dfsessfs":n=>Math.sin(n/5e3)/2+.3},tabs:[{title:"Main",id:"default",visible:!0,blocks:["45535153s","655sssefs","2dfsessfs","6dewwwwww","pspssse32"]}],activeTab:"default",programData:{"45535153s":{id:"45535153s",name:"MyProgram",type:"programType",dataType:t.INSTANCE,position:{x:0,y:10},canDelete:!1,canEdit:!0,selected:!1,editing:!1},"655sssefs":{id:"655sssefs",name:"MyFunction",type:"functionType",dataType:t.INSTANCE,arguments:["s3siakawme"],properties:{children:[]},position:{x:400,y:10},canDelete:!0,canEdit:!0,selected:!1,editing:!1},s3siakawme:{id:"s3siakawme",name:"Passed Hat",type:"hatType",dataType:t.ARGUMENT,canDelete:!0,canEdit:!0,selected:!1,editing:!1},"2dfsessfs":{id:"2dfsessfs",name:"MyOperation",type:"operationType",dataType:t.INSTANCE,properties:{hat:null,boot:null,speed:1,doFunky:!0,greeting:"Hello!",time:"am",position:[0,1,2]},position:{x:0,y:150},canDelete:!0,canEdit:!0,selected:!1,editing:!1},"6dewwwwww":{id:"6dewwwwww",name:"Sombrero",type:"hatType",dataType:t.INSTANCE,position:{x:400,y:200},canDelete:!0,canEdit:!0,selected:!1,editing:!1},pspssse32:{id:"pspssse32",name:"Fur Boots",type:"bootType",dataType:t.INSTANCE,position:{x:400,y:270},canDelete:!0,canEdit:!0,selected:!1,editing:!1},slkdhfslk:{id:"slkdhfslk",name:3.14,dataType:t.CONNECTION,parent:{id:"45535153s",handle:"bottom"},child:{id:"2dfsessfs",handle:"top"},mode:o.NUMBER}}},V={title:"Connections",component:I},P=n=>{const{drawers:T,objectTypes:d,programData:E,executionData:O,drawerWidth:b,tabs:y,activeTab:u,...G}=n,[L,D]=S();return _.useEffect(()=>{f.setState({programSpec:{drawers:T,objectTypes:d},programData:E,executionData:O,tabs:y,activeTab:u})},[T,d,E,O,y,u]),p(R,{FallbackComponent:k,children:p("div",{ref:L,style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:"#333"},children:p(I,{...G,store:f,height:D.height,width:D.width,drawerWidth:b})})})},i=P.bind({});i.args={highlightColor:"#ff00ff",drawerWidth:235,snapToGrid:!0,...v,...x};var N,h,g;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`args => {
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
  useEffect(() => {
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
  }, [drawers, objectTypes, programData, executionData, tabs, activeTab]);
  return <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div ref={ref} style={{
      display: 'flex',
      height: '100vh',
      flexDirection: 'row',
      backgroundColor: '#333'
    }}>
        <Environment {...otherArgs} store={useDefaultProgrammingStore} height={bounds.height} width={bounds.width} drawerWidth={drawerWidth} />
      </div>
    </ErrorBoundary>;
}`,...(g=(h=i.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};const q=["Connections"];export{i as Connections,q as __namedExportsOrder,V as default};
//# sourceMappingURL=Connections.stories-6b315286.js.map
