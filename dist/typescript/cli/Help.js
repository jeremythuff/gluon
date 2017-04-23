#!/usr/bin/env node
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractCliCommand_1 = require("./AbstractCliCommand");
var Start_1 = require("./Start");
var Init_1 = require("./Init");
var Build_1 = require("./Build");
var Test_1 = require("./Test");
var Docs_1 = require("./Docs");
var colors = require('colors/safe');
var table = require('text-table');
var Help = (function (_super) {
    __extends(Help, _super);
    function Help() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Help.prototype.execute = function (args) {
        console.log("\n" + colors.yellow.underline("Gluon CLI Usage:") + "\n");
        var helpTable = table([
            Init_1.default.help,
            Build_1.default.help,
            Start_1.default.help,
            Docs_1.default.help,
            Test_1.default.help,
            Help.help
        ]);
        console.log(helpTable);
    };
    return Help;
}(AbstractCliCommand_1.default));
Help.key = "help";
Help.shortKey = "h";
Help.help = ["help, h: ", colors.green("Displays this dialog.")];
exports.default = Help;
//# sourceMappingURL=Help.js.map