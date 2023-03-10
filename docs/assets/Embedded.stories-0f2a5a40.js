import{r as d}from"./index-f1f749bf.js";import{g,u as k,h as t,j as e,i as x,k as D,a,s as E,I as j,t as T,v as F,w as P}from"./ErrorFallback-164632d3.js";import{b as B,a as I}from"./basicStarter-4b82c52a.js";import"./_commonjsHelpers-042e6b4d.js";import"./assertThisInitialized-23f34acf.js";import"./index-96c5f47c.js";import"./index-4d501b15.js";import"./debounce-b7943e1f.js";import"./isSymbol-381e85fc.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-eaaa54fe.js";import"./Synchronizing-3d735629.js";const K={title:"Embedded",component:g},H=m=>{const{drawers:o,objectTypes:s,programData:i,drawerWidth:u,tabs:h,activeTab:f,...b}=m,[w,n]=k();d.useEffect(()=>{t.setState({programSpec:{drawers:o,objectTypes:s},programData:i,tabs:h,activeTab:f,featuredDocs:{"2dfsessfs":"> [warn] There was an error!"}})},[i,o,s]);const y=t(S=>S.parse),[v,C]=d.useState("// Compile To View Parsed Code");return e(x,{FallbackComponent:D,children:a("div",{style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:"#333"},children:[a("div",{style:{width:450,backgroundColor:"#111"},children:[a(E,{justifyContent:"space-between",alignItems:"center",direction:"row",style:{flex:1,backgroundColor:"#333",color:"white",fontFamily:"Helvetica",padding:20},children:[e("span",{children:"Javascript Output"}),e(j,{color:"primary",onClick:()=>C(y("javascript")),children:e(T,{})})]}),e(F,{language:"javascript",style:P,children:v})]}),e("div",{ref:w,style:{flex:1,margin:10},children:e(g,{...b,store:t,height:n.height,width:n.width,drawerWidth:u})})]})})},r=H.bind({});r.args={highlightColor:"#ff00ff",drawerWidth:235,...B,...I};var l,c,p;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`args => {
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

  return <ErrorBoundary FallbackComponent={ErrorFallback}>
    <div style={{
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
    </div>
    </ErrorBoundary>;
}`,...(p=(c=r.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const L=["Embedded"];export{r as Embedded,L as __namedExportsOrder,K as default};
//# sourceMappingURL=Embedded.stories-0f2a5a40.js.map
