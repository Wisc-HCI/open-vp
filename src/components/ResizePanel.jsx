import React from "react";
import { useReactFlow, useViewport, Panel } from "reactflow";
import { FiMaximize, FiMinus, FiPlus } from "react-icons/fi";
import {
  FancyStack,
  FancyVerticalSlider,
  TooltippedToolbarButton,
} from "./Block/Utility";

export default function ResizePanel() {
  const { zoom } = useViewport();
  const { fitView, zoomIn, zoomOut, setViewport } = useReactFlow();

  return (
    <Panel position="bottom-left">
      <FancyStack direction="column" gap={1} alignItems="center">
        <TooltippedToolbarButton
          title="Zoom In"
          disabled={zoom >= 1}
          size="small"
          onClick={zoomIn}
          placement="right"
        >
          <FiPlus />
        </TooltippedToolbarButton>
        <FancyVerticalSlider
          value={zoom}
          sx={{ height: 100 }}
          min={0.25}
          max={1}
          step={0.05}
          onChange={(e) => setViewport({ zoom: e.target.value })}
        />
        <TooltippedToolbarButton
          title="Zoom Out"
          disabled={zoom <= 0.25}
          size="small"
          onClick={zoomOut}
          placement="right"
        >
          <FiMinus />
        </TooltippedToolbarButton>
        <TooltippedToolbarButton
          title="Fit View"
          size="small"
          onClick={fitView}
          placement="right"
        >
          <FiMaximize />
        </TooltippedToolbarButton>
        {/* <FancyIconButton size='small' onClick={() => setLocked(!locked)}>{locked ? <FiLock /> : <FiUnlock />}</FancyIconButton> */}
      </FancyStack>
    </Panel>
  );
}
