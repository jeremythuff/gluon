"use strict";
var State = (function () {
    function State() {
    }
    State.prototype.getName = function () {
        return this.name;
    };
    State.prototype.setName = function (name) {
        this.name = name;
    };
    return State;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = State;
//# sourceMappingURL=State.js.map