"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var RenderPhase_1 = require("../../enum/RenderPhase");
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var AbstractControllable_1 = require("./AbstractControllable");
var AbstractRenderCycle = (function (_super) {
    __extends(AbstractRenderCycle, _super);
    function AbstractRenderCycle() {
        var _this = _super.call(this) || this;
        _this.phase = RenderPhase_1.RenderPhase.OFF;
        _this.initCBs = [];
        _this.loadCBs = [];
        _this.updateCBs = [];
        _this.renderCBs = [];
        _this.pauseCBs = [];
        _this.unPauseCBs = [];
        _this.unloadCBs = [];
        _this.destroyCBs = [];
        return _this;
    }
    AbstractRenderCycle.prototype.startInit = function () {
        this.setPhase(RenderPhase_1.RenderPhase.INITIALIZING);
        var _initObs = this._runInit();
        var initObs = this.runPhaseCBs(this.initCBs);
        this.init();
        return Rx_1.Observable.forkJoin(initObs, _initObs);
    };
    AbstractRenderCycle.prototype.init = function () { };
    ;
    AbstractRenderCycle.prototype.registerInitAction = function (initCB) {
        this.initCBs.push(initCB);
    };
    AbstractRenderCycle.prototype.startLoad = function () {
        this.setPhase(RenderPhase_1.RenderPhase.LOADING);
        var _loadObs = this._runLoad();
        var loadObs = this.runPhaseCBs(this.loadCBs);
        this.load();
        return Rx_1.Observable.forkJoin(loadObs, _loadObs);
    };
    AbstractRenderCycle.prototype.load = function () { };
    ;
    AbstractRenderCycle.prototype.registerLoadAction = function (cb) {
        this.loadCBs.push(cb);
    };
    AbstractRenderCycle.prototype.startUpdate = function (delta) {
        this.setPhase(RenderPhase_1.RenderPhase.UPDATING);
        this.updateCBs.forEach(function (cb) {
            cb(delta);
        });
        this.update(delta);
        this._runUpdate(delta);
    };
    AbstractRenderCycle.prototype.update = function (delta) { };
    ;
    AbstractRenderCycle.prototype.registerUpdateAction = function (cb) {
        this.updateCBs.push(cb);
    };
    AbstractRenderCycle.prototype.startRender = function (delta) {
        this.setPhase(RenderPhase_1.RenderPhase.RENDERING);
        this.renderCBs.forEach(function (cb) {
            cb(delta);
        });
        this.render(delta);
        this._runRender(delta);
    };
    AbstractRenderCycle.prototype.render = function (delta) { };
    ;
    AbstractRenderCycle.prototype.registerRenderAction = function (cb) {
        this.renderCBs.push(cb);
    };
    AbstractRenderCycle.prototype.startPause = function () {
        this.setPhase(RenderPhase_1.RenderPhase.PAUSED);
        this.pauseCBs.forEach(function (cb) {
            cb();
        });
        this.pause();
        this._runPause();
    };
    ;
    AbstractRenderCycle.prototype.pause = function () { };
    ;
    AbstractRenderCycle.prototype.registerPauseAction = function (cb) {
        this.pauseCBs.push(cb);
    };
    AbstractRenderCycle.prototype.startUnpause = function () {
        this.setPhase(RenderPhase_1.RenderPhase.READY);
        this.unPauseCBs.forEach(function (cb) {
            cb();
        });
        this.unpause();
        this._runUnpause();
    };
    ;
    AbstractRenderCycle.prototype.unpause = function () { };
    ;
    AbstractRenderCycle.prototype.registerUnpauseAction = function (cb) {
        this.unPauseCBs.push(cb);
    };
    AbstractRenderCycle.prototype.startUnload = function () {
        this.setPhase(RenderPhase_1.RenderPhase.UNLOADING);
        var _unLoadObs = this._runUnload();
        var unLoadObs = this.runPhaseCBs(this.unloadCBs);
        this.unload();
        return Rx_1.Observable.forkJoin(unLoadObs, _unLoadObs);
    };
    AbstractRenderCycle.prototype.unload = function () { };
    ;
    AbstractRenderCycle.prototype.registerUnloadAction = function (cb) {
        this.unloadCBs.push(cb);
    };
    AbstractRenderCycle.prototype.startDestroy = function () {
        this.setPhase(RenderPhase_1.RenderPhase.DESTROYING);
        var _loadObs = this._runDestroy();
        var loadObs = this.runPhaseCBs(this.destroyCBs);
        this.destroy();
        return Rx_1.Observable.forkJoin(loadObs, _loadObs);
    };
    AbstractRenderCycle.prototype.destroy = function () { };
    ;
    AbstractRenderCycle.prototype.registerDestroyAction = function (cb) {
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
}(AbstractControllable_1.AbstractControllable));
exports.AbstractRenderCycle = AbstractRenderCycle;
