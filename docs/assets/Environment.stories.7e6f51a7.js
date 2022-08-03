import{r as u}from"./index.f5e52dc0.js";import{f as n,u as d,g as e}from"./index.13aaf8bc.js";import{b as p,a as f}from"./basicStarter.81fb0842.js";import{j as o}from"./jsx-runtime.b61bc1cc.js";import"./iframe.9d51ee5c.js";import"./objectWithoutPropertiesLoose.d29fb19f.js";import"./index.582370b9.js";import"./index.65f1d40b.js";/* empty css               */var T={parameters:{storySource:{source:`import React, { useLayoutEffect } from 'react';
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
};`,locationsMap:{fullscreen:{startLoc:{col:17,line:14},endLoc:{col:1,line:27},startBody:{col:17,line:14},endBody:{col:1,line:27}}}}},title:"Fullscreen",component:n};const h=s=>{const{drawers:a,objectTypes:i,programData:c,executionData:l,drawerWidth:g,...r}=s,[m,t]=d();return u.exports.useLayoutEffect(()=>{e.setState({programSpec:{drawers:a,objectTypes:i},programData:c,executionData:l})}),o("div",{ref:m,style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:r.highlightColor},children:o(n,{...r,store:e,height:t.height,width:t.width,drawerWidth:g})})},b=h.bind({});b.args={highlightColor:"#ff00ff",drawerWidth:235,snapToGrid:!0,...p,...f};const M=["Fullscreen"];export{b as Fullscreen,M as __namedExportsOrder,T as default};
//# sourceMappingURL=Environment.stories.7e6f51a7.js.map
