"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractControlDevice = (function () {
    function AbstractControlDevice(runWhenCBS, activatedInput) {
        this.runWhenCBS = runWhenCBS;
        this.activatedInput = activatedInput;
    }
    AbstractControlDevice.prototype.activateInput = function (inputCode) {
        this.activatedInput[inputCode] = true;
    };
    AbstractControlDevice.prototype.releaseInput = function (inputCode) {
        this.activatedInput[inputCode] = false;
        this.runWhenCBS.length = 0;
    };
    return AbstractControlDevice;
}());
exports.AbstractControlDevice = AbstractControlDevice;
//# sourceMappingURL=AbstractControlDevice.js.map