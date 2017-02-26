"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var shell = require("shelljs");
var AbstractCliCommand_1 = require("./AbstractCliCommand");
var nodecli = require("shelljs-nodecli");
var Init = (function (_super) {
    __extends(Init, _super);
    function Init() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Init.prototype.execute = function (args) {
        var gameName = args[0] ? args[0] : "game";
        var engineDir = this.getGlobalModuleRoot();
        var resourcesDir = engineDir + "/dist/engine/resources";
        var cliDir = resourcesDir + "/cli";
        var tmpDir = shell.tempdir();
        if (!shell.test('-d', "src"))
            shell.mkdir("src");
        if (!shell.test('-d', "src/typescript"))
            shell.mkdir("src/typescript");
        if (!shell.test('-d', "src/typescript/" + gameName))
            shell.mkdir("src/typescript/" + gameName);
        if (!shell.test('-d', "src/typescript/resources"))
            shell.mkdir("src/typescript/resources");
        if (!shell.test('-d', "src/typescript/tests"))
            shell.mkdir("src/typescript/tests");
        shell.cp(cliDir + "/project.package.json", shell.pwd() + "/package.json");
    };
    return Init;
}(AbstractCliCommand_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Init;
//# sourceMappingURL=Init.js.map