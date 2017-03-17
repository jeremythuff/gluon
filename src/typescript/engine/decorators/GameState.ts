import State from "../model/State"

import * as RunningGame from "../registries/RunningGame";

export default function GameState(options ?: Map<string, any>) {
	return function(decorated : typeof State) : void {
		
		const state = new decorated(decorated.name);
		if(!state.getName()) state.setName(decorated.name);
		
		RunningGame.getRunningGameSubject().subscribe(game=>{
			if(game) {
				console.log(`Registering State: ${state.getName()}`);
				game.addState(state);
				if(game.getInitialStateName()===state.getName()) {
					game.setActiveState(state);
				}
			}
		});		
	}
}