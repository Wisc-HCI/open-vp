import React, { useLayoutEffect } from "react";
import { Environment, useDefaultProgrammingStore } from "../components";
import useMeasure from "react-use-measure";
import basicConfig from "./assets/basicConfig";
import basicStarter from "./assets/basicStarter";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Fullscreen",
  component: Environment,
};

const featured = `
> [error] There was an error!

> [warn] There was an warning related to [The Program](programType)!

> [info] Here is some info!

> [success] Here is a success message!

> Here is a block quote!
`;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  const {
    drawers,
    objectTypes,
    programData,
    tabs,
    activeTab,
    executionData,
    drawerWidth,
    ...otherArgs
  } = args;

  const [ref, bounds] = useMeasure();

  useLayoutEffect(() => {
    useDefaultProgrammingStore.setState({
      programSpec: { drawers, objectTypes },
      programData,
      executionData,
      featuredDocs: {
        "2dfsessfs": featured,
        // "45535153s":true
      },
      tabs,
      activeTab
    });
  });
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "row",
        backgroundColor: "#333",
      }}
    >
      <Environment
        {...otherArgs}
        store={useDefaultProgrammingStore}
        height={bounds.height}
        width={bounds.width}
        drawerWidth={drawerWidth}
      />
    </div>
  );
};

export const Fullscreen = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Fullscreen.args = {
  highlightColor: "#ff00ff",
  drawerWidth: 235,
  snapToGrid: true,
  ...basicConfig,
  ...basicStarter,
};
