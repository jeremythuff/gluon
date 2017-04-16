"use strict";
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var GameControllerRegistry;
(function (GameControllerRegistry) {
    var whileCBMapCache = new Map();
    var whenCBMapCache = new Map();
    var controllerSubject = new Rx_1.ReplaySubject(100);
    function setControlProfile(mode) {
        controllerSubject.next(mode);
    }
    GameControllerRegistry.setControlProfile = setControlProfile;
    ;
    function getControlProfileObservable() {
        return controllerSubject.asObservable();
    }
    GameControllerRegistry.getControlProfileObservable = getControlProfileObservable;
    ;
    function getWhileCBMapByName(className) {
        var cbMap = whileCBMapCache.get(className);
        if (!cbMap) {
            cbMap = new Map();
            whileCBMapCache.set(className, cbMap);
        }
        return cbMap;
    }
    GameControllerRegistry.getWhileCBMapByName = getWhileCBMapByName;
    function getWhenCBMapByName(className) {
        var cbMap = whenCBMapCache.get(className);
        if (!cbMap) {
            cbMap = new Map();
            whenCBMapCache.set(className, cbMap);
        }
        return cbMap;
    }
    GameControllerRegistry.getWhenCBMapByName = getWhenCBMapByName;
})(GameControllerRegistry || (GameControllerRegistry = {}));
;
module.exports = GameControllerRegistry;
//# sourceMappingURL=GameControllerRegistry.js.map