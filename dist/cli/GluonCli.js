#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process = require("process");
var npm = require("npm");
var path = require("path");
var Build_1 = require("./Build");
var Docs_1 = require("./Docs");
var Init_1 = require("./Init");
var Start_1 = require("./Start");
var Help_1 = require("./Help");
var colors = require('colors/safe');
var GluonCli = (function () {
    function GluonCli(args) {
        this.engineRoot = path.resolve(process.argv[0], "gluon-engine");
        this.args = args.slice(3, args.length);
    }
    GluonCli.prototype.processCommand = function (arg) {
        var command;
        npm.load({}, function () {
            var globalModuleRoot = path.resolve(npm.globalDir, "gluon-engine");
            switch (arg) {
                case Build_1.default.key:
                case Build_1.default.shortKey: {
                    command = new Build_1.default(this.engineRoot, globalModuleRoot);
                    break;
                }
                case Docs_1.default.key:
                case Docs_1.default.shortKey: {
                    command = new Docs_1.default(this.engineRoot, globalModuleRoot);
                    break;
                }
                case Init_1.default.key:
                case Init_1.default.shortKey: {
                    command = new Init_1.default(this.engineRoot, globalModuleRoot);
                    break;
                }
                case Start_1.default.key:
                case Start_1.default.shortKey: {
                    command = new Start_1.default(this.engineRoot, globalModuleRoot);
                    break;
                }
                case Help_1.default.key:
                case Help_1.default.shortKey:
                default: {
                    if (arg !== Help_1.default.key || arg !== Help_1.default.shortKey) {
                        console.log(colors.red("\n *ERROR* command not found: " + arg));
                    }
                    command = new Help_1.default(this.engineRoot, globalModuleRoot);
                    break;
                }
            }
            command.execute(this.args);
        }.bind(this));
    };
    return GluonCli;
}());
var glionCli = new GluonCli(process.argv);
glionCli.processCommand(process.argv[2]);
//# sourceMappingURL=GluonCli.js.map