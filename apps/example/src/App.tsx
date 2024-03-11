// import { useState } from "react";
import { Environment } from "@people_and_robots/open-vp";
import {
  PrimitiveType,
  PropertyType,
  MetaType,
  DrawerType,
  type DrawerSpec,
  type TypeSpec,
} from "@people_and_robots/open-core";
import { imperativeTypes, imperativeDrawers } from "./imperative";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

const drawers: DrawerSpec[] = [
  {
    title: "Blocks",
    type: DrawerType.Multiple,
    metaType: MetaType.ObjectInstance,
    objectTypes: ["simpleType", "textType"],
    icon: "SquareRounded",
  },
];

// These are the blocks we specified before
const objectTypes: Record<string, TypeSpec> = {
  simpleType: {
    name: "Simple Block",
    primitiveType: PrimitiveType.Object,
    description: "# Markdown-Flavored Description String",
    instanceBlock: {
      onCanvas: true,
      color: "#3f3f3f",
      icon: "SquareRounded",
      extras: [],
    },
    referenceBlock: {
      onCanvas: true,
      color: "#3f3f3f",
      icon: "SquareRounded",
      extras: [],
    },
    properties: {
      myProperty: {
        id: "myProperty",
        type: PropertyType.Block,
        name: "My Property",
        accepts: ["textType"],
        default: null,
        isList: false,
        fullWidth: false,
      },
      myNumericalProperty: {
        id: "myNumericalProperty",
        type: PropertyType.Number,
        name: "My Number",
        default: 10,
        min: 0,
        max: 100,
        step: 1,
        units: "m/s",
      },
    },
  },
  textType: {
    name: "Text Block",
    primitiveType: PrimitiveType.Object,
    description: "# Markdown-Flavored Description String",
    instanceBlock: {
      onCanvas: false,
      color: "#629e6c",
      icon: "SquareRounded",
      extras: [],
      minified: false,
    },
    referenceBlock: {
      onCanvas: false,
      color: "#629e6c",
      icon: "SquareRounded",
      extras: [],
      minified: false,
    },
    properties: {
      text: {
        id: "text",
        type: PropertyType.String,
        name: "Text",
        default: "Hello World!",
      },
    },
  },
};

function App() {
  // const [count, setCount] = useState(0);

  return (
    <Environment
      initial={{
        programSpec: {
          drawers,
          objectTypes,
        },
      }}
    />
  );
}

export default App;
