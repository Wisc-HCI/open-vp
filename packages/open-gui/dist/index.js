var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// src/index.tsx
__export(exports, {
  ActionIconButton: () => ActionIconButton,
  NumberInput: () => NumberInput,
  NumberSpinner: () => NumberSpinner,
  Vector3Input: () => Vector3Input,
  useNumeric: () => useNumeric
});

// src/NumberInput.tsx
var import_react3 = __toModule(require("react"));
var import_styled2 = __toModule(require("@emotion/styled"));
var import_material = __toModule(require("@mui/material"));

// src/NumberSpinner.tsx
var import_react = __toModule(require("react"));
var import_styled = __toModule(require("@emotion/styled"));
var import_fi = __toModule(require("react-icons/fi"));
var SpinnerButton = import_styled.default.button({
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
    background: "#222222"
  },
  "&:hover": {
    background: "#222222"
  }
}, ({ disabled }) => ({ opacity: disabled ? 0.5 : 1 }));
var NumberSpinner = ({
  onClickUp = (_) => {
  },
  onClickDown = (_) => {
  },
  disabled = false,
  above = false,
  below = false
}) => {
  return /* @__PURE__ */ import_react.default.createElement("div", {
    style: {
      marginLeft: 3,
      display: "inline-flex",
      flexDirection: "column",
      borderRadius: 3,
      justifyContent: "center",
      alignItems: "center"
    }
  }, /* @__PURE__ */ import_react.default.createElement(SpinnerButton, {
    disabled: disabled || above,
    onClick: onClickUp,
    style: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
  }, /* @__PURE__ */ import_react.default.createElement(import_fi.FiChevronUp, null)), /* @__PURE__ */ import_react.default.createElement(SpinnerButton, {
    disabled: disabled || below,
    onClick: onClickDown,
    style: { borderTopLeftRadius: 0, borderTopRightRadius: 0 }
  }, /* @__PURE__ */ import_react.default.createElement(import_fi.FiChevronDown, null)));
};

// src/useNumeric.ts
var import_react2 = __toModule(require("react"));
var import_lodash = __toModule(require("lodash"));
var import_number_precision = __toModule(require("number-precision"));
var VALID_CHARS = [
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
var NUMERIC_STATUS = {
  BELOW: "BELOW",
  LOWER_BOUND: "LOWER",
  WITHIN: "WITHIN",
  UPPER_BOUND: "UPPER",
  ABOVE: "ABOVE",
  INVALID: "INVALID"
};
var PASSABLE_NUMERIC_STATUSES = [
  NUMERIC_STATUS.LOWER_BOUND,
  NUMERIC_STATUS.WITHIN,
  NUMERIC_STATUS.UPPER_BOUND
];
var useNumeric = ({
  initial = 0,
  stepSize = 1,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  onValidChange = (value) => {
  }
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
    } else {
      return NUMERIC_STATUS.INVALID;
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
      if ((0, import_lodash.isNumber)(parsed) && !(0, import_lodash.isNaN)(parsed)) {
        return { numeric: parsed, status: getStatus(parsed), textValue: v };
      }
    }
    console.warn("failed with ", v, typeof v);
    return { numeric: 0, status: NUMERIC_STATUS.INVALID, textValue: v };
  };
  const [state, setState] = (0, import_react2.useState)(parse(initial));
  const onChange = (event) => {
    var _a, _b;
    if ((_a = event == null ? void 0 : event.nativeEvent) == null ? void 0 : _a.data) {
      if (!VALID_CHARS.includes(event.nativeEvent.data)) {
        setState((prev) => ({
          numeric: prev.numeric,
          status: prev.status,
          textValue: prev.textValue
        }));
        return;
      }
    }
    if (((_b = event.target) == null ? void 0 : _b.value) === "-") {
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
    const newState = parse((0, import_number_precision.strip)(state.numeric + stepSize));
    setState(newState);
    if (PASSABLE_NUMERIC_STATUSES.includes(newState.status)) {
      onValidChange(newState.numeric);
    }
  };
  const onStepDown = () => {
    const newState = parse((0, import_number_precision.strip)(state.numeric - stepSize));
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

// src/NumberInput.tsx
var OutlinedNumberInput = (0, import_styled2.default)(import_material.OutlinedInput)`
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
var NumberInput = (0, import_react3.memo)(({
  disabled,
  label,
  onChange = (_) => {
  },
  step,
  value = 0,
  onBlur = (_) => {
  },
  onFocus = (_) => {
  },
  onMouseEnter = (_) => {
  },
  onMouseLeave = (_) => {
  },
  suffix = "",
  prefix = "",
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY
}) => {
  const {
    textValue,
    status,
    onChange: onChangeInner,
    onStepUp,
    onStepDown
  } = useNumeric({
    initial: value,
    stepSize: step,
    min,
    max,
    onValidChange: onChange
  });
  return /* @__PURE__ */ import_react3.default.createElement(import_material.FormControl, {
    onMouseEnter,
    onMouseLeave,
    className: "nodrag"
  }, /* @__PURE__ */ import_react3.default.createElement(import_material.InputLabel, {
    className: "nodrag",
    htmlFor: "outlined-position-vector",
    color: "primary",
    shrink: true
  }, label), /* @__PURE__ */ import_react3.default.createElement(OutlinedNumberInput, {
    notched: true,
    className: "nodrag",
    size: "small",
    id: "outlined-position-vector",
    label,
    color: PASSABLE_NUMERIC_STATUSES.includes(status) ? "primary" : "error",
    onFocus,
    onBlur,
    disabled,
    value: textValue,
    onChange: onChangeInner,
    style: { paddingRight: 4 },
    inputProps: { min, max, className: "nodrag" },
    startAdornment: /* @__PURE__ */ import_react3.default.createElement(import_material.InputAdornment, {
      position: "start"
    }, prefix),
    endAdornment: /* @__PURE__ */ import_react3.default.createElement(import_material.InputAdornment, {
      position: "end"
    }, suffix, /* @__PURE__ */ import_react3.default.createElement(NumberSpinner, {
      disabled,
      above: value >= max,
      below: value <= min,
      onClickDown: onStepDown,
      onClickUp: onStepUp
    }))
  }));
});

// src/Vector3Input.tsx
var import_react4 = __toModule(require("react"));
var import_styled3 = __toModule(require("@emotion/styled"));
var import_number_precision2 = __toModule(require("number-precision"));
var import_material2 = __toModule(require("@mui/material"));
var NumberInputField = (0, import_styled3.default)(import_material2.Input)`
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
var CompoundInput = (0, import_react4.memo)((0, import_react4.forwardRef)(({
  onChange = () => {
  },
  value = [0, 0, 0],
  disabled = false,
  min = [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  max = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  step = 0.1,
  className = "",
  onFocus = () => {
  },
  onBlur = () => {
  }
}, ref) => {
  return /* @__PURE__ */ import_react4.default.createElement(import_material2.Stack, {
    sx: { padding: 1, marginRight: 4 },
    direction: "row",
    alignItems: "center",
    alignContent: "center"
  }, /* @__PURE__ */ import_react4.default.createElement(NumberInputField, {
    disabled,
    disableUnderline: true,
    className,
    value: value[0],
    style: { marginLeft: 1, paddingRight: 0 },
    inputProps: { step: 0.1 },
    onFocus,
    onBlur,
    onChange: (e) => {
      onChange([(0, import_number_precision2.strip)(Number(e.target.value)), value[1], value[2]]);
    },
    type: "number",
    margin: "dense"
  }), /* @__PURE__ */ import_react4.default.createElement(NumberSpinner, {
    above: value[0] >= max[0],
    below: value[0] <= min[0],
    onClickUp: () => {
      onChange([(0, import_number_precision2.strip)(Number(value[0] + step)), value[1], value[2]]);
    },
    onClickDown: (e) => onChange([(0, import_number_precision2.strip)(Number(value[0] - step)), value[1], value[2]])
  }), /* @__PURE__ */ import_react4.default.createElement(NumberInputField, {
    disabled,
    disableUnderline: true,
    className,
    value: value[1],
    style: { marginLeft: 1, paddingRight: 0 },
    inputProps: { step, type: "number" },
    onFocus,
    onBlur,
    onChange: (e) => {
      onChange([value[0], (0, import_number_precision2.strip)(Number(e.target.value)), value[2]]);
    },
    type: "number"
  }), /* @__PURE__ */ import_react4.default.createElement(NumberSpinner, {
    above: value[1] >= max[1],
    below: value[1] <= min[1],
    onClickUp: () => {
      onChange([value[0], (0, import_number_precision2.strip)(Number(value[1] + step)), value[2]]);
    },
    onClickDown: () => onChange([value[0], (0, import_number_precision2.strip)(Number(value[1] - step)), value[2]])
  }), /* @__PURE__ */ import_react4.default.createElement(NumberInputField, {
    disabled,
    disableUnderline: true,
    className,
    value: value[2],
    style: { marginLeft: 1, paddingRight: 0 },
    inputProps: { step },
    onFocus,
    onBlur,
    onChange: (e) => {
      onChange([value[0], value[1], (0, import_number_precision2.strip)(Number(e.target.value))]);
    },
    type: "number",
    margin: "dense"
  }), /* @__PURE__ */ import_react4.default.createElement(NumberSpinner, {
    above: value[2] >= max[2],
    below: value[2] <= min[2],
    onClickUp: () => {
      onChange([value[0], value[1], (0, import_number_precision2.strip)(Number(value[2] + step))]);
    },
    onClickDown: (e) => onChange([value[0], value[1], (0, import_number_precision2.strip)(Number(value[2] - step))])
  }));
}));
var Vector3Input = (0, import_react4.memo)(({
  disabled = false,
  label = "Vector",
  onChange = (_) => {
  },
  value = [0, 0, 0],
  min = [
    Number.NEGATIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    Number.NEGATIVE_INFINITY
  ],
  max = [
    Number.POSITIVE_INFINITY,
    Number.POSITIVE_INFINITY,
    Number.POSITIVE_INFINITY
  ],
  step = 0.1,
  onBlur = (_) => {
  },
  onFocus = (_) => {
  },
  endAdornment
}) => {
  return /* @__PURE__ */ import_react4.default.createElement(import_material2.FormControl, null, /* @__PURE__ */ import_react4.default.createElement(import_material2.InputLabel, {
    htmlFor: "outlined-position-vector",
    color: "primary",
    shrink: true
  }, label), /* @__PURE__ */ import_react4.default.createElement(import_material2.OutlinedInput, {
    notched: true,
    className: "nodrag",
    size: "small",
    id: "outlined-position-vector",
    label,
    color: "primary",
    onFocus,
    onBlur,
    disabled,
    value,
    inputProps: { min, max, step },
    endAdornment: endAdornment ? /* @__PURE__ */ import_react4.default.createElement(import_material2.InputAdornment, {
      position: "end"
    }, endAdornment) : null
  }));
});

// src/ActionIconButton.tsx
var import_react5 = __toModule(require("react"));
var import_styles = __toModule(require("@mui/material/styles"));
var import_material3 = __toModule(require("@mui/material"));
var sizeMap = {
  small: 32,
  medium: 40,
  large: 48
};
var IconButton = (0, import_styles.styled)(import_material3.IconButton, {
  shouldForwardProp: (prop) => !["canToggle", "toggled"].includes(prop)
})(({ theme, size = "small", toggled, canToggle }) => ({
  backgroundColor: canToggle && toggled ? (0, import_styles.alpha)(theme.palette.primary.main, 0.4) : canToggle && !toggled ? "transparent" : "rgba(0,0,0,0.5)",
  color: "white",
  fontSize: "1.4rem",
  "&.Mui-disabled": {
    backgroundColor: "rgba(0,0,0,0.25)",
    color: "#ccc"
  },
  borderRadius: theme.shape.borderRadius * 0.66,
  height: size === size ? sizeMap[size] : sizeMap.medium,
  minWidth: size === size ? sizeMap[size] : sizeMap.medium,
  flex: 1,
  "&:hover": {
    backgroundColor: canToggle && toggled ? (0, import_styles.alpha)(theme.palette.primary.main, 0.5) : canToggle && !toggled ? (0, import_styles.alpha)(theme.palette.primary.main, 0.25) : "rgba(0,0,0,0.7)",
    color: theme.palette.primary.main
  },
  "&:focus-visible": {
    userSelect: "none",
    outline: 0
  }
}));
var ToolbarButtonWrapper = (0, import_styles.styled)("span")(({}) => ({
  display: "flex"
}));
var ActionIconButton = (_a) => {
  var _b = _a, {
    title = "Button",
    onClick = () => {
    },
    disabled = false,
    placement = "top",
    toggled = false,
    canToggle = false,
    children = []
  } = _b, props = __objRest(_b, [
    "title",
    "onClick",
    "disabled",
    "placement",
    "toggled",
    "canToggle",
    "children"
  ]);
  return /* @__PURE__ */ import_react5.default.createElement(import_material3.Tooltip, {
    className: "no-outline",
    title,
    color: "primary",
    placement,
    arrow: true
  }, /* @__PURE__ */ import_react5.default.createElement(ToolbarButtonWrapper, {
    className: "no-outline"
  }, /* @__PURE__ */ import_react5.default.createElement(IconButton, __spreadValues({
    className: "no-outline",
    disabled,
    "aria-label": title,
    onClick,
    toggled,
    canToggle
  }, props), children)));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActionIconButton,
  NumberInput,
  NumberSpinner,
  Vector3Input,
  useNumeric
});
