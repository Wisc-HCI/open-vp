import React, { useState, useEffect, forwardRef, memo } from "react";
// import { styled, keyframes } from "@stitches/react";
// import styled from "styled-components";
import styled from "@emotion/styled";
import { css } from "@mui/material";
// import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
// import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
// import * as SeparatorPrimitive from "@radix-ui/react-separator";
// import * as SwitchPrimitive from "@radix-ui/react-switch";
// import * as LabelPrimitive from "@radix-ui/react-label";
// import * as TooltipPrimitive from "@radix-ui/react-tooltip";
// import * as SliderPrimitive from "@radix-ui/react-slider";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { times, divide, plus, strip } from "number-precision";
// import { debounce } from "lodash";
// import { NumberInput as MuiNumberInput } from "@mui-treasury/component-numberinput";
import { isNumber, isNaN, clamp } from "lodash";
import {
  Menu,
  Fade,
  TextField,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  Input,
  Divider,
  Stack,
} from "@mui/material";
import { pick, isEqual } from "lodash";
// import { TextField, InputAdornment } from "@mui/material";
import { ATTENDED_DATA_PROPERTIES, SIMPLE_PROPERTY_TYPES } from "../Constants";

const NumberInputField = styled(Input)`
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const OutlinedNumberInput = styled(OutlinedInput)`
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const stringEquality = (e1, e2) =>
  JSON.stringify(e1) === JSON.stringify(e2);

export const compareBlockData = (data1, data2, propInfo) => {
  if (
    !isEqual(
      pick(data1, ATTENDED_DATA_PROPERTIES),
      pick(data2, ATTENDED_DATA_PROPERTIES)
    )
  ) {
    return false;
  } else {
    const fields = Object.entries(propInfo ? propInfo : {})
      .filter(
        ([_, fieldInfo]) => fieldInfo.type !== SIMPLE_PROPERTY_TYPES.IGNORED
      )
      .map(([fieldKey, _]) => fieldKey);
    return isEqual(
      pick(data1.properties ? data1.properties : {}, fields),
      pick(data2.properties ? data2.properties : {}, fields)
    );
  }
};

export const HeaderField = styled(TextField, {
  shouldForwardProp: (prop) => !["active", "editing"].includes(prop),
})(
  { color: "white", "& .MuiInputBase-input": { borderRadius: 4 } },
  ({ active, editing, theme }) => ({
    "& .MuiInputBase-input": {
      backgroundColor: active ? `${theme.palette.primary.main}99` : "#22222299",
      userSelect: editing ? null : "none",
    },
  })
);

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
    <div key={`${triggerProps.key}-wrapper`}>
      <Triggerer
        {...triggerProps}
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />
      <Menu
        key={`${triggerProps.key}-menu`}
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

const SpinnerButton = styled.button({
  all: "unset",
  display: "flex",
  flexDirection: "column",
  paddingLeft: "0px",
  paddingTop: "2px",
  paddingRight: "0px",
  paddingBottom: "2px",
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
  opacity: `${(props) => (props.disabled ? 0.5 : 1)}`,
},props=>({opacity:props.disabled ? 0.5:1}));

export const Spinner = ({ onClickUp, onClickDown, disabled, above, below }) => {
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

const CompoundInput = memo(forwardRef(
  ({ onChange, value, disabled, min, max, step, ...other }, ref) => {
    console.log({min,max})
    return (
      <Stack
        style={{padding:1,marginRight:4}}
        direction="row"
        // spacing={0}
        ref={ref}
        // justifyContent="space-around"
        alignItems='center'
        alignContent='center'
      >
        <NumberInputField
          disabled={disabled}
          disableUnderline
          className={other.className}
          label={null}
          value={value[0]}
          style={{marginLeft:1,paddingRight:0}}
          inputProps={{ step: 0.1 }}
          onFocus={other.onFocus}
          onBlur={other.onBlur}
          onChange={(e) => {
            onChange({
              target: {
                name: other.name,
                value: [strip(Number(e.target.value)), value[1], value[2]],
              },
            });
          }}
          type="number"
          margin="dense"
        />
        <Spinner
          above={value[0] >= max[0]}
          below={value[0] <= min[0]}
          onClickUp={() => {
            onChange({
              target: {
                name: other.name,
                value: [strip(Number(value[0]+step)), value[1], value[2]],
              },
            });
          }}
          onClickDown={(e) =>
            onChange({
              target: {
                name: other.name,
                value: [strip(Number(value[0]-step)), value[1], value[2]],
              },
            })
          }
        />
        <NumberInputField
          disabled={disabled}
          disableUnderline
          className={other.className}
          label={null}
          value={value[1]}
          style={{marginLeft:1,paddingRight:0}}
          inputProps={{ step: step, type: "number" }}
          onFocus={other.onFocus}
          onBlur={other.onBlur}
          onChange={(e) => {
            onChange({
              target: {
                name: other.name,
                value: [value[0], strip(Number(e.target.value)), value[2]],
              },
            });
          }}
          type="number"
        />
        <Spinner
          above={value[1] >= max[1]}
          below={value[1] <= min[1]}
          onClickUp={() => {
            onChange({
              target: {
                name: other.name,
                value: [value[0], strip(Number(value[1]+step)), value[2]],
              },
            });
          }}
          onClickDown={(e) =>
            onChange({
              target: {
                name: other.name,
                value: [value[0], strip(Number(value[1]-step)), value[2]],
              },
            })
          }
        />
        <NumberInputField
          disabled={disabled}
          disableUnderline
          className={other.className}
          label={null}
          value={value[2]}
          style={{marginLeft:1,paddingRight:0}}
          inputProps={{ step: step }}
          onFocus={other.onFocus}
          onBlur={other.onBlur}
          onChange={(e) => {
            onChange({
              target: {
                name: other.name,
                value: [value[0], value[1], strip(Number(e.target.value))],
              },
            });
          }}
          type="number"
          margin="dense"
        />
        <Spinner
        above={value[2] >= max[2]}
        below={value[2] <= min[2]}
          onClickUp={() => {
            onChange({
              target: {
                name: other.name,
                value: [value[0], value[1], strip(Number(value[2]+step))],
              },
            });
          }}
          onClickDown={(e) =>
            onChange({
              target: {
                name: other.name,
                value: [value[0], value[1], strip(Number(value[2]-step))],
              },
            })
          }
        />
      </Stack>
    );
  }
));

export const Vector3Input = memo(({
  disabled,
  label,
  onChange,
  value = [0, 0, 0],
  min = [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  max = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  step = 0.1,
  onBlur = (_) => {},
  onFocus = (_) => {},
  endAdornment,
}) => {
  return (
    <FormControl>
      <InputLabel htmlFor="outlined-position-vector" color="primary" shrink>
        {label}
      </InputLabel>
      <OutlinedInput
        notched
        className="nodrag"
        size="small"
        id="outlined-position-vector"
        label={label}
        color="primary"
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        value={value}
        inputComponent={CompoundInput}
        inputProps={{min,max,step}}
        onChange={onChange}
        endAdornment={
          endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ) : null
        }
      />
    </FormControl>
  );
});

export const NumberInput = memo(({
  disabled,
  label,
  onChange,
  step,
  value = 0,
  onBlur = (_) => {},
  onFocus = (_) => {},
  suffix="",
  prefix="",
  min=Number.NEGATIVE_INFINITY,
  max=Number.POSITIVE_INFINITY
}) => {

  const [v, setV] = useState(value);

  useEffect(()=>{
    if (value < min) {
      setV(min)
    } else if (value > max) {
      setV(max)
    }
  })

  const handleChange = (newValue) => {
    if (newValue < min) {
      setV(min);
      onChange(min);
    } else if (newValue > max) {
      setV(max);
      onChange(max);
    } else {
      onChange(newValue)
    }
  }

  return (
    <FormControl>
      <InputLabel htmlFor="outlined-position-vector" color="primary" shrink>
        {label}
      </InputLabel>
      <OutlinedNumberInput
        notched
        className="nodrag"
        size="small"
        id="outlined-position-vector"
        label={label}
        color="primary"
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        value={value}
        onChange={(e)=>handleChange(e.target.value)}
        style={{ paddingRight: 4 }}
        inputProps={{min,max,type:'number'}}
        startAdornment={
          <InputAdornment position='start'>{prefix}</InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            {suffix}
            <Spinner
              disabled={disabled}
              above={value >= max}
              below={value <= min}
              onClickDown={() => onChange(clamp(strip(-1 * step + value),min,max))}
              onClickUp={() => onChange(clamp(strip(step + value),min,max))}
            />
          </InputAdornment>
        }
      />
    </FormControl>
  );
});

export const NumberInput2 = forwardRef(
  (
    {
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
    },
    ref
  ) => {
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
        type="number"
        size="small"
        color={valid ? "primary" : "warning"}
        className="nodrag"
        // min={min * visualScaling}
        // max={max}
        step={step * visualScaling}
        style={{ paddingRight: 0 }}
        InputProps={{
          className: "nodrag",
          style: { paddingRight: 6 },
          startAdornment: (
            <InputAdornment position="start">{prefix}</InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {suffix}
              <Spinner
                disabled={disabled}
                above={above}
                below={below}
                onClickDown={(e) => setNewFromButton(-1 * step)}
                onClickUp={(e) => setNewFromButton(step)}
              />
            </InputAdornment>
          ),
        }}
        value={storedValue}
        onChange={setNewFromInput}
        disabled={disabled}
        {...otherProps}
      />
    );
  }
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
