import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";

import { AbstractRenderCycle } from "./abstracts/AbstractRenderCycle";
import ControlProfile from "../util/io/ControlProfile";

import { Controllable } from "../model/interface/Controllable";

/**
 *  The Mode class represents a grouping of control definition and
 *  displayable elements. Modes are registered in a [[State]] and many can be
 *  active at any given time.
 */
export default class Mode extends AbstractRenderCycle implements Controllable {

	private name: string;

	private controlProfiles: ControlProfile<Controllable>[];

	constructor() {
		super();
		this.controlProfiles = [];
	}

	protected _runInit(): Observable<{}[]> {
		return Observable.forkJoin();
	}

	protected _runLoad(): Observable<{}[]> {
		return Observable.forkJoin();
	}

	protected _runUpdate(delta: number): void { };

	protected _runRender(delta: number): void { };

	protected _runPause(): void { }

	protected _runUnpause(): void { };

	protected _runUnload(): Observable<{}[]> {
		return Observable.forkJoin();
	}

	protected _runDestroy(): Observable<{}[]> {
		return Observable.forkJoin();
	}

	setName(name: string): void {
		this.name = name;
	}

	getName(): string {
		return this.name;
	}

	setControlProfiles(controlProfiles: ControlProfile<Controllable>[]): void {
		this.controlProfiles = controlProfiles;
	}

	getControlProfiles(): ControlProfile<Controllable>[] {
		return this.controlProfiles;
	}

	addControlProfile(controlProfile: ControlProfile<Controllable>): void {
		this.getControlProfiles().push(controlProfile);
	}

	removeControlProfile(controlProfile: ControlProfile<Controllable>): void {
		const controlProfiles = this.getControlProfiles();
		controlProfiles.splice(controlProfiles.indexOf(controlProfile), 1);
	}

}