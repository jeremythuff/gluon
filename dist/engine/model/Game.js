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
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractRenderCycle_1 = require("./abstracts/AbstractRenderCycle");
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var Game = (function (_super) {
    __extends(Game, _super);
    function Game(name) {
        var _this = _super.call(this) || this;
        if (name)
            _this.setName(name);
        _this.states = [];
        return _this;
    }
    Game.prototype._runInit = function () {
        this.activeState = this.getState(this.initialStateName);
        return Rx_1.Observable.forkJoin(this.activeState.runInit());
    };
    Game.prototype._runLoad = function () {
        return Rx_1.Observable.forkJoin(this.activeState.runLoad());
    };
    Game.prototype._RunUpdate = function (delta) {
        this.activeState.runUpdate(delta);
    };
    ;
    Game.prototype._RunRender = function (delta) {
        this.activeState.runRender(delta);
    };
    ;
    Game.prototype._RunPause = function () { };
    ;
    Game.prototype._RunUnPause = function () { };
    ;
    Game.prototype._runUnLoad = function () {
        return Rx_1.Observable.forkJoin(this.activeState.runUnload());
    };
    Game.prototype._runDestroy = function () {
        return Rx_1.Observable.forkJoin(this.activeState.runDestroy());
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
    return Game;
}(AbstractRenderCycle_1.AbstractRenderCycle));
exports.default = Game;
//# sourceMappingURL=Game.js.map