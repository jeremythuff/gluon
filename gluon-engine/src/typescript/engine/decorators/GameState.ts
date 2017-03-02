import State from "../model/State";
import * as RunningGame from "../registries/RunningGame";

export default function GameState(options ?: Map<string, any>) {
	return function(decorated : typeof State) : void {
		const state = new decorated(decorated.name);
		if(!state.getName()) state.setName(decorated.name);	

		RunningGame.getRunningGame().addState(state);

	}
}