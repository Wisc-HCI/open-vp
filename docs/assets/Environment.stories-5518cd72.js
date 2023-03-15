import{r as w}from"./index-c6eaa83f.js";import{g as p,u as D,h as d,j as e,i as T,k as v}from"./ErrorFallback-6667445a.js";import{b as x,a as y}from"./basicStarter-49197769.js";import"./_commonjsHelpers-042e6b4d.js";import"./assertThisInitialized-fabc4dd5.js";import"./index-4d501b15.js";import"./debounce-9eb28277.js";import"./isSymbol-344a5b50.js";import"./Synchronizing-3d59c7c4.js";const _={title:"Fullscreen",component:p},E=`
> [error] There was an error!

> [warn] There was an warning related to [The Program](programType)!

> [info] Here is some info!

> [success] Here is a success message!

> Here is a block quote!
`,S=g=>{const{drawers:a,objectTypes:t,programData:o,tabs:s,activeTab:n,executionData:i,drawerWidth:h,...f}=g,[b,c]=D();return w.useEffect(()=>{d.setState({programSpec:{drawers:a,objectTypes:t},programData:o,executionData:i,featuredDocs:{"2dfsessfs":E},tabs:s,activeTab:n})},[a,t,o,i,s,n]),e(T,{FallbackComponent:v,children:e("div",{ref:b,style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:"#333"},children:e(p,{...f,store:d,height:c.height,width:c.width,drawerWidth:h})})})},r=S.bind({});r.args={highlightColor:"#ff00ff",drawerWidth:235,snapToGrid:!0,...x,...y};var u,m,l;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  const {
    drawers,
    objectTypes,
    programData,
    tabs,
    activeTab,
    executionData,
    drawerWidth,
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
      featuredDocs: {
        "2dfsessfs": featured
        // "45535153s":true
      },

      tabs,
      activeTab
    });
  }, [drawers, objectTypes, programData, executionData, tabs, activeTab]);
  return <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div ref={ref} style={{
      display: "flex",
      height: "100vh",
      flexDirection: "row",
      backgroundColor: "#333"
    }}>
        <Environment {...otherArgs} store={useDefaultProgrammingStore} height={bounds.height} width={bounds.width} drawerWidth={drawerWidth} />
      </div>
    </ErrorBoundary>;
}`,...(l=(m=r.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};const M=["Fullscreen"];export{r as Fullscreen,M as __namedExportsOrder,_ as default};
//# sourceMappingURL=Environment.stories-5518cd72.js.map
