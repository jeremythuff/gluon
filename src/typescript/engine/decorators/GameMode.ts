import Mode from "../model/Mode"

import * as RunningGameRegistry from "../registries/RunningGameRegistry";
import * as GameStateRegistry from "../registries/GameStateRegistry";


let totalStates : number = 0;

/**
 * This function is used to decorate classes which extend [[State]]. It registers and 
 * instantiates such classes within your main game instance.
 *
 * @decorator Class<typeof State>
 */
export default function GameMode(options ?: Map<string, any>) {


	return function(decorated : typeof Mode) : void {
		
		const mode = new decorated(decorated.name);
		if(!mode.getName()) mode.setName(decorated.name);
		
	}
}