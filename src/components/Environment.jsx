import React from "react";
// import { Canvas } from "./Canvas";
import { Contents } from "./Contents";
import { DragLayer } from "./DragLayer";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { MultiBackend } from "react-dnd-multi-backend";
import { DndProvider } from "react-dnd";
import { ProgrammingProvider } from "./ProgrammingContext";
import { Grommet, Box } from "grommet";
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
  animateDrawer = true,
}) {

  return (
    <StyleWrapper highlightColor={highlightColor}>
        <ProgrammingProvider store={store}>
          <UnwrappedEnvironment height={height} width={width} drawerWidth={drawerWidth} snapToGrid={snapToGrid} animateDrawer={animateDrawer}/>
        </ProgrammingProvider>
    </StyleWrapper>
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
  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <ReactFlowProvider>
        <Box
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
        </Box>
        <DragLayer highlightColor={highlightColor} />
      </ReactFlowProvider>
    </DndProvider>
  );
}

export function StyleWrapper({ highlightColor, children }) {
  const theme = getTheme(highlightColor);
  const muiTheme = createTheme({
    palette: {
      mode: "dark",
      highlightColor: {
        main: highlightColor,
      },
      quiet: {
        main: "#444",
        darker: "#333",
      },
      vibrant: {
        main: "#fff",
        darker: "#ddd",
      },
    },
  });

  return (
    <Grommet theme={theme}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </Grommet>
  );
}
