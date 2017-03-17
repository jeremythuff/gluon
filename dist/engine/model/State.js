"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var RenderPhase_1 = require("../enum/RenderPhase");
var State = (function () {
    function State(name) {
        if (name)
            this.setName(name);
    }
    State.prototype.init = function () {
        this.setPhase(RenderPhase_1.RenderPhase.INITIALIZING);
        return Rx_1.Observable.of(function () { });
    };
    State.prototype.load = function () {
        this.setPhase(RenderPhase_1.RenderPhase.LOADING);
        return Rx_1.Observable.of(function () { });
    };
    State.prototype.update = function () {
        this.setPhase(RenderPhase_1.RenderPhase.UPDATING);
    };
    ;
    State.prototype.render = function () {
        this.setPhase(RenderPhase_1.RenderPhase.RENDERING);
    };
    ;
    State.prototype.pause = function () {
        this.setPhase(RenderPhase_1.RenderPhase.PAUSED);
    };
    ;
    State.prototype.unPause = function () {
        this.setPhase(RenderPhase_1.RenderPhase.RENDERING);
    };
    ;
    State.prototype.unload = function () {
        this.setPhase(RenderPhase_1.RenderPhase.UNLOADING);
        return Rx_1.Observable.of(function () { });
    };
    State.prototype.destroy = function () {
        this.setPhase(RenderPhase_1.RenderPhase.DESTROYING);
        return Rx_1.Observable.of(function () { });
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
    return State;
}());
exports.default = State;
//# sourceMappingURL=State.js.map