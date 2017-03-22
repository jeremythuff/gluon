"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var RenderPhase_1 = require("../enum/RenderPhase");
var State = (function () {
    function State() {
        this.modes = [];
        this.initCBs = [];
        this.loadCBs = [];
        this.unloadCBs = [];
        this.destroyCBs = [];
    }
    State.prototype.runInit = function () {
        var _this = this;
        this.setPhase(RenderPhase_1.RenderPhase.INITIALIZING);
        var initObs = Rx_1.Observable.create(function (observer) {
            _this.initCBs.forEach(function (cb) {
                cb();
            });
            observer.complete();
        });
        return Rx_1.Observable.forkJoin(initObs);
    };
    State.prototype.init = function (cb) {
        this.initCBs.push(cb);
    };
    State.prototype.runLoad = function () {
        var _this = this;
        this.setPhase(RenderPhase_1.RenderPhase.LOADING);
        var loadObs = Rx_1.Observable.create(function (observer) {
            _this.loadCBs.forEach(function (cb) {
                cb();
            });
            observer.complete();
        });
        return Rx_1.Observable.forkJoin(loadObs);
    };
    State.prototype.load = function (cb) {
        this.loadCBs.push(cb);
    };
    State.prototype.runUpdate = function (delta) {
        this.setPhase(RenderPhase_1.RenderPhase.UPDATING);
    };
    ;
    State.prototype.runRender = function (delta) {
        this.setPhase(RenderPhase_1.RenderPhase.RENDERING);
    };
    ;
    State.prototype.runPause = function () {
        this.setPhase(RenderPhase_1.RenderPhase.PAUSED);
    };
    ;
    State.prototype.runUnPause = function () {
        this.setPhase(RenderPhase_1.RenderPhase.RENDERING);
    };
    ;
    State.prototype.runUnload = function () {
        var _this = this;
        var unloadObs = Rx_1.Observable.create(function (observer) {
            _this.loadCBs.forEach(function (cb) {
                cb();
            });
            observer.complete();
        });
        return Rx_1.Observable.forkJoin(unloadObs);
    };
    State.prototype.runDestroy = function () {
        var _this = this;
        this.setPhase(RenderPhase_1.RenderPhase.DESTROYING);
        var destroyObs = Rx_1.Observable.create(function (observer) {
            _this.loadCBs.forEach(function (cb) {
                cb();
            });
            observer.complete();
        });
        return Rx_1.Observable.forkJoin(destroyObs);
    };
    State.prototype.getName = function () {
        return this.name;
    };
    State.prototype.setName = function (name) {
        this.name = name;
    };
    State.prototype.getFramesPerSecond = function () {
        return this.framesPerSecond;
    };
    State.prototype.setFramesPerSecond = function (framesPerSecond) {
        this.framesPerSecond = framesPerSecond;
    };
    State.prototype.phaseIs = function (phase) {
        return phase === this.phase || phase === Math.floor(this.phase);
    };
    State.prototype.getPhase = function () {
        return this.phase;
    };
    State.prototype.setPhase = function (phase) {
        this.phase = phase;
        console.log("State " + this.getName() + " is " + RenderPhase_1.RenderPhase[this.getPhase()]);
    };
    State.prototype.setModes = function (modes) {
        this.modes = modes;
    };
    State.prototype.getModes = function () {
        return this.modes;
    };
    return State;
}());
exports.default = State;
//# sourceMappingURL=State.js.map