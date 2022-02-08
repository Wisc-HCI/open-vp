"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpandCarrot = void 0;

var _fi = require("react-icons/fi");

var _web = require("@react-spring/web");

var _reactSpring = require("react-spring");

var ExpandCarrot = function ExpandCarrot(_ref) {
  var expanded = _ref.expanded;
  var carrotStyle = (0, _web.useSpring)({
    rotate: expanded ? '90deg' : '0deg',
    config: _reactSpring.config.wobbly,
    height: 20,
    width: 20
  });
  return /*#__PURE__*/React.createElement(_web.animated.div, {
    style: carrotStyle
  }, /*#__PURE__*/React.createElement(_fi.FiChevronRight, null));
};

exports.ExpandCarrot = ExpandCarrot;