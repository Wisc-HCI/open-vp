var b=Object.defineProperty;var d=(r,t)=>b(r,"name",{value:t,configurable:!0});import{r as c,a as n,j as e}from"./jsx-runtime.de9b712e.js";import{f as l,u as y,g as o,o as v,I as C,p as S}from"./index.2e3310d2.js";import{b as x,a as k}from"./basicStarter.f8228e5b.js";import"./iframe.7a6172f4.js";import"./index.b33d52e0.js";import"./index.63e724c3.js";import"./Synchronizing.2242089e.js";const R={parameters:{storySource:{source:`import React, { useEffect, useState } from "react";
import { Environment, useDefaultProgrammingStore } from "../components";
import useMeasure from "react-use-measure";
// import { Input } from "../components/Block/Utility";
import basicConfig from "./assets/basicConfig";
import basicStarter from "./assets/basicStarter";
import { IconButton, Stack } from "@mui/material";
import { FiRotateCw } from "react-icons/fi";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Embedded",
  component: Environment,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  const { drawers, objectTypes, programData, drawerWidth, ...otherArgs } = args;

  const [ref, bounds] = useMeasure();

  useEffect(() => {
    useDefaultProgrammingStore.setState({
      programSpec: { drawers, objectTypes },
      programData,
      featuredDocs: {
        '2dfsessfs':"> [warn] There was an error!",
        // "45535153s":true
      }
    });
  },[programData,drawers,objectTypes]);

  const parse = useDefaultProgrammingStore(state=>state.parse);
  const [parsed,setParsed] = useState("Compile To View Parsed Code");
  // const onFile = useDefaultProgrammingStore(state=>state.programData);
  // console.log(onFile)

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "row",
        backgroundColor: "#333",
      }}
    >
      <div style={{ width:450, backgroundColor: "#111" }}>
        <Stack
        justifyContent='space-between'
        alignItems='center'
          direction='row'

          style={{
            flex: 1,
            backgroundColor: "#333",
            color: "white",
            fontFamily: "Helvetica",
            padding:20,
            // width:450
          }}
        >
          <span>Javascript Output</span>
          <IconButton color='primary' onClick={()=>setParsed(parse('javascript'))}><FiRotateCw/></IconButton>
        </Stack>
        {/* <TextField
          id="outlined-multiline-flexible"
          label="Result"
          multiline
          value={parsed}
        /> */}
        <pre style={{overflow:'scroll',width:450,height:'100%',color:'#ddd'}}>
          {parsed}
        </pre>

      </div>
      <div ref={ref} style={{ flex: 1, margin: 10 }}>
        <Environment
          {...otherArgs}
          store={useDefaultProgrammingStore}
          height={bounds.height}
          width={bounds.width}
          drawerWidth={drawerWidth}
        />
      </div>
    </div>
  );
};

export const Embedded = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Embedded.args = {
  highlightColor: "#ff00ff",
  drawerWidth: 235,
  ...basicConfig,
  ...basicStarter,
};
`,locationsMap:{embedded:{startLoc:{col:17,line:17},endLoc:{col:1,line:87},startBody:{col:17,line:17},endBody:{col:1,line:87}}}}},title:"Embedded",component:l},D=d(r=>{const{drawers:t,objectTypes:s,programData:a,drawerWidth:m,...p}=r,[u,i]=y();c.exports.useEffect(()=>{o.setState({programSpec:{drawers:t,objectTypes:s},programData:a,featuredDocs:{"2dfsessfs":"> [warn] There was an error!"}})},[a,t,s]);const f=o(w=>w.parse),[g,h]=c.exports.useState("Compile To View Parsed Code");return n("div",{style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:"#333"},children:[n("div",{style:{width:450,backgroundColor:"#111"},children:[n(v,{justifyContent:"space-between",alignItems:"center",direction:"row",style:{flex:1,backgroundColor:"#333",color:"white",fontFamily:"Helvetica",padding:20},children:[e("span",{children:"Javascript Output"}),e(C,{color:"primary",onClick:()=>h(f("javascript")),children:e(S,{})})]}),e("pre",{style:{overflow:"scroll",width:450,height:"100%",color:"#ddd"},children:g})]}),e("div",{ref:u,style:{flex:1,margin:10},children:e(l,{...p,store:o,height:i.height,width:i.width,drawerWidth:m})})]})},"Template"),E=D.bind({});E.args={highlightColor:"#ff00ff",drawerWidth:235,...x,...k};const A=["Embedded"];export{E as Embedded,A as __namedExportsOrder,R as default};
//# sourceMappingURL=Embedded.stories.92fb3eb9.js.map
