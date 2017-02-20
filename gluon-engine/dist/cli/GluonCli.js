#!/usr/bin/env node
"use strict";
var process = require("process");
var Start_1 = require("./Start");
var Help_1 = require("./Help");
var GluonCli = (function () {
    function GluonCli(args) {
        this.args = args.slice(3, args.length);
    }
    GluonCli.prototype.provessCommand = function (arg) {
        var command;
        switch (arg) {
            case "--start":
            case "-s": {
                command = new Start_1.default();
                break;
            }
            case "--help":
            case "-h":
            default: {
                command = new Help_1.default();
                break;
            }
        }
        command.run(this.args);
    };
    return GluonCli;
}());
var glionCli = new GluonCli(process.argv);
glionCli.provessCommand(process.argv[2]);
//# sourceMappingURL=GluonCli.js.map