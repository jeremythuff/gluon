import Engine from "../model/Engine"
import Game from "../model/Game"

import * as RunningGameRegistry from "../registries/RunningGame";

export default function GameMain(options ?: Map<string, any>) {
	return function(decorated : typeof Game) : void {
		
		const game = new decorated(decorated.name);
				
		if(!game.getName()) game.setName(decorated.name);		
		
		const engine = new Engine(game);
		engine.start();

		console.log(`Registering State: ${game.getName()}`);
		RunningGameRegistry.setRunningGame(game);

	}
}