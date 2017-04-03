"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ControlProfile = (function () {
    function ControlProfile(controlee) {
        this.controlee = controlee;
        this.whileCBs = new Map();
        this.whenCBs = new Map();
    }
    ControlProfile.prototype.While = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return function (controlCB, propertyKey, descriptor) {
            this.whileCBs.get([inputs]) ? this.whileCBs.get([inputs]).push(controlCB) : this.whileCBs.set([inputs], [controlCB]);
        };
    };
    ControlProfile.prototype.When = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return function (controlCB, propertyKey, descriptor) {
            this.whenCBs.get([inputs]) ? this.whenCBs.get([inputs]).push(controlCB) : this.whenCBs.set([inputs], [controlCB]);
        };
    };
    ControlProfile.prototype.WhileAny = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return function (controlCB) {
            var _this = this;
            inputs.forEach(function (k) {
                _this.whileCBs.get([k]) ? _this.whileCBs.get([k]).push(controlCB) : _this.whileCBs.set([k], [controlCB]);
            });
        };
    };
    ControlProfile.prototype.WhenAny = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return function (controlCB) {
            var _this = this;
            inputs.forEach(function (k) {
                _this.whenCBs.get([k]) ? _this.whenCBs.get([k]).push(controlCB) : _this.whenCBs.set([k], [controlCB]);
            });
        };
    };
    ControlProfile.prototype.getWhileCBs = function () {
        return this.whileCBs;
    };
    ControlProfile.prototype.getWhenCBs = function () {
        return this.whenCBs;
    };
    return ControlProfile;
}());
exports.default = ControlProfile;
//# sourceMappingURL=ControlProfile.js.map