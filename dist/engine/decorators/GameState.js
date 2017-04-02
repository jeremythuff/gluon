"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameMainRegistry = require("../registries/GameMainRegistry");
var GameStateRegistry = require("../registries/GameStateRegistry");
var GameModeRegistry = require("../registries/GameModeRegistry");
var totalStates = 0;
function GameState(options) {
    return function (decorated) {
        var state = new decorated();
        if (!state.getName())
            state.setName(decorated.name);
        GameModeRegistry.getGameModeObservable().subscribe(function (Mode) {
            console.log(Mode);
            if (options["modes"].some(function (modeName) {
                return modeName === Mode.name;
            })) {
                var mode = new Mode();
                mode.setName(Mode.name);
                state.addMode(mode);
            }
        });
        GameMainRegistry.getGameMainSubject().subscribe(function (game) {
            if (game) {
                console.log("Registering State: " + state.getName());
                GameStateRegistry.addGameState(state);
            }
        });
    };
}
exports.default = GameState;
//# sourceMappingURL=GameState.js.map