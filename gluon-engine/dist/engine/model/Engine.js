"use strict";
var Game_1 = require("./Game");
var Engine = (function () {
    function Engine(gameName) {
        this.game = new Game_1.default(gameName);
    }
    Engine.prototype.getGame = function () {
        return this.game;
    };
    Engine.prototype.setGame = function (game) {
        this.game = game;
    };
    Engine.prototype.start = function () {
        var game = this.getGame();
        game.init().then(function () {
            game.load().then(function () {
                game.isRunning(true);
            });
        });
        return game;
    };
    Engine.prototype.stop = function () {
        this.getGame().isRunning(false);
        this.getGame().destroy();
    };
    return Engine;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Engine;
//# sourceMappingURL=Engine.js.map