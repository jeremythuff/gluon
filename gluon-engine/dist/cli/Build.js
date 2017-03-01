"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        console.log(table([[new Date().toString(), "Transpiling typescript."]]));
        nodecli.exec("tsc");
        console.log(table([[new Date().toString(), "Compiling styles."]]));
        NodeSass.render({
            file: "src/resources/sass/main.scss"
        }, function (err, res) {
            if (!err) {
                if (!shell.test('-d', "dist/resources"))
                    shell.mkdir("dist/resources");
                if (!shell.test('-d', "dist/resources/sass"))
                    shell.mkdir("dist/resources/sass");
                fs.writeFile("dist/resources/sass/main.css", res.css, function (e) {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Build;
//# sourceMappingURL=Build.js.map