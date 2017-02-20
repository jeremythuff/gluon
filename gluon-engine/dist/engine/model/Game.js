"use strict";
var Game = (function () {
    function Game(name) {
        if (name)
            this.setName(name);
    }
    Game.prototype.getName = function () {
        return this.name;
    };
    Game.prototype.setName = function (name) {
        this.name = name;
    };
    Game.prototype.isRunning = function (running) {
        if (running != null)
            this.running = running;
        return this.running;
    };
    Game.prototype.init = function () {
        var promise = new Promise(function (resolve, reject) {
            resolve();
        });
        return promise;
    };
    Game.prototype.load = function () {
        var promise = new Promise(function (resolve, reject) {
            resolve();
        });
        return promise;
    };
    Game.prototype.update = function () { };
    Game.prototype.render = function () { };
    Game.prototype.destroy = function () { };
    return Game;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Game;
//# sourceMappingURL=Game.js.map