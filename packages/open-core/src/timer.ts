// Credit to Mugen87 while we wait for this to be added to three.js
// https://github.com/Mugen87/three.js/blob/3a6d8139367e710a3d4fef274d530dda485f1110/examples/jsm/misc/Timer.js

class Timer {
  _previousTime: number;
  _currentTime: number;
  _delta: number;
  _elapsed: number;
  _timescale: number;
  _useFixedDelta: boolean;
  _fixedDelta: number;

  /**
   * A timer utility class.
   * @param {Boolean|undefined} useFixedDelta - If set, the delta value is fixed.
   * @param {Number|undefined} fixedDelta - The fixed delta value.
   * @param {Number|undefined} timescale - A time multiplier.
   **/

  constructor(
    useFixedDelta: boolean | undefined,
    fixedDelta: number | undefined,
    timescale: number | undefined,
  ) {
    this._previousTime = 0;
    this._currentTime = 0;

    this._delta = 0;
    this._elapsed = 0;

    this._timescale = timescale || 1;

    this._useFixedDelta = useFixedDelta || false;
    this._fixedDelta = fixedDelta || 16.67; // ms, corresponds to approx. 60 FPS
  }

  disableFixedDelta(): this {
    this._useFixedDelta = false;

    return this;
  }

  enableFixedDelta(): this {
    this._useFixedDelta = true;

    return this;
  }

  getDelta(): number {
    return this._delta / 1000;
  }

  getElapsed(): number {
    return this._elapsed / 1000;
  }

  getFixedDelta(): number {
    return this._fixedDelta / 1000;
  }

  getTimescale(): number {
    return this._timescale;
  }

  reset(): this {
    this._currentTime = this._now();

    return this;
  }

  setFixedDelta(fixedDelta: number): this {
    this._fixedDelta = fixedDelta * 1000;

    return this;
  }

  setTimescale(timescale: number): this {
    this._timescale = timescale;

    return this;
  }

  update(): this {
    if (this._useFixedDelta) {
      this._delta = this._fixedDelta;
    } else {
      this._previousTime = this._currentTime;
      this._currentTime = this._now();

      this._delta = this._currentTime - this._previousTime;
    }

    this._delta *= this._timescale;

    this._elapsed += this._delta; // _elapsed is the accumulation of all previous deltas

    return this;
  }

  // private

  _now(): number {
    return (typeof performance === "undefined" ? Date : performance).now();
  }

  toJSON(): { timescale: number } {
    return {
      timescale: this._timescale,
    };
  }

  fromJson({ timescale = 1 }): Timer {
    return new Timer(undefined, undefined, timescale);
  }
}

export { Timer };
