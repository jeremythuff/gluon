#!/usr/bin/env node
"use strict";
var shelljs = require("shelljs");
var path = require("path");
var process = require("process");
var colors = require('colors/safe');
var nodecli = require("shelljs-nodecli");
var Start = (function () {
    function Start() {
    }
    Start.prototype.run = function (args) {
        console.log(colors.green.underline("Starting Gluon..."));
        var execustionPath = path.resolve("node_modules", "gluon-engine", "dist", "util", "Launcher.js");
        var mainJsPath = path.resolve(process.cwd(), args[0]);
        var mainHtmlPath = __dirname + "/../../main.html";
        shelljs.sed("-i", "{MAIN_JS}", mainJsPath, mainHtmlPath);
        nodecli.exec("electron", execustionPath + " " + mainHtmlPath);
    };
    return Start;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Start;
//# sourceMappingURL=Start.js.map