import Game from "./Game";
export default class Engine {
    private game;
    constructor(gameName: string);
    getGame(): Game;
    setGame(game: Game): void;
}
