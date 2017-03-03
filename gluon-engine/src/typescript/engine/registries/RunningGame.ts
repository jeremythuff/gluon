import Game from "../model/Game";
import {Observable} from "@reactivex/rxjs/dist/cjs/Rx";

namespace RunningGameRegistry {
	
	let runningGame : Game;
	let resolve : any;

	
	export function setRunningGame(game :Game) :void {
		runningGame = game;
	}
	export function getRunningGame() : Promise<Game> {
		return 
	}

};

export = RunningGameRegistry;