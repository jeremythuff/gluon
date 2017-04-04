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
var AbstractControlListener_1 = require("./AbstractControlListener");
var Rx_1 = require("@reactivex/rxjs/dist/cjs/Rx");
var MouseListener = (function (_super) {
    __extends(MouseListener, _super);
    function MouseListener(runWhenCBS, activatedInput) {
        var _this = _super.call(this, runWhenCBS, activatedInput) || this;
        _this.MouseObs = Rx_1.Observable
            .merge(Rx_1.Observable.fromEvent(window, "mousedown"), Rx_1.Observable.fromEvent(window, "mouseup"))
            .distinctUntilChanged();
        _this.MouseObs
            .subscribe(function (e) {
            switch (e.type) {
                case "mousedown":
                    _this.activateInput(e.button + 1000);
                    break;
                case "mouseup":
                    _this.releaseInput(e.button + 1000);
                    break;
                default:
                    break;
            }
        });
        return _this;
    }
    return MouseListener;
}(AbstractControlListener_1.AbstractControlListener));
exports.default = MouseListener;
//# sourceMappingURL=MouseListener.js.map