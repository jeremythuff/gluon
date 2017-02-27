"use strict";
var colors = require('colors/safe');
var table = require('text-table');
var AbstractCliCommand = (function () {
    function AbstractCliCommand(rootPath, globalModuleRoot) {
        this.rootPath = rootPath;
        this.globalModuleRoot = globalModuleRoot;
    }
    AbstractCliCommand.prototype.setRootPath = function (rootPath) {
        this.rootPath = rootPath;
    };
    AbstractCliCommand.prototype.getRootPath = function () {
        return this.rootPath;
    };
    AbstractCliCommand.prototype.setGlobalModuleRoot = function (globalModuleRoot) {
        this.globalModuleRoot = globalModuleRoot;
    };
    AbstractCliCommand.prototype.getGlobalModuleRoot = function () {
        return this.globalModuleRoot;
    };
    AbstractCliCommand.prototype.printHelp = function () {
        var t = table(AbstractCliCommand.help);
        console.log(t);
    };
    ;
    return AbstractCliCommand;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AbstractCliCommand;
//# sourceMappingURL=AbstractCliCommand.js.map