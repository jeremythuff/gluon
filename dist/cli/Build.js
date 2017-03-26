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
var nodePath = require("path");
var fs = require("fs");
var readline = require("readline");
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
        var mainJsPath = "Main.js";
        console.log(table([[new Date().toString(), "Transpiling typescript."]]));
        if (shell.test('-d', "dist"))
            shell.rm("-rf", "dist");
        nodecli.exec("tsc", function (code, out) {
            var paths = new Array();
            out.split(/\r?\n/).forEach(function (outLine) {
                if (outLine.includes("TSFILE") && !outLine.includes(".d.ts") && !outLine.includes(".js.map")) {
                    var absolutePath_1 = outLine.replace("TSFILE: ", "");
                    var path = outLine.substring(outLine.indexOf("dist/") + 5, outLine.length);
                    paths.push(path);
                    var rl = readline.createInterface({
                        input: require('fs').createReadStream(absolutePath_1),
                        output: process.stdout,
                        terminal: false
                    });
                    rl.on("line", function (line) {
                        if (line.indexOf("require(\".." + nodePath.sep) !== -1 || line.indexOf("require('.." + nodePath.sep) !== -1) {
                            var upDirMatch = /(\.\.\/)/g;
                            var upDirCount = (line.match(upDirMatch) || []).length;
                            var absPathArr = absolutePath_1.split(nodePath.sep);
                            var endOfPath = absolutePath_1.match(/^\\(.+\\)*(.+)\.(.+)$/);
                            var pathStartIndex = absPathArr.length - upDirCount;
                            var newPath = absPathArr.slice(pathStartIndex, absPathArr.length - 1).join(nodePath.sep);
                            var upDirPattern = /(\.\.\/)+/;
                            var modifiedLine = line.replace(upDirPattern, "." + nodePath.sep + newPath);
                            shell.sed("-i", line.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), modifiedLine, absolutePath_1);
                        }
                    });
                }
            });
            console.log(table([[new Date().toString(), "Building html."]]));
            if (!shell.test('-d', "dist/resources"))
                shell.mkdir("dist/resources");
            if (shell.test('-d', localResourceDir + "/html"))
                shell.cp("-R", localResourceDir + "/html", "dist/resources/html/");
            shell.cp(mainHtmlTemplatePath, mainHtmlPath);
            paths.forEach(function (path) {
                shell.sed("-i", "{SCRIPTS}", "<script src='" + path + "'></script>\n\t\t{SCRIPTS}", mainHtmlPath);
            });
            shell.sed("-i", "{SCRIPTS}", "", mainHtmlPath);
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
        });
    };
    return Build;
}(AbstractCliCommand_1.default));
Build.key = "build";
Build.shortKey = "b";
Build.help = ["build, b", colors.green("Transpiles the projects typescript into the distribution folder.")];
exports.default = Build;
//# sourceMappingURL=Build.js.map