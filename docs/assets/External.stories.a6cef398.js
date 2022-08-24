import{r as l,a as p,j as t}from"./jsx-runtime.f521820d.js";import{p as r,g as o,r as d}from"./index.ca71f4d0.js";import{b as g,a as m}from"./basicStarter.6db8ff15.js";import"./iframe.1a57ec9f.js";import"./index.b5e08505.js";import"./Synchronizing.abbe06dc.js";const E={parameters:{storySource:{source:`import React, { useLayoutEffect } from 'react';
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
};`,locationsMap:{external:{startLoc:{col:17,line:14},endLoc:{col:1,line:44},startBody:{col:17,line:14},endBody:{col:1,line:44}}}}},title:"External",component:r},f=s=>{const{drawers:i,objectTypes:n,programData:e,highlightColor:a}=s;l.exports.useLayoutEffect(()=>{o.setState({programSpec:{drawers:i,objectTypes:n},programData:e})});const c=d("hatType",e["6dewwwwww"],n.hatType);return p("div",{style:{width:300,padding:4},children:[t("div",{style:{paddingBottom:4},children:t(r,{store:o,data:e["2dfsessfs"],highlightColor:a,context:{}})}),t("div",{style:{paddingBottom:4},children:t(r,{store:o,data:c,highlightColor:a,context:{}})})]})},h=f.bind({});h.args={highlightColor:"#ff00ff",drawerWidth:235,...g,...m};const T=["External"];export{h as External,T as __namedExportsOrder,E as default};
//# sourceMappingURL=External.stories.a6cef398.js.map
