"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Selectable = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _templateObject, _templateObject2;

var selectKeyframes = function selectKeyframes(props) {
  return (0, _styledComponents.keyframes)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n    0% {\n        box-shadow: 0pt 0pt 3pt 1pt ", ", 0pt 0pt 2pt 2pt ", ", inset 0pt 0pt 1pt 1pt ", ", 0pt 0pt 20pt 20pt ", ";\n    }\n\n    50% {\n        box-shadow: 0pt 0pt 3pt 1pt ", ", 0pt 0pt 2pt 5pt ", ", inset 0pt 0pt 1pt 1pt ", ", 0pt 0pt 20pt 20pt ", ";\n    }\n    \n    100% {\n        box-shadow: 0pt 0pt 3pt 1pt ", ", 0pt 0pt 2pt 2pt ", ", inset 0pt 0pt 1pt 1pt ", ", 0pt 0pt 20pt 20pt ", ";\n    }\n"])), props.selected ? 'rgba(255,255,255,0.5)' : 'transparent', props.selected ? props.highlightColor : 'transparent', props.selected ? 'rgba(0,0,0,0.7)' : 'transparent', props.selected ? 'rgba(0,0,0,0.4)' : 'transparent', props.selected ? 'rgba(255,255,255,0.5)' : 'transparent', props.selected ? props.highlightColor : 'transparent', props.selected ? 'rgba(0,0,0,0.7)' : 'transparent', props.selected ? 'rgba(0,0,0,0.4)' : 'transparent', props.selected ? 'rgba(255,255,255,0.5)' : 'transparent', props.selected ? props.highlightColor : 'transparent', props.selected ? 'rgba(0,0,0,0.7)' : 'transparent', props.selected ? 'rgba(0,0,0,0.4)' : 'transparent');
};

var Selectable = _styledComponents.default.div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n    animation: ", " 2s ease-in-out infinite reverse;\n"])), selectKeyframes);

exports.Selectable = Selectable;