import React, { useState, forwardRef, memo } from "react";
import styled from "@emotion/styled";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { plus, strip } from "number-precision";
import { isNumber, isNaN } from "lodash";
import {
  Menu,
  Fade,
  TextField,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  Input,
  Stack,
} from "@mui/material";
import { pick, isEqual, mapValues, pickBy } from "lodash";
import {
  ATTENDED_DATA_PROPERTIES,
  DATA_TYPES,
  SIMPLE_PROPERTY_TYPES,
  TYPES,
} from "../Constants";

export const NUMERIC_STATUS = {
  BELOW: "BELOW",
  LOWER_BOUND: "LOWER",
  WITHIN: "WITHIN",
  UPPER_BOUND: "UPPER",
  ABOVE: "ABOVE",
  INVALID: "INVALID"
};

const PASSABLE_NUMERIC_STATUSES = [
  NUMERIC_STATUS.LOWER_BOUND,
  NUMERIC_STATUS.WITHIN,
  NUMERIC_STATUS.UPPER_BOUND
];

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
  "-"
];

export const useNumeric = ({
  initial = 0,
  stepSize = 1,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  onValidChange = (value) => {}
}) => {
  const getStatus = (v) => {
    if (v < max && v > min) {
      return NUMERIC_STATUS.WITHIN;
    } else if (v > max) {
      return NUMERIC_STATUS.ABOVE;
    } else if (v === max) {
      return NUMERIC_STATUS.UPPER_BOUND;
    } else if (v === min) {
      return NUMERIC_STATUS.LOWER_BOUND;
    } else if (v < min) {
      return NUMERIC_STATUS.BELOW;
    }
  };

  const parse = (v) => {
    if (typeof v === "number") {
      return { numeric: v, status: getStatus(v), textValue: v.toString() };
    } else if (typeof v === "string") {
      const parsed = Number(v);
      if (v === "-") {
        return { numeric: 0, status: getStatus(0), textValue: v };
      }
      if (isNumber(parsed) && !isNaN(parsed)) {
        return { numeric: parsed, status: getStatus(parsed), textValue: v };
      }
    }
    console.log("failed with ", v, typeof v);
  };

  const [state, setState] = useState(parse(initial));

  const onChange = (event) => {
    if (event?.nativeEvent?.data) {
      if (!VALID_CHARS.includes(event.nativeEvent.data)) {
        setState((prev) => ({
          numeric: prev.numeric,
          status: prev.status,
          textValue: prev.textValue
        }));
        return;
      }
    }
    if (event.target.value === "-") {
      console.log("dash input");
      setState({
        numeric: 0,
        status: getStatus(0),
        textValue: event.target.value
      });
      return;
    }

    if (event.target.value === "") {
      console.log("empty input");
      setState({
        numeric: 0,
        status: getStatus(0),
        textValue: event.target.value
      });
      return;
    }

    const newState = parse(event.target.value);
    if (!newState) {
      setState((prev) => ({
        numeric: prev.numeric,
        status: NUMERIC_STATUS.INVALID,
        textValue: event.target.value
      }));
      return;
    } else if (PASSABLE_NUMERIC_STATUSES.includes(newState.status)) {
      setState(newState);
      onValidChange(newState.numeric);
      return;
    } else if (newState.status === NUMERIC_STATUS.BELOW) {
      setState(newState);
      onValidChange(min);
      return;
    } else if (newState.status === NUMERIC_STATUS.ABOVE) {
      setState(newState);
      onValidChange(max);
      return;
    }
    console.log("not handled", event.target.value);
  };

  const onStepUp = () => {
    const newState = parse(strip(state.numeric + stepSize));
    setState(newState);
    if (PASSABLE_NUMERIC_STATUSES.includes(newState.status)) {
      onValidChange(newState.numeric);
    }
  };

  const onStepDown = () => {
    const newState = parse(strip(state.numeric - stepSize));
    setState(newState);
    if (PASSABLE_NUMERIC_STATUSES.includes(newState.status)) {
      onValidChange(newState.numeric);
    }
  };

  return {
    textValue: state.textValue,
    status: state.status,
    onChange,
    onStepUp,
    onStepDown
  };
};


export const functionTypeSpec = (typeSpec, programData) => {
  const augmented = pickBy(typeSpec, (info) => info.type !== TYPES.FUNCTION);
  const functionKeys = Object.keys(typeSpec).filter(
    (typeKey) => typeSpec[typeKey].type === TYPES.FUNCTION
  );
  Object.values(programData)
    .filter(
      (data) =>
        data.dataType === DATA_TYPES.INSTANCE &&
        functionKeys.includes(data.type)
    )
    .forEach((functionInstance) => {
      augmented[functionInstance.id] = functionInstanceAsType(typeSpec[functionInstance.type],functionInstance,programData);
    });
  return augmented;
};

export const functionInstanceAsType = (functionTypeSpec, functionInstance, programData) => {
  const initialFunctionDef = { ...functionTypeSpec, name: functionInstance.name, specificType: functionInstance.type };
  let newProperties = {};
  functionInstance.arguments?.forEach((arg) => {
    const argBlock = programData[arg];
    newProperties[arg] = {
      name: argBlock.name,
      accepts: [argBlock.type],
      default: null,
      isFunctionArgument: true,
    };
  });
  let functionTypeDef = {
    ...initialFunctionDef,
    properties: {
      ...mapValues(initialFunctionDef.properties, (v) => ({
        ...v,
        isFunctionBlockField: true,
      })),
      ...newProperties,
    },
  };
  return functionTypeDef;
  
};

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
    const fields =
      data2.dataType !== DATA_TYPES.CALL
        ? Object.entries(propInfo ? propInfo : {})
            .filter(
              ([_, fieldInfo]) =>
                fieldInfo.type !== SIMPLE_PROPERTY_TYPES.IGNORED
            )
            .map(([fieldKey, _]) => fieldKey)
        : data2.refData.arguments;
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
    event.stopPropagation();
  };
  const handleClose = (event) => {
    setAnchorEl(null);
    event.stopPropagation();
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
        open={open && anchorEl !== undefined}
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

const SpinnerButton = styled.button(
  {
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
  },
  (props) => ({ opacity: props.disabled ? 0.5 : 1 })
);

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

const CompoundInput = memo(
  forwardRef(({ onChange, value, disabled, min, max, step, ...other }, ref) => {
    
    return (
      <Stack
        style={{ padding: 1, marginRight: 4 }}
        direction="row"
        // spacing={0}
        ref={ref}
        // justifyContent="space-around"
        alignItems="center"
        alignContent="center"
      >
        <NumberInputField
          disabled={disabled}
          disableUnderline
          className={other.className}
          label={null}
          value={value[0]}
          style={{ marginLeft: 1, paddingRight: 0 }}
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
                value: [strip(Number(value[0] + step)), value[1], value[2]],
              },
            });
          }}
          onClickDown={(e) =>
            onChange({
              target: {
                name: other.name,
                value: [strip(Number(value[0] - step)), value[1], value[2]],
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
          style={{ marginLeft: 1, paddingRight: 0 }}
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
                value: [value[0], strip(Number(value[1] + step)), value[2]],
              },
            });
          }}
          onClickDown={(e) =>
            onChange({
              target: {
                name: other.name,
                value: [value[0], strip(Number(value[1] - step)), value[2]],
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
          style={{ marginLeft: 1, paddingRight: 0 }}
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
                value: [value[0], value[1], strip(Number(value[2] + step))],
              },
            });
          }}
          onClickDown={(e) =>
            onChange({
              target: {
                name: other.name,
                value: [value[0], value[1], strip(Number(value[2] - step))],
              },
            })
          }
        />
      </Stack>
    );
  })
);

export const Vector3Input = memo(
  ({
    disabled,
    label,
    onChange,
    value = [0, 0, 0],
    min = [
      Number.NEGATIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
    ],
    max = [
      Number.POSITIVE_INFINITY,
      Number.POSITIVE_INFINITY,
      Number.POSITIVE_INFINITY,
    ],
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
          inputProps={{ min, max, step }}
          onChange={onChange}
          endAdornment={
            endAdornment ? (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ) : null
          }
        />
      </FormControl>
    );
  }
);

export const NumberInput = memo(
  ({
    disabled,
    label,
    onChange,
    step,
    value = 0,
    onBlur = (_) => {},
    onFocus = (_) => {},
    onMouseEnter = (_) => {},
    onMouseLeave = (_) => {},
    suffix = "",
    prefix = "",
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
  }) => {

    const {
      textValue,
      status,
      onChange:onChangeInner,
      onStepUp,
      onStepDown
    } = useNumeric({
      initial:value,
      stepSize:step,
      min,
      max,
      onValidChange:onChange
    });

    return (
      <FormControl
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="nodrag"
      >
        <InputLabel
          className="nodrag"
          htmlFor="outlined-position-vector"
          color="primary"
          shrink
        >
          {label}
        </InputLabel>
        <OutlinedNumberInput
          notched
          className="nodrag"
          size="small"
          id="outlined-position-vector"
          label={label}
          // type='number'
          color={PASSABLE_NUMERIC_STATUSES.includes(status) ? "primary" : "error"}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          value={textValue}
          onChange={onChangeInner}
          style={{ paddingRight: 4 }}
          inputProps={{ min, max, className: "nodrag" }}
          startAdornment={
            <InputAdornment position="start">{prefix}</InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              {suffix}
              <Spinner
                disabled={disabled}
                above={value >= max}
                below={value <= min}
                onClickDown={onStepDown}
                onClickUp={onStepUp}
              />
            </InputAdornment>
          }
        />
      </FormControl>
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
