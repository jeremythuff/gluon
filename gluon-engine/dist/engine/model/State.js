"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var State = (function () {
    function State(name) {
        if (name)
            this.setName(name);
    }
    State.prototype.getName = function () {
        return this.name;
    };
    State.prototype.setName = function (name) {
        this.name = name;
    };
    return State;
}());
exports.default = State;
//# sourceMappingURL=State.js.map