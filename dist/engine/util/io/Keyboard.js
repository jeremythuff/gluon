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
        _this.runWhenCBS = [];
        _this.pressedKeys = [];
        _this.keyBoardObs = Rx_1.Observable
            .merge(Rx_1.Observable.fromEvent(window, "keyup"), Rx_1.Observable.fromEvent(window, "keydown"))
            .distinctUntilChanged();
        _this.keyBoardObs
            .subscribe(function (e) {
            if (e.type == "keyup") {
                _this.pressedKeys[e.which] = false;
                _this.runWhenCBS.length = 0;
            }
            else {
                _this.pressedKeys[e.which] = true;
            }
        });
        return _this;
    }
    Keyboard.prototype.runWhen = function (cb) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        var runCB = false;
        this.whenCBs.get(keys) ? this.whenCBs.get(keys).push(cb) : this.whenCBs.set(keys, [cb]);
        return this;
    };
    Keyboard.prototype.runWhile = function (cb) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        var runCB = false;
        this.whileCBs.get(keys) ? this.whileCBs.get(keys).push(cb) : this.whileCBs.set(keys, [cb]);
        return this;
    };
    Keyboard.prototype.runCBs = function () {
        this.runWhileCBs();
        this.runWhenCBs();
    };
    Keyboard.prototype.runWhenCBs = function () {
        var _this = this;
        this.whenCBs.forEach(function (cbArray, keyArray) {
            var runCB = keyArray.every(function (k) {
                return _this.pressedKeys[k];
            });
            if (runCB)
                cbArray.forEach(function (cb) {
                    if (_this.runWhenCBS.indexOf(cb) === -1) {
                        console.log();
                        cb();
                        _this.runWhenCBS.push(cb);
                    }
                });
        });
    };
    Keyboard.prototype.runWhileCBs = function () {
        var _this = this;
        this.whileCBs.forEach(function (cbArray, keyArray) {
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