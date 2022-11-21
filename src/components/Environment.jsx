import React from "react";
import { Contents } from "./Contents";
import { DragLayer } from "./DragLayer";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { MultiBackend } from "react-dnd-multi-backend";
import { DndProvider } from "react-dnd";
import { ProgrammingProvider } from "./ProgrammingContext";
import { ReactFlowProvider } from "reactflow";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function Environment({
  store,
  highlightColor,
  height,
  width,
  drawerWidth,
  snapToGrid,
  animateDrawer = true,
}) {
  return (
    <ProgrammingProvider store={store}>
      <StyleWrapper highlightColor={highlightColor}>
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
          <ReactFlowProvider>
            <div
              direction="row"
              style={{
                padding: 0,
                margin: 0,
                display: "flex",
                height,
                width,
              }}
            >
              <Contents
                drawerWidth={drawerWidth}
                highlightColor={highlightColor}
                snapToGrid={snapToGrid}
                animateDrawer={animateDrawer}
              />
            </div>
            <DragLayer highlightColor={highlightColor} />
          </ReactFlowProvider>
        </DndProvider>
      </StyleWrapper>
    </ProgrammingProvider>
  );
}

export function UnwrappedEnvironment({
  highlightColor,
  height,
  width,
  drawerWidth,
  snapToGrid,
  animateDrawer = true,
}) {
  return null;
}

export function StyleWrapper({
  highlightColor,
  children,
  muiThemeOverride = null,
  grommetThemeOverride = null,
}) {
  // const theme = grommetThemeOverride ? grommetThemeOverride : getTheme(highlightColor);
  const muiTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: highlightColor,
      },
      quiet: {
        main: "#444",
        dark: "#3a3a3a",
        darker: "#333",
      },
      mid: {
        main: "#999",
        dark: "#777",
        darker: "#555",
      },
      vibrant: {
        main: "#fff",
        dark: "#ddd",
        darker: "#bbb",
      },
    },
  });

  return (
    
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
  );
}
