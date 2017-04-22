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
var shelljs = require("shelljs");
var colors = require('colors/safe');
var nodecli = require("shelljs-nodecli");
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Test.prototype.execute = function (args) {
        var engineDir = this.getGlobalModuleRoot();
        var resourcesDir = engineDir + "/dist/engine/resources";
        var mainHtmlPath = shelljs.pwd() + "/dist/main.html";
        var execustionPath = engineDir + "/dist/launcher/Launcher.js";
        if (args.some(function (arg) {
            return arg === "watch" || arg === "w";
        })) {
            nodecli.exec("tsc-watch", "--onSuccess 'glu t'");
        }
        else {
            nodecli.exec("electron-mocha", "-w --renderer -R spec \"" + shelljs.pwd() + "/dist/**/*.spec.js\"");
        }
        shelljs.exit(0);
    };
    return Test;
}(AbstractCliCommand_1.default));
Test.key = "test";
Test.shortKey = "t";
Test.help = [Test.key + ", " + Test.shortKey + " [Main.js]", colors.green("Tests the Gluon project.")];
exports.default = Test;
//# sourceMappingURL=Test.js.map