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
var shell = require("shelljs");
var NodeSass = require("node-sass");
var fs = require("fs");
var colors = require('colors/safe');
var nodecli = require("shelljs-nodecli");
var table = require('text-table');
var Build = (function (_super) {
    __extends(Build, _super);
    function Build() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Build.prototype.execute = function (args) {
        var engineDir = this.getGlobalModuleRoot();
        var globalResourcesDir = engineDir + "/dist/engine/resources";
        var mainHtmlTemplatePath = globalResourcesDir + "/html/main.html";
        var localResourceDir = "src/resources";
        var mainHtmlPath = "dist/main.html";
        var mainCssPath = "resources/css/main.css";
        var mainJsPath = "main.js";
        console.log(table([[new Date().toString(), "Transpiling typescript."]]));
        nodecli.exec("tsc");
        console.log(table([[new Date().toString(), "Building html."]]));
        if (!shell.test('-d', "dist/resources"))
            shell.mkdir("dist/resources");
        if (!shell.test('-d', localResourceDir + "/html"))
            shell.cp("-R", localResourceDir + "/html", "dist/resources/html/");
        shell.cp(mainHtmlTemplatePath, mainHtmlPath);
        shell.sed("-i", "{GAME_MAIN_JS}", mainJsPath, mainHtmlPath);
        shell.sed("-i", "{GAME_MAIN_CSS}", mainCssPath, mainHtmlPath);
        console.log(table([[new Date().toString(), "Compiling styles."]]));
        NodeSass.render({
            file: "src/resources/sass/main.scss"
        }, function (err, res) {
            if (!err) {
                if (!shell.test('-d', "dist/resources/css"))
                    shell.mkdir("dist/resources/css");
                fs.writeFile("dist/" + mainCssPath, res.css, function (e) {
                    if (!e) {
                        console.log(table([[new Date().toString(), "Styles written to disk."]]));
                    }
                    else {
                        console.log(e);
                    }
                });
            }
            else {
                console.log(err);
            }
        });
    };
    return Build;
}(AbstractCliCommand_1.default));
Build.help = ["build, b", colors.green("Transpiles the projects typescript into the distribution folder.")];
exports.default = Build;
//# sourceMappingURL=Build.js.map