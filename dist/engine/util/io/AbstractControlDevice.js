"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ControlRule_1 = require("./ControlRule");
var AbstractControlDevice = (function () {
    function AbstractControlDevice() {
        this.runWhenCBS = [];
        this.activatedInput = [];
        this.cbsToCall = new Map();
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
        this.cbsToCall.forEach(function (cbArr, keys) { return cbArr.forEach(function (cb) { return cb(delta, keys); }); });
        this.cbsToCall.clear();
    };
    AbstractControlDevice.prototype.runWhenCBs = function (delta) {
        var _this = this;
        this.whenCBs.forEach(function (cbArr, inputArr) {
            var keysActive = inputArr.every(function (k) {
                return _this.activatedInput[k];
            });
            if (keysActive && _this.runWhenCBS.indexOf(cbArr) === -1) {
                _this.cbsToCall.set(inputArr, cbArr);
                _this.runWhenCBS.push(cbArr);
                _this.cbsToCall.forEach(function (cA, iA, map) {
                    if (iA !== inputArr && iA.some(function (i) {
                        return inputArr.indexOf(i) !== -1;
                    })) {
                        console.log("key is active");
                        if (iA.length <= inputArr.length) {
                            _this.cbsToCall.delete(iA);
                        }
                        else {
                            _this.cbsToCall.delete(inputArr);
                        }
                    }
                });
            }
        });
    };
    AbstractControlDevice.prototype.runWhileCBs = function (delta) {
        var _this = this;
        this.whileCBs.forEach(function (cbArr, inputArr) {
            var keysActive = inputArr.every(function (k) {
                return _this.activatedInput[k];
            });
            if (keysActive) {
                _this.cbsToCall.set(inputArr, cbArr);
                _this.cbsToCall.forEach(function (cA, iA, map) {
                    if (iA !== inputArr && iA.some(function (i) {
                        return inputArr.indexOf(i) !== -1;
                    })) {
                        if (iA.length <= inputArr.length) {
                            _this.cbsToCall.delete(iA);
                        }
                        else {
                            _this.cbsToCall.delete(inputArr);
                        }
                    }
                });
            }
        });
    };
    return AbstractControlDevice;
}());
exports.AbstractControlDevice = AbstractControlDevice;
//# sourceMappingURL=AbstractControlDevice.js.map