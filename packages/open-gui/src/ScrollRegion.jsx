import React from "react";
import styled from "@emotion/styled";
import * as ScrollArea from "@radix-ui/react-scroll-area";

const StyledScrollArea = styled(ScrollArea.Root)(
  { overflow: "hidden" },
  (props) => ({ height: props.height, width: props.width })
);

const StyledViewport = styled(ScrollArea.Viewport)({
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
});

const StyledScrollbar = styled(ScrollArea.Scrollbar)({
  display: "flex",
  userSelect: "none",
  touchAction: "none",
  padding: "2px",
  background: "#55555525",
  transition: "background 160ms ease",
  "&:hover": { background: "#45454540" },
});

const VerticalScrollBar = styled(StyledScrollbar)({ width: "8px" });

const HorizontalScrollBar = styled(StyledScrollbar)({
  height: "8px",
  flexDirection: "column",
});

const StyledScrollThumb = styled(ScrollArea.Thumb)({
  flex: 1,
  background: "#eeeeee66",
  borderRadius: "8px",
});

export const ScrollRegion = ({
  children,
  horizontal = false,
  vertical = true,
  height = "100%",
  width = "100%",
}) => (
  <StyledScrollArea
    height={height}
    width={width}
    onDrag={(e) => e.stopPropagation()}
  >
    <StyledViewport>{children}</StyledViewport>
    {horizontal && (
      <HorizontalScrollBar orientation="horizontal">
        <StyledScrollThumb />
      </HorizontalScrollBar>
    )}
    {vertical && (
      <VerticalScrollBar orientation="vertical">
        <StyledScrollThumb />
      </VerticalScrollBar>
    )}
    <ScrollArea.Corner />
  </StyledScrollArea>
);
