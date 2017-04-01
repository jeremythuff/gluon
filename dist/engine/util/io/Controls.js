"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KeyboardListener_1 = require("./KeyboardListener");
var MouseListener_1 = require("./MouseListener");
var ControlRule_1 = require("./ControlRule");
var Controls = (function () {
    function Controls() {
        this.whileCBs = new Map();
        this.whenCBs = new Map();
        this.cbsToCall = new Map();
        this.runWhenCBS = [];
        this.activatedInput = [];
        this.keyboardListener = new KeyboardListener_1.default(this.runWhenCBS, this.activatedInput);
        this.mouseListener = new MouseListener_1.default(this.runWhenCBS, this.activatedInput);
    }
    Controls.prototype.when = function () {
        var input = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            input[_i] = arguments[_i];
        }
        return new ControlRule_1.default(input, this.whenCBs);
    };
    Controls.prototype.whenAny = function () {
        var input = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            input[_i] = arguments[_i];
        }
        return new ControlRule_1.default(input, this.whenCBs, true);
    };
    Controls.prototype.while = function () {
        var input = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            input[_i] = arguments[_i];
        }
        return new ControlRule_1.default(input, this.whileCBs);
    };
    Controls.prototype.whileAny = function () {
        var input = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            input[_i] = arguments[_i];
        }
        return new ControlRule_1.default(input, this.whileCBs, true);
    };
    Controls.prototype._runCBs = function (delta) {
        this.runWhileCBs(delta);
        this.runWhenCBs(delta);
        this.cbsToCall.forEach(function (cbArr, inputs) { return cbArr.forEach(function (cb) { return cb(delta, inputs); }); });
        this.cbsToCall.clear();
    };
    Controls.prototype.runWhenCBs = function (delta) {
        var _this = this;
        this.whenCBs.forEach(function (cbArr, inputArr) {
            var inputsActive = inputArr.every(function (k) {
                return _this.activatedInput[k];
            });
            if (inputsActive && _this.runWhenCBS.indexOf(cbArr) === -1) {
                _this.cbsToCall.set(inputArr, cbArr);
                _this.runWhenCBS.push(cbArr);
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
    Controls.prototype.runWhileCBs = function (delta) {
        var _this = this;
        this.whileCBs.forEach(function (cbArr, inputArr) {
            var inputsActive = inputArr.every(function (k) {
                return _this.activatedInput[k];
            });
            if (inputsActive) {
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
    return Controls;
}());
exports.default = Controls;
//# sourceMappingURL=Controls.js.map