"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractCliCommand_1 = require("./AbstractCliCommand");
var colors = require('colors/safe');
var nodecli = require("shelljs-nodecli");
var Build = (function (_super) {
    __extends(Build, _super);
    function Build() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Build.prototype.execute = function (args) {
        nodecli.exec("tsc");
    };
    return Build;
}(AbstractCliCommand_1.default));
Build.help = ["build, b", colors.green("Transpiles the projects typescript into the distribution folder.")];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Build;
//# sourceMappingURL=Build.js.map