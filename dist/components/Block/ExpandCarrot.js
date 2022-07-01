"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpandCarrot = void 0;

var _react = _interopRequireDefault(require("react"));

var _web = require("@react-spring/web");

var _reactSpring = require("react-spring");

var _SvgIcon = _interopRequireDefault(require("@mui/material/SvgIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ExpandCarrot = function ExpandCarrot(_ref) {
  var expanded = _ref.expanded,
      onClick = _ref.onClick;
  var arrowStyle = (0, _web.useSpring)({
    d: expanded ? "M770.578,215.347L399.578,586.347L26.887,213.656" : "M214.078,28.156L585.078,399.156L212.387,771.847",
    config: _reactSpring.config.wobbly
  });
  return /*#__PURE__*/_react.default.createElement(_SvgIcon.default, {
    sx: {
      fontSize: 15
    },
    onClick: onClick //   width="10px"
    //   height="10px"
    ,
    viewBox: "0 0 800 800",
    style: {
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeMiterlimit: 1.5
    }
  }, /*#__PURE__*/_react.default.createElement(_web.animated.path, _extends({}, arrowStyle, {
    style: {
      fill: "none",
      stroke: "white",
      strokeOpacity: 1,
      strokeWidth: 60
    }
  })));
};

exports.ExpandCarrot = ExpandCarrot;