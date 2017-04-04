"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ControlProfile = (function () {
    function ControlProfile(controlee) {
        this.controlee = controlee;
        this.whileCBs = new Map();
        this.whenCBs = new Map();
        console.log("BUILT");
    }
    ControlProfile.prototype.setWhileCBs = function (whileCBs) {
        this.whileCBs = whileCBs;
    };
    ControlProfile.prototype.setWhhenCBs = function (whileCBs) {
        this.whileCBs = whileCBs;
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