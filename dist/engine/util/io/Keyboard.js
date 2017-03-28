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
        _this.cbs = new Map();
        _this.pressedKeys = [];
        _this.keyBoardObs = Rx_1.Observable
            .merge(Rx_1.Observable.fromEvent(window, "keyup"), Rx_1.Observable.fromEvent(window, "keydown"));
        var lastValue = null;
        _this.keyBoardObs
            .takeWhile(function (k) {
            var allow = k !== lastValue;
            lastValue = k;
            return allow;
        })
            .subscribe(function (e) {
            _this.pressedKeys[e.which] = e.type == "keyup" ? false : true;
        });
        return _this;
    }
    Keyboard.prototype.runWhen = function (cb) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        var runCB = false;
        this.cbs.get(keys) ? this.cbs.get(keys).push(cb) : this.cbs.set(keys, [cb]);
        return this;
    };
    Keyboard.prototype.runCBs = function () {
        var _this = this;
        this.cbs.forEach(function (cbArray, keyArray) {
            var runCB = keyArray.every(function (k) {
                return _this.pressedKeys[k];
            });
            if (runCB)
                cbArray.forEach(function (cb) { cb(); });
        });
    };
    return Keyboard;
}(AbstractControlDevice_1.AbstractControlDevice));
exports.default = Keyboard;
//# sourceMappingURL=Keyboard.js.map