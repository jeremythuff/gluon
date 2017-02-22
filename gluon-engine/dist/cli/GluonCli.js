#!/usr/bin/env node
"use strict";
var process = require("process");
var Build_1 = require("./Build");
var Init_1 = require("./Init");
var Start_1 = require("./Start");
var Help_1 = require("./Help");
var colors = require('colors/safe');
var GluonCli = (function () {
    function GluonCli(args) {
        this.args = args.slice(3, args.length);
    }
    GluonCli.prototype.provessCommand = function (arg) {
        var command;
        switch (arg) {
            case "init":
            case "i": {
                command = new Init_1.default();
                break;
            }
            case "build":
            case "b": {
                command = new Build_1.default();
                break;
            }
            case "start":
            case "s": {
                command = new Start_1.default();
                break;
            }
            case "help":
            case "h":
            default: {
                console.log(colors.red("\n *ERROR* command not found: " + arg));
                command = new Help_1.default();
                break;
            }
        }
        command.execute(this.args);
    };
    return GluonCli;
}());
var glionCli = new GluonCli(process.argv);
glionCli.provessCommand(process.argv[2]);
//# sourceMappingURL=GluonCli.js.map