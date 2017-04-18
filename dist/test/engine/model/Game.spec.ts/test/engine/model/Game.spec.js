"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var mocha_typescript_1 = require("mocha-typescript");
var assert = require("assert");
var Game_1 = require("../../../typescript/engine/model/Game");
var GameSpec = (function () {
    function GameSpec() {
        this.GAME_NAME = "Test Game";
    }
    GameSpec.prototype.before = function () {
        this.GAME = new Game_1["default"]();
    };
    GameSpec.prototype["Test name accessors"] = function () {
        this.GAME.setName(this.GAME_NAME);
        assert.equal(this.GAME.getName(), this.GAME_NAME);
    };
    return GameSpec;
}());
__decorate([
    mocha_typescript_1.test
], GameSpec.prototype, "Test name accessors");
GameSpec = __decorate([
    mocha_typescript_1.suite
], GameSpec);
