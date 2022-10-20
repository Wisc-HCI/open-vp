var l=Object.defineProperty;var o=(e,r)=>l(e,"name",{value:r,configurable:!0});import{r as g,j as s}from"./jsx-runtime.de9b712e.js";import{f as a,u as p,g as n}from"./index.2e3310d2.js";import{b as h,a as w}from"./basicStarter.f8228e5b.js";import"./iframe.7a6172f4.js";import"./index.b33d52e0.js";import"./index.63e724c3.js";import"./Synchronizing.2242089e.js";const M={parameters:{storySource:{source:`import React, { useLayoutEffect } from 'react';
import {Environment, useDefaultProgrammingStore } from '../components';
import useMeasure from 'react-use-measure';
import basicConfig from './assets/basicConfig';
import basicStarter from './assets/basicStarter';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Fullscreen',
  component: Environment
};

const featured = \`
> [error] There was an error!

> [warn] There was an warning related to [The Program](programType)!

> [info] Here is some info!

> [success] Here is a success message!

> Here is a block quote!
\`

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  const { drawers, objectTypes, programData, executionData, drawerWidth, ...otherArgs } = args;

  const [ref, bounds] = useMeasure();
  
  useLayoutEffect(()=>{
    useDefaultProgrammingStore.setState({programSpec:{drawers,objectTypes},programData,executionData,featuredDocs: {
      '2dfsessfs':featured,
      // "45535153s":true
    }});
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
};`,locationsMap:{fullscreen:{startLoc:{col:17,line:26},endLoc:{col:1,line:42},startBody:{col:17,line:26},endBody:{col:1,line:42}}}}},title:"Fullscreen",component:a},b=`
> [error] There was an error!

> [warn] There was an warning related to [The Program](programType)!

> [info] Here is some info!

> [success] Here is a success message!

> Here is a block quote!
`,y=o(e=>{const{drawers:r,objectTypes:i,programData:c,executionData:u,drawerWidth:d,...f}=e,[m,t]=p();return g.exports.useLayoutEffect(()=>{n.setState({programSpec:{drawers:r,objectTypes:i},programData:c,executionData:u,featuredDocs:{"2dfsessfs":b}})}),s("div",{ref:m,style:{display:"flex",height:"100vh",flexDirection:"row",backgroundColor:"#333"},children:s(a,{...f,store:n,height:t.height,width:t.width,drawerWidth:d})})},"Template"),T=y.bind({});T.args={highlightColor:"#ff00ff",drawerWidth:235,snapToGrid:!0,...h,...w};const F=["Fullscreen"];export{T as Fullscreen,F as __namedExportsOrder,M as default};
//# sourceMappingURL=Environment.stories.24b6920f.js.map
