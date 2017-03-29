"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractControlDevice_1 = require("./AbstractControlDevice");
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var Keyboard = (function (_super) {
    __extends(Keyboard, _super);
    function Keyboard() {
        var _this = _super.call(this) || this;
        _this.whileCBs = new Map();
        _this.whenCBs = new Map();
        _this.keyBoardObs = Rx_1.Observable
            .merge(Rx_1.Observable.fromEvent(window, "keyup"), Rx_1.Observable.fromEvent(window, "keydown"))
            .distinctUntilChanged();
        _this.keyBoardObs
            .subscribe(function (e) {
            if (e.type == "keydown") {
                _this.activateInput(e.which);
            }
            else {
                _this.releaseInput(e.which);
            }
        });
        return _this;
    }
    return Keyboard;
}(AbstractControlDevice_1.AbstractControlDevice));
exports.default = Keyboard;
//# sourceMappingURL=Keyboard.js.map