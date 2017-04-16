"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Engine_1 = require("../model/Engine");
var RunningGameRegistry = require("../registries/GameMainRegistry");
var GameStateRegistry = require("../registries/GameStateRegistry");
var GameControllereRegistry = require("../registries/GameControllerRegistry");
function GameMain(options) {
    return function (decorated) {
        Reflect.defineMetadata("options", options, decorated);
        var game = new decorated(decorated.name);
        if (!game.getName())
            game.setName(decorated.name);
        if (options["initialState"])
            game.setInitialStateName(options["initialState"]);
        GameControllereRegistry.getControlProfileObservable().subscribe(function (ControlProfile) {
            if (options["controlProfiles"].some(function (controlProfileName) {
                return controlProfileName === ControlProfile.name;
            })) {
                var newControllerProfile = new ControlProfile(game);
                var whileMap = GameControllereRegistry.getWhileCBMapByName(ControlProfile.name);
                var whenMap = GameControllereRegistry.getWhenCBMapByName(ControlProfile.name);
                newControllerProfile.setWhileCBs(whileMap);
                newControllerProfile.setWhenCBs(whenMap);
                game.addControlProfile(newControllerProfile);
            }
        });
        console.log("Registering Game: " + game.getName());
        RunningGameRegistry.setGameMain(game);
        var runningGameSubject = RunningGameRegistry.getGameMainSubject();
        runningGameSubject.subscribe(function (game) {
            var lastRegisteredStateObservable = GameStateRegistry.getLastRegisteredGameState();
            lastRegisteredStateObservable.subscribe(function (state) {
                if (state.getName() === game.getInitialStateName()) {
                    console.log("Starting engine");
                    var engine = new Engine_1.default(game);
                    engine.start();
                }
            });
        });
    };
}
exports.default = GameMain;
//# sourceMappingURL=GameMain.js.map