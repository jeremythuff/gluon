"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RunningGameRegistry = require("../registries/RunningGameRegistry");
var GameStateRegistry = require("../registries/GameStateRegistry");
var totalStates = 0;
function GameState(options) {
    return function (decorated) {
        var state = new decorated();
        if (!state.getName())
            state.setName(decorated.name);
        var liveModes = [];
        options["modes"].forEach(function (mode) {
            var liveMode = new mode();
            liveMode.setName(mode.name);
            liveModes.push(liveMode);
        });
        state.setModes(liveModes);
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