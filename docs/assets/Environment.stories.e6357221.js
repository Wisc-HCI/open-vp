import{r as g}from"./index.f5e52dc0.js";import{e as n,u as d,f as t}from"./index.11cdcd49.js";import{b as p,a as f}from"./basicStarter.fb9cf505.js";import{j as o}from"./jsx-runtime.b61bc1cc.js";import"./iframe.c5b5eaa5.js";import"./index.582370b9.js";import"./objectWithoutPropertiesLoose.d29fb19f.js";import"./index.850a68d8.js";/* empty css               */var T={parameters:{storySource:{source:`import React, { useLayoutEffect } from 'react';
import {Environment, useDefaultProgrammingStore } from '../components';
import useMeasure from 'react-use-measure';
import basicConfig from './assets/basicConfig';
import basicStarter from './assets/basicStarter';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Fullscreen',
  component: Environment
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  const { drawers, objectTypes, programData, executionData, drawerWidth, ...otherArgs } = args;

  const [ref, bounds] = useMeasure();
  
  useLayoutEffect(()=>{
    useDefaultProgrammingStore.setState({programSpec:{drawers,objectTypes},programData,executionData});
  })
  return (
    <div ref={ref} style={{display:'flex',height:'100vh',flexDirection:'row',backgroundColor:otherArgs.highlightColor}}>
      <Environment {...otherArgs} store={useDefaultProgrammingStore} height={bounds.height} width={bounds.width} drawerWidth={drawerWidth}/>
    </div>
    )
};

export const Fullscreen = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Fullscreen.args = {
  highlightColor: '#ff00ff',
  drawerWidth: 235,
  snapToGrid: true,
  ...basicConfig,
  ...basicStarter
};`,locationsMap:{fullscreen:{startLoc:{col:17,line:14},endLoc:{col:1,line:27},startBody:{col:17,line:14},endBody:{col:1,line:27}}}}},title:"Fullscreen",component:n};const h=s=>{const{drawers:a,objectTypes:i,programData:c,executionData:l,drawerWidth:m,...r}=s,[u,e]=d();return g.exports.useLayoutEffect(()=>{t.setState({programSpec:{drawers:a,objectTypes:i},programData:c,executionData:l})}),o("div",{ref:u,style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:r.highlightColor},children:o(n,{...r,store:t,height:e.height,width:e.width,drawerWidth:m})})},b=h.bind({});b.args={highlightColor:"#ff00ff",drawerWidth:235,snapToGrid:!0,...p,...f};const M=["Fullscreen"];export{b as Fullscreen,M as __namedExportsOrder,T as default};
//# sourceMappingURL=Environment.stories.e6357221.js.map
