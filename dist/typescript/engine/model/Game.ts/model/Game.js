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
var THREE = require("three");
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var AbstractRenderCycle_1 = require("./abstracts/AbstractRenderCycle");
var ControlRunner_1 = require("../util/io/ControlRunner");
var RenderPhase_1 = require("../enum/RenderPhase");
/**
 * The Game class is the central class to all Gluon games. By extending
 * this class into you game main glass, and decorating it with the [[GameMain]]
 * decorator, it will be the main entry point for your game.
 */
var Game = (function (_super) {
    __extends(Game, _super);
    function Game(name) {
        var _this = _super.call(this) || this;
        if (name)
            _this.setName(name);
        _this.states = [];
        _this.controlProfiles = [];
        _this.renderer = new THREE.WebGLRenderer();
        _this.controlRunner = new ControlRunner_1["default"]();
        return _this;
    }
    Game.prototype._runInit = function () {
        var _this = this;
        this.activeState = this.getState(this.initialStateName);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.insertBefore(this.renderer.domElement, document.body.firstChild);
        var $windowResize = Rx_1.Observable.fromEvent(window, 'resize').debounceTime(100);
        $windowResize.subscribe(function (test) {
            _this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
        return Rx_1.Observable.forkJoin(this.activeState.startInit());
    };
    Game.prototype._runLoad = function () {
        return Rx_1.Observable.forkJoin();
    };
    Game.prototype._runUpdate = function (delta) {
        if (this.activeState.phaseIs(RenderPhase_1.RenderPhase.READY))
            this.activeState.startUpdate(delta);
        var cps = this.activeState.phaseIs(RenderPhase_1.RenderPhase.READY) ? this.activeState.getControlProfiles().concat(this.getControlProfiles()) : this.getControlProfiles();
        this.controlRunner._runCBs(cps, delta);
    };
    ;
    Game.prototype._runRender = function (delta) {
        if (this.activeState.phaseIs(RenderPhase_1.RenderPhase.READY))
            this.activeState.startRender(delta);
    };
    ;
    Game.prototype._runPause = function () {
        this.activeState.startPause();
    };
    ;
    Game.prototype._runUnpause = function () {
        this.activeState.startUnpause();
    };
    ;
    Game.prototype._runUnload = function () {
        return Rx_1.Observable.forkJoin(this.activeState.startUnload());
    };
    Game.prototype._runDestroy = function () {
        return Rx_1.Observable.forkJoin();
    };
    Game.prototype.getName = function () {
        return "foo"; //this.name;
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
        if (!state) {
            console.error("State undefined");
            return;
        }
        if (this.activeState) {
            this.activeState.startUnload()
                .take(1)
                .subscribe(null, null, function () {
                _this.activeState = state;
                _this.activeState.startInit();
            });
        }
        else {
            this.activeState = state;
            this.activeState.startInit();
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
        if (!foundState)
            console.error("No state: " + name);
        return foundState;
    };
    Game.prototype.addState = function (state) {
        this.states.push(state);
        return state;
    };
    Game.prototype.setControlProfiles = function (controlProfiles) {
        this.controlProfiles = controlProfiles;
    };
    Game.prototype.getControlProfiles = function () {
        return this.controlProfiles;
    };
    Game.prototype.addControlProfile = function (controlProfile) {
        this.getControlProfiles().push(controlProfile);
    };
    Game.prototype.removeControlProfile = function (controlProfile) {
        var controlProfiles = this.getControlProfiles();
        controlProfiles.splice(controlProfiles.indexOf(controlProfile), 1);
    };
    return Game;
}(AbstractRenderCycle_1.AbstractRenderCycle));
exports["default"] = Game;
