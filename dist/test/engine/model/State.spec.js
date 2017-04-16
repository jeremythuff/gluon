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
var StateSpec = StateSpec_1 = (function () {
    function StateSpec() {
    }
    StateSpec.prototype["Test name accessors"] = function () {
        StateSpec_1.STATE.setName(StateSpec_1.STATE_NAME);
        assert.equal(StateSpec_1.STATE.getName(), StateSpec_1.STATE_NAME);
    };
    StateSpec.prototype["Test mode accessors"] = function () {
        StateSpec_1.STATE.addMode(StateSpec_1.MODE);
        var contains = false;
        StateSpec_1.STATE.getModes().some(function (mode) {
            contains = mode === StateSpec_1.MODE;
            return contains;
        });
        assert.equal(contains, true);
    };
    return StateSpec;
}());
StateSpec.STATE = new State_1.default();
StateSpec.STATE_NAME = "Test State";
StateSpec.MODE = new Mode_1.default();
StateSpec.MODE_NAME = "Test Mode";
__decorate([
    mocha_typescript_1.test
], StateSpec.prototype, "Test name accessors", null);
__decorate([
    mocha_typescript_1.test
], StateSpec.prototype, "Test mode accessors", null);
StateSpec = StateSpec_1 = __decorate([
    mocha_typescript_1.suite
], StateSpec);
var StateSpec_1;
//# sourceMappingURL=State.spec.js.map