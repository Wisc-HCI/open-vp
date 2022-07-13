import{r as c}from"./index.f5e52dc0.js";import{o as r,f as o,r as p}from"./index.8d6497b6.js";import{b as m,a as d}from"./basicStarter.10f48d79.js";import{a as g,j as t}from"./jsx-runtime.b61bc1cc.js";import"./iframe.76f28d98.js";import"./index.582370b9.js";import"./objectWithoutPropertiesLoose.d29fb19f.js";import"./index.65f1d40b.js";/* empty css               */var B={parameters:{storySource:{source:`import React, { useLayoutEffect } from 'react';
import { useDefaultProgrammingStore, referenceTemplateFromSpec } from '../components';
import { ExternalBlock } from '../components';
import basicConfig from './assets/basicConfig';
import basicStarter from './assets/basicStarter';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'External',
  component: ExternalBlock
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  const { drawers, objectTypes, programData, highlightColor } = args;

  useLayoutEffect(()=>{
    useDefaultProgrammingStore.setState({programSpec:{drawers,objectTypes},programData});
  })

  const instRef = referenceTemplateFromSpec('hatType',programData['6dewwwwww'],objectTypes.hatType)

  return (
    <div style={{width:300,padding:4}}>
      <div style={{paddingBottom:4}}>
        <ExternalBlock 
          store={useDefaultProgrammingStore} 
          data={programData['2dfsessfs']} 
          highlightColor={highlightColor}
          context={{}}
        />
      </div>
      <div style={{paddingBottom:4}}>
        <ExternalBlock 
          store={useDefaultProgrammingStore} 
          data={instRef} 
          highlightColor={highlightColor}
          context={{}}
        />
      </div>
      
    </div>
    )
};

export const External = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
External.args = {
  highlightColor: '#ff00ff',
  drawerWidth: 235,
  ...basicConfig,
  ...basicStarter,
};`,locationsMap:{external:{startLoc:{col:17,line:14},endLoc:{col:1,line:44},startBody:{col:17,line:14},endBody:{col:1,line:44}}}}},title:"External",component:r};const f=s=>{const{drawers:i,objectTypes:n,programData:e,highlightColor:a}=s;c.exports.useLayoutEffect(()=>{o.setState({programSpec:{drawers:i,objectTypes:n},programData:e})});const l=p("hatType",e["6dewwwwww"],n.hatType);return g("div",{style:{width:300,padding:4},children:[t("div",{style:{paddingBottom:4},children:t(r,{store:o,data:e["2dfsessfs"],highlightColor:a,context:{}})}),t("div",{style:{paddingBottom:4},children:t(r,{store:o,data:l,highlightColor:a,context:{}})})]})},h=f.bind({});h.args={highlightColor:"#ff00ff",drawerWidth:235,...m,...d};const j=["External"];export{h as External,j as __namedExportsOrder,B as default};
//# sourceMappingURL=External.stories.748461c9.js.map
