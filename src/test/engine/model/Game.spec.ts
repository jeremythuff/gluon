import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as assert from "assert";

import Game from "../../../typescript/engine/model/Game";

@suite class GameSpec {

    private GAME: Game;
    private readonly GAME_NAME: string = "Test Game";

    before() {
        this.GAME = new Game();
    }

     @test "Test name accessors"() {
        this.GAME.setName(this.GAME_NAME);
        assert.equal(this.GAME.getName(), this.GAME_NAME);
     }

}