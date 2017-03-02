import Game from "../model/Game";
declare namespace RunningGameRegistry {
    function setRunningGame(game: Game): void;
    function getRunningGame(): Game;
}
export = RunningGameRegistry;
