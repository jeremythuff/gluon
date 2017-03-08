"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var RenderPhase_1 = require("../enum/RenderPhase");
var Game = (function () {
    function Game(name) {
        this.phase = RenderPhase_1.RenderPhase.OFF;
        if (name)
            this.setName(name);
        this.states = new Array();
    }
    Game.prototype.init = function () {
        var _this = this;
        this.phase = RenderPhase_1.RenderPhase.INITIALIZING;
        return Rx_1.Observable.of(function () {
            _this.activeState.init();
        });
    };
    Game.prototype.load = function () {
        var _this = this;
        this.phase = RenderPhase_1.RenderPhase.LOADING;
        return Rx_1.Observable.of(function () {
            _this.activeState.load().subscribe(function () {
                _this.phase = RenderPhase_1.RenderPhase.RUNNING;
            });
        });
    };
    Game.prototype.update = function (delta) { };
    Game.prototype.render = function (clock) { };
    Game.prototype.pause = function () {
        this.phase = RenderPhase_1.RenderPhase.PAUSED;
    };
    ;
    Game.prototype.unPause = function () {
        this.phase = RenderPhase_1.RenderPhase.RUNNING;
    };
    ;
    Game.prototype.destroy = function () {
        this.phase = RenderPhase_1.RenderPhase.DESTROYING;
        this.activeState.destroy();
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
        this.activeState = state;
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
        return this.phase === phase;
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