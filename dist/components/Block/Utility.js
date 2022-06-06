"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolTip = exports.Switch = exports.ScrollRegion = exports.RightSlot = exports.OtherStyledSeparator = exports.NumberInput = exports.Input = exports.DropdownMenuTriggerItem = exports.DropdownMenuTrigger = exports.DropdownMenuSeparator = exports.DropdownMenuRadioItem = exports.DropdownMenuRadioGroup = exports.DropdownMenuLabel = exports.DropdownMenuItemIndicator = exports.DropdownMenuItem = exports.DropdownMenuContent = exports.DropdownMenuCheckboxItem = exports.DropdownMenu = exports.ContextMenuTriggerItem = exports.ContextMenuTrigger = exports.ContextMenuSeparator = exports.ContextMenuRadioItem = exports.ContextMenuRadioGroup = exports.ContextMenuLabel = exports.ContextMenuItemIndicator = exports.ContextMenuItem = exports.ContextMenuContent = exports.ContextMenuCheckboxItem = exports.ContextMenu = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var DropdownMenuPrimitive = _interopRequireWildcard(require("@radix-ui/react-dropdown-menu"));

var ContextMenuPrimitive = _interopRequireWildcard(require("@radix-ui/react-context-menu"));

var SeparatorPrimitive = _interopRequireWildcard(require("@radix-ui/react-separator"));

var SwitchPrimitive = _interopRequireWildcard(require("@radix-ui/react-switch"));

var LabelPrimitive = _interopRequireWildcard(require("@radix-ui/react-label"));

var TooltipPrimitive = _interopRequireWildcard(require("@radix-ui/react-tooltip"));

var ScrollArea = _interopRequireWildcard(require("@radix-ui/react-scroll-area"));

var _fi = require("react-icons/fi");

var _numberPrecision = require("number-precision");

var _lodash = require("lodash");

var _excluded = ["prefix", "suffix", "style", "innerStyle", "step", "onChange", "min", "max", "value", "visualScaling", "disabled"];

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30;

var GlobalSpinnerStyle = (0, _styledComponents.createGlobalStyle)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}"])));
var slideUpAndFade = (0, _styledComponents.keyframes)(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  from {\n    opacity: 0;\n    transform: translateY(2px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0)\n  }\n"])));
var slideRightAndFade = (0, _styledComponents.keyframes)(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  from {\n    opacity: 0;\n    transform: translateX(-2px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0)\n  }\n"])));
var slideDownAndFade = (0, _styledComponents.keyframes)(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  from {\n    opacity: 0;\n    transform: translateY(-2px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0)\n  }\n"])));
var slideLeftAndFade = (0, _styledComponents.keyframes)(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  from {\n    opacity: 0;\n    transform: translateX(2px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0)\n  }\n"])));
var contentStyle = {
  fontFamily: 'Helvetica',
  minWidth: '100px',
  backgroundColor: '#303030f5',
  color: '#efefef',
  borderRadius: '6px',
  padding: '5px',
  boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
  animationFillMode: 'forwards',
  willChange: 'transform, opacity',
  '&[data-state="open"]': {
    '&[data-side="top"]': {
      animation: (0, _styledComponents.css)(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["", " 400ms cubic-bezier(0.16, 1, 0.3, 1)"])), slideDownAndFade)
    },
    '&[data-side="right"]': {
      animation: (0, _styledComponents.css)(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["", " 400ms cubic-bezier(0.16, 1, 0.3, 1)"])), slideLeftAndFade)
    },
    '&[data-side="bottom"]': {
      animation: (0, _styledComponents.css)(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["", " 400ms cubic-bezier(0.16, 1, 0.3, 1)"])), slideUpAndFade)
    },
    '&[data-side="left"]': {
      animation: (0, _styledComponents.css)(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["", " 400ms cubic-bezier(0.16, 1, 0.3, 1)"])), slideRightAndFade)
    }
  }
};

var itemStyle = function itemStyle(props) {
  return {
    all: 'unset',
    fontSize: '12px',
    lineHeight: 1,
    color: '#efefef',
    borderRadius: '3px',
    display: 'flex',
    alignItems: 'center',
    height: '25px',
    padding: '0 5px',
    position: 'relative',
    paddingLeft: '25px',
    userSelect: 'none',
    '&[data-disabled]': {
      color: '#dedede',
      pointerEvents: 'none'
    },
    '&[data-state="open"]': {
      background: "".concat(props.$highlightColor, "77"),
      color: '#efefef'
    },
    '&:focus': {
      background: props.$highlightColor,
      color: '#efefef'
    },
    '&:hover': {
      background: props.$highlightColor,
      color: '#efefef'
    }
  };
}; // css`
//   all: unset;
//   font-size: 12px;
//   line-height: 1;
//   color: #efefef;
//   border-radius: 3px;
//   display: flex;
//   align-items: center;
//   height: 25px;
//   padding: 0 5px;
//   position: relative;
//   padding-left: 25px;
//   user-select: none;
//   &[data-disabled]: {
//     color: #dedede;
//     pointer-events: none;
//   }
//   &[data-state="open"]: {
//     background-color: #efefef;
//     color: ${props=>props.$highlightColor};
//   }
//   &:focus: {
//     background-color: ${props=>props.$highlightColor};
//     color: #efefef;
//   }
//   &:hover: {
//     background-color: ${props=>props.$highlightColor};
//     color: #efefef;
//   }
// `


var StyledScrollArea = (0, _styledComponents.default)(ScrollArea.Root)(_templateObject10 || (_templateObject10 = (0, _taggedTemplateLiteral2.default)(["\n  overflow: hidden;\n  height: ", ";\n  width: ", ";\n"])), function (props) {
  return props.$containerHeight ? "".concat(props.$containerHeight, "px") : '100%';
}, function (props) {
  return props.$containerWidth ? "".concat(props.$containerWidth, "px") : '100%';
});
var StyledViewport = (0, _styledComponents.default)(ScrollArea.Viewport)(_templateObject11 || (_templateObject11 = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  height: 100%;\n  border-radius: inherit;\n  padding: 4px;\n"])));
var StyledScrollbar = (0, _styledComponents.default)(ScrollArea.Scrollbar)(_templateObject12 || (_templateObject12 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  user-select: none;\n  touch-action: none;\n  padding: 2px;\n  background: #55555525;\n  transition: background 160ms ease-out;\n  &:hover: { \n    background: #45454540 \n  };\n"])));
var VerticalScrollBar = (0, _styledComponents.default)(StyledScrollbar)(_templateObject13 || (_templateObject13 = (0, _taggedTemplateLiteral2.default)(["\n  width: 8px;\n"])));
var HorizontalScrollBar = (0, _styledComponents.default)(StyledScrollbar)(_templateObject14 || (_templateObject14 = (0, _taggedTemplateLiteral2.default)(["\n  height: 8px;\n  flex-direction: column;\n"])));
var StyledScrollThumb = (0, _styledComponents.default)(ScrollArea.Thumb)(_templateObject15 || (_templateObject15 = (0, _taggedTemplateLiteral2.default)(["\n  flex: 1;\n  background: #eeeeee66;\n  border-radius: 8px;\n"])));
var OtherStyledSeparator = (0, _styledComponents.default)(SeparatorPrimitive.Root)(function (props) {
  return {
    background: '#efefef',
    backgroundColor: '#efefef',
    height: props.orientation === 'horizontal' ? '1px' : props.$height ? props.$height : '100%',
    width: props.orientation === 'vertical' ? '1px' : props.$width ? props.$width : '100%'
  };
});
exports.OtherStyledSeparator = OtherStyledSeparator;
var StyledDropdownContent = (0, _styledComponents.default)(DropdownMenuPrimitive.Content)(contentStyle);
var StyledContextContent = (0, _styledComponents.default)(ContextMenuPrimitive.Content)(contentStyle);
var StyledTooltipContent = (0, _styledComponents.default)(TooltipPrimitive.Content)(contentStyle);
var HoverDropdownItem = (0, _styledComponents.default)(DropdownMenuPrimitive.Item)(itemStyle);
var HoverDropdownCheckboxItem = (0, _styledComponents.default)(DropdownMenuPrimitive.CheckboxItem)(itemStyle);
var HoverDropdownRadioItem = (0, _styledComponents.default)(DropdownMenuPrimitive.RadioItem)(itemStyle);
var HoverDropdownTriggerItem = (0, _styledComponents.default)(DropdownMenuPrimitive.TriggerItem)(itemStyle);
var HoverContextItem = (0, _styledComponents.default)(ContextMenuPrimitive.Item)(itemStyle);
var HoverContextCheckboxItem = (0, _styledComponents.default)(ContextMenuPrimitive.CheckboxItem)(itemStyle);
var HoverContextRadioItem = (0, _styledComponents.default)(ContextMenuPrimitive.RadioItem)(itemStyle);
var HoverContextTriggerItem = (0, _styledComponents.default)(ContextMenuPrimitive.TriggerItem)(itemStyle);
var StyledDropdownLabel = (0, _styledComponents.default)(DropdownMenuPrimitive.Label)(_templateObject16 || (_templateObject16 = (0, _taggedTemplateLiteral2.default)(["\n  padding-left: 25px;\n  font-size: 12px;\n  line-height: 25px;\n  color: #a0a0a0;\n"])));
var StyledContextLabel = (0, _styledComponents.default)(ContextMenuPrimitive.Label)(_templateObject17 || (_templateObject17 = (0, _taggedTemplateLiteral2.default)(["\npadding-left: 25px;\nfont-size: 12px;\nline-height: 25px;\ncolor: #a0a0a0;\n"])));
var StyledDropdownSeparator = (0, _styledComponents.default)(DropdownMenuPrimitive.Separator)(_templateObject18 || (_templateObject18 = (0, _taggedTemplateLiteral2.default)(["\n  height: 1px;\n  background-color: #efefef;\n  margin: 5px;\n"])));
var StyledContextSeparator = (0, _styledComponents.default)(ContextMenuPrimitive.Separator)(_templateObject19 || (_templateObject19 = (0, _taggedTemplateLiteral2.default)(["\n  height: 1px;\n  background-color: #efefef;\n  margin: 5px;\n"])));
var StyledDropdownItemIndicator = (0, _styledComponents.default)(DropdownMenuPrimitive.ItemIndicator)(_templateObject20 || (_templateObject20 = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  left: 0px;\n  width: 25px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n"])));
var StyledContextItemIndicator = (0, _styledComponents.default)(ContextMenuPrimitive.ItemIndicator)(_templateObject21 || (_templateObject21 = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  left: 0px;\n  width: 25px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n"])));
var Tooltip = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;

var RightSlot = _styledComponents.default.div(_templateObject22 || (_templateObject22 = (0, _taggedTemplateLiteral2.default)(["\n  margin-left: auto;\n  padding-left: 20px;\n  color: #efefef;\n  :focus > &: { color: white };\n  [data-disabled] &: { color: #efefef };\n"])));

exports.RightSlot = RightSlot;
var StyledSwitch = (0, _styledComponents.default)(SwitchPrimitive.Root)(_templateObject23 || (_templateObject23 = (0, _taggedTemplateLiteral2.default)(["\n  all: unset;\n  width: 42px;\n  height: 25px;\n  opacity: ", ";\n  background-color: ", ";\n  border-radius: 9999px;\n  position: relative;\n  box-shadow: inset 0.5px 0.5px 0px 0px rgba(55,55,55,0.25);\n  WebkitTapHighlightColor: rgba(0, 0, 0, 0);\n"])), function (props) {
  return props.disabled ? 0.7 : 1;
}, function (props) {
  return props.checked ? props.$highlightColor : '#111111';
});
var StyledThumb = (0, _styledComponents.default)(SwitchPrimitive.Thumb)(_templateObject24 || (_templateObject24 = (0, _taggedTemplateLiteral2.default)(["\n  display: block;\n  width: 21px;\n  height: 21px;\n  background-color: white;\n  border-radius: 9999px;\n  box-shadow: 0.5px 0.5px 0px 0px rgba(55,55,55,0.25);\n  transition: transform 100ms;\n  transform: ", ";\n  will-change: transform;\n"])), function (props) {
  return props.checked ? 'translateX(19px)' : 'translateX(2px)';
});
var SwitchThumb = StyledThumb;
var Label = (0, _styledComponents.default)(LabelPrimitive.Root)(_templateObject25 || (_templateObject25 = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 12px;\n  font-weight: 500px;\n  color: white;\n  user-select: none;\n"])));
var StyledArrow = (0, _styledComponents.default)(TooltipPrimitive.Arrow)(_templateObject26 || (_templateObject26 = (0, _taggedTemplateLiteral2.default)(["fill: #303030f5"])));

var Switch = function Switch(_ref) {
  var onCheckedChange = _ref.onCheckedChange,
      disabled = _ref.disabled,
      value = _ref.value,
      highlightColor = _ref.highlightColor,
      label = _ref.label;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Label, {
    htmlFor: "switch-".concat(label),
    style: {
      paddingRight: 5
    }
  }, label), /*#__PURE__*/_react.default.createElement(StyledSwitch, {
    id: "switch-".concat(label),
    checked: value,
    disabled: disabled,
    $highlightColor: highlightColor,
    onCheckedChange: onCheckedChange
  }, /*#__PURE__*/_react.default.createElement(SwitchThumb, {
    checked: value
  })));
};

exports.Switch = Switch;

var ToolTip = function ToolTip(_ref2) {
  var children = _ref2.children,
      content = _ref2.content,
      hideArrow = _ref2.hideArrow;
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

var Input = _styledComponents.default.input(_templateObject27 || (_templateObject27 = (0, _taggedTemplateLiteral2.default)(["\n  border-width: 0;\n  outline: none;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  padding: 0 10px;\n  height: 35px;\n  font-size: 12px;\n  line-height: 1;\n  color: white;\n  background-color: #22222299;\n  box-shadow: 0 0 0 1px #222222;\n  &:focus: { box-shadow: 0 0 0 2px #222222 };\n"])));

exports.Input = Input;
var VALID_CHARS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "-"];

var BasicInput = _styledComponents.default.input(_templateObject28 || (_templateObject28 = (0, _taggedTemplateLiteral2.default)(["\n  border-width: 0;\n  width: 40px;\n  outline: none;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 0px;\n  padding: 0 5px;\n  height: 35px;\n  font-size: 12px;\n  line-height: 1;\n  color: white;\n  background-color: transparent;\n"])));

var InputContainer = _styledComponents.default.div(_templateObject29 || (_templateObject29 = (0, _taggedTemplateLiteral2.default)(["\n  padding: 0 5px 0 10px;\n  color: white;\n  border-radius: 4px;\n  display: inline-flex;\n  align-items: center;\n  align-content: center;\n  justify-content: center;\n  background-color: #22222299;\n  vertical-align: center;\n  box-shadow: 0 0 0 1px #222222;\n  &:focus: { box-shadow: 0 0 0 2px #222222 };\n"])));

var SpinnerButton = _styledComponents.default.button({
  all: 'unset',
  display: 'flex',
  flexDirection: 'column',
  padding: '2px',
  margin: '0px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  lineHeight: 1,
  height: '10px',
  background: '#22222299',
  '&:focus': {
    background: '#222222'
  },
  '&:hover': {
    background: '#222222'
  }
});

var Spinner = function Spinner(_ref3) {
  var onClickUp = _ref3.onClickUp,
      onClickDown = _ref3.onClickDown,
      disabled = _ref3.disabled;
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginLeft: 3,
      display: "inline-flex",
      flexDirection: "column",
      borderRadius: 3,
      justifyContent: "center",
      alignItems: "center"
    }
  }, /*#__PURE__*/_react.default.createElement(SpinnerButton, {
    disabled: disabled,
    onClick: onClickUp,
    style: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    }
  }, /*#__PURE__*/_react.default.createElement(_fi.FiChevronUp, null)), /*#__PURE__*/_react.default.createElement(SpinnerButton, {
    disabled: disabled,
    onClick: onClickDown,
    style: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    }
  }, /*#__PURE__*/_react.default.createElement(_fi.FiChevronDown, null)));
};

var InnerInputField = _styledComponents.default.div(_templateObject30 || (_templateObject30 = (0, _taggedTemplateLiteral2.default)(["\n  display: inline-flex;\n  font-size: 12pt;\n"])));

var NumberInput = function NumberInput(_ref4) {
  var _ref4$prefix = _ref4.prefix,
      prefix = _ref4$prefix === void 0 ? "" : _ref4$prefix,
      _ref4$suffix = _ref4.suffix,
      suffix = _ref4$suffix === void 0 ? "" : _ref4$suffix,
      _ref4$style = _ref4.style,
      style = _ref4$style === void 0 ? {} : _ref4$style,
      _ref4$innerStyle = _ref4.innerStyle,
      innerStyle = _ref4$innerStyle === void 0 ? {} : _ref4$innerStyle,
      _ref4$step = _ref4.step,
      step = _ref4$step === void 0 ? 1 : _ref4$step,
      onChange = _ref4.onChange,
      min = _ref4.min,
      max = _ref4.max,
      value = _ref4.value,
      _ref4$visualScaling = _ref4.visualScaling,
      visualScaling = _ref4$visualScaling === void 0 ? 1 : _ref4$visualScaling,
      _ref4$disabled = _ref4.disabled,
      disabled = _ref4$disabled === void 0 ? false : _ref4$disabled,
      otherProps = (0, _objectWithoutProperties2.default)(_ref4, _excluded);

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
    style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), {}, {
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
    style: innerStyle,
    disabled: disabled
  }), /*#__PURE__*/_react.default.createElement(InnerInputField, {
    className: "nodrag"
  }, suffix), /*#__PURE__*/_react.default.createElement(InnerInputField, {
    className: "nodrag",
    style: {
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

var ScrollRegion = function ScrollRegion(_ref5) {
  var children = _ref5.children,
      horizontal = _ref5.horizontal,
      vertical = _ref5.vertical,
      height = _ref5.height,
      width = _ref5.width;
  return /*#__PURE__*/_react.default.createElement(StyledScrollArea, {
    $containerHeight: height,
    $containerWidth: width
  }, /*#__PURE__*/_react.default.createElement(StyledViewport, null, children), horizontal && /*#__PURE__*/_react.default.createElement(HorizontalScrollBar, {
    orientation: "horizontal"
  }, /*#__PURE__*/_react.default.createElement(StyledScrollThumb, null)), vertical && /*#__PURE__*/_react.default.createElement(VerticalScrollBar, {
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