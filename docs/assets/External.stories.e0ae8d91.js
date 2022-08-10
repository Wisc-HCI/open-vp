import{r as l,a as p,j as t}from"./jsx-runtime.b0768978.js";import{p as r,g as o,r as d}from"./index.51fb09e2.js";import{b as g,a as m}from"./basicStarter.5edfb60b.js";import"./iframe.8823d13b.js";import"./index.36ec9d20.js";import"./index.63e724c3.js";import"./Synchronizing.1b3709be.js";const T={parameters:{storySource:{source:`import React, { useLayoutEffect } from 'react';
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
};`,locationsMap:{external:{startLoc:{col:17,line:14},endLoc:{col:1,line:44},startBody:{col:17,line:14},endBody:{col:1,line:44}}}}},title:"External",component:r},f=s=>{const{drawers:i,objectTypes:n,programData:e,highlightColor:a}=s;l.exports.useLayoutEffect(()=>{o.setState({programSpec:{drawers:i,objectTypes:n},programData:e})});const c=d("hatType",e["6dewwwwww"],n.hatType);return p("div",{style:{width:300,padding:4},children:[t("div",{style:{paddingBottom:4},children:t(r,{store:o,data:e["2dfsessfs"],highlightColor:a,context:{}})}),t("div",{style:{paddingBottom:4},children:t(r,{store:o,data:c,highlightColor:a,context:{}})})]})},h=f.bind({});h.args={highlightColor:"#ff00ff",drawerWidth:235,...g,...m};const C=["External"];export{h as External,C as __namedExportsOrder,T as default};
//# sourceMappingURL=External.stories.e0ae8d91.js.map
