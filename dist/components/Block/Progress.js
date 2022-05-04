"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressBar = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _web = require("@react-spring/web");

var _reactSpring = require("react-spring");

var _ProgrammingContext = require("../ProgrammingContext");

var ProgressBar = function ProgressBar(_ref) {
  var progress = _ref.progress,
      color = _ref.color;

  var _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      progressValue = _useState2[0],
      setProgressValue = _useState2[1];

  var clock = (0, _ProgrammingContext.useProgrammingStore)(function (state) {
    return state.clock;
  });
  var shown = progressValue > 0 && progress !== null && progress !== undefined && progressValue !== null && progressValue !== undefined;
  var width = shown ? Math.min(100, progressValue * 100) : 0;
  var outerStyle = (0, _web.useSpring)({
    transform: shown ? 'scaleY(1)' : 'scaleY(0)',
    opacity: shown ? 1 : 0,
    config: _reactSpring.config.stiff
  });
  var innerStyle = (0, _web.useSpring)({
    width: "calc(".concat(width, "% - 2pt)"),
    config: _reactSpring.config.stiff
  });
  (0, _react.useEffect)(function () {
    clock.update();
    var time = clock.getElapsed() * 1000;
    var newProgressValue = typeof progress === 'function' ? progress(time) : progress;
    setProgressValue(newProgressValue);

    if (typeof progress === 'function') {
      var interval = setInterval(function () {
        clock.update();
        var time = clock.getElapsed() * 1000;
        var newProgressValue = typeof progress === 'function' ? progress(time) : progress;
        setProgressValue(newProgressValue);
      }, 300);
      return function () {
        return clearInterval(interval);
      };
    }
  }, [clock, progress]); // const progressValue = useProgrammingStore(useCallback(state=>{
  //     const time = state.clock.getElapsed() * 1000;
  //     return typeof progress === 'function' ? progress(time) : progress
  // },[progress]))

  return /*#__PURE__*/_react.default.createElement(_web.animated.div, {
    hidden: !shown,
    style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, outerStyle), {}, {
      height: 8,
      borderRadius: 100,
      backgroundColor: '#00000044',
      marginLeft: 4,
      marginRight: 4
    })
  }, /*#__PURE__*/_react.default.createElement(_web.animated.div, {
    style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, innerStyle), {}, {
      backgroundColor: color,
      borderRadius: 100,
      margin: 1,
      height: 6,
      boxShadow: '0 0 1 1 #00000022'
    })
  }));
};

exports.ProgressBar = ProgressBar;