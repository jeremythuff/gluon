"use strict";
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var GameModeRegistry;
(function (GameModeRegistry) {
    var modeSubject = new Rx_1.ReplaySubject(100);
    function setGameMode(mode) {
        modeSubject.next(mode);
    }
    GameModeRegistry.setGameMode = setGameMode;
    function getGameModeObservable() {
        return modeSubject.asObservable();
    }
    GameModeRegistry.getGameModeObservable = getGameModeObservable;
})(GameModeRegistry || (GameModeRegistry = {}));
;
module.exports = GameModeRegistry;
//# sourceMappingURL=GameModeRegistry.js.map