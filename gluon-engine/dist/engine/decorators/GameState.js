"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RunningGame = require("../registries/RunningGame");
function GameState(options) {
    return function (decorated) {
        console.log("Registering State.");
        var state = new decorated(decorated.name);
        if (!state.getName())
            state.setName(decorated.name);
        RunningGame.getRunningGame().subscribe(function (game) {
            game.addState(state);
        });
    };
}
exports.default = GameState;
//# sourceMappingURL=GameState.js.map