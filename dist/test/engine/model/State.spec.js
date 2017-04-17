"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_typescript_1 = require("mocha-typescript");
var assert = require("assert");
var State_1 = require("../../../typescript/engine/model/State");
var Mode_1 = require("../../../typescript/engine/model/Mode");
var StateSpec = (function () {
    function StateSpec() {
        this.STATE_NAME = "Test State";
        this.STATE_FPS = 30;
        this.MODE_ONE_NAME = "Test Mode One";
        this.MODE_TWO_NAME = "Test Mode Two";
    }
    StateSpec.prototype.before = function () {
        this.STATE = new State_1.default();
        this.MODE_ONE = new Mode_1.default();
        this.MODE_TWO = new Mode_1.default();
    };
    StateSpec.prototype["Test name accessors"] = function () {
        this.STATE.setName(this.STATE_NAME);
        assert.equal(this.STATE.getName(), this.STATE_NAME);
    };
    StateSpec.prototype["Test frame rate accessors"] = function () {
        this.STATE.setFramesPerSecond(this.STATE_FPS);
        assert.equal(this.STATE_FPS, this.STATE.getFramesPerSecond());
    };
    StateSpec.prototype["Test mode indavidual accessors"] = function () {
        var _this = this;
        this.STATE.addMode(this.MODE_ONE);
        var contains = false;
        this.STATE.getModes().some(function (mode) {
            contains = mode === _this.MODE_ONE;
            return contains;
        });
        assert.equal(contains, true);
    };
    StateSpec.prototype["Test mode aggregated accessors"] = function () {
        var _this = this;
        var modes = [];
        modes.push(this.MODE_ONE);
        modes.push(this.MODE_TWO);
        this.STATE.setModes(modes);
        var contains = false;
        this.STATE.getModes().some(function (mode) {
            contains = mode === _this.MODE_ONE;
            return contains;
        });
        this.STATE.getModes().some(function (mode) {
            contains = mode === _this.MODE_TWO;
            return contains;
        });
        assert.equal(contains, true);
    };
    StateSpec.prototype["Test mode activated"] = function () {
        var _this = this;
        this.STATE.activateMode(this.MODE_ONE);
        var contains = false;
        this.STATE.getActiveModes().some(function (mode) {
            contains = mode === _this.MODE_ONE;
            return contains;
        });
        assert.equal(contains, true);
    };
    StateSpec.prototype["Test mode deactivated"] = function () {
        var _this = this;
        this.STATE.activateMode(this.MODE_ONE);
        var contains = false;
        this.STATE.getActiveModes().some(function (mode) {
            contains = mode === _this.MODE_ONE;
            return contains;
        });
        assert.equal(contains, true);
        this.STATE.deActivateMode(this.MODE_ONE);
        contains = false;
        this.STATE.getActiveModes().some(function (mode) {
            contains = mode === _this.MODE_ONE;
            return contains;
        });
        assert.equal(contains, false);
    };
    StateSpec.prototype["Test mode deactivated aggregated"] = function (done) {
        var _this = this;
        this.MODE_ONE.setName(this.MODE_ONE_NAME);
        this.STATE.activateMode(this.MODE_ONE);
        this.MODE_TWO.setName(this.MODE_TWO_NAME);
        this.STATE.activateMode(this.MODE_TWO);
        assert.equal(this.STATE.getActiveModes().length, 2);
        this.STATE.deActivateAllModes()
            .subscribe(null, null, function () {
            assert.equal(_this.STATE.getActiveModes().length, 0);
            done();
        });
    };
    return StateSpec;
}());
__decorate([
    mocha_typescript_1.test
], StateSpec.prototype, "Test name accessors", null);
__decorate([
    mocha_typescript_1.test
], StateSpec.prototype, "Test frame rate accessors", null);
__decorate([
    mocha_typescript_1.test
], StateSpec.prototype, "Test mode indavidual accessors", null);
__decorate([
    mocha_typescript_1.test
], StateSpec.prototype, "Test mode aggregated accessors", null);
__decorate([
    mocha_typescript_1.test
], StateSpec.prototype, "Test mode activated", null);
__decorate([
    mocha_typescript_1.test
], StateSpec.prototype, "Test mode deactivated", null);
__decorate([
    mocha_typescript_1.test
], StateSpec.prototype, "Test mode deactivated aggregated", null);
StateSpec = __decorate([
    mocha_typescript_1.suite
], StateSpec);
//# sourceMappingURL=State.spec.js.map