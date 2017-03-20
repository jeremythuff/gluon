"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Engine_1 = require("../model/Engine");
var RunningGame = require("../registries/RunningGame");
function GameMain(options) {
    return function (decorated) {
        var game = new decorated(decorated.name);
        if (!game.getName())
            game.setName(decorated.name);
        console.log("Registering Game: " + game.getName());
        RunningGame.setRunningGame(game);
        var startGameInterval = window.setInterval(function () {
            RunningGame.getRunningGameSubject().subscribe(function (game) {
                if (game.getActiveState()) {
                    console.log("Starting engine");
                    var engine = new Engine_1.default(game);
                    engine.start();
                    window.clearInterval(startGameInterval);
                }
            });
        }, 250);
    };
}
exports.default = GameMain;
//# sourceMappingURL=GameMain.js.map