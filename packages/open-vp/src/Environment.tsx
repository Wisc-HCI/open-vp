import { Contents } from "./Contents";
import { DragLayer } from "./DragLayer";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { MultiBackend } from "react-dnd-multi-backend";
import { DndProvider } from "react-dnd";
import { ProOptions, ReactFlowProvider } from "reactflow";
import { Theme, ThemeProvider } from "@mui/material/styles";
import {
  ProgrammingStore,
  ProgrammingProvider,
  ProgrammingStateStructures,
} from "@people_and_robots/open-core";
import useMeasure from "react-use-measure";

export interface EnvironmentProps {
  store?: ProgrammingStore;
  muiTheme?: Theme;
  drawerWidth?: number;
  snapToGrid?: boolean;
  animateDrawer?: boolean;
  initial?: Partial<ProgrammingStateStructures>;
  reactflowProOptions?: ProOptions;
}
export function Environment({
  store,
  muiTheme,
  drawerWidth = 235,
  snapToGrid = false,
  animateDrawer = true,
  initial,
  reactflowProOptions,
}: EnvironmentProps) {
  const [ref, bounds] = useMeasure();

  const getInner = () => (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <ReactFlowProvider>
        <div
          ref={ref}
          style={{
            userSelect: "none",
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
            reactflowProOptions={reactflowProOptions}
          />
        </div>
        <DragLayer bounds={bounds} />
      </ReactFlowProvider>
    </DndProvider>
  );

  if (muiTheme) {
    return (
      <ProgrammingProvider store={store} initial={initial}>
        <ThemeProvider theme={muiTheme}>{getInner()}</ThemeProvider>
      </ProgrammingProvider>
    );
  } else {
    return (
      <ProgrammingProvider store={store} initial={initial}>
        {getInner()}
      </ProgrammingProvider>
    );
  }
}
