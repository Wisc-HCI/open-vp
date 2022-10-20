import React, { useEffect, useState } from "react";
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
