"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RenderPhase;
(function (RenderPhase) {
    RenderPhase[RenderPhase["START"] = 0] = "START";
    RenderPhase[RenderPhase["INITIALIZING"] = 0.1] = "INITIALIZING";
    RenderPhase[RenderPhase["LOADING"] = 0.2] = "LOADING";
    RenderPhase[RenderPhase["STARTING"] = 0] = "STARTING";
    RenderPhase[RenderPhase["READY"] = 1] = "READY";
    RenderPhase[RenderPhase["UPDATING"] = 1.1] = "UPDATING";
    RenderPhase[RenderPhase["RENDERING"] = 1.2] = "RENDERING";
    RenderPhase[RenderPhase["RUNNING"] = 1] = "RUNNING";
    RenderPhase[RenderPhase["PAUSED"] = 2] = "PAUSED";
    RenderPhase[RenderPhase["STOP"] = 3] = "STOP";
    RenderPhase[RenderPhase["UNLOADING"] = 3.1] = "UNLOADING";
    RenderPhase[RenderPhase["DESTROYING"] = 3.2] = "DESTROYING";
    RenderPhase[RenderPhase["STOPPING"] = 3] = "STOPPING";
    RenderPhase[RenderPhase["OFF"] = -1] = "OFF";
})(RenderPhase = exports.RenderPhase || (exports.RenderPhase = {}));
//# sourceMappingURL=RenderPhase.js.map