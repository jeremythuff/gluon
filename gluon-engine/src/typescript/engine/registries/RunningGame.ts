import Game from "../model/Game";
import {Subject, Observable} from "@reactivex/rxjs/dist/cjs/Rx";

namespace RunningGameRegistry {

	let gameSubject: Subject<Game> = new Subject<Game>();
	
	export function setRunningGame(game :Game) :void {
		gameSubject.next(game);
	}

	export function getRunningGame() : Observable<Game> {
		return gameSubject.asObservable();
	}

};

export = RunningGameRegistry;