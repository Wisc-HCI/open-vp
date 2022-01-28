"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useProgrammingStore = exports.ProgrammingProvider = void 0;

var _react = require("react");

var _defaultStore = require("./defaultStore");

var _zustand = require("zustand");

var ProgrammingContext = /*#__PURE__*/(0, _react.createContext)();

var useProgrammingStore = function useProgrammingStore(selector, equalityFn) {
  var store = (0, _react.useContext)(ProgrammingContext);
  return (0, _zustand.useStore)(store, selector, equalityFn);
};

exports.useProgrammingStore = useProgrammingStore;

var ProgrammingProvider = function ProgrammingProvider(_ref) {
  var store = _ref.store,
      children = _ref.children;
  return /*#__PURE__*/React.createElement(ProgrammingContext.Provider, {
    value: store ? store : _defaultStore.useDefaultProgrammingStore
  }, children);
};

exports.ProgrammingProvider = ProgrammingProvider;