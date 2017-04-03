"use strict";
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var GameControllerRegistry;
(function (GameControllerRegistry) {
    var controllerSubject = new Rx_1.ReplaySubject(100);
    function setControlProfile(mode) {
        controllerSubject.next(mode);
    }
    GameControllerRegistry.setControlProfile = setControlProfile;
    function getControlProfileObservable() {
        return controllerSubject.asObservable();
    }
    GameControllerRegistry.getControlProfileObservable = getControlProfileObservable;
})(GameControllerRegistry || (GameControllerRegistry = {}));
;
module.exports = GameControllerRegistry;
//# sourceMappingURL=GameControllerRegistry.js.map