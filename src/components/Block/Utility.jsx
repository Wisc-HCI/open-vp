import React, { useState, useEffect } from "react";
import { styled, keyframes } from "@stitches/react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { times, divide, plus } from "number-precision";
import { round, isNumber, isNaN } from "lodash";
import "./Utility.css";

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const StyledScrollArea = styled(ScrollArea.Root, {
  overflow: "hidden",
});

const StyledViewport = styled(ScrollArea.Viewport, {
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
  padding: "4pt",
});

const StyledScrollbar = styled(ScrollArea.Scrollbar, {
  display: "flex",
  // ensures no selection
  userSelect: "none",
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: "none",
  padding: 2,
  background: "#55555525",
  transition: "background 160ms ease-out",
  "&:hover": { background: "#45454540" },
  '&[data-orientation="vertical"]': { width: 8 },
  '&[data-orientation="horizontal"]': {
    flexDirection: "column",
    height: 8,
  },
});

const StyledScrollThumb = styled(ScrollArea.Thumb, {
  flex: 1,
  background: "#eeeeee66",
  borderRadius: 8,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  // position: "relative",
  // "&::before": {
  //   content: '""',
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: "100%",
  //   height: "100%",
  //   minWidth: 44,
  //   minHeight: 44
  // }
});

export const OtherStyledSeparator = styled(SeparatorPrimitive.Root, {
  backgroundColor: "#efefef",
  "&[data-orientation=horizontal]": { height: 1, width: "100%" },
  "&[data-orientation=vertical]": { height: "100%", width: 1 },
});

const contentStyle = {
  fontFamily: "Helvetica",
  minWidth: 100,
  backgroundColor: "#303030f5",
  color: "#efefef",
  borderRadius: 6,
  padding: 5,
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    animationFillMode: "forwards",
    willChange: "transform, opacity",
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
};

const StyledDropdownContent = styled(
  DropdownMenuPrimitive.Content,
  contentStyle
);
const StyledContextContent = styled(ContextMenuPrimitive.Content, contentStyle);
const StyledTooltipContent = styled(TooltipPrimitive.Content, contentStyle);

const itemStyles = {
  all: "unset",
  fontSize: 13,
  lineHeight: 1,
  color: "#efefef",
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  height: 25,
  padding: "0 5px",
  position: "relative",
  paddingLeft: 25,
  userSelect: "none",

  "&[data-disabled]": {
    color: "#dedede",
    pointerEvents: "none",
  },

  "&:focus": {
    backgroundColor: "#efefef",
    color: "cyan",
  },
};

const StyledDropdownItem = styled(DropdownMenuPrimitive.Item, {
  ...itemStyles,
});
const StyledDropdownCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem, {
  ...itemStyles,
});
const StyledDropdownRadioItem = styled(DropdownMenuPrimitive.RadioItem, {
  ...itemStyles,
});
const StyledDropdownTriggerItem = styled(DropdownMenuPrimitive.TriggerItem, {
  '&[data-state="open"]': {
    backgroundColor: "#efefef",
    color: "cyan",
  },
  ...itemStyles,
});

const StyledContextItem = styled(ContextMenuPrimitive.Item, { ...itemStyles });
const StyledContextCheckboxItem = styled(ContextMenuPrimitive.CheckboxItem, {
  ...itemStyles,
});
const StyledContextRadioItem = styled(ContextMenuPrimitive.RadioItem, {
  ...itemStyles,
});
const StyledContextTriggerItem = styled(ContextMenuPrimitive.TriggerItem, {
  '&[data-state="open"]': {
    backgroundColor: "#efefef",
    color: "cyan",
  },
  ...itemStyles,
});

const HoverDropdownItem = ({ highlightColor, ...other }) => (
  <StyledDropdownItem
    css={{ "&:focus": { color: "#efefef", backgroundColor: highlightColor } }}
    {...other}
  />
);
const HoverDropdownCheckboxItem = ({ highlightColor, ...other }) => (
  <StyledDropdownCheckboxItem
    css={{ "&:focus": { color: "#efefef", backgroundColor: highlightColor } }}
    {...other}
  />
);
const HoverDropdownRadioItem = ({ highlightColor, ...other }) => (
  <StyledDropdownRadioItem
    css={{ "&:focus": { color: "#efefef", backgroundColor: highlightColor } }}
    {...other}
  />
);
const HoverDropdownTriggerItem = ({ highlightColor, ...other }) => (
  <StyledDropdownTriggerItem
    css={{
      '&[data-state="open"]': { color: highlightColor },
      "&:focus": { color: "#efefef", backgroundColor: highlightColor },
    }}
    {...other}
  />
);

const HoverContextItem = ({ highlightColor, ...other }) => (
  <StyledContextItem
    css={{ "&:focus": { color: "#efefef", backgroundColor: highlightColor } }}
    {...other}
  />
);
const HoverContextCheckboxItem = ({ highlightColor, ...other }) => (
  <StyledContextCheckboxItem
    css={{ "&:focus": { color: "#efefef", backgroundColor: highlightColor } }}
    {...other}
  />
);
const HoverContextRadioItem = ({ highlightColor, ...other }) => (
  <StyledContextRadioItem
    css={{ "&:focus": { color: "#efefef", backgroundColor: highlightColor } }}
    {...other}
  />
);
const HoverContextTriggerItem = ({ highlightColor, ...other }) => (
  <StyledContextTriggerItem
    css={{
      '&[data-state="open"]': { color: highlightColor },
      "&:focus": { color: "#efefef", backgroundColor: highlightColor },
    }}
    {...other}
  />
);

const labelStyle = {
  paddingLeft: 25,
  fontSize: 12,
  lineHeight: "25px",
  color: "#a0a0a0",
};

const separatorStyle = {
  height: 1,
  backgroundColor: "#efefef",
  margin: 5,
};

const itemIndicatorStyle = {
  position: "absolute",
  left: 0,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const StyledDropdownLabel = styled(DropdownMenuPrimitive.Label, labelStyle);
const StyledContextLabel = styled(ContextMenuPrimitive.Label, labelStyle);

const StyledDropdownSeparator = styled(
  DropdownMenuPrimitive.Separator,
  separatorStyle
);
const StyledContextSeparator = styled(
  ContextMenuPrimitive.Separator,
  separatorStyle
);

const StyledDropdownItemIndicator = styled(
  DropdownMenuPrimitive.ItemIndicator,
  itemIndicatorStyle
);
const StyledContextItemIndicator = styled(
  ContextMenuPrimitive.ItemIndicator,
  itemIndicatorStyle
);

const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

export const RightSlot = styled("div", {
  marginLeft: "auto",
  paddingLeft: 20,
  color: "#efefef",
  ":focus > &": { color: "white" },
  "[data-disabled] &": { color: "#efefef" },
});

const StyledSwitch = styled(SwitchPrimitive.Root, {
  all: "unset",
  width: 42,
  height: 25,
  backgroundColor: "#111111",
  borderRadius: "9999px",
  position: "relative",
  boxShadow: "inset 0.5pt 0.5pt 0pt 0pt rgba(55,55,55,0.25)",
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  // '&:focus': { boxShadow: `0 0 0 2px black` },
  '&[data-state="checked"]': { backgroundColor: "black" },
});

const StyledThumb = styled(SwitchPrimitive.Thumb, {
  display: "block",
  width: 21,
  height: 21,
  backgroundColor: "white",
  borderRadius: "9999px",
  boxShadow: "0.5pt 0.5pt 0pt 0pt rgba(55,55,55,0.25)",
  transition: "transform 100ms",
  transform: "translateX(2px)",
  willChange: "transform",
  '&[data-state="checked"]': { transform: "translateX(19px)" },
});

// Exports
const SwitchWrapper = ({ highlightColor, disabled, ...other }) => (
  <StyledSwitch
    disabled={disabled}
    css={{
      opacity: disabled ? 0.7 : 1,
      '&[data-state="checked"]': { backgroundColor: highlightColor },
    }}
    {...other}
  />
);
const SwitchThumb = StyledThumb;
const Label = styled(LabelPrimitive.Root, {
  fontSize: 15,
  fontWeight: 500,
  color: "white",
  userSelect: "none",
});

const StyledArrow = styled(TooltipPrimitive.Arrow, {
  fill: "#303030f5",
});

const StyledSlider = styled(SliderPrimitive.Root, {
  position: "relative",
  display: "flex",
  alignItems: "center",
  userSelect: "none",
  touchAction: "none",
  width: "100%",

  '&[data-orientation="horizontal"]': {
    height: 20,
  },

  '&[data-orientation="vertical"]': {
    flexDirection: "column",
    width: 20,
    height: 100,
  },
});

const StyledTrack = styled(SliderPrimitive.Track, {
  backgroundColor: "hsla(0, 0%, 0%, 0.478)",
  position: "relative",
  flexGrow: 1,
  borderRadius: "9999px",

  '&[data-orientation="horizontal"]': { height: 3 },
  '&[data-orientation="vertical"]': { width: 3 },
});

const StyledRange = styled(SliderPrimitive.Range, {
  position: "absolute",
  backgroundColor: "white",
  borderRadius: "9999px",
  height: "100%",
});

const StyledSliderThumb = styled(SliderPrimitive.Thumb, {
  all: "unset",
  display: "block",
  padding: 2,
  minWidth: 20,
  height: 20,
  fontSize: 15,
  alignContent: "center",
  alignItems: "center",
  textAlign: "center",
  backgroundColor: "white",
  boxShadow: `0 2px 10px hsla(0, 0%, 0%, 0.141)`,
  borderRadius: 20,
  "&:hover": { backgroundColor: "#f0f0f0" },
  "&:focus": { boxShadow: `0 0 0 5px hsla(0, 0%, 0%, 0.220)` },
});

export const Slider = ({
  value,
  onChange,
  label,
  min = 0,
  max = 10,
  step = 1,
  units,
  visualScaling = 1,
  visualPrecision = 1,
  disabled,
}) => {
  const visualValue = round(value * visualScaling, visualPrecision);
  const labelText =
    label && units
      ? `${label}: ${visualValue} ${units}`
      : label
      ? `${label}: ${visualValue}`
      : units
      ? `${visualValue} ${units}`
      : `${visualValue}`;

  return (
    <ToolTip
      hideArrow
      content={
        <div key="label" style={{ textAlign: "center" }}>
          {labelText}
        </div>
      }
    >
      <StyledSlider
        disabled={disabled}
        value={[value * visualScaling]}
        min={min * visualScaling}
        max={max * visualScaling}
        step={step * visualScaling}
        aria-label={label}
        onValueChange={(v) => onChange(v[0] / visualScaling)}
      >
        <StyledTrack>
          <StyledRange />
        </StyledTrack>

        <StyledSliderThumb />
      </StyledSlider>
    </ToolTip>
  );
};

export const Switch = ({
  onCheckedChange,
  disabled,
  value,
  highlightColor,
  label,
}) => {
  return (
    <>
      <Label htmlFor={`switch-${label}`} css={{ paddingRight: 5 }}>
        {label}
      </Label>
      <SwitchWrapper
        id={`switch-${label}`}
        checked={value}
        disabled={disabled}
        highlightColor={highlightColor}
        onCheckedChange={onCheckedChange}
      >
        <SwitchThumb />
      </SwitchWrapper>
    </>
  );
};

export const ToolTip = ({ children, content, hideArrow }) => {
  return (
    <Tooltip>
      <TooltipTrigger key="trigger" asChild>
        {children}
      </TooltipTrigger>
      <StyledTooltipContent key="content" sideOffset={hideArrow ? 10 : 5}>
        {content}
        {!hideArrow && <StyledArrow key="arrow" />}
      </StyledTooltipContent>
    </Tooltip>
  );
};

export const Input = styled("input", {
  borderWidth: 0,
  outline: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 10px",
  height: 35,
  fontSize: 15,
  lineHeight: 1,
  color: "white",
  backgroundColor: "#22222299",
  boxShadow: `0 0 0 1px #222222`,
  "&:focus": { boxShadow: `0 0 0 2px #222222` },
});

const VALID_CHARS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  "-",
];

const BasicInput = styled("input", {
  // Disabling this fixes functionality, but breaks styling
  borderWidth: 0,
  width: 40,
  outline: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 0,
  padding: "0 5px",
  height: 35,
  fontSize: 15,
  lineHeight: 1,
  color: "white",
  backgroundColor: "transparent",
  // boxShadow: `0 0 0 1px #222222`,
  // "&:focus": { boxShadow: `0 0 0 2px #222222` }
});

const InputContainer = styled("div", {
  padding: "0 5px 0 10px",
  color: "white",
  borderRadius: 4,
  display: "inline-flex",
  alignItems: "center",
  alignContent: "center",
  justifyContent: "center",
  backgroundColor: "#22222299",
  verticalAlign: "center",
  boxShadow: `0 0 0 1px #222222`,
  "&:focus": { boxShadow: `0 0 0 2px #222222` },
});

const SpinnerButton = styled("button", {
  all: "unset",
  display: "flex",
  flexDirection: "column",
  padding: 2,
  margin: 0,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  // fontSize: 14,
  lineHeight: 1,
  height: 10,
  // backgroundColor: "blue"
  "&:focus": { backgroundColor: `#222222` },
  "&:hover": { backgroundColor: `#222222` },
});

const Spinner = ({ onClickUp, onClickDown, disabled }) => {
  return (
    <div
      style={{
        marginLeft: 3,
        display: "inline-flex",
        flexDirection: "column",
        borderRadius: 3,
        backgroundColor: "#22222299",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SpinnerButton
        disabled={disabled}
        onClick={onClickUp}
        css={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
      >
        <FiChevronUp />
      </SpinnerButton>
      <SpinnerButton
        disabled={disabled}
        onClick={onClickDown}
        css={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
      >
        <FiChevronDown />
      </SpinnerButton>
    </div>
  );
};

const InnerInputField = styled("div", {
  display: "inline-flex",
});

export const NumberInput = ({
  prefix = "",
  suffix = "",
  style = {},
  innerStyle = {},
  step = 1,
  onChange,
  min,
  max,
  value,
  visualScaling = 1,
  disabled = false,
  ...otherProps
}) => {
  const setNewFromButton = (change) => {
    const numericNew = plus(value, divide(change, visualScaling));
    const scaledMax = divide(max, visualScaling);
    const scaledMin = divide(min, visualScaling);
    console.log({
      change,
      value,
      visualScaling,
      numericNew,
      scaledMax,
      scaledMin,
    });
    if (numericNew > scaledMax) {
      setAbove(true);
      setBelow(false);
      onChange(scaledMax);
    } else if (numericNew < scaledMin) {
      setAbove(false);
      setBelow(true);
      onChange(scaledMin);
    } else {
      setAbove(false);
      setBelow(false);
      onChange(numericNew);
    }
  };

  const setNewFromInput = (event) => {
    console.log(event);
    if (event?.nativeEvent?.data) {
      if (!VALID_CHARS.includes(event.nativeEvent.data)) {
        return;
      }
    }

    if (event.target.value === "-") {
      onChange(0);
      setStoredValue("-");
      return;
    }

    const numericNew = Number(event.target.value);
    if (!isNumber(numericNew) || isNaN(numericNew)) {
      return;
    }

    if (numericNew > max) {
      setAbove(true);
      setBelow(false);
      onChange(max / visualScaling);
    } else if (numericNew < min) {
      setAbove(false);
      setBelow(true);
      onChange(min / visualScaling);
    } else {
      setAbove(false);
      setBelow(false);
      onChange(numericNew / visualScaling);
      setStoredValue(event.target.value);
    }
    return;
  };

  const [above, setAbove] = useState(false);
  const [below, setBelow] = useState(false);
  const valid = !above && !below;
  const [storedValue, setStoredValue] = useState(0);

  useEffect(() => {
    if (
      storedValue !== "-" &&
      storedValue !== "" &&
      value * visualScaling !== Number(storedValue)
    ) {
      setStoredValue(times(value, visualScaling));
    }
  }, [storedValue, value, visualScaling]);

  return (
    <InputContainer
      {...otherProps}
      css={{ ...style, backgroundColor: valid ? null : "red" }}
    >
      <InnerInputField className="nodrag">{prefix}</InnerInputField>
      <BasicInput
        type="text"
        className="nodrag"
        // min={min * visualScaling}
        // max={max}
        // step={step * visualScaling}
        value={storedValue}
        onChange={setNewFromInput}
        css={innerStyle}
        disabled={disabled}
      />

      <InnerInputField className="nodrag">{suffix}</InnerInputField>
      <InnerInputField className="nodrag" css={{ marginLeft: 2 }}>
        <Spinner
          disabled={disabled}
          onClickDown={(e) => setNewFromButton(-1 * step)}
          onClickUp={(e) => setNewFromButton(step)}
        />
      </InnerInputField>
    </InputContainer>
  );
};

export const ScrollRegion = ({
  children,
  horizontal,
  vertical,
  height,
  width,
}) => (
  <StyledScrollArea css={{ height, width }}>
    <StyledViewport>{children}</StyledViewport>
    {horizontal && (
      <StyledScrollbar orientation="horizontal">
        <StyledScrollThumb />
      </StyledScrollbar>
    )}
    {vertical && (
      <StyledScrollbar orientation="vertical">
        <StyledScrollThumb />
      </StyledScrollbar>
    )}
    <ScrollArea.Corner />
  </StyledScrollArea>
);

// Exports
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = StyledDropdownContent;
export const DropdownMenuItem = HoverDropdownItem;
export const DropdownMenuCheckboxItem = HoverDropdownCheckboxItem;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuRadioItem = HoverDropdownRadioItem;
export const DropdownMenuItemIndicator = StyledDropdownItemIndicator;
export const DropdownMenuTriggerItem = HoverDropdownTriggerItem;
export const DropdownMenuLabel = StyledDropdownLabel;
export const DropdownMenuSeparator = StyledDropdownSeparator;

export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export const ContextMenuContent = StyledContextContent;
export const ContextMenuItem = HoverContextItem;
export const ContextMenuCheckboxItem = HoverContextCheckboxItem;
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;
export const ContextMenuRadioItem = HoverContextRadioItem;
export const ContextMenuItemIndicator = StyledContextItemIndicator;
export const ContextMenuTriggerItem = HoverContextTriggerItem;
export const ContextMenuLabel = StyledContextLabel;
export const ContextMenuSeparator = StyledContextSeparator;
