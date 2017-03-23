"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var RenderPhase_1 = require("../enum/RenderPhase");
var Mode = (function () {
    function Mode(naem) {
        if (name)
            this.name = name;
    }
    Mode.prototype.runInit = function () {
        this.setPhase(RenderPhase_1.RenderPhase.INITIALIZING);
        var initObs = Rx_1.Observable.create(function (observer) {
            observer.complete();
        });
        return Rx_1.Observable.forkJoin(initObs);
    };
    ;
    Mode.prototype.runLoad = function () {
        return null;
    };
    ;
    Mode.prototype.runUpdate = function (clock) { };
    ;
    Mode.prototype.runRender = function (clock) { };
    ;
    Mode.prototype.runPause = function () { };
    ;
    Mode.prototype.runUnPause = function () { };
    ;
    Mode.prototype.runUnload = function () {
        return null;
    };
    ;
    Mode.prototype.runDestroy = function () {
        return null;
    };
    ;
    Mode.prototype.phaseIs = function (phase) {
        return null;
    };
    ;
    Mode.prototype.setPhase = function (phase) {
        this.phase = phase;
    };
    ;
    Mode.prototype.getPhase = function () {
        return this.phase;
    };
    ;
    Mode.prototype.setName = function (name) {
        this.name = name;
    };
    Mode.prototype.getName = function () {
        return this.name;
    };
    return Mode;
}());
exports.default = Mode;
//# sourceMappingURL=Mode.js.map