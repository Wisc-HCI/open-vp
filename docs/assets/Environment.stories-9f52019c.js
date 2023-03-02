import{r as w}from"./index-f1f749bf.js";import{g as i,u as D,h as t,j as s}from"./Environment-47eebbb9.js";import{b as T,a as v}from"./basicStarter-33f49212.js";import"./_commonjsHelpers-042e6b4d.js";import"./assertThisInitialized-23f34acf.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-eaaa54fe.js";import"./index-96c5f47c.js";import"./index-4d501b15.js";import"./debounce-b7943e1f.js";import"./isSymbol-381e85fc.js";import"./Synchronizing-4e3375dc.js";const L={title:"Fullscreen",component:i},x=`
> [error] There was an error!

> [warn] There was an warning related to [The Program](programType)!

> [info] Here is some info!

> [success] Here is a success message!

> Here is a block quote!
`,y=c=>{const{drawers:d,objectTypes:u,programData:m,tabs:p,activeTab:f,executionData:g,drawerWidth:h,...l}=c,[b,r]=D();return w.useLayoutEffect(()=>{t.setState({programSpec:{drawers:d,objectTypes:u},programData:m,executionData:g,featuredDocs:{"2dfsessfs":x},tabs:p,activeTab:f})}),s("div",{ref:b,style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:"#333"},children:s(i,{...l,store:t,height:r.height,width:r.width,drawerWidth:h})})},e=y.bind({});e.args={highlightColor:"#ff00ff",drawerWidth:235,snapToGrid:!0,...T,...v};var a,o,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
  useLayoutEffect(() => {
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
  });
  return <div ref={ref} style={{
    display: "flex",
    height: "100vh",
    flexDirection: "row",
    backgroundColor: "#333"
  }}>
      <Environment {...otherArgs} store={useDefaultProgrammingStore} height={bounds.height} width={bounds.width} drawerWidth={drawerWidth} />
    </div>;
}`,...(n=(o=e.parameters)==null?void 0:o.docs)==null?void 0:n.source}}};const M=["Fullscreen"];export{e as Fullscreen,M as __namedExportsOrder,L as default};
//# sourceMappingURL=Environment.stories-9f52019c.js.map
