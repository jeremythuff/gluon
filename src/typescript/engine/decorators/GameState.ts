import State from "../model/State"

import * as RunningGameRegistry from "../registries/RunningGameRegistry";
import * as GameStateRegistry from "../registries/GameStateRegistry";


let totalStates : number = 0;

/**
 * This function is used to decorate classes which extend [[State]]. It registers and 
 * instantiates such classes within your main game instance.
 *
 * @decorator Class<typeof State>
 */
export default function GameState(options ?: Map<string, any>) {


	return function(decorated : typeof State) : void {
		
		const state = new decorated(decorated.name);
		if(!state.getName()) state.setName(decorated.name);
		
		RunningGameRegistry.getRunningGameSubject().subscribe(game=>{
			if(game) {
				console.log(`Registering State: ${state.getName()}`);
				GameStateRegistry.addGameState(state);
			}
		});		
	}
}