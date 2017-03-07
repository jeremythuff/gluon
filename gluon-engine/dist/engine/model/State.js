"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var State = (function () {
    function State(name) {
        if (name)
            this.setName(name);
    }
    State.prototype.init = function () {
        return Rx_1.Observable.of(function () { });
    };
    State.prototype.load = function () {
        return Rx_1.Observable.of(function () { });
    };
    State.prototype.update = function () { };
    State.prototype.render = function () { };
    State.prototype.destroy = function () { };
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