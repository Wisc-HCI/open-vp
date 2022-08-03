import React, { useCallback } from "react";
import { Grommet } from "grommet";
import { VisualBlock } from "./VisualBlock";
import {
  ProgrammingProvider,
  useProgrammingStore,
} from "../ProgrammingContext";
import { getTheme } from "../theme";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { MultiBackend } from "react-dnd-multi-backend";
import { DndProvider } from "react-dnd";
import { combinedBlockData } from "../Generators";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { stringEquality } from "./Utility";
import { StyleWrapper } from "../Environment";

const InnerExternalBlock = (props) => {
  const [data, typeSpec] = useProgrammingStore(
    useCallback(
      (state) => combinedBlockData(state, props.data, null),
      [props.data]
    ),
    stringEquality
  );

  const otherProps = {
    x: 0,
    z: 0,
    scale: 1,
    onCanvas: false,
    interactionDisabled: true,
    bounded: true,
    fieldInfo: "outside",
    parentId: "outside",
  };

  return (
    <VisualBlock {...props} {...otherProps} data={data} typeSpec={typeSpec} />
  );
};

export const UnwrappedExternalBlock = ({
  highlightColor,
  data,
  style,
  context,
}) => {
  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <InnerExternalBlock
        highlightColor={highlightColor}
        data={data}
        style={{ ...style }}
        context={context}
      />
    </DndProvider>
  );
};

export const ExternalBlock = ({
  store,
  highlightColor,
  data,
  style,
  context,
}) => {

  return (
    <StyleWrapper highlightColor={highlightColor}>
      <ProgrammingProvider store={store}>
        <UnwrappedExternalBlock
          highlightColor={highlightColor}
          data={data}
          style={{ ...style }}
          context={context}
        />
      </ProgrammingProvider>
    </StyleWrapper>
  );
};
