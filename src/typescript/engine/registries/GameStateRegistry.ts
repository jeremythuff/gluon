import State from "../model/State";
import { ReplaySubject, Observable } from "@reactivex/rxjs/dist/cjs/Rx";

import * as GameMainRegistry from "./GameMainRegistry";
import * as GameControllereRegistry from "../registries/GameControllerRegistry";


/**
 * The GameStateRegistry namespace is a global registry for classes
 * decorated with the [[GameState]] decorator. 
 */
namespace GameStateRegistry {

	let initialStateSubject: ReplaySubject<State> = new ReplaySubject<State>(100);

	export function addGameState(state: State): void {
		GameMainRegistry.getGameMainSubject().subscribe(game => {
			game.addState(state);
			if (game.getInitialStateName() === state.getName()) initialStateSubject.next(state);
		});
	}

	export function getLastRegisteredGameState(): Observable<State> {
		return initialStateSubject.asObservable();
	}

};

export = GameStateRegistry;