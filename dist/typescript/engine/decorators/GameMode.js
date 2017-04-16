"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var GameModeRegistry = require("../registries/GameModeRegistry");
function GameMode(options) {
    return function (decorated) {
        Reflect.defineMetadata("options", options, decorated);
        GameModeRegistry.setGameMode(decorated);
        return decorated;
    };
}
exports.default = GameMode;
//# sourceMappingURL=GameMode.js.map