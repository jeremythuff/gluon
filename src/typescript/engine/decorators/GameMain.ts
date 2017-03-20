import Engine from "../model/Engine"
import Game from "../model/Game"

import * as RunningGameRegistry from "../registries/RunningGame";

/**
 * This function is used to decorate classes which extend [[Game]]. It registers such
 * classes with the [[RunningGameRegistry]] namespace, denotes it as the main entry point for your game, 
 * and will ensure that the game is instantiated at start up. It will derive the name of your game 
 * from the class name of the decorated class.
 *
 * @decorator Class<typeof Game>
 */
export default function GameMain(options ?: Map<string, any>) {
	return function(decorated : typeof Game) : void {
		
		const game = new decorated(decorated.name);
				
		if(!game.getName()) game.setName(decorated.name);		
		
		console.log(`Registering Game: ${game.getName()}`);
		
		RunningGameRegistry.setRunningGame(game);

		const startGameInterval = window.setInterval(()=>{
			RunningGameRegistry.getRunningGameSubject().subscribe(game=>{
				if(game.getState(game.getInitialStateName())) {
					console.log("Starting engine");
					const engine = new Engine(game);
					engine.start();
					window.clearInterval(startGameInterval);
				}
			});
		}, 250);
	}
}