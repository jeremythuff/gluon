"use strict";
var nodecli = require("shelljs-nodecli");
var shell = require("shelljs");
var Init = (function () {
    function Init() {
    }
    Init.prototype.execute = function (args) {
        nodecli.exec("npm", "install ../gluon-engine");
        var gameName = args[0];
        var engineDir = "node_modules/gluon-engine";
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
        console.log(gameName, engineDir, tmpDir);
    };
    return Init;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Init;
//# sourceMappingURL=Init.js.map