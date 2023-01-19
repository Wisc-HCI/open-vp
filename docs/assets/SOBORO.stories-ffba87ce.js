import{r as B}from"./index-f1f749bf.js";import{g as E,D as a,i as v,n as G,m as t,T as n,o as l,f as s,E as e,e as o,u as L,h as p,j as c}from"./Environment-63cc62ed.js";import"./_commonjsHelpers-042e6b4d.js";import"./assertThisInitialized-23f34acf.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-eaaa54fe.js";import"./index-96c5f47c.js";import"./index-4d501b15.js";import"./debounce-b7943e1f.js";import"./isSymbol-381e85fc.js";const I={title:"SOBORO",component:E},x=u=>{const{drawers:d,objectTypes:f,programData:O,drawerWidth:S,tabs:m,activeTab:D,...N}=u,[h,r]=L();return B.useLayoutEffect(()=>{p.setState({programSpec:{drawers:d,objectTypes:f},tabs:m,activeTab:D,programData:O})}),c("div",{ref:h,style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:"#333"},children:c(E,{...N,store:p,height:r.height,width:r.width,drawerWidth:S})})},y=["notStateExprType","allStateExprType","anyStateExprType"],C=["stateType",...y],i=x.bind({});i.args={highlightColor:"#ff00ff",drawerWidth:235,drawers:[{title:"Rules",dataType:a.INSTANCE,objectTypes:["whenType","whileType"],icon:v},{title:"Actions",dataType:a.REFERENCE,objectType:"actionType",icon:G},{title:"States",dataType:a.REFERENCE,objectType:"stateType",icon:t},{title:"State Expressions",dataType:a.INSTANCE,objectTypes:y,icon:t},{title:"Events",dataType:a.REFERENCE,objectType:"eventType",icon:t}],tabs:[{title:"Main",id:"default",visible:!0,blocks:[]}],activeTab:"default",objectTypes:{whenType:{name:"When",type:n.OBJECT,instanceBlock:{onCanvas:!0,color:"#8790a3",icon:l,hideNewPrefix:!0,extras:[{icon:s,type:e.DROPDOWN,contents:[e.SELECTION_TOGGLE,e.COLLAPSE_TOGGLE]}]},referenceBlock:null,properties:{listenFor:{name:"Listen For",type:o.OPTIONS,options:[{value:"first",label:"First Occurance"},{value:"all",label:"All Occurances"}],default:"first"},eventExpression:{name:"When",accepts:["eventType","notEventType","isConstantEventType","orEventType","toEventType","constantEventType","emptyEventType"],default:null,isList:!1,fullWidth:!1},actionExpression:{name:"Do",accepts:["actionType"],default:null,isList:!1,fullWidth:!1}}},whileType:{name:"While",type:n.OBJECT,instanceBlock:{onCanvas:!0,color:"#6C5799",icon:l,hideNewPrefix:!0,extras:[{icon:s,type:e.DROPDOWN,contents:[e.SELECTION_TOGGLE,e.COLLAPSE_TOGGLE]}]},referenceBlock:null,properties:{stateExpression:{name:"While",accepts:C,default:null,isList:!1,fullWidth:!1},actionExpression:{name:"Do",accepts:["actionType"],default:null,isList:!1,fullWidth:!1}}},actionType:{name:"Action",type:n.OBJECT,instanceBlock:null,referenceBlock:{onCanvas:!1,color:"#fa7645",icon:t,extras:[{icon:s,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.NAME_EDIT_TOGGLE,e.DEBUG_TOGGLE]}]}},eventType:{name:"Event",type:n.OBJECT,instanceBlock:null,referenceBlock:{onCanvas:!1,color:"#8a645f",icon:t,extras:[{icon:s,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.NAME_EDIT_TOGGLE,e.DEBUG_TOGGLE]}]}},stateType:{name:"State",type:n.OBJECT,instanceBlock:null,referenceBlock:{onCanvas:!1,color:"#89b18d",icon:t,extras:[{icon:s,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.NAME_EDIT_TOGGLE,e.DEBUG_TOGGLE]}]}},notStateExprType:{name:"Not-State",type:n.OBJECT,instanceBlock:{onCanvas:!1,minified:!0,color:"#677a69",icon:t,extras:[{icon:s,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.NAME_EDIT_TOGGLE,e.DEBUG_TOGGLE]}]},referenceBlock:null,properties:{stateExpression:{name:"Not",accepts:["stateType","notStateType","isConstantStateType","notStateExprType","anyStateExprType","toStateType","constantStateType"],default:null,isList:!1,fullWidth:!1}}},allStateExprType:{name:"Not-State",type:n.OBJECT,instanceBlock:{onCanvas:!1,minified:!0,color:"#677a69",icon:t,extras:[{icon:s,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.NAME_EDIT_TOGGLE,e.DEBUG_TOGGLE]}]},referenceBlock:null,properties:{expressionType:{name:"Type",type:o.OPTIONS,options:[{value:"not",label:"Not"},{value:"is",label:"Is"}],default:"not"},doFunky:{name:"Do Funky",type:o.BOOLEAN,default:!1},speed:{name:"Speed",type:o.NUMBER,default:1,min:-2,max:2,step:.1,units:"m/s",visualScaling:.1,visualPrecision:1},hat:{name:"Hat",type:o.STRING,default:"Funny"},stateExpression:{name:"State",accepts:["stateType","notStateType","isConstantStateType","andStateType","orStateType","toStateType","constantStateType"],default:null,isList:!1,fullWidth:!1}}},anyStateExprType:{name:"Not-State",type:n.OBJECT,instanceBlock:{onCanvas:!1,minified:!0,color:"#677a69",icon:t,extras:[{icon:s,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.NAME_EDIT_TOGGLE,e.DEBUG_TOGGLE]}]},referenceBlock:null,properties:{doFunky:{name:"Do Funky",type:o.BOOLEAN,default:!1},speed:{name:"Speed",type:o.NUMBER,default:1,min:-2,max:2,step:.1,units:"m/s",visualScaling:.1,visualPrecision:1},hat:{name:"Hat",type:o.STRING,default:"Funny"},stateExpression:{name:"State",accepts:["stateType","notStateType","isConstantStateType","andStateType","orStateType","toStateType","constantStateType"],default:null,isList:!1,fullWidth:!1}}}},programData:{"6dewwwwww":{id:"6dewwwwww",name:"Play Music",type:"actionType",dataType:a.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},pspssse32:{id:"pspssse32",name:"Human Speech",type:"eventType",dataType:a.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},sgssdds32:{id:"sgssdds32",name:"Human Face",type:"stateType",dataType:a.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1}}};var T;i.parameters={...i.parameters,storySource:{source:`args => {
  const {
    drawers,
    objectTypes,
    programData,
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
      tabs,
      activeTab,
      programData
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
}`,...(T=i.parameters)==null?void 0:T.storySource}};const F=["SOBORO"];export{i as SOBORO,F as __namedExportsOrder,I as default};
//# sourceMappingURL=SOBORO.stories-ffba87ce.js.map
