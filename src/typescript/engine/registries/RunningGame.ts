import Game from "../model/Game";
import {ReplaySubject, Observable} from "@reactivex/rxjs/dist/cjs/Rx";

namespace RunningGameRegistry {

	let gameSubject: ReplaySubject<Game> = new ReplaySubject<Game>(1);
	
	export function setRunningGame(game :Game) :void {
		gameSubject.next(game);
	}

	export function getRunningGameSubject() : ReplaySubject<Game> {
		return gameSubject;
	}

};

export = RunningGameRegistry;