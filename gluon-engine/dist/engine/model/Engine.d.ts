import Game from "./Game";
export default class Engine {
    private game;
    constructor(game: Game);
    getGame(): Game;
    setGame(game: Game): void;
    start(): Game;
    stop(): void;
}
