import Game from "./Game";
export default class Engine {
    private clock;
    private running;
    private game;
    constructor(game: Game);
    private animationLoop();
    getGame(): Game;
    setGame(game: Game): void;
    start(): Game;
    stop(): void;
}
