import Engine from "../model/Engine"
import Game from "../model/Game"

import * as RunningGame from "../registries/RunningGame";

export default function GameMain(options ?: Map<string, any>) {
	return function(decorated : typeof Game) : void {
		console.log("Registering Game.");
		const game = new decorated(decorated.name);
		if(!game.getName()) game.setName(decorated.name);		
		RunningGame.setRunningGame(game);
		const engine = new Engine(game);
		engine.start();
	}
}