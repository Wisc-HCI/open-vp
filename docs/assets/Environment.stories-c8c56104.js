import{r as w,j as e}from"./isSymbol-fd368dfe.js";import{E as p,u as D,a as d,b as T,c as E}from"./ErrorFallback-52e841ee.js";import{b as v,a as x}from"./basicStarter-92cb24b4.js";import"./_commonjsHelpers-042e6b4d.js";import"./assertThisInitialized-f2aa7f15.js";import"./index-58d3fd43.js";import"./debounce-c4e1af20.js";import"./Synchronizing-93cb1a38.js";const H={title:"Fullscreen",component:p},y=`
> [error] There was an error!

> [warn] There was an warning related to [The Program](programType)!

> [info] Here is some info!

> [success] Here is a success message!

> Here is a block quote!
`,S=f=>{const{drawers:a,objectTypes:t,programData:o,tabs:s,activeTab:n,executionData:i,drawerWidth:g,...h}=f,[b,c]=D();return w.useEffect(()=>{d.setState({programSpec:{drawers:a,objectTypes:t},programData:o,executionData:i,featuredDocs:{"2dfsessfs":y},tabs:s,activeTab:n})},[a,t,o,i,s,n]),e(T,{FallbackComponent:E,children:e("div",{ref:b,style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:"#333"},children:e(p,{...h,store:d,height:c.height,width:c.width,drawerWidth:g})})})},r=S.bind({});r.args={highlightColor:"#ff00ff",drawerWidth:235,snapToGrid:!0,...v,...x};var u,m,l;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(l=(m=r.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};const _=["Fullscreen"];export{r as Fullscreen,_ as __namedExportsOrder,H as default};
//# sourceMappingURL=Environment.stories-c8c56104.js.map
