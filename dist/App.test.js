"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _react = require("@testing-library/react");

var _App = _interopRequireDefault(require("./App"));

test('renders learn react link', function () {
  (0, _react.render)( /*#__PURE__*/React.createElement(_App.default, null));

  var linkElement = _react.screen.getByText(/learn react/i);

  expect(linkElement).toBeInTheDocument();
});