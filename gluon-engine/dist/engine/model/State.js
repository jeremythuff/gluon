"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var State = (function () {
    function State(name) {
        if (name)
            this.setName(name);
    }
    State.prototype.init = function () {
        return Rx_1.Observable.of(function () { });
    };
    State.prototype.load = function () {
        return Rx_1.Observable.of(function () { });
    };
    State.prototype.update = function () { };
    ;
    State.prototype.render = function () { };
    ;
    State.prototype.pause = function () { };
    ;
    State.prototype.destroy = function () { };
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
        return this.phase === phase;
    };
    State.prototype.getPhase = function () {
        return this.phase;
    };
    State.prototype.setPhase = function (phase) {
        this.phase = phase;
    };
    return State;
}());
exports.default = State;
//# sourceMappingURL=State.js.map