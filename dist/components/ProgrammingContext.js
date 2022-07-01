"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useProgrammingStore = exports.ProgrammingProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _defaultStore = require("./defaultStore");

var _zustand = require("zustand");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ProgrammingContext = /*#__PURE__*/(0, _react.createContext)();

var useProgrammingStore = function useProgrammingStore(selector, equalityFn) {
  var store = (0, _react.useContext)(ProgrammingContext);
  return (0, _zustand.useStore)(store, selector, equalityFn);
};

exports.useProgrammingStore = useProgrammingStore;

var ProgrammingProvider = function ProgrammingProvider(_ref) {
  var store = _ref.store,
      children = _ref.children;
  return /*#__PURE__*/_react.default.createElement(ProgrammingContext.Provider, {
    value: store ? store : _defaultStore.useDefaultProgrammingStore
  }, children);
};

exports.ProgrammingProvider = ProgrammingProvider;