import Mode from "../model/Mode";
import { ReplaySubject, Observable } from "@reactivex/rxjs/dist/cjs/Rx";

/**
 * 
 */
namespace GameModeRegistry {

	let modeSubject: ReplaySubject<typeof Mode> = new ReplaySubject<typeof Mode>(100);

	export function setGameMode(mode: typeof Mode): void {
		modeSubject.next(mode);
	}

	export function getGameModeObservable(): Observable<typeof Mode> {
		return modeSubject.asObservable();
	}

};

export = GameModeRegistry;