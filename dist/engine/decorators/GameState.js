"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RunningGame = require("../registries/RunningGame");
var totalStates = 0;
function GameState(options) {
    totalStates++;
    return function (decorated) {
        var state = new decorated(decorated.name);
        if (!state.getName())
            state.setName(decorated.name);
        RunningGame.getRunningGameSubject().subscribe(function (game) {
            if (game) {
                console.log("Registering State: " + state.getName());
                game.addState(state);
                if (game.getInitialStateName() === state.getName()) {
                    game.setActiveState(state);
                }
            }
        });
    };
}
exports.default = GameState;
//# sourceMappingURL=GameState.js.map