import{r as m,j as e}from"./jsx-runtime.b0768978.js";import{f as o,u as g,g as t}from"./index.51fb09e2.js";import{b as p,a as f}from"./basicStarter.5edfb60b.js";import"./iframe.8823d13b.js";import"./index.36ec9d20.js";import"./index.63e724c3.js";import"./Synchronizing.1b3709be.js";const j={parameters:{storySource:{source:`import React, { useLayoutEffect } from 'react';
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
    <div ref={ref} style={{display:'flex',height:'100vh',flexDirection:'row',backgroundColor:'#333'}}>
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
};`,locationsMap:{fullscreen:{startLoc:{col:17,line:14},endLoc:{col:1,line:27},startBody:{col:17,line:14},endBody:{col:1,line:27}}}}},title:"Fullscreen",component:o},h=n=>{const{drawers:s,objectTypes:a,programData:i,executionData:c,drawerWidth:l,...u}=n,[d,r]=g();return m.exports.useLayoutEffect(()=>{t.setState({programSpec:{drawers:s,objectTypes:a},programData:i,executionData:c})}),e("div",{ref:d,style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:"#333"},children:e(o,{...u,store:t,height:r.height,width:r.width,drawerWidth:l})})},b=h.bind({});b.args={highlightColor:"#ff00ff",drawerWidth:235,snapToGrid:!0,...p,...f};const C=["Fullscreen"];export{b as Fullscreen,C as __namedExportsOrder,j as default};
//# sourceMappingURL=Environment.stories.f52b5e4b.js.map
