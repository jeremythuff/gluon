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
var path = require("path");
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
        var globalResourcesDir = "" + engineDir + path.sep + "dist" + path.sep + "engine" + path.sep + "resources";
        var mainHtmlTemplatePath = "" + globalResourcesDir + path.sep + "html" + path.sep + "main.html";
        var localResourceDir = "src" + path.sep + "resources";
        var mainHtmlPath = "dist" + path.sep + "main.html";
        var mainCssPath = "resources" + path.sep + "css" + path.sep + "main.css";
        var mainJsPath = "Main.js";
        console.log(table([[new Date().toString(), "Transpiling typescript."]]));
        if (shell.test('-d', "dist"))
            shell.rm("-rf", "dist");
        nodecli.exec("tsc", function (code, out) {
            var paths = new Array();
            out.split(/\r?\n/).forEach(function (outLine) {
                if (outLine.includes("TSFILE") && !outLine.includes(".d.ts") && !outLine.includes(".js.map")) {
                    var filePath = outLine.substring(outLine.indexOf("dist" + path.sep) + 5, outLine.length);
                    paths.push(filePath);
                }
            });
            console.log(table([[new Date().toString(), "Building html."]]));
            if (!shell.test('-d', "dist" + path.sep + "resources"))
                shell.mkdir("dist" + path.sep + "resources");
            if (shell.test('-d', "" + localResourceDir + path.sep + "html"))
                shell.cp("-R", "" + localResourceDir + path.sep + "html", "dist" + path.sep + "resources" + path.sep + "html" + path.sep);
            shell.cp(mainHtmlTemplatePath, mainHtmlPath);
            paths.forEach(function (scriptPath) {
                shell.sed("-i", "{SCRIPTS}", "<script src='" + scriptPath + "'></script>\n\t\t{SCRIPTS}", mainHtmlPath);
            });
            shell.sed("-i", "{SCRIPTS}", "", mainHtmlPath);
            shell.sed("-i", "{GAME_MAIN_CSS}", mainCssPath, mainHtmlPath);
            console.log(table([[new Date().toString(), "Compiling styles."]]));
            NodeSass.render({
                file: "src" + path.sep + "resources" + path.sep + "sass" + path.sep + "main.scss"
            }, function (err, res) {
                if (!err) {
                    if (!shell.test('-d', "dist" + path.sep + "resources" + path.sep + "css"))
                        shell.mkdir("dist" + path.sep + "resources" + path.sep + "css");
                    fs.writeFile("dist" + path.sep + mainCssPath, res.css, function (e) {
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
        });
    };
    return Build;
}(AbstractCliCommand_1.default));
Build.key = "build";
Build.shortKey = "b";
Build.help = ["build, b", colors.green("Transpiles the projects typescript into the distribution folder.")];
exports.default = Build;
//# sourceMappingURL=Build.js.map