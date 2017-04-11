"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var GameMainRegistry = require("../registries/GameMainRegistry");
var GameStateRegistry = require("../registries/GameStateRegistry");
var GameModeRegistry = require("../registries/GameModeRegistry");
var GameControllereRegistry = require("../registries/GameControllerRegistry");
function GameState(options) {
    return function (decorated) {
        Reflect.defineMetadata("options", options, decorated);
        var state = new decorated();
        if (!state.getName())
            state.setName(decorated.name);
        GameModeRegistry.getGameModeObservable().subscribe(function (Mode) {
            if (options["modes"].some(function (modeName) {
                return modeName === Mode.name;
            })) {
                var mode_1 = new Mode();
                mode_1.setName(Mode.name);
                var modeOption_1 = Reflect.getMetadata("options", Mode);
                GameControllereRegistry.getControlProfileObservable().subscribe(function (ControlProfile) {
                    if (modeOption_1["controlProfiles"].some(function (controlProfileName) {
                        return controlProfileName === ControlProfile.name;
                    })) {
                        var newControllerProfile = new ControlProfile(mode_1);
                        var whileMap = GameControllereRegistry.getWhileCBMapByName(ControlProfile.name);
                        var whenMap = GameControllereRegistry.getWhenCBMapByName(ControlProfile.name);
                        newControllerProfile.setWhileCBs(whileMap);
                        newControllerProfile.setWhenCBs(whenMap);
                        mode_1.addControlProfile(newControllerProfile);
                    }
                });
                state.addMode(mode_1);
            }
        });
        GameControllereRegistry.getControlProfileObservable().subscribe(function (ControlProfile) {
            if (options["controlProfiles"].some(function (controlProfileName) {
                return controlProfileName === ControlProfile.name;
            })) {
                var newControllerProfile = new ControlProfile(state);
                var whileMap = GameControllereRegistry.getWhileCBMapByName(ControlProfile.name);
                var whenMap = GameControllereRegistry.getWhenCBMapByName(ControlProfile.name);
                newControllerProfile.setWhileCBs(whileMap);
                newControllerProfile.setWhenCBs(whenMap);
                state.addControlProfile(newControllerProfile);
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