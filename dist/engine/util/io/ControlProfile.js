"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ControlProfile = (function () {
    function ControlProfile(controlee) {
        this.controlee = controlee;
        this.whileCBs = new Map();
        this.whenCBs = new Map();
        console.log("BUILT");
    }
    ControlProfile.prototype.addWhileCBs = function (inputs, cbs) {
        this.whileCBs.set(inputs, cbs);
    };
    ControlProfile.prototype.addWhenCBs = function (inputs, cbs) {
        this.whenCBs.set(inputs, cbs);
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