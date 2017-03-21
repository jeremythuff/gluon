import Game from "../model/Game";
import {ReplaySubject, Observable} from "@reactivex/rxjs/dist/cjs/Rx";

/**
 * The RunningGameRegistry namespace is a global registry for classes
 * decorated with the [[GameMain]] decorator. It can be used to retrieve
 * the running game, and should only ever have one game registered at any time.
 */
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