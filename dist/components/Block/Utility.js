"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolTip = exports.Switch = exports.Slider = exports.ScrollRegion = exports.RightSlot = exports.OtherStyledSeparator = exports.NumberInput = exports.Input = exports.DropdownMenuTriggerItem = exports.DropdownMenuTrigger = exports.DropdownMenuSeparator = exports.DropdownMenuRadioItem = exports.DropdownMenuRadioGroup = exports.DropdownMenuLabel = exports.DropdownMenuItemIndicator = exports.DropdownMenuItem = exports.DropdownMenuContent = exports.DropdownMenuCheckboxItem = exports.DropdownMenu = exports.ContextMenuTriggerItem = exports.ContextMenuTrigger = exports.ContextMenuSeparator = exports.ContextMenuRadioItem = exports.ContextMenuRadioGroup = exports.ContextMenuLabel = exports.ContextMenuItemIndicator = exports.ContextMenuItem = exports.ContextMenuContent = exports.ContextMenuCheckboxItem = exports.ContextMenu = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@stitches/react");

var _styledComponents = require("styled-components");

var DropdownMenuPrimitive = _interopRequireWildcard(require("@radix-ui/react-dropdown-menu"));

var ContextMenuPrimitive = _interopRequireWildcard(require("@radix-ui/react-context-menu"));

var SeparatorPrimitive = _interopRequireWildcard(require("@radix-ui/react-separator"));

var SwitchPrimitive = _interopRequireWildcard(require("@radix-ui/react-switch"));

var LabelPrimitive = _interopRequireWildcard(require("@radix-ui/react-label"));

var TooltipPrimitive = _interopRequireWildcard(require("@radix-ui/react-tooltip"));

var SliderPrimitive = _interopRequireWildcard(require("@radix-ui/react-slider"));

var ScrollArea = _interopRequireWildcard(require("@radix-ui/react-scroll-area"));

var _fi = require("react-icons/fi");

var _numberPrecision = require("number-precision");

var _lodash = require("lodash");

var _excluded = ["highlightColor"],
    _excluded2 = ["highlightColor"],
    _excluded3 = ["highlightColor"],
    _excluded4 = ["highlightColor"],
    _excluded5 = ["highlightColor"],
    _excluded6 = ["highlightColor"],
    _excluded7 = ["highlightColor"],
    _excluded8 = ["highlightColor"],
    _excluded9 = ["highlightColor", "disabled"],
    _excluded10 = ["prefix", "suffix", "style", "innerStyle", "step", "onChange", "min", "max", "value", "visualScaling", "disabled"];

var _templateObject;

var GlobalSpinnerStyle = (0, _styledComponents.createGlobalStyle)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n"])));
var slideUpAndFade = (0, _react2.keyframes)({
  "0%": {
    opacity: 0,
    transform: "translateY(2px)"
  },
  "100%": {
    opacity: 1,
    transform: "translateY(0)"
  }
});
var slideRightAndFade = (0, _react2.keyframes)({
  "0%": {
    opacity: 0,
    transform: "translateX(-2px)"
  },
  "100%": {
    opacity: 1,
    transform: "translateX(0)"
  }
});
var slideDownAndFade = (0, _react2.keyframes)({
  "0%": {
    opacity: 0,
    transform: "translateY(-2px)"
  },
  "100%": {
    opacity: 1,
    transform: "translateY(0)"
  }
});
var slideLeftAndFade = (0, _react2.keyframes)({
  "0%": {
    opacity: 0,
    transform: "translateX(2px)"
  },
  "100%": {
    opacity: 1,
    transform: "translateX(0)"
  }
});
var StyledScrollArea = (0, _react2.styled)(ScrollArea.Root, {
  overflow: "hidden"
});
var StyledViewport = (0, _react2.styled)(ScrollArea.Viewport, {
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
  padding: "4pt"
});
var StyledScrollbar = (0, _react2.styled)(ScrollArea.Scrollbar, {
  display: "flex",
  // ensures no selection
  userSelect: "none",
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: "none",
  padding: 2,
  background: "#55555525",
  transition: "background 160ms ease-out",
  "&:hover": {
    background: "#45454540"
  },
  '&[data-orientation="vertical"]': {
    width: 8
  },
  '&[data-orientation="horizontal"]': {
    flexDirection: "column",
    height: 8
  }
});
var StyledScrollThumb = (0, _react2.styled)(ScrollArea.Thumb, {
  flex: 1,
  background: "#eeeeee66",
  borderRadius: 8 // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
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
var OtherStyledSeparator = (0, _react2.styled)(SeparatorPrimitive.Root, {
  backgroundColor: "#efefef",
  "&[data-orientation=horizontal]": {
    height: 1,
    width: "100%"
  },
  "&[data-orientation=vertical]": {
    height: "100%",
    width: 1
  }
});
exports.OtherStyledSeparator = OtherStyledSeparator;
var contentStyle = {
  fontFamily: "Helvetica",
  minWidth: 100,
  backgroundColor: "#303030f5",
  color: "#efefef",
  borderRadius: 6,
  padding: 5,
  boxShadow: "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    animationFillMode: "forwards",
    willChange: "transform, opacity",
    '&[data-state="open"]': {
      '&[data-side="top"]': {
        animationName: slideDownAndFade
      },
      '&[data-side="right"]': {
        animationName: slideLeftAndFade
      },
      '&[data-side="bottom"]': {
        animationName: slideUpAndFade
      },
      '&[data-side="left"]': {
        animationName: slideRightAndFade
      }
    }
  }
};
var StyledDropdownContent = (0, _react2.styled)(DropdownMenuPrimitive.Content, contentStyle);
var StyledContextContent = (0, _react2.styled)(ContextMenuPrimitive.Content, contentStyle);
var StyledTooltipContent = (0, _react2.styled)(TooltipPrimitive.Content, contentStyle);
var itemStyles = {
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
    pointerEvents: "none"
  },
  "&:focus": {
    backgroundColor: "#efefef",
    color: "cyan"
  }
};
var StyledDropdownItem = (0, _react2.styled)(DropdownMenuPrimitive.Item, (0, _objectSpread2.default)({}, itemStyles));
var StyledDropdownCheckboxItem = (0, _react2.styled)(DropdownMenuPrimitive.CheckboxItem, (0, _objectSpread2.default)({}, itemStyles));
var StyledDropdownRadioItem = (0, _react2.styled)(DropdownMenuPrimitive.RadioItem, (0, _objectSpread2.default)({}, itemStyles));
var StyledDropdownTriggerItem = (0, _react2.styled)(DropdownMenuPrimitive.TriggerItem, (0, _objectSpread2.default)({
  '&[data-state="open"]': {
    backgroundColor: "#efefef",
    color: "cyan"
  }
}, itemStyles));
var StyledContextItem = (0, _react2.styled)(ContextMenuPrimitive.Item, (0, _objectSpread2.default)({}, itemStyles));
var StyledContextCheckboxItem = (0, _react2.styled)(ContextMenuPrimitive.CheckboxItem, (0, _objectSpread2.default)({}, itemStyles));
var StyledContextRadioItem = (0, _react2.styled)(ContextMenuPrimitive.RadioItem, (0, _objectSpread2.default)({}, itemStyles));
var StyledContextTriggerItem = (0, _react2.styled)(ContextMenuPrimitive.TriggerItem, (0, _objectSpread2.default)({
  '&[data-state="open"]': {
    backgroundColor: "#efefef",
    color: "cyan"
  }
}, itemStyles));

var HoverDropdownItem = function HoverDropdownItem(_ref) {
  var highlightColor = _ref.highlightColor,
      other = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(StyledDropdownItem, Object.assign({
    css: {
      "&:focus": {
        color: "#efefef",
        backgroundColor: highlightColor
      }
    }
  }, other));
};

var HoverDropdownCheckboxItem = function HoverDropdownCheckboxItem(_ref2) {
  var highlightColor = _ref2.highlightColor,
      other = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
  return /*#__PURE__*/_react.default.createElement(StyledDropdownCheckboxItem, Object.assign({
    css: {
      "&:focus": {
        color: "#efefef",
        backgroundColor: highlightColor
      }
    }
  }, other));
};

var HoverDropdownRadioItem = function HoverDropdownRadioItem(_ref3) {
  var highlightColor = _ref3.highlightColor,
      other = (0, _objectWithoutProperties2.default)(_ref3, _excluded3);
  return /*#__PURE__*/_react.default.createElement(StyledDropdownRadioItem, Object.assign({
    css: {
      "&:focus": {
        color: "#efefef",
        backgroundColor: highlightColor
      }
    }
  }, other));
};

var HoverDropdownTriggerItem = function HoverDropdownTriggerItem(_ref4) {
  var highlightColor = _ref4.highlightColor,
      other = (0, _objectWithoutProperties2.default)(_ref4, _excluded4);
  return /*#__PURE__*/_react.default.createElement(StyledDropdownTriggerItem, Object.assign({
    css: {
      '&[data-state="open"]': {
        color: highlightColor
      },
      "&:focus": {
        color: "#efefef",
        backgroundColor: highlightColor
      }
    }
  }, other));
};

var HoverContextItem = function HoverContextItem(_ref5) {
  var highlightColor = _ref5.highlightColor,
      other = (0, _objectWithoutProperties2.default)(_ref5, _excluded5);
  return /*#__PURE__*/_react.default.createElement(StyledContextItem, Object.assign({
    css: {
      "&:focus": {
        color: "#efefef",
        backgroundColor: highlightColor
      }
    }
  }, other));
};

var HoverContextCheckboxItem = function HoverContextCheckboxItem(_ref6) {
  var highlightColor = _ref6.highlightColor,
      other = (0, _objectWithoutProperties2.default)(_ref6, _excluded6);
  return /*#__PURE__*/_react.default.createElement(StyledContextCheckboxItem, Object.assign({
    css: {
      "&:focus": {
        color: "#efefef",
        backgroundColor: highlightColor
      }
    }
  }, other));
};

var HoverContextRadioItem = function HoverContextRadioItem(_ref7) {
  var highlightColor = _ref7.highlightColor,
      other = (0, _objectWithoutProperties2.default)(_ref7, _excluded7);
  return /*#__PURE__*/_react.default.createElement(StyledContextRadioItem, Object.assign({
    css: {
      "&:focus": {
        color: "#efefef",
        backgroundColor: highlightColor
      }
    }
  }, other));
};

var HoverContextTriggerItem = function HoverContextTriggerItem(_ref8) {
  var highlightColor = _ref8.highlightColor,
      other = (0, _objectWithoutProperties2.default)(_ref8, _excluded8);
  return /*#__PURE__*/_react.default.createElement(StyledContextTriggerItem, Object.assign({
    css: {
      '&[data-state="open"]': {
        color: highlightColor
      },
      "&:focus": {
        color: "#efefef",
        backgroundColor: highlightColor
      }
    }
  }, other));
};

var labelStyle = {
  paddingLeft: 25,
  fontSize: 12,
  lineHeight: "25px",
  color: "#a0a0a0"
};
var separatorStyle = {
  height: 1,
  backgroundColor: "#efefef",
  margin: 5
};
var itemIndicatorStyle = {
  position: "absolute",
  left: 0,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center"
};
var StyledDropdownLabel = (0, _react2.styled)(DropdownMenuPrimitive.Label, labelStyle);
var StyledContextLabel = (0, _react2.styled)(ContextMenuPrimitive.Label, labelStyle);
var StyledDropdownSeparator = (0, _react2.styled)(DropdownMenuPrimitive.Separator, separatorStyle);
var StyledContextSeparator = (0, _react2.styled)(ContextMenuPrimitive.Separator, separatorStyle);
var StyledDropdownItemIndicator = (0, _react2.styled)(DropdownMenuPrimitive.ItemIndicator, itemIndicatorStyle);
var StyledContextItemIndicator = (0, _react2.styled)(ContextMenuPrimitive.ItemIndicator, itemIndicatorStyle);
var Tooltip = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
var RightSlot = (0, _react2.styled)("div", {
  marginLeft: "auto",
  paddingLeft: 20,
  color: "#efefef",
  ":focus > &": {
    color: "white"
  },
  "[data-disabled] &": {
    color: "#efefef"
  }
});
exports.RightSlot = RightSlot;
var StyledSwitch = (0, _react2.styled)(SwitchPrimitive.Root, {
  all: "unset",
  width: 42,
  height: 25,
  backgroundColor: "#111111",
  borderRadius: "9999px",
  position: "relative",
  boxShadow: "inset 0.5pt 0.5pt 0pt 0pt rgba(55,55,55,0.25)",
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  // '&:focus': { boxShadow: `0 0 0 2px black` },
  '&[data-state="checked"]': {
    backgroundColor: "black"
  }
});
var StyledThumb = (0, _react2.styled)(SwitchPrimitive.Thumb, {
  display: "block",
  width: 21,
  height: 21,
  backgroundColor: "white",
  borderRadius: "9999px",
  boxShadow: "0.5pt 0.5pt 0pt 0pt rgba(55,55,55,0.25)",
  transition: "transform 100ms",
  transform: "translateX(2px)",
  willChange: "transform",
  '&[data-state="checked"]': {
    transform: "translateX(19px)"
  }
}); // Exports

var SwitchWrapper = function SwitchWrapper(_ref9) {
  var highlightColor = _ref9.highlightColor,
      disabled = _ref9.disabled,
      other = (0, _objectWithoutProperties2.default)(_ref9, _excluded9);
  return /*#__PURE__*/_react.default.createElement(StyledSwitch, Object.assign({
    disabled: disabled,
    css: {
      opacity: disabled ? 0.7 : 1,
      '&[data-state="checked"]': {
        backgroundColor: highlightColor
      }
    }
  }, other));
};

var SwitchThumb = StyledThumb;
var Label = (0, _react2.styled)(LabelPrimitive.Root, {
  fontSize: 15,
  fontWeight: 500,
  color: "white",
  userSelect: "none"
});
var StyledArrow = (0, _react2.styled)(TooltipPrimitive.Arrow, {
  fill: "#303030f5"
});
var StyledSlider = (0, _react2.styled)(SliderPrimitive.Root, {
  position: "relative",
  display: "flex",
  alignItems: "center",
  userSelect: "none",
  touchAction: "none",
  width: "100%",
  '&[data-orientation="horizontal"]': {
    height: 20
  },
  '&[data-orientation="vertical"]': {
    flexDirection: "column",
    width: 20,
    height: 100
  }
});
var StyledTrack = (0, _react2.styled)(SliderPrimitive.Track, {
  backgroundColor: "hsla(0, 0%, 0%, 0.478)",
  position: "relative",
  flexGrow: 1,
  borderRadius: "9999px",
  '&[data-orientation="horizontal"]': {
    height: 3
  },
  '&[data-orientation="vertical"]': {
    width: 3
  }
});
var StyledRange = (0, _react2.styled)(SliderPrimitive.Range, {
  position: "absolute",
  backgroundColor: "white",
  borderRadius: "9999px",
  height: "100%"
});
var StyledSliderThumb = (0, _react2.styled)(SliderPrimitive.Thumb, {
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
  boxShadow: "0 2px 10px hsla(0, 0%, 0%, 0.141)",
  borderRadius: 20,
  "&:hover": {
    backgroundColor: "#f0f0f0"
  },
  "&:focus": {
    boxShadow: "0 0 0 5px hsla(0, 0%, 0%, 0.220)"
  }
});

var Slider = function Slider(_ref10) {
  var value = _ref10.value,
      onChange = _ref10.onChange,
      label = _ref10.label,
      _ref10$min = _ref10.min,
      min = _ref10$min === void 0 ? 0 : _ref10$min,
      _ref10$max = _ref10.max,
      max = _ref10$max === void 0 ? 10 : _ref10$max,
      _ref10$step = _ref10.step,
      step = _ref10$step === void 0 ? 1 : _ref10$step,
      units = _ref10.units,
      _ref10$visualScaling = _ref10.visualScaling,
      visualScaling = _ref10$visualScaling === void 0 ? 1 : _ref10$visualScaling,
      _ref10$visualPrecisio = _ref10.visualPrecision,
      visualPrecision = _ref10$visualPrecisio === void 0 ? 1 : _ref10$visualPrecisio,
      disabled = _ref10.disabled;
  var visualValue = (0, _lodash.round)(value * visualScaling, visualPrecision);
  var labelText = label && units ? "".concat(label, ": ").concat(visualValue, " ").concat(units) : label ? "".concat(label, ": ").concat(visualValue) : units ? "".concat(visualValue, " ").concat(units) : "".concat(visualValue);
  return /*#__PURE__*/_react.default.createElement(ToolTip, {
    hideArrow: true,
    content: /*#__PURE__*/_react.default.createElement("div", {
      key: "label",
      style: {
        textAlign: "center"
      }
    }, labelText)
  }, /*#__PURE__*/_react.default.createElement(StyledSlider, {
    disabled: disabled,
    value: [value * visualScaling],
    min: min * visualScaling,
    max: max * visualScaling,
    step: step * visualScaling,
    "aria-label": label,
    onValueChange: function onValueChange(v) {
      return onChange(v[0] / visualScaling);
    }
  }, /*#__PURE__*/_react.default.createElement(StyledTrack, null, /*#__PURE__*/_react.default.createElement(StyledRange, null)), /*#__PURE__*/_react.default.createElement(StyledSliderThumb, null)));
};

exports.Slider = Slider;

var Switch = function Switch(_ref11) {
  var onCheckedChange = _ref11.onCheckedChange,
      disabled = _ref11.disabled,
      value = _ref11.value,
      highlightColor = _ref11.highlightColor,
      label = _ref11.label;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Label, {
    htmlFor: "switch-".concat(label),
    css: {
      paddingRight: 5
    }
  }, label), /*#__PURE__*/_react.default.createElement(SwitchWrapper, {
    id: "switch-".concat(label),
    checked: value,
    disabled: disabled,
    highlightColor: highlightColor,
    onCheckedChange: onCheckedChange
  }, /*#__PURE__*/_react.default.createElement(SwitchThumb, null)));
};

exports.Switch = Switch;

var ToolTip = function ToolTip(_ref12) {
  var children = _ref12.children,
      content = _ref12.content,
      hideArrow = _ref12.hideArrow;
  return /*#__PURE__*/_react.default.createElement(Tooltip, null, /*#__PURE__*/_react.default.createElement(TooltipTrigger, {
    key: "trigger",
    asChild: true
  }, children), /*#__PURE__*/_react.default.createElement(StyledTooltipContent, {
    key: "content",
    sideOffset: hideArrow ? 10 : 5
  }, content, !hideArrow && /*#__PURE__*/_react.default.createElement(StyledArrow, {
    key: "arrow"
  })));
};

exports.ToolTip = ToolTip;
var Input = (0, _react2.styled)("input", {
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
  boxShadow: "0 0 0 1px #222222",
  "&:focus": {
    boxShadow: "0 0 0 2px #222222"
  }
});
exports.Input = Input;
var VALID_CHARS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "-"];
var BasicInput = (0, _react2.styled)("input", {
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
  backgroundColor: "transparent" // boxShadow: `0 0 0 1px #222222`,
  // "&:focus": { boxShadow: `0 0 0 2px #222222` }

});
var InputContainer = (0, _react2.styled)("div", {
  padding: "0 5px 0 10px",
  color: "white",
  borderRadius: 4,
  display: "inline-flex",
  alignItems: "center",
  alignContent: "center",
  justifyContent: "center",
  backgroundColor: "#22222299",
  verticalAlign: "center",
  boxShadow: "0 0 0 1px #222222",
  "&:focus": {
    boxShadow: "0 0 0 2px #222222"
  }
});
var SpinnerButton = (0, _react2.styled)("button", {
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
  "&:focus": {
    backgroundColor: "#222222"
  },
  "&:hover": {
    backgroundColor: "#222222"
  }
});

var Spinner = function Spinner(_ref13) {
  var onClickUp = _ref13.onClickUp,
      onClickDown = _ref13.onClickDown,
      disabled = _ref13.disabled;
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginLeft: 3,
      display: "inline-flex",
      flexDirection: "column",
      borderRadius: 3,
      backgroundColor: "#22222299",
      justifyContent: "center",
      alignItems: "center"
    }
  }, /*#__PURE__*/_react.default.createElement(SpinnerButton, {
    disabled: disabled,
    onClick: onClickUp,
    css: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    }
  }, /*#__PURE__*/_react.default.createElement(_fi.FiChevronUp, null)), /*#__PURE__*/_react.default.createElement(SpinnerButton, {
    disabled: disabled,
    onClick: onClickDown,
    css: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    }
  }, /*#__PURE__*/_react.default.createElement(_fi.FiChevronDown, null)));
};

var InnerInputField = (0, _react2.styled)("div", {
  display: "inline-flex"
});

var NumberInput = function NumberInput(_ref14) {
  var _ref14$prefix = _ref14.prefix,
      prefix = _ref14$prefix === void 0 ? "" : _ref14$prefix,
      _ref14$suffix = _ref14.suffix,
      suffix = _ref14$suffix === void 0 ? "" : _ref14$suffix,
      _ref14$style = _ref14.style,
      style = _ref14$style === void 0 ? {} : _ref14$style,
      _ref14$innerStyle = _ref14.innerStyle,
      innerStyle = _ref14$innerStyle === void 0 ? {} : _ref14$innerStyle,
      _ref14$step = _ref14.step,
      step = _ref14$step === void 0 ? 1 : _ref14$step,
      onChange = _ref14.onChange,
      min = _ref14.min,
      max = _ref14.max,
      value = _ref14.value,
      _ref14$visualScaling = _ref14.visualScaling,
      visualScaling = _ref14$visualScaling === void 0 ? 1 : _ref14$visualScaling,
      _ref14$disabled = _ref14.disabled,
      disabled = _ref14$disabled === void 0 ? false : _ref14$disabled,
      otherProps = (0, _objectWithoutProperties2.default)(_ref14, _excluded10);

  var setNewFromButton = function setNewFromButton(change) {
    var numericNew = (0, _numberPrecision.plus)(value, (0, _numberPrecision.divide)(change, visualScaling));
    var scaledMax = (0, _numberPrecision.divide)(max, visualScaling);
    var scaledMin = (0, _numberPrecision.divide)(min, visualScaling);
    console.log({
      change: change,
      value: value,
      visualScaling: visualScaling,
      numericNew: numericNew,
      scaledMax: scaledMax,
      scaledMin: scaledMin
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

  var setNewFromInput = function setNewFromInput(event) {
    var _event$nativeEvent;

    console.log(event);

    if (event !== null && event !== void 0 && (_event$nativeEvent = event.nativeEvent) !== null && _event$nativeEvent !== void 0 && _event$nativeEvent.data) {
      if (!VALID_CHARS.includes(event.nativeEvent.data)) {
        return;
      }
    }

    if (event.target.value === "-") {
      onChange(0);
      setStoredValue("-");
      return;
    }

    var numericNew = Number(event.target.value);

    if (!(0, _lodash.isNumber)(numericNew) || (0, _lodash.isNaN)(numericNew)) {
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

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      above = _useState2[0],
      setAbove = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      below = _useState4[0],
      setBelow = _useState4[1];

  var valid = !above && !below;

  var _useState5 = (0, _react.useState)(0),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      storedValue = _useState6[0],
      setStoredValue = _useState6[1];

  (0, _react.useEffect)(function () {
    if (storedValue !== "-" && storedValue !== "" && value * visualScaling !== Number(storedValue)) {
      setStoredValue((0, _numberPrecision.times)(value, visualScaling));
    }
  }, [storedValue, value, visualScaling]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(GlobalSpinnerStyle, null), /*#__PURE__*/_react.default.createElement(InputContainer, Object.assign({}, otherProps, {
    css: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), {}, {
      backgroundColor: valid ? null : "red"
    })
  }), /*#__PURE__*/_react.default.createElement(InnerInputField, {
    className: "nodrag"
  }, prefix), /*#__PURE__*/_react.default.createElement(BasicInput, {
    type: "text",
    className: "nodrag" // min={min * visualScaling}
    // max={max}
    // step={step * visualScaling}
    ,
    value: storedValue,
    onChange: setNewFromInput,
    css: innerStyle,
    disabled: disabled
  }), /*#__PURE__*/_react.default.createElement(InnerInputField, {
    className: "nodrag"
  }, suffix), /*#__PURE__*/_react.default.createElement(InnerInputField, {
    className: "nodrag",
    css: {
      marginLeft: 2
    }
  }, /*#__PURE__*/_react.default.createElement(Spinner, {
    disabled: disabled,
    onClickDown: function onClickDown(e) {
      return setNewFromButton(-1 * step);
    },
    onClickUp: function onClickUp(e) {
      return setNewFromButton(step);
    }
  }))));
};

exports.NumberInput = NumberInput;

var ScrollRegion = function ScrollRegion(_ref15) {
  var children = _ref15.children,
      horizontal = _ref15.horizontal,
      vertical = _ref15.vertical,
      height = _ref15.height,
      width = _ref15.width;
  return /*#__PURE__*/_react.default.createElement(StyledScrollArea, {
    css: {
      height: height,
      width: width
    }
  }, /*#__PURE__*/_react.default.createElement(StyledViewport, null, children), horizontal && /*#__PURE__*/_react.default.createElement(StyledScrollbar, {
    orientation: "horizontal"
  }, /*#__PURE__*/_react.default.createElement(StyledScrollThumb, null)), vertical && /*#__PURE__*/_react.default.createElement(StyledScrollbar, {
    orientation: "vertical"
  }, /*#__PURE__*/_react.default.createElement(StyledScrollThumb, null)), /*#__PURE__*/_react.default.createElement(ScrollArea.Corner, null));
}; // Exports


exports.ScrollRegion = ScrollRegion;
var DropdownMenu = DropdownMenuPrimitive.Root;
exports.DropdownMenu = DropdownMenu;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
exports.DropdownMenuTrigger = DropdownMenuTrigger;
var DropdownMenuContent = StyledDropdownContent;
exports.DropdownMenuContent = DropdownMenuContent;
var DropdownMenuItem = HoverDropdownItem;
exports.DropdownMenuItem = DropdownMenuItem;
var DropdownMenuCheckboxItem = HoverDropdownCheckboxItem;
exports.DropdownMenuCheckboxItem = DropdownMenuCheckboxItem;
var DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
exports.DropdownMenuRadioGroup = DropdownMenuRadioGroup;
var DropdownMenuRadioItem = HoverDropdownRadioItem;
exports.DropdownMenuRadioItem = DropdownMenuRadioItem;
var DropdownMenuItemIndicator = StyledDropdownItemIndicator;
exports.DropdownMenuItemIndicator = DropdownMenuItemIndicator;
var DropdownMenuTriggerItem = HoverDropdownTriggerItem;
exports.DropdownMenuTriggerItem = DropdownMenuTriggerItem;
var DropdownMenuLabel = StyledDropdownLabel;
exports.DropdownMenuLabel = DropdownMenuLabel;
var DropdownMenuSeparator = StyledDropdownSeparator;
exports.DropdownMenuSeparator = DropdownMenuSeparator;
var ContextMenu = ContextMenuPrimitive.Root;
exports.ContextMenu = ContextMenu;
var ContextMenuTrigger = ContextMenuPrimitive.Trigger;
exports.ContextMenuTrigger = ContextMenuTrigger;
var ContextMenuContent = StyledContextContent;
exports.ContextMenuContent = ContextMenuContent;
var ContextMenuItem = HoverContextItem;
exports.ContextMenuItem = ContextMenuItem;
var ContextMenuCheckboxItem = HoverContextCheckboxItem;
exports.ContextMenuCheckboxItem = ContextMenuCheckboxItem;
var ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;
exports.ContextMenuRadioGroup = ContextMenuRadioGroup;
var ContextMenuRadioItem = HoverContextRadioItem;
exports.ContextMenuRadioItem = ContextMenuRadioItem;
var ContextMenuItemIndicator = StyledContextItemIndicator;
exports.ContextMenuItemIndicator = ContextMenuItemIndicator;
var ContextMenuTriggerItem = HoverContextTriggerItem;
exports.ContextMenuTriggerItem = ContextMenuTriggerItem;
var ContextMenuLabel = StyledContextLabel;
exports.ContextMenuLabel = ContextMenuLabel;
var ContextMenuSeparator = StyledContextSeparator;
exports.ContextMenuSeparator = ContextMenuSeparator;