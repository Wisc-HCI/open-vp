import{r as g,a as l,j as e}from"./jsx-runtime.7a992593.js";import{f as o,u as f,g as t}from"./index.9bdd23f1.js";import{b as p,a as u}from"./basicStarter.cc22e16c.js";import"./iframe.95bc4eb0.js";import"./index.672e2731.js";import"./Synchronizing.51ae3b60.js";const k={parameters:{storySource:{source:`import React, { useLayoutEffect } from "react";
import { Environment, useDefaultProgrammingStore } from "../components";
import useMeasure from "react-use-measure";
// import { Input } from "../components/Block/Utility";
import basicConfig from "./assets/basicConfig";
import basicStarter from "./assets/basicStarter";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Embedded",
  component: Environment,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  const { drawers, objectTypes, programData, drawerWidth, ...otherArgs } = args;

  const [ref, bounds] = useMeasure();

  useLayoutEffect(() => {
    useDefaultProgrammingStore.setState({
      programSpec: { drawers, objectTypes },
      programData,
    });
  });

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "row",
        backgroundColor: '#333',
      }}
    >
      <div style={{ flex: 1, backgroundColor: "darkgray" }}/>
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
`,locationsMap:{embedded:{startLoc:{col:17,line:15},endLoc:{col:1,line:48},startBody:{col:17,line:15},endBody:{col:1,line:48}}}}},title:"Embedded",component:o},h=n=>{const{drawers:s,objectTypes:a,programData:i,drawerWidth:d,...c}=n,[m,r]=f();return g.exports.useLayoutEffect(()=>{t.setState({programSpec:{drawers:s,objectTypes:a},programData:i})}),l("div",{style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:"#333"},children:[e("div",{style:{flex:1,backgroundColor:"darkgray"}}),e("div",{ref:m,style:{flex:1,margin:10},children:e(o,{...c,store:t,height:r.height,width:r.width,drawerWidth:d})})]})},b=h.bind({});b.args={highlightColor:"#ff00ff",drawerWidth:235,...p,...u};const C=["Embedded"];export{b as Embedded,C as __namedExportsOrder,k as default};
//# sourceMappingURL=Embedded.stories.7eed3252.js.map
