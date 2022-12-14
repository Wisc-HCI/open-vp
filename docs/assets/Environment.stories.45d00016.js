import{a as l}from"./index.839b8c6b.js";import{g as o,u as b,h as t,j as s}from"./Environment.23f1abc1.js";import{b as w,a as D}from"./basicStarter.bd15143c.js";import"./_commonjsHelpers.712cc82f.js";import"./assertThisInitialized.1f262959.js";import"./index.63e724c3.js";import"./debounce.d0c7c84f.js";import"./isSymbol.e585a1e8.js";import"./Synchronizing.874ac528.js";const A={title:"Fullscreen",component:o},y=`
> [error] There was an error!

> [warn] There was an warning related to [The Program](programType)!

> [info] Here is some info!

> [success] Here is a success message!

> Here is a block quote!
`,T=n=>{const{drawers:i,objectTypes:c,programData:u,tabs:d,activeTab:m,executionData:f,drawerWidth:h,...g}=n,[p,r]=b();return l.exports.useLayoutEffect(()=>{t.setState({programSpec:{drawers:i,objectTypes:c},programData:u,executionData:f,featuredDocs:{"2dfsessfs":y},tabs:d,activeTab:m})}),s("div",{ref:p,style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:"#333"},children:s(o,{...g,store:t,height:r.height,width:r.width,drawerWidth:h})})},e=T.bind({});e.args={highlightColor:"#ff00ff",drawerWidth:235,snapToGrid:!0,...w,...D};var a;e.parameters={...e.parameters,storySource:{source:`args => {
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
}`,...(a=e.parameters)==null?void 0:a.storySource}};const F=["Fullscreen"];export{e as Fullscreen,F as __namedExportsOrder,A as default};
//# sourceMappingURL=Environment.stories.45d00016.js.map
