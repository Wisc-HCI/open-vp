import{r as d}from"./index-f1f749bf.js";import{g as c,u as S,h as t,a,q as x,j as e,I as C,r as D,s as j,t as k}from"./Environment-63cc62ed.js";import{b as T,a as E}from"./basicStarter-3f30d77a.js";import"./_commonjsHelpers-042e6b4d.js";import"./assertThisInitialized-23f34acf.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-eaaa54fe.js";import"./index-96c5f47c.js";import"./index-4d501b15.js";import"./debounce-b7943e1f.js";import"./isSymbol-381e85fc.js";import"./Synchronizing-9383ae29.js";const V={title:"Embedded",component:c},P=p=>{const{drawers:s,objectTypes:o,programData:i,drawerWidth:g,tabs:m,activeTab:u,...h}=p,[f,n]=S();d.useEffect(()=>{t.setState({programSpec:{drawers:s,objectTypes:o},programData:i,tabs:m,activeTab:u,featuredDocs:{"2dfsessfs":"> [warn] There was an error!"}})},[i,s,o]);const w=t(v=>v.parse),[b,y]=d.useState("// Compile To View Parsed Code");return a("div",{style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:"#333"},children:[a("div",{style:{width:450,backgroundColor:"#111"},children:[a(x,{justifyContent:"space-between",alignItems:"center",direction:"row",style:{flex:1,backgroundColor:"#333",color:"white",fontFamily:"Helvetica",padding:20},children:[e("span",{children:"Javascript Output"}),e(C,{color:"primary",onClick:()=>y(w("javascript")),children:e(D,{})})]}),e(j,{language:"javascript",style:k,children:b})]}),e("div",{ref:f,style:{flex:1,margin:10},children:e(c,{...h,store:t,height:n.height,width:n.width,drawerWidth:g})})]})},r=P.bind({});r.args={highlightColor:"#ff00ff",drawerWidth:235,...T,...E};var l;r.parameters={...r.parameters,storySource:{source:`args => {
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
}`,...(l=r.parameters)==null?void 0:l.storySource}};const q=["Embedded"];export{r as Embedded,q as __namedExportsOrder,V as default};
//# sourceMappingURL=Embedded.stories-df3a0296.js.map
