"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Engine_1 = require("../model/Engine");
var RunningGameRegistry = require("../registries/RunningGame");
function GameMain(options) {
    return function (decorated) {
        var game = new decorated(decorated.name);
        if (!game.getName())
            game.setName(decorated.name);
        var engine = new Engine_1.default(game);
        engine.start();
        console.log("Registering State: " + game.getName());
        RunningGameRegistry.setRunningGame(game);
    };
}
exports.default = GameMain;
//# sourceMappingURL=GameMain.js.map