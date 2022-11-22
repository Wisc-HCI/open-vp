import React, { useLayoutEffect } from 'react';
import {Environment, useDefaultProgrammingStore } from '../components';
import useMeasure from 'react-use-measure';
import coframeConfig from './assets/coframeConfig';
import coframeStarter from './assets/coframeStarter';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Coframe',
  component: Environment
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  const { drawers, objectTypes, programData, executionData, drawerWidth, activeTab, tabs, ...otherArgs } = args;

  const [ref, bounds] = useMeasure();
  
  useLayoutEffect(()=>{
    useDefaultProgrammingStore.setState({programSpec:{drawers,objectTypes},programData,executionData,tabs,activeTab});
  })
  return (
    <div ref={ref} style={{display:'flex',height:'100vh',flexDirection:'row',backgroundColor:'#333'}}>
      <Environment {...otherArgs} store={useDefaultProgrammingStore} height={bounds.height} width={bounds.width} drawerWidth={drawerWidth} />
    </div>
    )
};

export const Coframe = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Coframe.args = {
  highlightColor: '#ff00ff',
  drawerWidth: 235,
  snapToGrid: true,
  animateDrawer: false,
  ...coframeConfig,
  programData:coframeStarter,
  activeTab:'default',
  tabs: [
    {
      title:'Main',
      id: 'default',
      visible: true,
      blocks: ["program-484de43e-adaa-4801-a23b-bca38e211365"]
    },
    {
      title:'Declarations',
      id: 'declarations',
      visible: true,
      blocks: []
    }
  ],
  executionData:{}
};