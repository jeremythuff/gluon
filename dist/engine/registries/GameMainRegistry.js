"use strict";
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var GameMainRegistry;
(function (GameMainRegistry) {
    var gameSubject = new Rx_1.ReplaySubject(1);
    function setGameMain(game) {
        gameSubject.next(game);
    }
    GameMainRegistry.setGameMain = setGameMain;
    function getGameMainSubject() {
        return gameSubject;
    }
    GameMainRegistry.getGameMainSubject = getGameMainSubject;
})(GameMainRegistry || (GameMainRegistry = {}));
;
module.exports = GameMainRegistry;
//# sourceMappingURL=GameMainRegistry.js.map