"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Mode_1 = require("../model/Mode");
var GameModeRegistry = require("../registries/GameModeRegistry");
function GameMode(options) {
    return function (decorated) {
        Mode_1.default._staticControlProfiles = [];
        Reflect.defineMetadata("options", options, decorated);
        GameModeRegistry.setGameMode(decorated);
        return decorated;
    };
}
exports.default = GameMode;
//# sourceMappingURL=GameMode.js.map