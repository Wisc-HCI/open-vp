"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectKeyframes = exports.Selectable = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _templateObject, _templateObject2;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var selectKeyframes = function selectKeyframes(props) {
  return (0, _styledComponents.keyframes)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    0% {\n        box-shadow: 0pt 0pt 3pt 1pt ", ", 0pt 0pt 2pt 2pt ", ", inset 0pt 0pt 1pt 1pt ", ", 0pt 0pt 20pt 20pt ", ";\n    }\n\n    50% {\n        box-shadow: 0pt 0pt 3pt 1pt ", ", 0pt 0pt 2pt 5pt ", ", inset 0pt 0pt 1pt 1pt ", ", 0pt 0pt 20pt 20pt ", ";\n    }\n    \n    100% {\n        box-shadow: 0pt 0pt 3pt 1pt ", ", 0pt 0pt 2pt 2pt ", ", inset 0pt 0pt 1pt 1pt ", ", 0pt 0pt 20pt 20pt ", ";\n    }\n"])), props.selected ? 'rgba(255,255,255,0.5)' : 'transparent', props.selected ? props.highlightColor : 'transparent', props.selected ? 'rgba(0,0,0,0.7)' : 'transparent', props.selected ? 'rgba(0,0,0,0.4)' : 'transparent', props.selected ? 'rgba(255,255,255,0.5)' : 'transparent', props.selected ? props.highlightColor : 'transparent', props.selected ? 'rgba(0,0,0,0.7)' : 'transparent', props.selected ? 'rgba(0,0,0,0.4)' : 'transparent', props.selected ? 'rgba(255,255,255,0.5)' : 'transparent', props.selected ? props.highlightColor : 'transparent', props.selected ? 'rgba(0,0,0,0.7)' : 'transparent', props.selected ? 'rgba(0,0,0,0.4)' : 'transparent');
};

exports.selectKeyframes = selectKeyframes;

var Selectable = _styledComponents.default.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    animation: ", " 2s ease-in-out infinite reverse;\n"])), selectKeyframes);

exports.Selectable = Selectable;