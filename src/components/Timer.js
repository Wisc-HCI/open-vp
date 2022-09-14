// Credit to Mugen87 while we wait for this to be added to three.js
// https://github.com/Mugen87/three.js/blob/3a6d8139367e710a3d4fef274d530dda485f1110/examples/jsm/misc/Timer.js

class Timer {

	constructor() {

		this._previousTime = 0;
		this._currentTime = 0;

		this._delta = 0;
		this._elapsed = 0;

		this._timescale = 1;

		this._useFixedDelta = false;
		this._fixedDelta = 16.67; // ms, corresponds to approx. 60 FPS

		// use Page Visibility API to avoid large time delta values

		this._usePageVisibilityAPI = ( typeof document !== 'undefined' && document.hidden !== undefined );

		if ( this._usePageVisibilityAPI === true ) {

			this._pageVisibilityHandler = handleVisibilityChange.bind( this );

			document.addEventListener( 'visibilitychange', this._pageVisibilityHandler, false );

		}

	}

	disableFixedDelta() {

		this._useFixedDelta = false;

		return this;

	}

	dispose() {

		if ( this._usePageVisibilityAPI === true ) {

			document.removeEventListener( 'visibilitychange', this._pageVisibilityHandler );

		}

		return this;

	}

	enableFixedDelta() {

		this._useFixedDelta = true;

		return this;

	}

	getDelta() {

		return this._delta / 1000;

	}

	getElapsed() {

		return this._elapsed / 1000;

	}

	getFixedDelta() {

		return this._fixedDelta / 1000;

	}

	getTimescale() {

		return this._timescale;

	}

	reset() {

		this._currentTime = this._now();

		return this;

	}

	setFixedDelta( fixedDelta ) {

		this._fixedDelta = fixedDelta * 1000;

		return this;

	}

	setTimescale( timescale ) {

		this._timescale = timescale;

		return this;

	}

	update() {

		if ( this._useFixedDelta === true ) {

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

	_now() {

		return ( typeof performance === 'undefined' ? Date : performance ).now();

	}

	toJSON() {
		return {
			timescale: this._timescale
		}
	}

	fromJson({timescale=1}) {
		let timer = new Timer();
		timer.setTimescale(timescale);
		return timer;
	}

}

function handleVisibilityChange() {

	if ( document.hidden === false ) this.reset();

}

export { Timer };