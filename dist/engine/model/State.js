"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var RenderPhase_1 = require("../enum/RenderPhase");
var State = (function () {
    function State() {
        this.modes = [];
        this.activeModes = [];
        this.initCBs = [];
        this.loadCBs = [];
        this.unloadCBs = [];
        this.destroyCBs = [];
    }
    State.prototype.runInit = function () {
        this.setPhase(RenderPhase_1.RenderPhase.INITIALIZING);
        return Rx_1.Observable.forkJoin(this.runPhaseCBs(this.initCBs));
    };
    State.prototype.init = function (cb) {
        this.initCBs.push(cb);
    };
    State.prototype.runLoad = function () {
        this.setPhase(RenderPhase_1.RenderPhase.LOADING);
        return Rx_1.Observable.forkJoin(this.runPhaseCBs(this.loadCBs));
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
        return Rx_1.Observable.forkJoin(this.runPhaseCBs(this.unloadCBs));
    };
    State.prototype.runDestroy = function () {
        this.setPhase(RenderPhase_1.RenderPhase.DESTROYING);
        return Rx_1.Observable.forkJoin(this.runPhaseCBs(this.destroyCBs));
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
    };
    State.prototype.setModes = function (modes) {
        this.modes = modes;
    };
    State.prototype.getModes = function () {
        return this.modes;
    };
    State.prototype.getModeByName = function (name) {
        var foundMode = null;
        this.modes.some(function (mode) {
            var p = mode.getName() === name;
            if (p)
                foundMode = mode;
            return p;
        });
        return foundMode;
    };
    State.prototype.activateMode = function (mode) {
        var _this = this;
        mode.runInit()
            .take(1)
            .subscribe(null, null, function () {
            _this.activeModes.push(mode);
        });
    };
    State.prototype.avtivateAllModes = function (mode) {
        var _this = this;
        this.modes.forEach(function (mode) {
            _this.activateMode(mode);
        });
    };
    State.prototype.deActivateMode = function (mode) {
        var _this = this;
        mode.runUnload()
            .take(1)
            .subscribe(null, null, function () {
            _this.activeModes.splice(_this.activeModes.indexOf(mode), 1);
        }).unsubscribe();
    };
    State.prototype.deActivateAllMode = function (mode) {
        var _this = this;
        this.activeModes.forEach(function (mode) {
            _this.deActivateMode(mode);
        });
    };
    State.prototype.runPhaseCBs = function (cbs) {
        return Rx_1.Observable.create(function (observer) {
            cbs.forEach(function (cb) {
                cb();
            });
            observer.complete();
        });
    };
    return State;
}());
exports.default = State;
//# sourceMappingURL=State.js.map