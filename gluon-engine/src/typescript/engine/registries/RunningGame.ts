import Game from "../model/Game";

namespace RunningGameRegistry {
	
	let runningGame : Game;
	
	export function setRunningGame(game :Game) :void {
		runningGame = game;
	}
	export function getRunningGame() : Game {
		return runningGame;
	}
};

export = RunningGameRegistry;