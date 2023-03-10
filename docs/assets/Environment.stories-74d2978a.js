import{r as w}from"./index-f1f749bf.js";import{g as l,u as D,h as d,j as e,i as T,k as v}from"./ErrorFallback-164632d3.js";import{b as x,a as y}from"./basicStarter-4b82c52a.js";import"./_commonjsHelpers-042e6b4d.js";import"./assertThisInitialized-23f34acf.js";import"./index-96c5f47c.js";import"./index-4d501b15.js";import"./debounce-b7943e1f.js";import"./isSymbol-381e85fc.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-eaaa54fe.js";import"./Synchronizing-3d735629.js";const q={title:"Fullscreen",component:l},E=`
> [error] There was an error!

> [warn] There was an warning related to [The Program](programType)!

> [info] Here is some info!

> [success] Here is a success message!

> Here is a block quote!
`,S=g=>{const{drawers:a,objectTypes:t,programData:o,tabs:s,activeTab:n,executionData:i,drawerWidth:h,...f}=g,[b,c]=D();return w.useEffect(()=>{d.setState({programSpec:{drawers:a,objectTypes:t},programData:o,executionData:i,featuredDocs:{"2dfsessfs":E},tabs:s,activeTab:n})},[a,t,o,i,s,n]),e(T,{FallbackComponent:v,children:e("div",{ref:b,style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:"#333"},children:e(l,{...f,store:d,height:c.height,width:c.width,drawerWidth:h})})})},r=S.bind({});r.args={highlightColor:"#ff00ff",drawerWidth:235,snapToGrid:!0,...x,...y};var u,m,p;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const G=["Fullscreen"];export{r as Fullscreen,G as __namedExportsOrder,q as default};
//# sourceMappingURL=Environment.stories-74d2978a.js.map
