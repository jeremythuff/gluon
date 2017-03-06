"use strict";
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var RunningGameRegistry;
(function (RunningGameRegistry) {
    var gameSubject = new Rx_1.ReplaySubject(1);
    function setRunningGame(game) {
        gameSubject.next(game);
    }
    RunningGameRegistry.setRunningGame = setRunningGame;
    function getRunningGameSubject() {
        return gameSubject;
    }
    RunningGameRegistry.getRunningGameSubject = getRunningGameSubject;
})(RunningGameRegistry || (RunningGameRegistry = {}));
;
module.exports = RunningGameRegistry;
//# sourceMappingURL=RunningGame.js.map