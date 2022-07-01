import React, { useLayoutEffect } from 'react';
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
};