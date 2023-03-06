import React, { useEffect } from 'react';
import {Environment, useDefaultProgrammingStore } from '../components';
import useMeasure from 'react-use-measure';
import connectionConfig from './assets/connectionConfig';
import connectionStarter from './assets/connectionStarter';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Connections',
  component: Environment
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  const { drawers, objectTypes, programData, executionData, drawerWidth, tabs, activeTab, ...otherArgs } = args;

  const [ref, bounds] = useMeasure();
  
  useEffect(()=>{
    useDefaultProgrammingStore.setState({programSpec:{drawers,objectTypes},programData,executionData,tabs,activeTab});
  },[drawers,objectTypes,programData,executionData,tabs,activeTab])
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div ref={ref} style={{display:'flex',height:'100vh',flexDirection:'row',backgroundColor:'#333'}}>
        <Environment {...otherArgs} store={useDefaultProgrammingStore} height={bounds.height} width={bounds.width} drawerWidth={drawerWidth}/>
      </div>
    </ErrorBoundary>
    )
};

export const Connections = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Connections.args = {
  highlightColor: '#ff00ff',
  drawerWidth: 235,
  snapToGrid: true,
  ...connectionConfig,
  ...connectionStarter
};