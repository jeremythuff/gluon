#!/usr/bin/env node
"use strict";
var shelljs = require("shelljs");
var path = require("path");
var nodecli = require("shelljs-nodecli");
var execustionPath = path.resolve("node_modules", "gluon-engine", "dist", "util", "Launcher.js");
var mainJsPath = path.resolve(process.cwd(), process.argv[2]);
var mainHtmlPath = __dirname + "/../main.html";
shelljs.chmod(755, mainHtmlPath);
shelljs.sed("-i", "{MAIN_JS}", mainJsPath, mainHtmlPath);
nodecli.exec("electron", execustionPath + " " + mainHtmlPath);
//# sourceMappingURL=GluonCli.js.map