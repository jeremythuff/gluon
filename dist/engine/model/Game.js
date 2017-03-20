"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var RenderPhase_1 = require("../enum/RenderPhase");
var Game = (function () {
    function Game(name) {
        this.phase = RenderPhase_1.RenderPhase.OFF;
        if (name)
            this.setName(name);
        this.states = [];
        this.initCBs = [];
        this.loadCBs = [];
        this.updateCBs = [];
        this.renderCBs = [];
        this.pauseCBs = [];
        this.unPauseCBs = [];
        this.unloadCBs = [];
        this.destroyCBs = [];
    }
    Game.prototype.runInit = function () {
        var _this = this;
        this.setPhase(RenderPhase_1.RenderPhase.INITIALIZING);
        var initObservable = Rx_1.Observable.of("start");
        return initObservable.flatMap(function () {
            _this.initCBs.forEach(function (cb) {
                cb();
            });
            return initObservable;
        });
    };
    Game.prototype.init = function (initCB) {
        this.initCBs.push(initCB);
    };
    Game.prototype.runLoad = function () {
        var _this = this;
        this.setPhase(RenderPhase_1.RenderPhase.LOADING);
        var loadObservable = Rx_1.Observable.of("start");
        return loadObservable.flatMap(function () {
            _this.loadCBs.forEach(function (cb) {
                cb();
            });
            return loadObservable;
        });
    };
    Game.prototype.load = function (cb) {
        this.loadCBs.push(cb);
    };
    Game.prototype.runUpdate = function (delta) {
        this.setPhase(RenderPhase_1.RenderPhase.UPDATING);
        this.updateCBs.forEach(function (cb) {
            cb(delta);
        });
        this.activeState.runUpdate(delta);
    };
    Game.prototype.update = function (cb) {
        this.updateCBs.push(cb);
    };
    Game.prototype.runRender = function (delta) {
        this.setPhase(RenderPhase_1.RenderPhase.RENDERING);
        this.renderCBs.forEach(function (cb) {
            cb(delta);
        });
        this.activeState.runRender(delta);
    };
    Game.prototype.render = function (cb) {
        this.renderCBs.push(cb);
    };
    Game.prototype.runPause = function () {
        this.setPhase(RenderPhase_1.RenderPhase.PAUSED);
        this.pauseCBs.forEach(function (cb) {
            cb();
        });
    };
    ;
    Game.prototype.pause = function (cb) {
        this.pauseCBs.push(cb);
    };
    Game.prototype.runUnPause = function () {
        this.setPhase(RenderPhase_1.RenderPhase.READY);
        this.unPauseCBs.forEach(function (cb) {
            cb();
        });
    };
    ;
    Game.prototype.unPause = function (cb) {
        this.unPauseCBs.push(cb);
    };
    Game.prototype.runUnload = function () {
        var _this = this;
        this.setPhase(RenderPhase_1.RenderPhase.UNLOADING);
        var unLoadObservable = Rx_1.Observable.of("start");
        return unLoadObservable.flatMap(function () {
            _this.unloadCBs.forEach(function (cb) {
                cb();
            });
            return unLoadObservable;
        });
    };
    Game.prototype.unload = function (cb) {
        this.unloadCBs.push(cb);
    };
    Game.prototype.runDestroy = function () {
        var _this = this;
        this.setPhase(RenderPhase_1.RenderPhase.DESTROYING);
        var unDestroyObservable = Rx_1.Observable.of("start");
        return unDestroyObservable.flatMap(function () {
            _this.destroyCBs.forEach(function (cb) {
                cb();
            });
            return unDestroyObservable;
        });
    };
    Game.prototype.destroy = function (cb) {
        this.destroyCBs.push(cb);
    };
    Game.prototype.getName = function () {
        return this.name;
    };
    Game.prototype.setName = function (name) {
        this.name = name;
    };
    Game.prototype.getInitialStateName = function () {
        return this.initialStateName;
    };
    Game.prototype.setInitialStateName = function (stateName) {
        this.initialStateName = stateName;
    };
    Game.prototype.getActiveState = function () {
        return this.activeState;
    };
    Game.prototype.setActiveState = function (state) {
        var _this = this;
        if (this.activeState) {
            this.activeState.runUnload()
                .take(1)
                .subscribe(null, null, function () {
                _this.activeState = state;
                _this.activeState.runInit();
            });
        }
        else {
            this.activeState = state;
            this.activeState.runInit();
        }
    };
    Game.prototype.getFramesPerSecond = function () {
        var frameRate = this.framesPerSecond;
        if (this.getActiveState()) {
            frameRate = this.getActiveState().getFramesPerSecond()
                ? this.getActiveState().getFramesPerSecond()
                : this.framesPerSecond;
        }
        return frameRate;
    };
    Game.prototype.setFramesPerSecond = function (framesPerSecond) {
        this.framesPerSecond = framesPerSecond;
    };
    Game.prototype.getState = function (name) {
        var foundState = null;
        this.states.some(function (state) {
            var pred = state.getName() === name;
            if (pred)
                foundState = state;
            return pred;
        });
        return foundState;
    };
    Game.prototype.addState = function (state) {
        this.states.push(state);
        return state;
    };
    Game.prototype.phaseIs = function (phase) {
        return phase === this.phase || phase === Math.floor(this.phase);
    };
    Game.prototype.getPhase = function () {
        return this.phase;
    };
    Game.prototype.setPhase = function (phase) {
        this.phase = phase;
    };
    return Game;
}());
exports.default = Game;
//# sourceMappingURL=Game.js.map