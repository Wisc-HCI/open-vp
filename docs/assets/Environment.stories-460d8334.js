import{r as l}from"./index-f1f749bf.js";import{g as o,u as b,h as t,j as s}from"./Environment-63cc62ed.js";import{b as w,a as D}from"./basicStarter-3f30d77a.js";import"./_commonjsHelpers-042e6b4d.js";import"./assertThisInitialized-23f34acf.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-eaaa54fe.js";import"./index-96c5f47c.js";import"./index-4d501b15.js";import"./debounce-b7943e1f.js";import"./isSymbol-381e85fc.js";import"./Synchronizing-9383ae29.js";const H={title:"Fullscreen",component:o},y=`
> [error] There was an error!

> [warn] There was an warning related to [The Program](programType)!

> [info] Here is some info!

> [success] Here is a success message!

> Here is a block quote!
`,T=n=>{const{drawers:i,objectTypes:c,programData:u,tabs:d,activeTab:m,executionData:f,drawerWidth:h,...p}=n,[g,r]=b();return l.useLayoutEffect(()=>{t.setState({programSpec:{drawers:i,objectTypes:c},programData:u,executionData:f,featuredDocs:{"2dfsessfs":y},tabs:d,activeTab:m})}),s("div",{ref:g,style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:"#333"},children:s(o,{...p,store:t,height:r.height,width:r.width,drawerWidth:h})})},e=T.bind({});e.args={highlightColor:"#ff00ff",drawerWidth:235,snapToGrid:!0,...w,...D};var a;e.parameters={...e.parameters,storySource:{source:`args => {
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
}`,...(a=e.parameters)==null?void 0:a.storySource}};const _=["Fullscreen"];export{e as Fullscreen,_ as __namedExportsOrder,H as default};
//# sourceMappingURL=Environment.stories-460d8334.js.map
