import React from "react";
import { Contents } from "./Contents";
import { DragLayer } from "./DragLayer";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { MultiBackend } from "react-dnd-multi-backend";
import { DndProvider } from "react-dnd";
import { ReactFlowProvider } from "reactflow";
import { Theme, ThemeProvider, createTheme } from "@mui/material/styles";
import { ProgrammingStore, ProgrammingProvider, DrawerSpec, TypeSpec } from "@people_and_robots/open-core";
// import { ParentSize } from "@visx/responsive";
import useMeasure from "react-use-measure";

export interface EnvironmentProps {
  store?: ProgrammingStore,
  muiTheme?: Theme,
  drawerWidth?: number,
  snapToGrid?: boolean,
  animateDrawer?: boolean,
  drawers?: DrawerSpec[],
  types?: {[key: string]: TypeSpec},
}
export function Environment({
  store,
  muiTheme = createTheme(),
  drawerWidth = 235,
  snapToGrid = false,
  animateDrawer = true,
  drawers = [],
  types = {},
}: EnvironmentProps) {
  const [ref, bounds] = useMeasure();
  return (
    <ProgrammingProvider store={store} drawers={drawers} types={types}>
      <ThemeProvider theme={muiTheme}>
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
          <ReactFlowProvider>
            <div
              ref={ref}
              style={{
                padding: 0,
                margin: 0,
                display: "flex",
                height: "inherit",
                width: "inherit",
              }}
            >
              <Contents
                drawerWidth={drawerWidth}
                snapToGrid={snapToGrid}
                animateDrawer={animateDrawer}
                bounds={bounds}
              />
            </div>
            <DragLayer bounds={bounds}/>
          </ReactFlowProvider>
        </DndProvider>
      </ThemeProvider>
    </ProgrammingProvider>
  );
}