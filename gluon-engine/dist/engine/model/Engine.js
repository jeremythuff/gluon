"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
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
                this.game.update(delta);
            var gameFramesPerSecond = this.getGame().getFramesPerSecond();
            var currentFramesPerSecond = gameFramesPerSecond ? gameFramesPerSecond : this.framesPerSecond;
            if (this.game && this.game.phaseIs(RenderPhase_1.RenderPhase.RUNNING) && (now - this.lastFrameTime) * 1000 > (1000 / currentFramesPerSecond)) {
                this.lastFrameTime = now;
                this.game.render(delta);
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
        this.running = true;
        this.animationLoop();
        game.setPhase(RenderPhase_1.RenderPhase.START);
        game.init().subscribe(function () {
            game.load().subscribe(function () {
                game.setPhase(RenderPhase_1.RenderPhase.RUNNING);
                setTimeout(function () { _this.stop(); }, 5000);
            });
        });
        return game;
    };
    Engine.prototype.stop = function () {
        var _this = this;
        var game = this.getGame();
        game.setPhase(RenderPhase_1.RenderPhase.STOP);
        game.unload().subscribe(function () {
            game.destroy().subscribe(function () {
                _this.running = false;
            });
        });
    };
    return Engine;
}());
exports.default = Engine;
//# sourceMappingURL=Engine.js.map