import React from "react";
// import * as openvpTypes from "@people_and_robots/open-core";
import Environment from "@site/src/components/Environment";

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  Environment,
  // ...openvpTypes,
};
export default ReactLiveScope;
