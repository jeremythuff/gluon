"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var electron = require("electron");
var RenderPhase_1 = require("../enum/RenderPhase");
var Engine = (function () {
    function Engine(game) {
        this.defaultFramesPerSecond = 30;
        this.lastFrameTime = 0;
        this.setGame(game);
        this.clock = new THREE.Clock();
    }
    Engine.prototype.animationLoop = function () {
        if (this.running) {
            window.requestAnimationFrame(this.animationLoop.bind(this));
            var delta = this.clock.getDelta();
            var now = this.clock.getElapsedTime();
            if (this.game && this.game.phaseIs(RenderPhase_1.RenderPhase.RUNNING))
                this.game.runUpdate(delta);
            var gameFramesPerSecond = this.getGame().getFramesPerSecond();
            var currentFramesPerSecond = gameFramesPerSecond ? gameFramesPerSecond : this.framesPerSecond;
            if (this.game && this.game.phaseIs(RenderPhase_1.RenderPhase.RUNNING) && (now - this.lastFrameTime) * 1000 > (1000 / currentFramesPerSecond)) {
                this.lastFrameTime = now;
                this.game.runRender(delta);
            }
        }
    };
    Engine.prototype.getGame = function () {
        return this.game;
    };
    Engine.prototype.setGame = function (game) {
        this.game = game;
    };
    Engine.prototype.start = function () {
        var _this = this;
        var game = this.getGame();
        var gameFramesPerSecond = this.getGame().getFramesPerSecond();
        this.framesPerSecond = gameFramesPerSecond ? gameFramesPerSecond : this.defaultFramesPerSecond;
        game.setPhase(RenderPhase_1.RenderPhase.START);
        game.runInit()
            .take(1)
            .subscribe(null, null, function () {
            game.runLoad()
                .take(1)
                .subscribe(null, null, function () {
                _this.running = true;
                _this.animationLoop();
                game.setPhase(RenderPhase_1.RenderPhase.RUNNING);
                setTimeout(function () { game.runPause(); }, 5000);
            }).unsubscribe();
        }).unsubscribe();
        return game;
    };
    Engine.prototype.stop = function () {
        var _this = this;
        var game = this.getGame();
        game.setPhase(RenderPhase_1.RenderPhase.STOP);
        game.runUnload()
            .take(1)
            .subscribe(null, null, function () {
            game.runDestroy()
                .take(1)
                .subscribe(null, null, function () {
                game.setPhase(RenderPhase_1.RenderPhase.OFF);
                _this.running = false;
                electron.remote.getCurrentWindow().close();
            }).unsubscribe();
        }).unsubscribe();
    };
    return Engine;
}());
exports.default = Engine;
//# sourceMappingURL=Engine.js.map