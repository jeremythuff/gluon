import State from "../model/State";
import {Subject, Observable} from "@reactivex/rxjs/dist/cjs/Rx";

import * as RunningGameRegistry from "./RunningGameRegistry";

/**
 * The GameStateRegistry namespace is a global registry for classes
 * decorated with the [[GameState]] decorator. 
 */
namespace GameStateRegistry {

	let initialStateSubject: Subject<State> = new Subject<State>();
	
	export function addGameState(state :State) :void {
		RunningGameRegistry.getRunningGameSubject().subscribe(game=>{
			game.addState(state);
			if(game.getInitialStateName()===state.getName()) initialStateSubject.next(state);
		});
	}

	export function getLastRegisteredGameState() : Observable<State> {
		return initialStateSubject.asObservable();
	}

};

export = GameStateRegistry;