"use strict";
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var RunningGameRegistry;
(function (RunningGameRegistry) {
    var runningGame;
    function setRunningGame(game) {
        runningGame = game;
    }
    RunningGameRegistry.setRunningGame = setRunningGame;
    function getRunningGame() {
        return Rx_1.Observable.of(runningGame);
    }
    RunningGameRegistry.getRunningGame = getRunningGame;
})(RunningGameRegistry || (RunningGameRegistry = {}));
;
module.exports = RunningGameRegistry;
//# sourceMappingURL=RunningGame.js.map