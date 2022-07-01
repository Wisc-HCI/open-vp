"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timer = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// Credit to Mugen87 while we wait for this to be added to three.js
// https://github.com/Mugen87/three.js/blob/3a6d8139367e710a3d4fef274d530dda485f1110/examples/jsm/misc/Timer.js
var Timer = /*#__PURE__*/function () {
  function Timer() {
    _classCallCheck(this, Timer);

    this._previousTime = 0;
    this._currentTime = 0;
    this._delta = 0;
    this._elapsed = 0;
    this._timescale = 1;
    this._useFixedDelta = false;
    this._fixedDelta = 16.67; // ms, corresponds to approx. 60 FPS
    // use Page Visibility API to avoid large time delta values

    this._usePageVisibilityAPI = typeof document !== 'undefined' && document.hidden !== undefined;

    if (this._usePageVisibilityAPI === true) {
      this._pageVisibilityHandler = handleVisibilityChange.bind(this);
      document.addEventListener('visibilitychange', this._pageVisibilityHandler, false);
    }
  }

  _createClass(Timer, [{
    key: "disableFixedDelta",
    value: function disableFixedDelta() {
      this._useFixedDelta = false;
      return this;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      if (this._usePageVisibilityAPI === true) {
        document.removeEventListener('visibilitychange', this._pageVisibilityHandler);
      }

      return this;
    }
  }, {
    key: "enableFixedDelta",
    value: function enableFixedDelta() {
      this._useFixedDelta = true;
      return this;
    }
  }, {
    key: "getDelta",
    value: function getDelta() {
      return this._delta / 1000;
    }
  }, {
    key: "getElapsed",
    value: function getElapsed() {
      return this._elapsed / 1000;
    }
  }, {
    key: "getFixedDelta",
    value: function getFixedDelta() {
      return this._fixedDelta / 1000;
    }
  }, {
    key: "getTimescale",
    value: function getTimescale() {
      return this._timescale;
    }
  }, {
    key: "reset",
    value: function reset() {
      this._currentTime = this._now();
      return this;
    }
  }, {
    key: "setFixedDelta",
    value: function setFixedDelta(fixedDelta) {
      this._fixedDelta = fixedDelta * 1000;
      return this;
    }
  }, {
    key: "setTimescale",
    value: function setTimescale(timescale) {
      this._timescale = timescale;
      return this;
    }
  }, {
    key: "update",
    value: function update() {
      if (this._useFixedDelta === true) {
        this._delta = this._fixedDelta;
      } else {
        this._previousTime = this._currentTime;
        this._currentTime = this._now();
        this._delta = this._currentTime - this._previousTime;
      }

      this._delta *= this._timescale;
      this._elapsed += this._delta; // _elapsed is the accumulation of all previous deltas

      return this;
    } // private

  }, {
    key: "_now",
    value: function _now() {
      return (typeof performance === 'undefined' ? Date : performance).now();
    }
  }]);

  return Timer;
}();

exports.Timer = Timer;

function handleVisibilityChange() {
  if (document.hidden === false) this.reset();
}