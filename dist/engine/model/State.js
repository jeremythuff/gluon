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
var THREE = require("three");
var AbstractRenderCycle_1 = require("./abstracts/AbstractRenderCycle");
var State = (function (_super) {
    __extends(State, _super);
    function State() {
        var _this = _super.call(this) || this;
        _this.modes = [];
        _this.activeModes = [];
        _this.controlProfiles = [];
        _this.scene = new THREE.Scene();
        return _this;
    }
    State.prototype._runInit = function () {
        var combinedObs = Rx_1.Observable.create();
        return combinedObs;
    };
    State.prototype._runLoad = function () {
        var combinedObs = Rx_1.Observable.create();
        return combinedObs;
    };
    State.prototype._runUpdate = function (delta) {
        this.activeModes.forEach(function (mode) {
            mode.runUpdate(delta);
        });
    };
    ;
    State.prototype._runRender = function (delta) {
        this.activeModes.forEach(function (mode) {
            mode.runRender(delta);
        });
    };
    ;
    State.prototype._runPause = function () {
        this.activeModes.forEach(function (mode) {
            mode.runPause();
        });
    };
    ;
    State.prototype._runUnPause = function () {
        this.activeModes.forEach(function (mode) {
            mode.runUnPause();
        });
    };
    ;
    State.prototype._runUnLoad = function () {
        var combinedObs = Rx_1.Observable.create();
        this.activeModes.forEach(function (mode) {
            combinedObs = Rx_1.Observable.forkJoin(mode.runUnload(), combinedObs);
        });
        return combinedObs;
    };
    State.prototype._runDestroy = function () {
        var combinedObs = Rx_1.Observable.create();
        this.activeModes.forEach(function (mode) {
            combinedObs = Rx_1.Observable.forkJoin(mode.runDestroy(), combinedObs);
        });
        return combinedObs;
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
    State.prototype.addMode = function (mode) {
        this.modes.push(mode);
    };
    State.prototype.removeMode = function (mode) {
        this.modes.splice(this.modes.indexOf(mode), 1);
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
            mode.getControlProfiles().forEach(function (cp) {
                _this.addControlProfile(cp);
            });
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
            mode.getControlProfiles().forEach(function (cp) {
                _this.removeControlProfile(cp);
            });
            _this.activeModes.splice(_this.activeModes.indexOf(mode), 1);
        }).unsubscribe();
    };
    State.prototype.deActivateAllMode = function (mode) {
        var _this = this;
        this.activeModes.forEach(function (mode) {
            _this.deActivateMode(mode);
        });
    };
    State.prototype.setControlProfiles = function (controlProfiles) {
        this.controlProfiles = controlProfiles;
    };
    State.prototype.getControlProfiles = function () {
        return this.controlProfiles;
    };
    State.prototype.addControlProfile = function (controlProfile) {
        this.getControlProfiles().push(controlProfile);
    };
    State.prototype.removeControlProfile = function (controlProfile) {
        var controlProfiles = this.getControlProfiles();
        controlProfiles.splice(controlProfiles.indexOf(controlProfile), 1);
    };
    return State;
}(AbstractRenderCycle_1.AbstractRenderCycle));
exports.default = State;
//# sourceMappingURL=State.js.map