import{a as d}from"./index.839b8c6b.js";import{g as c,u as S,h as r,a,q as x,j as e,I as C,r as D,s as j,t as k}from"./Environment.93173b90.js";import{b as T,a as P}from"./basicStarter.c7748108.js";import"./_commonjsHelpers.712cc82f.js";import"./assertThisInitialized.34336fa0.js";import"./index.63e724c3.js";import"./debounce.d0c7c84f.js";import"./isSymbol.e585a1e8.js";import"./Synchronizing.25798c57.js";const J={title:"Embedded",component:c},E=p=>{const{drawers:s,objectTypes:o,programData:i,drawerWidth:g,tabs:u,activeTab:h,...m}=p,[f,n]=S();d.exports.useEffect(()=>{r.setState({programSpec:{drawers:s,objectTypes:o},programData:i,tabs:u,activeTab:h,featuredDocs:{"2dfsessfs":"> [warn] There was an error!"}})},[i,s,o]);const w=r(v=>v.parse),[b,y]=d.exports.useState("// Compile To View Parsed Code");return a("div",{style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:"#333"},children:[a("div",{style:{width:450,backgroundColor:"#111"},children:[a(x,{justifyContent:"space-between",alignItems:"center",direction:"row",style:{flex:1,backgroundColor:"#333",color:"white",fontFamily:"Helvetica",padding:20},children:[e("span",{children:"Javascript Output"}),e(C,{color:"primary",onClick:()=>y(w("javascript")),children:e(D,{})})]}),e(j,{language:"javascript",style:k,children:b})]}),e("div",{ref:f,style:{flex:1,margin:10},children:e(c,{...m,store:r,height:n.height,width:n.width,drawerWidth:g})})]})},t=E.bind({});t.args={highlightColor:"#ff00ff",drawerWidth:235,...T,...P};var l;t.parameters={...t.parameters,storySource:{source:`args => {
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
}`,...(l=t.parameters)==null?void 0:l.storySource}};const M=["Embedded"];export{t as Embedded,M as __namedExportsOrder,J as default};
//# sourceMappingURL=Embedded.stories.52c6745e.js.map
