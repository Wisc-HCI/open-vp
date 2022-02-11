import React from 'react';
import { Canvas } from "./Canvas";
import { Drawer } from "./Drawer";
import { DragLayer } from "./DragLayer";
// import { HTML5Backend } from "react-dnd-html5-backend";
import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import { MultiBackend } from 'react-dnd-multi-backend'
import { DndProvider } from "react-dnd";
import { ProgrammingProvider } from "./ProgrammingContext";
import { Grommet } from "grommet";
import {ReactFlowProvider} from "react-flow-renderer";

export default function Environment({ store, highlightColor, height, width, drawerWidth }) {

  const theme = {
    name: 'SimpleVP',
    rounding: 4,
    defaultMode: 'dark',
    global: {
      colors: {
        brand: highlightColor,
        background: '#111111',
        control: highlightColor
      },
      font: {
        family: "Helvetica"
      },
      focus: {
        border:{
          color: highlightColor
        }
      },
      input: {
        padding: 4,
        extend: {backgroundColor:'#FFFFFF55'}
      },
      // edgeSize: {large: 50, small: 10, medium: 15}
    },
    button: {
      border: {
        radius: "10px"
      }
    },
    radioButton: {
      size: "16px",
      border: {color: '#00000088'}
    },
    checkBox: {
      size: "20px",
      border: {color: '#00000088'},
      color: highlightColor,
      hover: {border: {color: '#00000088'},}
    },
    textInput: {disabled : { opacity: 1 }}
  }
  return (
    <Grommet theme={theme}>
      <ProgrammingProvider store={store}>
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
          <div
            style={{
              padding: 0,
              margin: 0,
              display: 'flex',
              height,
              width
            }}
          >
            <Drawer highlightColor={highlightColor} drawerWidth={drawerWidth ? drawerWidth : 235}/>
            <ReactFlowProvider>
              <Canvas highlightColor={highlightColor} drawerWidth={drawerWidth ? drawerWidth : 235}/>
            </ReactFlowProvider>
          </div>
          <DragLayer highlightColor={highlightColor}/>
        </DndProvider>
      </ProgrammingProvider>
    </Grommet>

  );
}
