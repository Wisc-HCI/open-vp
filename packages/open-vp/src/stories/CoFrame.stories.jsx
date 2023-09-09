import React, { useEffect } from 'react';
import {Environment, useDefaultProgrammingStore } from '../components';
import useMeasure from 'react-use-measure';
import coframeConfig from './assets/coframeConfig';
import coframeStarter from './assets/coframeStarter';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Coframe',
  component: Environment
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  const { drawers, objectTypes, programData, executionData, drawerWidth, activeTab, tabs, ...otherArgs } = args;

  const [ref, bounds] = useMeasure();

  const featuredDocs = {
    'thingType-98892bd01c1911ecbe2600155d1a70a2':'# Error'
  }

  useEffect(()=>{
    useDefaultProgrammingStore.setState({programSpec:{drawers,objectTypes},programData,executionData,tabs,activeTab,featuredDocs});
  },[drawers,objectTypes,programData,executionData,tabs,activeTab,featuredDocs])
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div ref={ref} style={{display:'flex',height:'100vh',flexDirection:'row',backgroundColor:'#333'}}>
        <Environment {...otherArgs} store={useDefaultProgrammingStore} height={bounds.height} width={bounds.width} drawerWidth={drawerWidth} />
      </div>
    </ErrorBoundary>
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
    "title":"Main",
    "id": "default",
    "visible": true,
    "blocks": ["program-484de43e-adaa-4801-a23b-bca38e211365"]
  },
  {
    "title":"Skills",
    "id": "skills",
    "visible": true,
    "blocks": [
      "skillType-d5649c10-9075-4009-b740-0976cff8258c",
      "skillType-2f3e0a5c-3dbb-4eca-bef6-aecb0568da1d",
      "skillType-d5649c10-9075-4009-b740-0976cff8258c",
      "skillType-0b5026c4-4777-4250-b2ce-50214b504202",
      "skillType-1f4348c8-8b88-441d-95c9-dc9874848629",
      "skillType-b359d032-0996-444e-8099-4790b97df79e"
    ]
  }
],
  executionData:{}
};