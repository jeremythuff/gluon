"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameControllereRegistry = require("../registries/GameControllerRegistry");
function While() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return function (targetClass, methodName, descriptor) {
        var rbMap = GameControllereRegistry.getWhileCBMapByName(targetClass.constructor.name);
        var cbMap = rbMap.get(inputs);
        cbMap ? cbMap.push(descriptor.value) : rbMap.set(inputs, [descriptor.value]);
    };
}
exports.default = While;
;
//# sourceMappingURL=While.js.map