#!/usr/bin/env node
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractCliCommand_1 = require("./AbstractCliCommand");
var shelljs = require("shelljs");
var path = require("path");
var process = require("process");
var colors = require('colors/safe');
var nodecli = require("shelljs-nodecli");
var Start = (function (_super) {
    __extends(Start, _super);
    function Start() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Start.prototype.execute = function (args) {
        console.log(colors.green.underline("Starting Gluon..."));
        var execustionPath = path.resolve(this.getGlobalModuleRoot(), "dist", "launcher", "Launcher.js");
        var mainJsPath = path.resolve(process.cwd(), args[0]);
        var mainHtmlPath = __dirname + "/../engine/resources/html/main.html";
        shelljs.sed("-i", "{MAIN_JS}", mainJsPath, mainHtmlPath);
        nodecli.exec("electron", execustionPath + " " + mainHtmlPath);
    };
    return Start;
}(AbstractCliCommand_1.default));
Start.help = ["start, s [main.js]", colors.green("Launches the Gluon project.")];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Start;
//# sourceMappingURL=Start.js.map