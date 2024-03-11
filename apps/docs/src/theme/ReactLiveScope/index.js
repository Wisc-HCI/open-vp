import React from "react";
import { Environment } from "@people_and_robots/open-vp";
import * as openvpTypes from "@people_and_robots/open-core";
import BrowserOnly from "@docusaurus/BrowserOnly";

const WrappedEnvironment = (props) => (
  <BrowserOnly>
    <Environment {...props} />
  </BrowserOnly>
);

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  Environment: WrappedEnvironment,
  ...openvpTypes,
};
export default ReactLiveScope;
