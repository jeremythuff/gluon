"use strict";
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var Game = (function () {
    function Game(name) {
        if (name)
            this.setName(name);
        this.states = new Array();
    }
    Game.prototype.init = function () {
        return Rx_1.Observable.of(function () { });
    };
    Game.prototype.load = function () {
        return Rx_1.Observable.of(function () { });
    };
    Game.prototype.update = function () { };
    Game.prototype.render = function () { };
    Game.prototype.destroy = function () { };
    Game.prototype.getName = function () {
        return this.name;
    };
    Game.prototype.setName = function (name) {
        this.name = name;
    };
    Game.prototype.getActiveState = function () {
        return this.activeState;
    };
    Game.prototype.setActiveState = function (state) {
        this.activeState = state;
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
    Game.prototype.isRunning = function (running) {
        if (running != null)
            this.running = running;
        return this.running;
    };
    return Game;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Game;
//# sourceMappingURL=Game.js.map