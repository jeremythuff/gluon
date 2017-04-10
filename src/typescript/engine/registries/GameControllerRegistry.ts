import ControlProfile from "../util/io/ControlProfile";
import { ReplaySubject, Observable } from "@reactivex/rxjs/dist/cjs/Rx";

import { Keyboard } from "../util/io/Keyboard";
import { Mouse } from "../util/io/Mouse";

import { ControlCB } from "../util/io/ControlCB";
import { AbstractControllable } from "../model/abstracts/AbstractControllable";

/**
 * 
 */
namespace GameControllerRegistry {

	let whileCBMapCache: Map<String, Map<(Keyboard | Mouse)[], ControlCB[]>> = new Map<String, Map<(Keyboard | Mouse)[], ControlCB[]>>();
	let whenCBMapCache: Map<String, Map<(Keyboard | Mouse)[], ControlCB[]>> = new Map<String, Map<(Keyboard | Mouse)[], ControlCB[]>>();

	let controllerSubject: ReplaySubject<typeof ControlProfile> = new ReplaySubject<typeof ControlProfile>(100);

	export function setControlProfile(mode: typeof ControlProfile): void {
		console.log(mode);
		controllerSubject.next(mode);
	};

	export function getControlProfileObservable(): Observable<typeof ControlProfile> {
		return controllerSubject.asObservable();
	};

	export function getWhileCBMapByName(className: string): Map<(Keyboard | Mouse)[], ControlCB[]> {
		let cbMap = whileCBMapCache.get(className);
		if (!cbMap) {
			cbMap = new Map<(Keyboard | Mouse)[], ControlCB[]>();
			whileCBMapCache.set(className, cbMap);
		}
		return cbMap;
	}

	export function getWhenCBMapByName(className: string): Map<(Keyboard | Mouse)[], ControlCB[]> {
		let cbMap = whenCBMapCache.get(className);
		if (!cbMap) {
			cbMap = new Map<(Keyboard | Mouse)[], ControlCB[]>();
			whenCBMapCache.set(className, cbMap);
		}
		return cbMap;
	}

};

export = GameControllerRegistry;