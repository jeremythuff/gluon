import ControlProfile from "../util/io/ControlProfile";
import {ReplaySubject, Observable} from "@reactivex/rxjs/dist/cjs/Rx";

/**
 * 
 */
namespace GameControllerRegistry {

	let controllerSubject: ReplaySubject<typeof ControlProfile> = new ReplaySubject<typeof ControlProfile>(100);
	
	export function setControlProfile(mode :typeof ControlProfile) :void {
		controllerSubject.next(mode);
	}

	export function getControlProfileObservable() : Observable<typeof ControlProfile> {
		return controllerSubject.asObservable();
	}

};

export = GameControllerRegistry;