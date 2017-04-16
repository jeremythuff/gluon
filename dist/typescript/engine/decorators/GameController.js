"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameControllerRegistry = require("../registries/GameControllerRegistry");
function GameController(options) {
    return function (decorated) {
        GameControllerRegistry.setControlProfile(decorated);
    };
}
exports.default = GameController;
//# sourceMappingURL=GameController.js.map