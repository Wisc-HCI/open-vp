"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberInput = void 0;

var _grommet = require("grommet");

var _lodash = require("lodash");

var NumberInput = function NumberInput(_ref) {
  var value = _ref.value,
      min = _ref.min,
      max = _ref.max,
      _onChange = _ref.onChange,
      disabled = _ref.disabled,
      style = _ref.style;
  return /*#__PURE__*/React.createElement(_grommet.TextInput, {
    disabled: disabled,
    value: value,
    type: "number",
    step: 0.1,
    textAlign: "center",
    style: {
      fontSize: 14,
      color: (0, _lodash.toNumber)(value) >= min && (0, _lodash.toNumber)(value) <= max ? style === null || style === void 0 ? void 0 : style.color : 'red'
    },
    onChange: function onChange(event) {
      _onChange((0, _lodash.toNumber)(event.target.value));
    }
  });
};

exports.NumberInput = NumberInput;