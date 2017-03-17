import Game from "./Game";
export default class Engine {
    private clock;
    private running;
    private game;
    private defaultFramesPerSecond;
    private framesPerSecond;
    private lastFrameTime;
    constructor(game: Game);
    private animationLoop();
    getGame(): Game;
    setGame(game: Game): void;
    start(): Game;
    stop(): void;
}
