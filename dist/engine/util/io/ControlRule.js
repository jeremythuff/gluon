"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ControlRule = (function () {
    function ControlRule(inputs, cbs, any) {
        this.cbs = cbs;
        this.inputs = inputs;
        this.any = any;
    }
    ControlRule.prototype.run = function (cb) {
        var _this = this;
        if (this.any) {
            this.inputs.forEach(function (k) {
                _this.cbs.get([k]) ? _this.cbs.get([k]).push(cb) : _this.cbs.set([k], [cb]);
            });
        }
        else {
            this.cbs.get(this.inputs) ? this.cbs.get(this.inputs).push(cb) : this.cbs.set(this.inputs, [cb]);
        }
    };
    return ControlRule;
}());
exports.default = ControlRule;
//# sourceMappingURL=ControlRule.js.map