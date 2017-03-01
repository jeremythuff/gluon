"use strict";
var Engine = (function () {
    function Engine(game) {
        this.game = game;
    }
    Engine.prototype.getGame = function () {
        return this.game;
    };
    Engine.prototype.setGame = function (game) {
        this.game = game;
    };
    Engine.prototype.start = function () {
        var game = this.getGame();
        game.init().subscribe(function () {
            game.load().subscribe(function () {
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