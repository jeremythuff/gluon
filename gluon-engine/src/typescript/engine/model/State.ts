import {Observable} from "@reactivex/rxjs/dist/cjs/Rx";

import {RenderCycle} from "./interface/RenderCycle";

import {RenderPhase} from "../enum/RenderPhase";

export default class State implements RenderCycle {

	private name : string;
	private framesPerSecond: number;

	phase :RenderPhase;

	constructor(name ?:string) {
    	if(name) this.setName(name);
    }

    init() :Observable<any> {
		return Observable.of(() => {});
	}

	load() :Observable<any> {
		return Observable.of(() => {});
	}

	update() :void {};

	render() :void {};

	pause() :void {};

	destroy() :void {}

	getName() : string {
		return this.name;
	}

	setName(name :string) : void {
		this.name = name;
	}

	getFramesPerSecond() : number {
		return this.framesPerSecond;
	}

	setFramesPerSecond(framesPerSecond :number) : void {
		this.framesPerSecond = framesPerSecond;
	}

	phaseIs(phase:RenderPhase) :boolean {
		return this.phase === phase;
	}

	getPhase() :RenderPhase {
		return this.phase;
	}

	setPhase(phase :RenderPhase) :void {
		this.phase = phase;
	}

}