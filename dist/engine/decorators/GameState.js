"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RunningGameRegistry = require("../registries/RunningGameRegistry");
var GameStateRegistry = require("../registries/GameStateRegistry");
var totalStates = 0;
function GameState(options) {
    return function (decorated) {
        var state = new decorated(decorated.name);
        if (!state.getName())
            state.setName(decorated.name);
        RunningGameRegistry.getRunningGameSubject().subscribe(function (game) {
            if (game) {
                console.log("Registering State: " + state.getName());
                GameStateRegistry.addGameState(state);
            }
        });
    };
}
exports.default = GameState;
//# sourceMappingURL=GameState.js.map