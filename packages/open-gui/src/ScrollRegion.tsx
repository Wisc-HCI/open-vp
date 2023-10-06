import React from "react";
import styled from "@emotion/styled";
import * as ScrollArea from "@radix-ui/react-scroll-area";

enum SCROLLBAR_SIZES {
  "small" = 8 as number,
  "sm" = 8 as number,
  "medium" = 12 as number,
  "md" = 12 as number,
  "large" = 16 as number,
  "lg" = 16 as number,
}

type Size = keyof typeof SCROLLBAR_SIZES;

const StyledScrollArea = styled(ScrollArea.Root)(
  { overflow: "hidden" },
  (props: { height: number | string, width: number | string }) => (
    {
      height: props.height,
      width: props.width
    }
  )
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

const VerticalScrollBar = styled(StyledScrollbar)({}, ({ scrollbarSize }: { scrollbarSize: Size }) => ({ width: SCROLLBAR_SIZES[scrollbarSize] }));

const HorizontalScrollBar = styled(StyledScrollbar)({
  flexDirection: "column",
}, ({ scrollbarSize }: { scrollbarSize: Size }) => ({ height: SCROLLBAR_SIZES[scrollbarSize] }));

const StyledScrollThumb = styled(ScrollArea.Thumb)({
  flex: 1,
  background: "#eeeeee66",
}, ({ scrollbarSize }: { scrollbarSize: Size }) => ({
  borderRadius: SCROLLBAR_SIZES[scrollbarSize]
}));

export interface ScrollRegionProps {
  children: React.ReactNode;
  horizontal: boolean;
  vertical: boolean;
  height: number | string;
  width: number | string;
  scrollbarSize?: Size
}

export const ScrollRegion = ({
  children,
  horizontal = false,
  vertical = true,
  height = "100%",
  width = "100%",
  scrollbarSize = "medium"
}: ScrollRegionProps) => (
  <StyledScrollArea
    height={height}
    width={width}
    onDrag={(e) => e.stopPropagation()}
  >
    <StyledViewport>{children}</StyledViewport>
    {horizontal && (
      <HorizontalScrollBar orientation="horizontal" scrollbarSize={scrollbarSize}>
        <StyledScrollThumb scrollbarSize={scrollbarSize} />
      </HorizontalScrollBar>
    )}
    {vertical && (
      <VerticalScrollBar orientation="vertical" scrollbarSize={scrollbarSize}>
        <StyledScrollThumb scrollbarSize={scrollbarSize} />
      </VerticalScrollBar>
    )}
    <ScrollArea.Corner />
  </StyledScrollArea>
);
