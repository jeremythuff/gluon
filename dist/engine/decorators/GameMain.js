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
        RunningGame.getRunningGameSubject().delay(500).subscribe(function (game) {
            console.log("Starting engine");
            var engine = new Engine_1.default(game);
            engine.start();
        });
    };
}
exports.default = GameMain;
//# sourceMappingURL=GameMain.js.map