import{r as G,j as i}from"./isSymbol-fd368dfe.js";import{E as m,D as a,e as b,f as C,g as t,T as n,h as d,i as s,j as e,k as o,u as L,a as u,b as g,c as x}from"./ErrorFallback-52e841ee.js";import"./_commonjsHelpers-042e6b4d.js";import"./assertThisInitialized-f2aa7f15.js";import"./index-58d3fd43.js";import"./debounce-c4e1af20.js";const I={title:"SOBORO",component:m},_=h=>{const{drawers:l,objectTypes:p,programData:c,drawerWidth:N,tabs:T,activeTab:E,...B}=h,[v,y]=L();return G.useEffect(()=>{u.setState({programSpec:{drawers:l,objectTypes:p},tabs:T,activeTab:E,programData:c})},[c,E,l,p,T]),i(g,{FallbackComponent:x,children:i("div",{ref:v,style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:"#333"},children:i(m,{...B,store:u,height:y.height,width:y.width,drawerWidth:N})})})},D=["notStateExprType","allStateExprType","anyStateExprType"],w=["stateType",...D],r=_.bind({});r.args={highlightColor:"#ff00ff",drawerWidth:235,drawers:[{title:"Rules",dataType:a.INSTANCE,objectTypes:["whenType","whileType"],icon:b},{title:"Actions",dataType:a.REFERENCE,objectType:"actionType",icon:C},{title:"States",dataType:a.REFERENCE,objectType:"stateType",icon:t},{title:"State Expressions",dataType:a.INSTANCE,objectTypes:D,icon:t},{title:"Events",dataType:a.REFERENCE,objectType:"eventType",icon:t}],tabs:[{title:"Main",id:"default",visible:!0,blocks:[]}],activeTab:"default",objectTypes:{whenType:{name:"When",type:n.OBJECT,instanceBlock:{onCanvas:!0,color:"#8790a3",icon:d,hideNewPrefix:!0,extras:[{icon:s,type:e.DROPDOWN,contents:[e.SELECTION_TOGGLE,e.COLLAPSE_TOGGLE]}]},referenceBlock:null,properties:{listenFor:{name:"Listen For",type:o.OPTIONS,options:[{value:"first",label:"First Occurance"},{value:"all",label:"All Occurances"}],default:"first"},eventExpression:{name:"When",accepts:["eventType","notEventType","isConstantEventType","orEventType","toEventType","constantEventType","emptyEventType"],default:null,isList:!1,fullWidth:!1},actionExpression:{name:"Do",accepts:["actionType"],default:null,isList:!1,fullWidth:!1}}},whileType:{name:"While",type:n.OBJECT,instanceBlock:{onCanvas:!0,color:"#6C5799",icon:d,hideNewPrefix:!0,extras:[{icon:s,type:e.DROPDOWN,contents:[e.SELECTION_TOGGLE,e.COLLAPSE_TOGGLE]}]},referenceBlock:null,properties:{stateExpression:{name:"While",accepts:w,default:null,isList:!1,fullWidth:!1},actionExpression:{name:"Do",accepts:["actionType"],default:null,isList:!1,fullWidth:!1}}},actionType:{name:"Action",type:n.OBJECT,instanceBlock:null,referenceBlock:{onCanvas:!1,color:"#fa7645",icon:t,extras:[{icon:s,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.NAME_EDIT_TOGGLE,e.DEBUG_TOGGLE]}]}},eventType:{name:"Event",type:n.OBJECT,instanceBlock:null,referenceBlock:{onCanvas:!1,color:"#8a645f",icon:t,extras:[{icon:s,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.NAME_EDIT_TOGGLE,e.DEBUG_TOGGLE]}]}},stateType:{name:"State",type:n.OBJECT,instanceBlock:null,referenceBlock:{onCanvas:!1,color:"#89b18d",icon:t,extras:[{icon:s,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.NAME_EDIT_TOGGLE,e.DEBUG_TOGGLE]}]}},notStateExprType:{name:"Not-State",type:n.OBJECT,instanceBlock:{onCanvas:!1,minified:!0,color:"#677a69",icon:t,extras:[{icon:s,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.NAME_EDIT_TOGGLE,e.DEBUG_TOGGLE]}]},referenceBlock:null,properties:{stateExpression:{name:"Not",accepts:["stateType","notStateType","isConstantStateType","notStateExprType","anyStateExprType","toStateType","constantStateType"],default:null,isList:!1,fullWidth:!1}}},allStateExprType:{name:"Not-State",type:n.OBJECT,instanceBlock:{onCanvas:!1,minified:!0,color:"#677a69",icon:t,extras:[{icon:s,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.NAME_EDIT_TOGGLE,e.DEBUG_TOGGLE]}]},referenceBlock:null,properties:{expressionType:{name:"Type",type:o.OPTIONS,options:[{value:"not",label:"Not"},{value:"is",label:"Is"}],default:"not"},doFunky:{name:"Do Funky",type:o.BOOLEAN,default:!1},speed:{name:"Speed",type:o.NUMBER,default:1,min:-2,max:2,step:.1,units:"m/s",visualScaling:.1,visualPrecision:1},hat:{name:"Hat",type:o.STRING,default:"Funny"},stateExpression:{name:"State",accepts:["stateType","notStateType","isConstantStateType","andStateType","orStateType","toStateType","constantStateType"],default:null,isList:!1,fullWidth:!1}}},anyStateExprType:{name:"Not-State",type:n.OBJECT,instanceBlock:{onCanvas:!1,minified:!0,color:"#677a69",icon:t,extras:[{icon:s,type:e.DROPDOWN,contents:[e.DELETE_BUTTON,e.NAME_EDIT_TOGGLE,e.DEBUG_TOGGLE]}]},referenceBlock:null,properties:{doFunky:{name:"Do Funky",type:o.BOOLEAN,default:!1},speed:{name:"Speed",type:o.NUMBER,default:1,min:-2,max:2,step:.1,units:"m/s",visualScaling:.1,visualPrecision:1},hat:{name:"Hat",type:o.STRING,default:"Funny"},stateExpression:{name:"State",accepts:["stateType","notStateType","isConstantStateType","andStateType","orStateType","toStateType","constantStateType"],default:null,isList:!1,fullWidth:!1}}}},programData:{"6dewwwwww":{id:"6dewwwwww",name:"Play Music",type:"actionType",dataType:a.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},pspssse32:{id:"pspssse32",name:"Human Speech",type:"eventType",dataType:a.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1},sgssdds32:{id:"sgssdds32",name:"Human Face",type:"stateType",dataType:a.INSTANCE,canDelete:!0,canEdit:!0,selected:!1,editing:!1}}};var f,O,S;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
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
  useEffect(() => {
    useDefaultProgrammingStore.setState({
      programSpec: {
        drawers,
        objectTypes
      },
      tabs,
      activeTab,
      programData
    });
  }, [programData, activeTab, drawers, objectTypes, tabs]);
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
}`,...(S=(O=r.parameters)==null?void 0:O.docs)==null?void 0:S.source}}};const U=["SOBORO"];export{r as SOBORO,U as __namedExportsOrder,I as default};
//# sourceMappingURL=SOBORO.stories-6040131c.js.map
