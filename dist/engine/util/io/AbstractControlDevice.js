"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ControlRule_1 = require("./ControlRule");
var AbstractControlDevice = (function () {
    function AbstractControlDevice() {
        this.runWhenCBS = [];
        this.activatedInput = [];
    }
    AbstractControlDevice.prototype.activateInput = function (inputCode) {
        this.activatedInput[inputCode] = true;
    };
    AbstractControlDevice.prototype.releaseInput = function (inputCode) {
        this.activatedInput[inputCode] = false;
        this.runWhenCBS.length = 0;
    };
    AbstractControlDevice.prototype.when = function () {
        var input = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            input[_i] = arguments[_i];
        }
        return new ControlRule_1.default(input, this.whenCBs);
    };
    AbstractControlDevice.prototype.whenAny = function () {
        var input = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            input[_i] = arguments[_i];
        }
        return new ControlRule_1.default(input, this.whenCBs, true);
    };
    AbstractControlDevice.prototype.while = function () {
        var input = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            input[_i] = arguments[_i];
        }
        return new ControlRule_1.default(input, this.whileCBs);
    };
    AbstractControlDevice.prototype.whileAny = function () {
        var input = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            input[_i] = arguments[_i];
        }
        return new ControlRule_1.default(input, this.whileCBs, true);
    };
    AbstractControlDevice.prototype._runCBs = function (delta) {
        this.runWhileCBs(delta);
        this.runWhenCBs(delta);
    };
    AbstractControlDevice.prototype.runWhenCBs = function (delta) {
        var _this = this;
        this.whenCBs.forEach(function (cbArray, keyArray) {
            var runCB = keyArray.every(function (k) {
                return _this.activatedInput[k];
            });
            if (runCB)
                cbArray.forEach(function (cb) {
                    if (_this.runWhenCBS.indexOf(cb) === -1) {
                        cb(delta, keyArray);
                        _this.runWhenCBS.push(cb);
                    }
                });
        });
    };
    AbstractControlDevice.prototype.runWhileCBs = function (delta) {
        var _this = this;
        this.whileCBs.forEach(function (cbArray, keyArray) {
            var runCB = keyArray.every(function (k) {
                return _this.activatedInput[k];
            });
            if (runCB)
                cbArray.forEach(function (cb) {
                    cb(delta, keyArray);
                });
        });
    };
    return AbstractControlDevice;
}());
exports.AbstractControlDevice = AbstractControlDevice;
//# sourceMappingURL=AbstractControlDevice.js.map