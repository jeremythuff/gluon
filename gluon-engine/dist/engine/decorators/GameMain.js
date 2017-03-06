"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Engine_1 = require("../model/Engine");
var RunningGame = require("../registries/RunningGame");
function GameMain(options) {
    return function (decorated) {
        console.log("Registering Game.");
        var game = new decorated(decorated.name);
        if (!game.getName())
            game.setName(decorated.name);
        RunningGame.setRunningGame(game);
        var engine = new Engine_1.default(game);
        engine.start();
    };
}
exports.default = GameMain;
//# sourceMappingURL=GameMain.js.map