"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logo = _interopRequireDefault(require("./logo.svg"));

require("./App.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function App() {
  return /*#__PURE__*/React.createElement("div", {
    className: "App"
  }, /*#__PURE__*/React.createElement("header", {
    className: "App-header"
  }, /*#__PURE__*/React.createElement("img", {
    src: _logo.default,
    className: "App-logo",
    alt: "logo"
  }), /*#__PURE__*/React.createElement("p", null, "Edit ", /*#__PURE__*/React.createElement("code", null, "src/App.js"), " and save to reload."), /*#__PURE__*/React.createElement("a", {
    className: "App-link",
    href: "https://reactjs.org",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Learn React")));
}

var _default = App;
exports.default = _default;