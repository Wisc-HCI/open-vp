import{r as n}from"./index-f1f749bf.js";import{g,u as C,h as t,a,q as D,j as e,I as j,r as k,s as T,t as E}from"./Environment-097b9b63.js";import{b as P,a as F}from"./basicStarter-db076a9c.js";import"./_commonjsHelpers-042e6b4d.js";import"./assertThisInitialized-23f34acf.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-eaaa54fe.js";import"./index-96c5f47c.js";import"./index-4d501b15.js";import"./debounce-b7943e1f.js";import"./isSymbol-381e85fc.js";import"./Synchronizing-96a3523f.js";const z={title:"Embedded",component:g},I=m=>{const{drawers:s,objectTypes:o,programData:i,drawerWidth:u,tabs:h,activeTab:f,...w}=m,[b,d]=C();n.useEffect(()=>{t.setState({programSpec:{drawers:s,objectTypes:o},programData:i,tabs:h,activeTab:f,featuredDocs:{"2dfsessfs":"> [warn] There was an error!"}})},[i,s,o]);const v=t(x=>x.parse),[y,S]=n.useState("// Compile To View Parsed Code");return a("div",{style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:"#333"},children:[a("div",{style:{width:450,backgroundColor:"#111"},children:[a(D,{justifyContent:"space-between",alignItems:"center",direction:"row",style:{flex:1,backgroundColor:"#333",color:"white",fontFamily:"Helvetica",padding:20},children:[e("span",{children:"Javascript Output"}),e(j,{color:"primary",onClick:()=>S(v("javascript")),children:e(k,{})})]}),e(T,{language:"javascript",style:E,children:y})]}),e("div",{ref:b,style:{flex:1,margin:10},children:e(g,{...w,store:t,height:d.height,width:d.width,drawerWidth:u})})]})},r=I.bind({});r.args={highlightColor:"#ff00ff",drawerWidth:235,...P,...F};var l,c,p;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`args => {
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
      programData,
      tabs,
      activeTab,
      featuredDocs: {
        "2dfsessfs": "> [warn] There was an error!"
        // "45535153s":true
      }
    });
  }, [programData, drawers, objectTypes]);
  const parse = useDefaultProgrammingStore(state => state.parse);
  const [parsed, setParsed] = useState("// Compile To View Parsed Code");
  // const onFile = useDefaultProgrammingStore(state=>state.programData);
  // console.log(onFile)

  return <div style={{
    display: "flex",
    height: "100vh",
    flexDirection: "row",
    backgroundColor: "#333"
  }}>
      <div style={{
      width: 450,
      backgroundColor: "#111"
    }}>
        <Stack justifyContent="space-between" alignItems="center" direction="row" style={{
        flex: 1,
        backgroundColor: "#333",
        color: "white",
        fontFamily: "Helvetica",
        padding: 20
        // width:450
      }}>
          <span>Javascript Output</span>
          <IconButton color="primary" onClick={() => setParsed(parse("javascript"))}>
            <FiRotateCw />
          </IconButton>
        </Stack>
        {/* <TextField
          id="outlined-multiline-flexible"
          label="Result"
          multiline
          value={parsed}
         /> */}
        <SyntaxHighlighter language="javascript" style={oneDark}>
          {parsed}
        </SyntaxHighlighter>
        {/* <pre style={{overflow:'scroll',width:450,height:'100%',color:'#ddd'}}>
          {parsed}
         </pre> */}
      </div>
      <div ref={ref} style={{
      flex: 1,
      margin: 10
    }}>
        <Environment {...otherArgs} store={useDefaultProgrammingStore} height={bounds.height} width={bounds.width} drawerWidth={drawerWidth} />
      </div>
    </div>;
}`,...(p=(c=r.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const G=["Embedded"];export{r as Embedded,G as __namedExportsOrder,z as default};
//# sourceMappingURL=Embedded.stories-1f8affea.js.map
