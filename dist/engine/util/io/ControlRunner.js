"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KeyboardListener_1 = require("./KeyboardListener");
var MouseListener_1 = require("./MouseListener");
var ControlRunner = (function () {
    function ControlRunner() {
        this.cbsToCall = new Map();
        this.runWhenCBS = [];
        this.activatedInput = [];
        this.keyboardListener = new KeyboardListener_1.default(this.runWhenCBS, this.activatedInput);
        this.mouseListener = new MouseListener_1.default(this.runWhenCBS, this.activatedInput);
    }
    ControlRunner.prototype._runCBs = function (profiles, delta) {
        this.runWhileCBs(profiles, delta);
        this.runWhenCBs(profiles, delta);
        this.cbsToCall.forEach(function (cbArr, inputs) { return cbArr.forEach(function (cb) { return cb(null, delta); }); });
        this.cbsToCall.clear();
    };
    ControlRunner.prototype.runWhenCBs = function (profiles, delta) {
        var _this = this;
        profiles.forEach(function (profile) {
            profile.getWhenCBs().forEach(function (cbArr, inputArr) {
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
        });
    };
    ControlRunner.prototype.runWhileCBs = function (profiles, delta) {
        var _this = this;
        profiles.forEach(function (profile) {
            profile.getWhileCBs().forEach(function (cbArr, inputArr) {
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
        });
    };
    return ControlRunner;
}());
exports.default = ControlRunner;
//# sourceMappingURL=ControlRunner.js.map