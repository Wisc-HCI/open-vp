import React, { useCallback } from "react";
import { ThemeProvider, createTheme, Theme } from "@mui/material";
import { VisualBlock } from "@people_and_robots/open-blocks";
import {
  OUTSIDE,
  ProgrammingStore,
  ProgrammingState,
  combinedBlockData,
  useProgrammingStore,
  ProgrammingProvider,
  BlockData,
  TypeSpec,
  RegionInfo,
  PropertyType,
} from "@people_and_robots/open-core";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { MultiBackend } from "react-dnd-multi-backend";
import { DndProvider } from "react-dnd";

interface InnerExternalBlockProps {
    data: BlockData;
    style?: React.CSSProperties;
    context?: string[];
}
const InnerExternalBlock = (props:InnerExternalBlockProps) => {
  const [data, typeSpec] = useProgrammingStore(
    useCallback(
      (state: ProgrammingState) =>
        combinedBlockData(
          state.programData,
          state.executionData,
          state.programSpec.objectTypes,
          props.data
        ),
      [props.data]
    )
  );

  const otherProps = {
    x: 0,
    z: 0,
    scale: 1,
    onCanvas: false,
    interactionDisabled: true,
    bounded: true,
    fieldInfo: OUTSIDE,
    parentId: OUTSIDE,
  };

  const regionInfo: RegionInfo = {
    parentId: OUTSIDE,
    fieldInfo: {
      id: "PREVIEW",
      name: "PREVIEW",
      accepts: [data.type],
      default: null,
      isList: false,
      fullWidth: false,
      type: PropertyType.Block,
    },
  };
  
  return (
    <VisualBlock {...props} {...otherProps} regionInfo={regionInfo} data={data} typeSpec={typeSpec} context={props.context}/>
  );
};

export interface ExternalBlockProps {
  store?: ProgrammingStore;
  muiTheme?: Theme;
  data: BlockData;
  context?: string[];
  types?: { [key: string]: TypeSpec };
  style?: React.CSSProperties;
}
export const ExternalBlock = ({
  store,
  muiTheme = createTheme(),
  data,
  style = {},
  types = {},
  context,
}: ExternalBlockProps) => {
  return (
    <ProgrammingProvider store={store} drawers={[]} types={types}>
      <ThemeProvider theme={muiTheme}>
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
          <InnerExternalBlock data={data} style={style} context={context} />
        </DndProvider>
      </ThemeProvider>
    </ProgrammingProvider>
  );
};
