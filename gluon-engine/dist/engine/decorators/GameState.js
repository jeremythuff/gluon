"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameState;
//# sourceMappingURL=GameState.js.map