"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameModeRegistry = require("../registries/GameModeRegistry");
function GameMode(options) {
    return function (decorated) {
        GameModeRegistry.setGameMode(decorated);
        return decorated;
    };
}
exports.default = GameMode;
//# sourceMappingURL=GameMode.js.map