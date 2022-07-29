import React, { useState, useEffect, forwardRef } from "react";
// import { styled, keyframes } from "@stitches/react";
import styled from "styled-components";
// import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
// import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
// import * as SeparatorPrimitive from "@radix-ui/react-separator";
// import * as SwitchPrimitive from "@radix-ui/react-switch";
// import * as LabelPrimitive from "@radix-ui/react-label";
// import * as TooltipPrimitive from "@radix-ui/react-tooltip";
// import * as SliderPrimitive from "@radix-ui/react-slider";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { times, divide, plus } from "number-precision";
// import { debounce } from "lodash";
// import { NumberInput as MuiNumberInput } from "@mui-treasury/component-numberinput";
import InputAdornment from "@mui/material/InputAdornment";
import { isNumber, isNaN } from "lodash";
// import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import MenuList from "@mui/material/MenuList";
import Fade from "@mui/material/Fade";
import { TextField } from "@mui/material";
// import { TextField, InputAdornment } from "@mui/material";

export const stringEquality = (e1,e2) => JSON.stringify(e1) === JSON.stringify(e2)

export const DropdownTrigger = ({
  triggerComponent,
  triggerProps,
  isChild,
  children,
}) => {
  const Triggerer = triggerComponent;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Triggerer
        {...triggerProps}
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: isChild ? "right" : "left",
        }}
        transformOrigin={{
          vertical: isChild ? "center" : "top",
          horizontal: "left",
        }}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {/* <MenuList> */}
        {children}
        {/* </MenuList> */}
      </Menu>
    </div>
  );
};

// export const ContextTrigger = ({ triggerComponent, children }) => {
//   const [contextMenu, setContextMenu] = React.useState(null);

//   const handleContextMenu = (event) => {
//     event.preventDefault();
//     setContextMenu(
//       contextMenu === null
//         ? {
//             mouseX: event.clientX + 2,
//             mouseY: event.clientY - 6,
//           }
//         : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
//           // Other native context menus might behave different.
//           // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
//           null
//     );
//   };

//   const handleClose = () => {
//     setContextMenu(null);
//   };

//   return (
//     <div style={{ display: "flex" }} onContextMenu={handleContextMenu}>
//       {triggerComponent}
//       <Menu
//         open={contextMenu !== null}
//         onClose={handleClose}
//         anchorReference="anchorPosition"
//         anchorPosition={
//           contextMenu !== null
//             ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
//             : undefined
//         }
//       >
//         {children}
//       </Menu>
//     </div>
//   );
// };

// const slideUpAndFade = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(2px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0)
//   }
// `;

// const slideRightAndFade = keyframes`
//   from {
//     opacity: 0;
//     transform: translateX(-2px);
//   }
//   to {
//     opacity: 1;
//     transform: translateX(0)
//   }
// `;

// const slideDownAndFade = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(-2px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0)
//   }
// `;

// const slideLeftAndFade = keyframes`
//   from {
//     opacity: 0;
//     transform: translateX(2px);
//   }
//   to {
//     opacity: 1;
//     transform: translateX(0)
//   }
// `;

// const contentStyle = {
//   zIndex: 100,
//   position: "fixed",
//   display: "block",
//   fontFamily: "Helvetica",
//   minWidth: "120px",
//   backgroundColor: "#303030f5",
//   color: "#efefef",
//   borderRadius: "6px",
//   padding: "5px",
//   boxShadow:
//     "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
//   animationFillMode: "forwards",
//   willChange: "transform, opacity",
//   '&[data-state="open"]': {
//     '&[data-side="top"]': {
//       animation: css`
//         ${slideDownAndFade} 400ms cubic-bezier(0.16, 1, 0.3, 1)
//       `,
//     },
//     '&[data-side="right"]': {
//       animation: css`
//         ${slideLeftAndFade} 400ms cubic-bezier(0.16, 1, 0.3, 1)
//       `,
//     },
//     '&[data-side="bottom"]': {
//       animation: css`
//         ${slideUpAndFade} 400ms cubic-bezier(0.16, 1, 0.3, 1)
//       `,
//     },
//     '&[data-side="left"]': {
//       animation: css`
//         ${slideRightAndFade} 400ms cubic-bezier(0.16, 1, 0.3, 1)
//       `,
//     },
//   },
// };

// const itemStyle = (props) => ({
//   all: "unset",
//   fontSize: "12px",
//   lineHeight: 1,
//   color: "#efefef",
//   borderRadius: "3px",
//   display: "flex",
//   alignItems: "center",
//   // height: '25px',
//   padding: "0 5px",
//   position: "relative",
//   paddingLeft: "25px",
//   userSelect: "none",
//   "&[data-disabled]": {
//     color: "#dedede",
//     pointerEvents: "none",
//   },

//   '&[data-state="open"]': {
//     background: `${props.$highlightColor}77`,
//     color: "#efefef",
//   },

//   "&:focus": {
//     background: props.$highlightColor,
//     color: "#efefef",
//   },

//   "&:hover": {
//     background: props.$highlightColor,
//     color: "#efefef",
//   },
// });

const StyledScrollArea = styled(ScrollArea.Root)`
  overflow: hidden;
  height: ${(props) =>
    props.$containerHeight ? `${props.$containerHeight}px` : "100%"};
  width: ${(props) =>
    props.$containerWidth ? `${props.$containerWidth}px` : "100%"};
`;

const StyledViewport = styled(ScrollArea.Viewport)`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  padding: 4px;
`;

const StyledScrollbar = styled(ScrollArea.Scrollbar)`
  display: flex;
  user-select: none;
  touch-action: none;
  padding: 2px;
  background: #55555525;
  transition: background 160ms ease-out;
  &:hover: {
    background: #45454540;
  }
`;

const VerticalScrollBar = styled(StyledScrollbar)`
  width: 8px;
`;

const HorizontalScrollBar = styled(StyledScrollbar)`
  height: 8px;
  flex-direction: column;
`;

const StyledScrollThumb = styled(ScrollArea.Thumb)`
  flex: 1;
  background: #eeeeee66;
  border-radius: 8px;
`;

// export const OtherStyledSeparator = styled(SeparatorPrimitive.Root)(
//   (props) => ({
//     background: "#efefef",
//     backgroundColor: "#efefef",
//     height:
//       props.orientation === "horizontal"
//         ? "1px"
//         : props.$height
//         ? props.$height
//         : "100%",
//     width:
//       props.orientation === "vertical"
//         ? "1px"
//         : props.$width
//         ? props.$width
//         : "100%",
//   })
// );

// const StyledDropdownContent = styled(DropdownMenuPrimitive.Content)(
//   contentStyle
// );

// const StyledContextContent = styled(ContextMenuPrimitive.Content)(contentStyle);

// const StyledTooltipContent = styled(TooltipPrimitive.Content)(contentStyle);

// const HoverDropdownItem = styled(DropdownMenuPrimitive.Item)(itemStyle);

// const HoverDropdownCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem)(
//   itemStyle
// );

// const HoverDropdownRadioItem = styled(DropdownMenuPrimitive.RadioItem)(
//   itemStyle
// );

// const HoverDropdownTriggerItem = styled(DropdownMenuPrimitive.Trigger)(
//   itemStyle
// );

// const HoverContextItem = styled(ContextMenuPrimitive.Item)(itemStyle);

// const HoverContextCheckboxItem = styled(ContextMenuPrimitive.CheckboxItem)(
//   itemStyle
// );

// const HoverContextRadioItem = styled(ContextMenuPrimitive.RadioItem)(itemStyle);

// const HoverContextTriggerItem = styled(ContextMenuPrimitive.Trigger)(itemStyle);

// const StyledDropdownLabel = styled(DropdownMenuPrimitive.Label)`
//   padding-left: 25px;
//   font-size: 12px;
//   line-height: 25px;
//   color: #a0a0a0;
// `;

// const StyledContextLabel = styled(ContextMenuPrimitive.Label)`
//   padding-left: 25px;
//   font-size: 12px;
//   line-height: 25px;
//   color: #a0a0a0;
// `;

// const StyledDropdownSeparator = styled(DropdownMenuPrimitive.Separator)`
//   height: 1px;
//   background-color: #efefef;
//   margin: 5px;
// `;
// const StyledContextSeparator = styled(ContextMenuPrimitive.Separator)`
//   height: 1px;
//   background-color: #efefef;
//   margin: 5px;
// `;

// const StyledDropdownItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator)`
//   position: absolute;
//   left: 0px;
//   width: 25px;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
// `;
// const StyledContextItemIndicator = styled(ContextMenuPrimitive.ItemIndicator)`
//   position: absolute;
//   left: 0px;
//   width: 25px;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
// `;

// const Tooltip = TooltipPrimitive.Root;
// const TooltipTrigger = TooltipPrimitive.Trigger;

// export const RightSlot = styled.div`
//   margin-left: auto;
//   padding-left: 20px;
//   color: #efefef;
//   :focus > &: {
//     color: white;
//   }
//   [data-disabled] &: {
//     color: #efefef;
//   }
// `;

// const StyledSwitch = styled(SwitchPrimitive.Root)`
//   all: unset;
//   width: 42px;
//   height: 25px;
//   opacity: ${(props) => (props.disabled ? 0.7 : 1)};
//   background-color: ${(props) =>
//     props.checked ? props.$highlightColor : "#111111"};
//   border-radius: 9999px;
//   position: relative;
//   box-shadow: inset 0.5px 0.5px 0px 0px rgba(55, 55, 55, 0.25);
//   webkittaphighlightcolor: rgba(0, 0, 0, 0);
// `;

// const StyledThumb = styled(SwitchPrimitive.Thumb)`
//   display: block;
//   width: 21px;
//   height: 21px;
//   background-color: white;
//   border-radius: 9999px;
//   box-shadow: 0.5px 0.5px 0px 0px rgba(55, 55, 55, 0.25);
//   transition: transform 100ms;
//   transform: ${(props) =>
//     props.checked ? "translateX(19px)" : "translateX(2px)"};
//   will-change: transform;
// `;

// const SwitchThumb = StyledThumb;
// const Label = styled(LabelPrimitive.Root)`
//   font-size: 12px;
//   font-weight: 500px;
//   color: white;
//   user-select: none;
// `;

// const StyledArrow = styled(TooltipPrimitive.Arrow)`
//   fill: #303030f5;
// `;

// export const Switch = ({
//   onCheckedChange,
//   disabled,
//   value,
//   highlightColor,
//   label,
// }) => {
//   return (
//     <>
//       <Label htmlFor={`switch-${label}`} style={{ paddingRight: 5 }}>
//         {label}
//       </Label>
//       <StyledSwitch
//         id={`switch-${label}`}
//         checked={value}
//         disabled={disabled}
//         $highlightColor={highlightColor}
//         onCheckedChange={onCheckedChange}
//       >
//         <SwitchThumb checked={value} />
//       </StyledSwitch>
//     </>
//   );
// };

// export const ToolTip = ({ children, content, hideArrow }) => {
//   return (
//     <Tooltip>
//       <TooltipTrigger key="trigger" asChild>
//         {children}
//       </TooltipTrigger>
//       <StyledTooltipContent key="content" sideOffset={hideArrow ? 10 : 5}>
//         {content}
//         {!hideArrow && <StyledArrow key="arrow" />}
//       </StyledTooltipContent>
//     </Tooltip>
//   );
// };

// export const Input = styled.input`
//   border-width: 0;
//   outline: none;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 4px;
//   padding: 0 10px;
//   height: 35px;
//   font-size: 12px;
//   line-height: 1;
//   color: white;
//   background-color: #22222299;
//   box-shadow: 0 0 0 1px #222222;
//   &:focus: {
//     box-shadow: 0 0 0 2px #222222;
//   }
// `;

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

// const BasicInput = styled.input`
//   border-width: 0;
//   width: 40px;
//   outline: none;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 0px;
//   padding: 0 5px;
//   height: 35px;
//   font-size: 12px;
//   line-height: 1;
//   color: white;
//   background-color: transparent;
// `;

// const InputContainer = styled.div`
//   padding: 0 5px 0 10px;
//   color: white;
//   border-radius: 4px;
//   display: inline-flex;
//   align-items: center;
//   align-content: center;
//   justify-content: center;
//   background-color: #22222299;
//   vertical-align: center;
//   box-shadow: 0 0 0 1px #222222;
//   &:focus: {
//     box-shadow: 0 0 0 2px #222222;
//   }
// `;

const SpinnerButton = styled.button({
  all: "unset",
  display: "flex",
  flexDirection: "column",
  padding: "2px",
  margin: "0px",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "4px",
  lineHeight: 1,
  height: "10px",
  background: "#22222299",
  "&:focus": {
    background: "#222222",
  },
  "&:hover": {
    background: "#222222",
  },
  opacity: `${props=>props.disabled ? 0.5 : 1}`
});

const Spinner = ({ onClickUp, onClickDown, disabled, above, below }) => {
  return (
    <div
      style={{
        marginLeft: 3,
        display: "inline-flex",
        flexDirection: "column",
        borderRadius: 3,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SpinnerButton
        disabled={disabled || above}
        onClick={onClickUp}
        style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
      >
        <FiChevronUp />
      </SpinnerButton>
      <SpinnerButton
        disabled={disabled || below}
        onClick={onClickDown}
        style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
      >
        <FiChevronDown />
      </SpinnerButton>
    </div>
  );
};

// const InnerInputField = styled.div`
//   display: inline-flex;
//   font-size: 12px;
// `;

export const NumberInput = forwardRef(({
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
  label = null,
  ...otherProps
},ref) => {
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
        <TextField
          ref={ref}
          type="text"
          size='small'
          color={valid ? 'highlightColor' : 'warning'}
          className="nodrag"
          // min={min * visualScaling}
          // max={max}
          step={step * visualScaling}
          style={{paddingRight:0}}
          InputProps={{
            className:'nodrag',
            style:{paddingRight:6},
            startAdornment: (
              <InputAdornment position="start">{prefix}</InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
              {suffix}
              <Spinner
                disabled={disabled}
                above={above}
                below={below}
                onClickDown={(e) => setNewFromButton(-1 * step)}
                onClickUp={(e) => setNewFromButton(step)}
              />
            </InputAdornment>
            )
          }}
          value={storedValue}
          onChange={setNewFromInput}
          disabled={disabled}
          {...otherProps}
        />
  );
});

export const ScrollRegion = ({
  children,
  horizontal,
  vertical,
  height,
  width,
}) => (
  <StyledScrollArea $containerHeight={height} $containerWidth={width}>
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

// Exports
// export const DropdownMenu = DropdownMenuPrimitive.Root;
// export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
// export const DropdownMenuContent = StyledDropdownContent;
// export const DropdownMenuItem = HoverDropdownItem;
// export const DropdownMenuCheckboxItem = HoverDropdownCheckboxItem;
// export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
// export const DropdownMenuRadioItem = HoverDropdownRadioItem;
// export const DropdownMenuItemIndicator = StyledDropdownItemIndicator;
// export const DropdownMenuTriggerItem = HoverDropdownTriggerItem;
// export const DropdownMenuLabel = StyledDropdownLabel;
// export const DropdownMenuSeparator = StyledDropdownSeparator;

// export const ContextMenu = ContextMenuPrimitive.Root;
// export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
// export const ContextMenuContent = StyledContextContent;
// export const ContextMenuItem = HoverContextItem;
// export const ContextMenuCheckboxItem = HoverContextCheckboxItem;
// export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;
// export const ContextMenuRadioItem = HoverContextRadioItem;
// export const ContextMenuItemIndicator = StyledContextItemIndicator;
// export const ContextMenuTriggerItem = HoverContextTriggerItem;
// export const ContextMenuLabel = StyledContextLabel;
// export const ContextMenuSeparator = StyledContextSeparator;
