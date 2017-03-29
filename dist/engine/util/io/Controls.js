"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Keyboard_1 = require("./Keyboard");
var Controls = (function () {
    function Controls() {
        this.keyboard = new Keyboard_1.default();
    }
    Controls.prototype._runCBs = function (delta) {
        this.keyboard._runCBs(delta);
    };
    return Controls;
}());
exports.default = Controls;
//# sourceMappingURL=Controls.js.map