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
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var AbstractRenderCycle_1 = require("./abstracts/AbstractRenderCycle");
var State = (function (_super) {
    __extends(State, _super);
    function State() {
        var _this = _super.call(this) || this;
        _this.modes = [];
        _this.activeModes = [];
        return _this;
    }
    State.prototype._runInit = function () {
        return Rx_1.Observable.forkJoin();
    };
    State.prototype._runLoad = function () {
        return Rx_1.Observable.forkJoin();
    };
    State.prototype._runUpdate = function (delta) { };
    ;
    State.prototype._runRender = function (delta) { };
    ;
    State.prototype._runPause = function () { };
    ;
    State.prototype._runUnPause = function () { };
    ;
    State.prototype._runUnLoad = function () {
        return Rx_1.Observable.forkJoin();
    };
    State.prototype._runDestroy = function () {
        return Rx_1.Observable.forkJoin();
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
    return State;
}(AbstractRenderCycle_1.AbstractRenderCycle));
exports.default = State;
//# sourceMappingURL=State.js.map