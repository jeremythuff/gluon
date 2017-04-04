"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    return AbstractControlListener;
}());
exports.AbstractControlListener = AbstractControlListener;
//# sourceMappingURL=AbstractControlListener.js.map