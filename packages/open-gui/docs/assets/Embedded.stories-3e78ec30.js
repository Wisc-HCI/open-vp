import{r as d,j as e,a as t}from"./isSymbol-fd368dfe.js";import{E as g,u as x,a,b as k,c as D,S as E,I as j,F as T,d as F,o as P}from"./ErrorFallback-5fd8a603.js";import{b as B,a as I}from"./basicStarter-854550df.js";import"./_commonjsHelpers-042e6b4d.js";import"./assertThisInitialized-f2aa7f15.js";import"./index-58d3fd43.js";import"./debounce-c4e1af20.js";import"./Synchronizing-05e47192.js";const q={title:"Embedded",component:g},H=u=>{const{drawers:o,objectTypes:s,programData:i,drawerWidth:m,tabs:h,activeTab:f,...b}=u,[w,n]=x();d.useEffect(()=>{a.setState({programSpec:{drawers:o,objectTypes:s},programData:i,tabs:h,activeTab:f,featuredDocs:{"2dfsessfs":"> [warn] There was an error!"}})},[i,o,s]);const y=a(S=>S.parse),[v,C]=d.useState("// Compile To View Parsed Code");return e(k,{FallbackComponent:D,children:t("div",{style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:"#333"},children:[t("div",{style:{width:450,backgroundColor:"#111"},children:[t(E,{justifyContent:"space-between",alignItems:"center",direction:"row",style:{flex:1,backgroundColor:"#333",color:"white",fontFamily:"Helvetica",padding:20},children:[e("span",{children:"Javascript Output"}),e(j,{color:"primary",onClick:()=>C(y("javascript")),children:e(T,{})})]}),e(F,{language:"javascript",style:P,children:v})]}),e("div",{ref:w,style:{flex:1,margin:10},children:e(g,{...b,store:a,height:n.height,width:n.width,drawerWidth:m})})]})})},r=H.bind({});r.args={highlightColor:"#ff00ff",drawerWidth:235,...B,...I};var l,c,p;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`args => {
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
}`,...(p=(c=r.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const z=["Embedded"];export{r as Embedded,z as __namedExportsOrder,q as default};
//# sourceMappingURL=Embedded.stories-3e78ec30.js.map
