"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpandCarrot = void 0;

var _react = _interopRequireDefault(require("react"));

var _fi = require("react-icons/fi");

var _web = require("@react-spring/web");

var _reactSpring = require("react-spring");

var ExpandCarrot = function ExpandCarrot(_ref) {
  var expanded = _ref.expanded,
      onClick = _ref.onClick;
  var carrotStyle = (0, _web.useSpring)({
    rotate: expanded ? '90deg' : '0deg',
    config: _reactSpring.config.wobbly,
    height: 20,
    width: 20
  });
  return /*#__PURE__*/_react.default.createElement(_web.animated.div, {
    onClick: onClick,
    style: carrotStyle
  }, /*#__PURE__*/_react.default.createElement(_fi.FiChevronRight, null));
};

exports.ExpandCarrot = ExpandCarrot;