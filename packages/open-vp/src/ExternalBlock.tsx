import { useCallback } from "react";
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
  RegionInfo,
  PropertyType,
  ProgrammingStateStructures,
} from "@people_and_robots/open-core";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { MultiBackend } from "react-dnd-multi-backend";
import { DndProvider } from "react-dnd";

interface InnerExternalBlockProps {
  data: BlockData;
  style?: React.CSSProperties;
  context?: string[];
}
const InnerExternalBlock = (props: InnerExternalBlockProps) => {
  const [data, typeSpec, progress] = useProgrammingStore(
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

  const updateItemSelected = useProgrammingStore((state) => state.updateItemSelected);

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
    <VisualBlock
      {...props}
      {...otherProps}
      regionInfo={regionInfo}
      data={data}
      typeSpec={typeSpec}
      context={props.context}
      progress={progress}
    />
  );
};

export interface ExternalBlockProps {
  store?: ProgrammingStore;
  muiTheme?: Theme;
  data: BlockData;
  context?: string[];
  initial?: Partial<ProgrammingStateStructures>;
  style?: React.CSSProperties;
}
export const ExternalBlock = ({
  store,
  muiTheme,
  data,
  style = {},
  initial,
  context,
}: ExternalBlockProps) => {
  const getInner = () => (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <InnerExternalBlock data={data} style={style} context={context} />
    </DndProvider>
  );

  if (muiTheme) {
    return (
      <ProgrammingProvider store={store} initial={initial}>
        <ThemeProvider theme={muiTheme}>{getInner()}</ThemeProvider>
      </ProgrammingProvider>
    );
  }
  return (
    <ProgrammingProvider store={store} initial={initial}>
      {getInner()}
    </ProgrammingProvider>
  );
};
