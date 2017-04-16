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
var Docs = (function (_super) {
    __extends(Docs, _super);
    function Docs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Docs.prototype.execute = function (args) {
        var engineDir = this.getGlobalModuleRoot();
        var resourcesDir = engineDir + "/dist/engine/resources";
        var docsHtmlPath = engineDir + "/docs/index.html";
        var execustionPath = engineDir + "/dist/launcher/Launcher.js";
        nodecli.exec("electron", execustionPath + " " + docsHtmlPath + " false");
        shelljs.exit(0);
    };
    return Docs;
}(AbstractCliCommand_1.default));
Docs.key = "docs";
Docs.shortKey = "d";
Docs.help = [Docs.key + ", " + Docs.shortKey, colors.green("Launches a documentation application.")];
exports.default = Docs;
//# sourceMappingURL=Docs.js.map