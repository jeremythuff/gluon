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
            ["init, i [name]", colors.green("Creates the starting file and folder structure for a Gluon project.")],
            ["build, b", colors.green("Transpiles the projects typescript into the distribution folder.")],
            ["start, s [main.js]", colors.green("Launches the Gluon project.")],
            ["help, h: ", colors.green("Displays this dialog.")]
        ]);
        console.log(helpTable);
    };
    return Help;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Help;
//# sourceMappingURL=Help.js.map