"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KeyboardListener_1 = require("./KeyboardListener");
var MouseListener_1 = require("./MouseListener");
var ControlRunner = (function () {
    function ControlRunner() {
        this.cbsToCall = new Map();
        this.alreadyRun = [];
        this.activatedInput = [];
        this.keyboardListener = new KeyboardListener_1.default(this.alreadyRun, this.activatedInput);
        this.mouseListener = new MouseListener_1.default(this.alreadyRun, this.activatedInput);
        this.lastEvents = new Map();
    }
    ControlRunner.prototype._runCBs = function (profiles, delta) {
        this.runWhileCBs(profiles, delta);
        this.runWhenCBs(profiles, delta);
        var lastEventMap = new Map();
        lastEventMap.set("keyboard", this.keyboardListener.getLastEvent());
        lastEventMap.set("mouse", this.mouseListener.getLastEvent());
        this.cbsToCall.forEach(function (cbArr, inputs) { return cbArr.forEach(function (cb) { return cb(lastEventMap, delta); }); });
        this.cbsToCall.clear();
    };
    ControlRunner.prototype.runWhenCBs = function (profiles, delta) {
        var _this = this;
        profiles.forEach(function (profile) {
            profile.getWhenCBs().forEach(function (cbArr, inputArr) {
                var inputsActive = inputArr.every(function (k) {
                    return _this.activatedInput[k];
                });
                if (inputsActive && _this.alreadyRun.indexOf(cbArr) === -1) {
                    _this.cbsToCall.set(inputArr, cbArr);
                    _this.alreadyRun.push(cbArr);
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