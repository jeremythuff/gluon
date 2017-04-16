"use strict";
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var GameMainRegistry = require("./GameMainRegistry");
var GameStateRegistry;
(function (GameStateRegistry) {
    var initialStateSubject = new Rx_1.ReplaySubject(100);
    function addGameState(state) {
        GameMainRegistry.getGameMainSubject().subscribe(function (game) {
            game.addState(state);
            if (game.getInitialStateName() === state.getName())
                initialStateSubject.next(state);
        });
    }
    GameStateRegistry.addGameState = addGameState;
    function getLastRegisteredGameState() {
        return initialStateSubject.asObservable();
    }
    GameStateRegistry.getLastRegisteredGameState = getLastRegisteredGameState;
})(GameStateRegistry || (GameStateRegistry = {}));
;
module.exports = GameStateRegistry;
//# sourceMappingURL=GameStateRegistry.js.map