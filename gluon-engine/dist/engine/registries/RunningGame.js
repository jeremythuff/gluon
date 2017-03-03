"use strict";
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var RunningGameRegistry;
(function (RunningGameRegistry) {
    var gameSubject = new Rx_1.Subject();
    function setRunningGame(game) {
        gameSubject.next(game);
    }
    RunningGameRegistry.setRunningGame = setRunningGame;
    function getRunningGame() {
        return gameSubject.asObservable();
    }
    RunningGameRegistry.getRunningGame = getRunningGame;
})(RunningGameRegistry || (RunningGameRegistry = {}));
;
module.exports = RunningGameRegistry;
//# sourceMappingURL=RunningGame.js.map