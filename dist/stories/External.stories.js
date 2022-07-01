"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.External = void 0;

var _react = _interopRequireWildcard(require("react"));

var _components = require("../components");

var _basicConfig = _interopRequireDefault(require("./assets/basicConfig"));

var _basicStarter = _interopRequireDefault(require("./assets/basicStarter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
var _default = {
  title: 'External',
  component: _components.ExternalBlock
}; // More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

exports.default = _default;

var Template = function Template(args) {
  var drawers = args.drawers,
      objectTypes = args.objectTypes,
      programData = args.programData,
      highlightColor = args.highlightColor;
  (0, _react.useLayoutEffect)(function () {
    _components.useDefaultProgrammingStore.setState({
      programSpec: {
        drawers: drawers,
        objectTypes: objectTypes
      },
      programData: programData
    });
  });
  var instRef = (0, _components.referenceTemplateFromSpec)('hatType', programData['6dewwwwww'], objectTypes.hatType);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 300,
      padding: 4
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      paddingBottom: 4
    }
  }, /*#__PURE__*/_react.default.createElement(_components.ExternalBlock, {
    store: _components.useDefaultProgrammingStore,
    data: programData['2dfsessfs'],
    highlightColor: highlightColor,
    context: {}
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      paddingBottom: 4
    }
  }, /*#__PURE__*/_react.default.createElement(_components.ExternalBlock, {
    store: _components.useDefaultProgrammingStore,
    data: instRef,
    highlightColor: highlightColor,
    context: {}
  })));
};

var External = Template.bind({}); // More on args: https://storybook.js.org/docs/react/writing-stories/args

exports.External = External;
External.args = _objectSpread(_objectSpread({
  highlightColor: '#ff00ff',
  drawerWidth: 235
}, _basicConfig.default), _basicStarter.default);