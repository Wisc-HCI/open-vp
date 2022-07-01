import React from "react";
import { Canvas } from "./Canvas";
import { Drawer } from "./Drawer";
import { DragLayer } from "./DragLayer";
// import { HTML5Backend } from "react-dnd-html5-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { MultiBackend } from "react-dnd-multi-backend";
import { DndProvider } from "react-dnd";
import { ProgrammingProvider } from "./ProgrammingContext";
import { Grommet } from "grommet";
import { ReactFlowProvider } from "react-flow-renderer";
import { getTheme } from "./theme";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function Environment({
  store,
  highlightColor,
  height,
  width,
  drawerWidth,
  snapToGrid,
}) {
  const theme = getTheme(highlightColor);
  const muiTheme = createTheme({
    palette: {
      mode: "dark",
      highlightColor:{
        main: highlightColor
      },
      quiet: {
        main: '#444',
        darker: '#333',
      },
    },
  });

  return (
    <Grommet theme={theme}>
      <ThemeProvider theme={muiTheme}>
        <ProgrammingProvider store={store}>
          <DndProvider backend={MultiBackend} options={HTML5toTouch}>
            <div
              style={{
                padding: 0,
                margin: 0,
                display: "flex",
                height,
                width,
              }}
            >
              <Drawer
                highlightColor={highlightColor}
                drawerWidth={drawerWidth ? drawerWidth : 235}
              />
              <ReactFlowProvider>
                <Canvas
                  highlightColor={highlightColor}
                  snapToGrid={snapToGrid}
                />
              </ReactFlowProvider>
            </div>
            <DragLayer highlightColor={highlightColor} />
          </DndProvider>
        </ProgrammingProvider>
      </ThemeProvider>
    </Grommet>
  );
}
