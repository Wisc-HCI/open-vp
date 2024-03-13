// import { useState } from "react";
import { Environment } from "@people_and_robots/open-vp";
// import {
//   PrimitiveType,
//   PropertyType,
//   MetaType,
//   DrawerType,
//   type DrawerSpec,
//   type TypeSpec,
// } from "@people_and_robots/open-core";
import { imperativeTypes, imperativeDrawers } from "./imperative";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <Environment
      initial={{
        programSpec: {
          drawers: imperativeDrawers,
          objectTypes: imperativeTypes,
        },
      }}
    />
  );
}

export default App;
