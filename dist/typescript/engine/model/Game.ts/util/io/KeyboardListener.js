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
exports.__esModule = true;
var AbstractControlListener_1 = require("./AbstractControlListener");
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var KeyboardListener = (function (_super) {
    __extends(KeyboardListener, _super);
    function KeyboardListener(runWhenCBS, activatedInput) {
        var _this = _super.call(this, runWhenCBS, activatedInput) || this;
        _this.keyBoardObs = Rx_1.Observable
            .merge(Rx_1.Observable.fromEvent(window, "keyup"), Rx_1.Observable.fromEvent(window, "keydown"))
            .distinctUntilChanged();
        _this.keyBoardObs
            .subscribe(function (e) {
            if (e.type == "keydown") {
                _this.activateInput(e.which);
                _this.lastEvent = e;
            }
            else {
                _this.releaseInput(e.which);
            }
        });
        return _this;
    }
    return KeyboardListener;
}(AbstractControlListener_1.AbstractControlListener));
exports["default"] = KeyboardListener;
