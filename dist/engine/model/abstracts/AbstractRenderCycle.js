"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RenderPhase_1 = require("../../enum/RenderPhase");
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var AbstractRenderCycle = (function () {
    function AbstractRenderCycle() {
        this.phase = RenderPhase_1.RenderPhase.OFF;
        this.initCBs = [];
        this.loadCBs = [];
        this.updateCBs = [];
        this.renderCBs = [];
        this.pauseCBs = [];
        this.unPauseCBs = [];
        this.unloadCBs = [];
        this.destroyCBs = [];
    }
    AbstractRenderCycle.prototype.runInit = function () {
        this.setPhase(RenderPhase_1.RenderPhase.INITIALIZING);
        var _initObs = this._runInit();
        var initObs = this.runPhaseCBs(this.initCBs);
        return Rx_1.Observable.forkJoin(initObs, _initObs);
    };
    AbstractRenderCycle.prototype.init = function (initCB) {
        this.initCBs.push(initCB);
    };
    AbstractRenderCycle.prototype.runLoad = function () {
        this.setPhase(RenderPhase_1.RenderPhase.LOADING);
        var _loadObs = this._runLoad();
        var loadObs = this.runPhaseCBs(this.loadCBs);
        return Rx_1.Observable.forkJoin(loadObs, _loadObs);
    };
    AbstractRenderCycle.prototype.load = function (cb) {
        this.loadCBs.push(cb);
    };
    AbstractRenderCycle.prototype.runUpdate = function (delta) {
        this.setPhase(RenderPhase_1.RenderPhase.UPDATING);
        this.updateCBs.forEach(function (cb) {
            cb(delta);
        });
        this._runUpdate(delta);
    };
    AbstractRenderCycle.prototype.update = function (cb) {
        this.updateCBs.push(cb);
    };
    AbstractRenderCycle.prototype.runRender = function (delta) {
        this.setPhase(RenderPhase_1.RenderPhase.RENDERING);
        this.renderCBs.forEach(function (cb) {
            cb(delta);
        });
        this._runRender(delta);
    };
    AbstractRenderCycle.prototype.render = function (cb) {
        this.renderCBs.push(cb);
    };
    AbstractRenderCycle.prototype.runPause = function () {
        this.setPhase(RenderPhase_1.RenderPhase.PAUSED);
        this.pauseCBs.forEach(function (cb) {
            cb();
        });
        this._runPause();
    };
    ;
    AbstractRenderCycle.prototype.pause = function (cb) {
        this.pauseCBs.push(cb);
    };
    AbstractRenderCycle.prototype.runUnPause = function () {
        this.setPhase(RenderPhase_1.RenderPhase.READY);
        this.unPauseCBs.forEach(function (cb) {
            cb();
        });
        this._runUnPause();
    };
    ;
    AbstractRenderCycle.prototype.unPause = function (cb) {
        this.unPauseCBs.push(cb);
    };
    AbstractRenderCycle.prototype.runUnload = function () {
        this.setPhase(RenderPhase_1.RenderPhase.UNLOADING);
        var _unLoadObs = this._runUnLoad();
        var unLoadObs = this.runPhaseCBs(this.unloadCBs);
        return Rx_1.Observable.forkJoin(unLoadObs, _unLoadObs);
    };
    AbstractRenderCycle.prototype.unload = function (cb) {
        this.unloadCBs.push(cb);
    };
    AbstractRenderCycle.prototype.runDestroy = function () {
        this.setPhase(RenderPhase_1.RenderPhase.DESTROYING);
        var _loadObs = this._runDestroy();
        var loadObs = this.runPhaseCBs(this.destroyCBs);
        return Rx_1.Observable.forkJoin(loadObs, _loadObs);
    };
    AbstractRenderCycle.prototype.destroy = function (cb) {
        this.destroyCBs.push(cb);
    };
    AbstractRenderCycle.prototype.phaseIs = function (phase) {
        return phase === this.phase || phase === Math.floor(this.phase);
    };
    AbstractRenderCycle.prototype.getPhase = function () {
        return this.phase;
    };
    AbstractRenderCycle.prototype.setPhase = function (phase) {
        this.phase = phase;
    };
    AbstractRenderCycle.prototype.runPhaseCBs = function (cbs) {
        return Rx_1.Observable.create(function (observer) {
            cbs.forEach(function (cb) {
                cb();
            });
            observer.complete();
        });
    };
    return AbstractRenderCycle;
}());
exports.AbstractRenderCycle = AbstractRenderCycle;
//# sourceMappingURL=AbstractRenderCycle.js.map