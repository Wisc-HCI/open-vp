var p=Object.defineProperty;var c=(e,o)=>p(e,"name",{value:o,configurable:!0});import{r as d,a as g,j as t}from"./jsx-runtime.de9b712e.js";import{r as a,g as n,s as m}from"./index.2e3310d2.js";import{b as f,a as h}from"./basicStarter.f8228e5b.js";import"./iframe.7a6172f4.js";import"./index.b33d52e0.js";import"./index.63e724c3.js";import"./Synchronizing.2242089e.js";const j={parameters:{storySource:{source:`import React, { useLayoutEffect } from 'react';
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
};`,locationsMap:{external:{startLoc:{col:17,line:14},endLoc:{col:1,line:44},startBody:{col:17,line:14},endBody:{col:1,line:44}}}}},title:"External",component:a},u=c(e=>{const{drawers:o,objectTypes:s,programData:r,highlightColor:i}=e;d.exports.useLayoutEffect(()=>{n.setState({programSpec:{drawers:o,objectTypes:s},programData:r})});const l=m("hatType",r["6dewwwwww"],s.hatType);return g("div",{style:{width:300,padding:4},children:[t("div",{style:{paddingBottom:4},children:t(a,{store:n,data:r["2dfsessfs"],highlightColor:i,context:{}})}),t("div",{style:{paddingBottom:4},children:t(a,{store:n,data:l,highlightColor:i,context:{}})})]})},"Template"),x=u.bind({});x.args={highlightColor:"#ff00ff",drawerWidth:235,...f,...h};const D=["External"];export{x as External,D as __namedExportsOrder,j as default};
//# sourceMappingURL=External.stories.bb71a2f9.js.map
