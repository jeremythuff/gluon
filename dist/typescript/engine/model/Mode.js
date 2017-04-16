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
var Mode = (function (_super) {
    __extends(Mode, _super);
    function Mode() {
        var _this = _super.call(this) || this;
        _this.controlProfiles = [];
        return _this;
    }
    Mode.prototype._runInit = function () {
        return Rx_1.Observable.forkJoin();
    };
    Mode.prototype._runLoad = function () {
        return Rx_1.Observable.forkJoin();
    };
    Mode.prototype._runUpdate = function (delta) { };
    ;
    Mode.prototype._runRender = function (delta) { };
    ;
    Mode.prototype._runPause = function () { };
    Mode.prototype._runUnpause = function () { };
    ;
    Mode.prototype._runUnload = function () {
        return Rx_1.Observable.forkJoin();
    };
    Mode.prototype._runDestroy = function () {
        return Rx_1.Observable.forkJoin();
    };
    Mode.prototype.setName = function (name) {
        this.name = name;
    };
    Mode.prototype.getName = function () {
        return this.name;
    };
    Mode.prototype.setControlProfiles = function (controlProfiles) {
        this.controlProfiles = controlProfiles;
    };
    Mode.prototype.getControlProfiles = function () {
        return this.controlProfiles;
    };
    Mode.prototype.addControlProfile = function (controlProfile) {
        this.getControlProfiles().push(controlProfile);
    };
    Mode.prototype.removeControlProfile = function (controlProfile) {
        var controlProfiles = this.getControlProfiles();
        controlProfiles.splice(controlProfiles.indexOf(controlProfile), 1);
    };
    return Mode;
}(AbstractRenderCycle_1.AbstractRenderCycle));
exports.default = Mode;
//# sourceMappingURL=Mode.js.map