"use strict";
exports.__esModule = true;
var fs = require("fs");
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var FileLoader = (function () {
    function FileLoader() {
    }
    FileLoader.getFileContents = function (path) {
        var fileSubject = new Rx_1.ReplaySubject(1);
        fs.readFile(path, function (e, buffer) {
            fileSubject.next(buffer.toString());
        });
        return fileSubject.asObservable();
    };
    return FileLoader;
}());
exports["default"] = FileLoader;
