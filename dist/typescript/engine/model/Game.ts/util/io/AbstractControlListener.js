"use strict";
exports.__esModule = true;
var AbstractControlListener = (function () {
    function AbstractControlListener(runWhenCBS, activatedInput) {
        this.runWhenCBS = runWhenCBS;
        this.activatedInput = activatedInput;
    }
    AbstractControlListener.prototype.activateInput = function (inputCode) {
        this.activatedInput[inputCode] = true;
    };
    AbstractControlListener.prototype.releaseInput = function (inputCode) {
        this.activatedInput[inputCode] = false;
        this.runWhenCBS.length = 0;
    };
    AbstractControlListener.prototype.getLastEvent = function () {
        return this.lastEvent;
    };
    return AbstractControlListener;
}());
exports.AbstractControlListener = AbstractControlListener;
