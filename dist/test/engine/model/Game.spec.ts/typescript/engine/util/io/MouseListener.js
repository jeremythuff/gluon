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
var Mouse_1 = require("./Mouse");
var MouseListener = (function (_super) {
    __extends(MouseListener, _super);
    function MouseListener(runWhenCBS, activatedInput) {
        var _this = _super.call(this, runWhenCBS, activatedInput) || this;
        _this.mouseObs = Rx_1.Observable
            .merge(Rx_1.Observable.fromEvent(window, "mousedown"), Rx_1.Observable.fromEvent(window, "mouseup"), Rx_1.Observable.fromEvent(window, "mousemove"), Rx_1.Observable.fromEvent(window, "wheel"))
            .distinctUntilChanged();
        _this.mouseObs
            .subscribe(function (e) {
            switch (e.type) {
                case "mousedown":
                    _this.activateInput(e.button + 1000);
                    break;
                case "mouseup":
                    _this.releaseInput(e.button + 1000);
                    break;
                case "mousemove":
                    _this.activateInput(Mouse_1.Mouse.MOVE);
                    if (_this.mouseMoveStopTimer)
                        window.clearTimeout(_this.mouseMoveStopTimer);
                    _this.mouseMoveStopTimer = window.setTimeout(function () {
                        _this.releaseInput(Mouse_1.Mouse.MOVE);
                    }, 10);
                    break;
                case "wheel":
                    _this.activateInput(Mouse_1.Mouse.WHEEL);
                    if (e.wheelDelta < 0) {
                        _this.activateInput(Mouse_1.Mouse.WHEEL_UP);
                    }
                    else if (e.wheelDelta > 0) {
                        _this.activateInput(Mouse_1.Mouse.WHEEL_DOWN);
                    }
                    else {
                        _this.releaseInput(Mouse_1.Mouse.WHEEL);
                        _this.releaseInput(Mouse_1.Mouse.WHEEL_UP);
                        _this.releaseInput(Mouse_1.Mouse.WHEEL_DOWN);
                    }
                    if (_this.mouseWheelStopTimer)
                        window.clearTimeout(_this.mouseWheelStopTimer);
                    _this.mouseWheelStopTimer = window.setTimeout(function () {
                        _this.releaseInput(Mouse_1.Mouse.WHEEL);
                        _this.releaseInput(Mouse_1.Mouse.WHEEL_UP);
                        _this.releaseInput(Mouse_1.Mouse.WHEEL_DOWN);
                    }, 10);
                    break;
                default:
                    break;
            }
            _this.lastEvent = e;
        });
        return _this;
    }
    return MouseListener;
}(AbstractControlListener_1.AbstractControlListener));
exports["default"] = MouseListener;
