#!/usr/bin/env node
"use strict";
var colors = require('colors/safe');
var table = require('text-table');
var Help = (function () {
    function Help() {
    }
    Help.prototype.execute = function (args) {
        console.log("\n" + colors.yellow.underline("Gluon CLI Usage:") + "\n");
        var helpTable = table([
            ["start, s [main.js]", colors.green("Luanch the gluon game.")],
            ["help, h: ", colors.green("Display this dialog.")]
        ]);
        console.log(helpTable);
    };
    return Help;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Help;
//# sourceMappingURL=Help.js.map