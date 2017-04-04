"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameControllereRegistry = require("../registries/GameControllerRegistry");
function While() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return function (targetClass, methodName, descriptor) {
        var cbMap = GameControllereRegistry.getWhileCBMapByName(targetClass.constructor.name).get(inputs);
        cbMap ? cbMap.push(descriptor.value) : GameControllereRegistry.getWhileCBMapByName(targetClass.constructor.name).set(inputs, [descriptor.value]);
    };
}
exports.default = While;
;
//# sourceMappingURL=While.js.map