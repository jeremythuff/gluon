"use strict";
var Engine_1 = require("../model/Engine");
function GameMain(options) {
    return function (decorated) {
        var game = new decorated(decorated.name);
        if (!game.getName())
            game.setName(decorated.name);
        var engine = new Engine_1.default(game);
        engine.start();
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameMain;
//# sourceMappingURL=GameMain.js.map