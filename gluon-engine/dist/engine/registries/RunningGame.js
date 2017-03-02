"use strict";
var RunningGameRegistry;
(function (RunningGameRegistry) {
    var runningGame;
    function setRunningGame(game) {
        runningGame = game;
    }
    RunningGameRegistry.setRunningGame = setRunningGame;
    function getRunningGame() {
        return runningGame;
    }
    RunningGameRegistry.getRunningGame = getRunningGame;
})(RunningGameRegistry || (RunningGameRegistry = {}));
;
module.exports = RunningGameRegistry;
//# sourceMappingURL=RunningGame.js.map