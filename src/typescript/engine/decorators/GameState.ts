import State from "../model/State"
import Mode from "../model/Mode"
import ControlProfile from "../util/io/ControlProfile";

import * as GameMainRegistry from "../registries/GameMainRegistry";
import * as GameStateRegistry from "../registries/GameStateRegistry";
import * as GameModeRegistry from "../registries/GameModeRegistry";
import * as GameControllereRegistry from "../registries/GameControllerRegistry";

/**
 * This function is used to decorate classes which extend [[State]]. It registers and 
 * instantiates such classes within your main game instance.
 *
 * @decorator Class<typeof State>
 */
export default function GameState(options ?: { [name: string]: any[]|string }) {

	return function(decorated : typeof State) : void {
		
		const state = new decorated();
		if(!state.getName()) state.setName(decorated.name);

		GameModeRegistry.getGameModeObservable().subscribe(Mode=>{
			console.log(Mode);
			if((<string[]>options["modes"]).some(modeName=>{
				return modeName === Mode.name;
			})) {				

				const mode = new Mode();
				mode.setName(Mode.name);

				state.addMode(mode);
			}

		});

		GameControllereRegistry.getControlProfileObservable().subscribe(ControlProfile=>{
			const newControllerProfile :ControlProfile = new ControlProfile(state);
			const whileMap = GameControllereRegistry.getWhileCBMapByName(ControlProfile.name);
			newControllerProfile.setWhileCBs(whileMap);
			state.addControlProfile(newControllerProfile);
		});

		GameMainRegistry.getGameMainSubject().subscribe(game=>{
			if(game) {
				console.log(`Registering State: ${state.getName()}`);
				GameStateRegistry.addGameState(state);
			}
		});	
	
	}
}