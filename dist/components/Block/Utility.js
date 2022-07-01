"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollRegion = exports.NumberInput = exports.DropdownTrigger = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var ScrollArea = _interopRequireWildcard(require("@radix-ui/react-scroll-area"));

var _fi = require("react-icons/fi");

var _numberPrecision = require("number-precision");

var _InputAdornment = _interopRequireDefault(require("@mui/material/InputAdornment"));

var _lodash = require("lodash");

var _Menu = _interopRequireDefault(require("@mui/material/Menu"));

var _Fade = _interopRequireDefault(require("@mui/material/Fade"));

var _material = require("@mui/material");

var _excluded = ["prefix", "suffix", "style", "innerStyle", "step", "onChange", "min", "max", "value", "visualScaling", "disabled", "label"];

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// import { TextField, InputAdornment } from "@mui/material";
var DropdownTrigger = function DropdownTrigger(_ref) {
  var triggerComponent = _ref.triggerComponent,
      triggerProps = _ref.triggerProps,
      isChild = _ref.isChild,
      children = _ref.children;
  var Triggerer = triggerComponent;

  var _React$useState = _react.default.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      anchorEl = _React$useState2[0],
      setAnchorEl = _React$useState2[1];

  var open = Boolean(anchorEl);

  var handleClick = function handleClick(event) {
    setAnchorEl(event.currentTarget);
  };

  var handleClose = function handleClose() {
    setAnchorEl(null);
  };

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(Triggerer, _extends({}, triggerProps, {
    id: "fade-button",
    "aria-controls": open ? "fade-menu" : undefined,
    "aria-haspopup": "true",
    "aria-expanded": open ? "true" : undefined,
    onClick: handleClick
  })), /*#__PURE__*/_react.default.createElement(_Menu.default, {
    id: "fade-menu",
    MenuListProps: {
      "aria-labelledby": "fade-button"
    },
    anchorEl: anchorEl,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: isChild ? "right" : "left"
    },
    transformOrigin: {
      vertical: isChild ? "center" : "top",
      horizontal: "left"
    },
    open: open,
    onClose: handleClose,
    TransitionComponent: _Fade.default
  }, children));
}; // export const ContextTrigger = ({ triggerComponent, children }) => {
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


exports.DropdownTrigger = DropdownTrigger;
var StyledScrollArea = (0, _styledComponents.default)(ScrollArea.Root)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  overflow: hidden;\n  height: ", ";\n  width: ", ";\n"])), function (props) {
  return props.$containerHeight ? "".concat(props.$containerHeight, "px") : "100%";
}, function (props) {
  return props.$containerWidth ? "".concat(props.$containerWidth, "px") : "100%";
});
var StyledViewport = (0, _styledComponents.default)(ScrollArea.Viewport)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n  border-radius: inherit;\n  padding: 4px;\n"])));
var StyledScrollbar = (0, _styledComponents.default)(ScrollArea.Scrollbar)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  display: flex;\n  user-select: none;\n  touch-action: none;\n  padding: 2px;\n  background: #55555525;\n  transition: background 160ms ease-out;\n  &:hover: {\n    background: #45454540;\n  }\n"])));
var VerticalScrollBar = (0, _styledComponents.default)(StyledScrollbar)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  width: 8px;\n"])));
var HorizontalScrollBar = (0, _styledComponents.default)(StyledScrollbar)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  height: 8px;\n  flex-direction: column;\n"])));
var StyledScrollThumb = (0, _styledComponents.default)(ScrollArea.Thumb)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  flex: 1;\n  background: #eeeeee66;\n  border-radius: 8px;\n"]))); // export const OtherStyledSeparator = styled(SeparatorPrimitive.Root)(
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

var VALID_CHARS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "-"]; // const BasicInput = styled.input`
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

var SpinnerButton = _styledComponents.default.button({
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
    background: "#222222"
  },
  "&:hover": {
    background: "#222222"
  },
  opacity: "".concat(function (props) {
    return props.disabled ? 0.5 : 1;
  })
});

var Spinner = function Spinner(_ref2) {
  var onClickUp = _ref2.onClickUp,
      onClickDown = _ref2.onClickDown,
      disabled = _ref2.disabled,
      above = _ref2.above,
      below = _ref2.below;
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
    disabled: disabled || above,
    onClick: onClickUp,
    style: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    }
  }, /*#__PURE__*/_react.default.createElement(_fi.FiChevronUp, null)), /*#__PURE__*/_react.default.createElement(SpinnerButton, {
    disabled: disabled || below,
    onClick: onClickDown,
    style: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    }
  }, /*#__PURE__*/_react.default.createElement(_fi.FiChevronDown, null)));
}; // const InnerInputField = styled.div`
//   display: inline-flex;
//   font-size: 12px;
// `;


var NumberInput = /*#__PURE__*/(0, _react.forwardRef)(function (_ref3, ref) {
  var _ref3$prefix = _ref3.prefix,
      prefix = _ref3$prefix === void 0 ? "" : _ref3$prefix,
      _ref3$suffix = _ref3.suffix,
      suffix = _ref3$suffix === void 0 ? "" : _ref3$suffix,
      _ref3$style = _ref3.style,
      style = _ref3$style === void 0 ? {} : _ref3$style,
      _ref3$innerStyle = _ref3.innerStyle,
      innerStyle = _ref3$innerStyle === void 0 ? {} : _ref3$innerStyle,
      _ref3$step = _ref3.step,
      step = _ref3$step === void 0 ? 1 : _ref3$step,
      onChange = _ref3.onChange,
      min = _ref3.min,
      max = _ref3.max,
      value = _ref3.value,
      _ref3$visualScaling = _ref3.visualScaling,
      visualScaling = _ref3$visualScaling === void 0 ? 1 : _ref3$visualScaling,
      _ref3$disabled = _ref3.disabled,
      disabled = _ref3$disabled === void 0 ? false : _ref3$disabled,
      _ref3$label = _ref3.label,
      label = _ref3$label === void 0 ? null : _ref3$label,
      otherProps = _objectWithoutProperties(_ref3, _excluded);

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
      _useState2 = _slicedToArray(_useState, 2),
      above = _useState2[0],
      setAbove = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      below = _useState4[0],
      setBelow = _useState4[1];

  var valid = !above && !below;

  var _useState5 = (0, _react.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      storedValue = _useState6[0],
      setStoredValue = _useState6[1];

  (0, _react.useEffect)(function () {
    if (storedValue !== "-" && storedValue !== "" && value * visualScaling !== Number(storedValue)) {
      setStoredValue((0, _numberPrecision.times)(value, visualScaling));
    }
  }, [storedValue, value, visualScaling]);
  return /*#__PURE__*/_react.default.createElement(_material.TextField, _extends({
    ref: ref,
    type: "text",
    size: "small",
    color: valid ? 'highlightColor' : 'warning',
    className: "nodrag" // min={min * visualScaling}
    // max={max}
    ,
    step: step * visualScaling,
    style: {
      paddingRight: 0
    },
    InputProps: {
      className: 'nodrag',
      style: {
        paddingRight: 6
      },
      startAdornment: /*#__PURE__*/_react.default.createElement(_InputAdornment.default, {
        position: "start"
      }, prefix),
      endAdornment: /*#__PURE__*/_react.default.createElement(_InputAdornment.default, {
        position: "end"
      }, suffix, /*#__PURE__*/_react.default.createElement(Spinner, {
        disabled: disabled,
        above: above,
        below: below,
        onClickDown: function onClickDown(e) {
          return setNewFromButton(-1 * step);
        },
        onClickUp: function onClickUp(e) {
          return setNewFromButton(step);
        }
      }))
    },
    value: storedValue,
    onChange: setNewFromInput,
    disabled: disabled
  }, otherProps));
});
exports.NumberInput = NumberInput;

var ScrollRegion = function ScrollRegion(_ref4) {
  var children = _ref4.children,
      horizontal = _ref4.horizontal,
      vertical = _ref4.vertical,
      height = _ref4.height,
      width = _ref4.width;
  return /*#__PURE__*/_react.default.createElement(StyledScrollArea, {
    $containerHeight: height,
    $containerWidth: width
  }, /*#__PURE__*/_react.default.createElement(StyledViewport, null, children), horizontal && /*#__PURE__*/_react.default.createElement(HorizontalScrollBar, {
    orientation: "horizontal"
  }, /*#__PURE__*/_react.default.createElement(StyledScrollThumb, null)), vertical && /*#__PURE__*/_react.default.createElement(VerticalScrollBar, {
    orientation: "vertical"
  }, /*#__PURE__*/_react.default.createElement(StyledScrollThumb, null)), /*#__PURE__*/_react.default.createElement(ScrollArea.Corner, null));
}; // Exports
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


exports.ScrollRegion = ScrollRegion;