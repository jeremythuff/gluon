"use strict";
var Engine_1 = require("../model/Engine");
function MakeGame(options) {
    return function (decoreaded) {
        var game = new decoreaded(decoreaded.name);
        var engine = new Engine_1.default(game);
        engine.start();
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MakeGame;
//# sourceMappingURL=MakeGame.js.map