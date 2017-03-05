"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var shell = require("shelljs");
var AbstractCliCommand_1 = require("./AbstractCliCommand");
var nodecli = require("shelljs-nodecli");
var colors = require('colors/safe');
var table = require('text-table');
var Init = (function (_super) {
    __extends(Init, _super);
    function Init() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Init.prototype.execute = function (args) {
        var gameName = args[0] ? args[0] : "game";
        var classSafeGameName = this.classCase(gameName);
        var engineDir = this.getGlobalModuleRoot();
        var resourcesDir = engineDir + "/dist/engine/resources";
        var cliDir = resourcesDir + "/cli";
        var tmpDir = shell.tempdir();
        console.log(table([[new Date().toString(), "Creating project directory: " + gameName + "."]]));
        if (!shell.test('-d', gameName)) {
            shell.mkdir(gameName);
        }
        else {
            console.log("ERROR");
            console.log("A directory already exists by the name: " + gameName);
        }
        shell.cd(gameName);
        console.log(table([[new Date().toString(), "Initializing npm enviroement."]]));
        shell.cp(cliDir + "/project.package.json", shell.pwd() + "/package.json");
        shell.sed('-i', '{GAME_NAME}', gameName.toLowerCase(), shell.pwd() + "/package.json");
        console.log(table([[new Date().toString(), "Installing dependancies."]]));
        nodecli.exec("npm", "install --save " + engineDir);
        console.log(table([[new Date().toString(), "Initializing typescript enviroement."]]));
        shell.cp(cliDir + "/project.tsconfig.json", "tsconfig.json");
        if (!shell.test('-d', "src"))
            shell.mkdir("src");
        if (!shell.test('-d', "src/typescript"))
            shell.mkdir("src/typescript");
        if (!shell.test('-d', "src/typescript/game"))
            shell.mkdir("src/typescript/game");
        shell.cp(cliDir + "/project.main.ts", 'src/typescript/game/main.ts');
        shell.sed('-i', '{GAME_NAME}', classSafeGameName, 'src/typescript/game/main.ts');
        console.log(table([[new Date().toString(), "Copying styles."]]));
        if (!shell.test('-d', "src/resources"))
            shell.mkdir("src/resources");
        shell.mkdir("src/resources/sass");
        shell.cp(cliDir + "/project.main.scss", shell.pwd() + "/src/resources/sass/main.scss");
        shell.sed('-i', '{MAIN_SCSS}', resourcesDir + "/sass/gluon-engine.scss", shell.pwd() + "/src/resources/sass/main.scss");
        if (!shell.test('-d', "src/typescript/tests"))
            shell.mkdir("src/typescript/tests");
    };
    Init.prototype.classCase = function (str) {
        var newStr = str.toLowerCase()
            .replace(/['"]/g, '')
            .replace(/\W+/g, ' ')
            .replace(/ (.)/g, function ($1) { return $1.toUpperCase(); })
            .replace(/ /g, '');
        return newStr.charAt(0).toUpperCase() + newStr.slice(1);
    };
    return Init;
}(AbstractCliCommand_1.default));
Init.help = ["init, i [name]", colors.green("Creates the starting file and folder structure for a Gluon project.")];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Init;
//# sourceMappingURL=Init.js.map