"use strict";
var colors = require('colors/safe');
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
    return AbstractCliCommand;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AbstractCliCommand;
//# sourceMappingURL=AbstractCliCommand.js.map