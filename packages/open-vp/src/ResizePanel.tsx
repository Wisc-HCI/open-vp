import React from "react";
import { useReactFlow, useViewport, Panel } from "reactflow";
import { FiMaximize, FiMinus, FiPlus } from "react-icons/fi";
import {
  VerticalSlider,
  ActionIconButton,
} from "@people_and_robots/open-gui";
import { Stack, styled } from "@mui/material";

const StyledStack = styled(Stack)({
  
  WebkitBackdropFilter: "blur(15px)",
  backdropFilter: "blur(15px)",
  borderRadius: 5,
  padding: 5,
}, ({theme})=>({
  backgroundColor: theme.palette.mode === "dark" ? "rgba(200,200,200,0.05)" : "rgba(100,100,100,0.05)"
}))

export default function ResizePanel() {
  const { zoom, x, y } = useViewport();
  const { fitView, zoomIn, zoomOut, setViewport } = useReactFlow();

  return (
    <Panel position="bottom-left">
      <StyledStack direction="column" gap={1} alignItems="center">
        <ActionIconButton
          title="Zoom In"
          disabled={zoom >= 1}
          onClick={()=>zoomIn({duration:300})}
          placement="right"
        >
          <FiPlus />
        </ActionIconButton>
        <VerticalSlider
          // @ts-ignore
          value={zoom}
          sx={{ height: 100 }}
          min={0.25}
          max={1}
          step={0.05}
          onChange={(e:Event, value: number) => setViewport({ zoom: value, x, y }, {duration:200})}
        />
        <ActionIconButton
          title="Zoom Out"
          disabled={zoom <= 0.25}
          onClick={()=>zoomOut({duration:300})}
          placement="right"
        >
          <FiMinus />
        </ActionIconButton>
        <ActionIconButton
          title="Fit View"
          onClick={()=>fitView({duration:300})}
          placement="right"
        >
          <FiMaximize />
        </ActionIconButton>
        {/* <FancyIconButton size='small' onClick={() => setLocked(!locked)}>{locked ? <FiLock /> : <FiUnlock />}</FancyIconButton> */}
      </StyledStack>
    </Panel>
  );
}
