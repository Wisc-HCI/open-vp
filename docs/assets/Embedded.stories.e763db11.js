import{r as g}from"./index.f5e52dc0.js";import{e as n,u as l,f as o}from"./index.bab6431f.js";import{b as f,a as p}from"./basicStarter.d3f6f7d3.js";import{a as h,j as r}from"./jsx-runtime.b61bc1cc.js";import"./iframe.94974b11.js";import"./index.582370b9.js";import"./objectWithoutPropertiesLoose.d29fb19f.js";import"./index.850a68d8.js";/* empty css               */var D={parameters:{storySource:{source:`import React, { useLayoutEffect } from "react";
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
        backgroundColor: otherArgs.highlightColor,
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
`,locationsMap:{embedded:{startLoc:{col:17,line:15},endLoc:{col:1,line:48},startBody:{col:17,line:15},endBody:{col:1,line:48}}}}},title:"Embedded",component:n};const u=s=>{const{drawers:a,objectTypes:i,programData:d,drawerWidth:m,...e}=s,[c,t]=l();return g.exports.useLayoutEffect(()=>{o.setState({programSpec:{drawers:a,objectTypes:i},programData:d})}),h("div",{style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:e.highlightColor},children:[r("div",{style:{flex:1,backgroundColor:"darkgray"}}),r("div",{ref:c,style:{flex:1,margin:10},children:r(n,{...e,store:o,height:t.height,width:t.width,drawerWidth:m})})]})},b=u.bind({});b.args={highlightColor:"#ff00ff",drawerWidth:235,...f,...p};const M=["Embedded"];export{b as Embedded,M as __namedExportsOrder,D as default};
//# sourceMappingURL=Embedded.stories.e763db11.js.map
