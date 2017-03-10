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
    	this.setPhase(RenderPhase.INITIALIZING);
		return Observable.of(() => {});
	}

	load() :Observable<any> {
		this.setPhase(RenderPhase.LOADING);
		return Observable.of(() => {});
	}

	update() :void {
		this.setPhase(RenderPhase.UPDATING);
	};

	render() :void {
		this.setPhase(RenderPhase.RENDERING);
	};

	pause() :void {
		this.setPhase(RenderPhase.PAUSED);
	};

	unPause() :void {
		this.setPhase(RenderPhase.RENDERING);
	};

	unload() :Observable<any> {
		this.setPhase(RenderPhase.UNLOADING);
		return Observable.of(() => {});
	}

	destroy()  {
		this.setPhase(RenderPhase.DESTROYING);
		return Observable.of(() => {});
	}

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
		return phase===this.phase || phase === Math.floor(this.phase);
	}

	getPhase() :RenderPhase {
		return this.phase;
	}

	setPhase(phase :RenderPhase) :void {
		this.phase = phase;
	}

}