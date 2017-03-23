import {Observable} from "@reactivex/rxjs/dist/cjs/Rx";

import {RenderCycle} from "./interface/RenderCycle";

import {RenderPhase} from "../enum/RenderPhase";
import {StatePhaseCB} from "./interface/StatePhaseCB";

import Mode from "./Mode";

/**
 * The State class acts as the primary organizing entiry for your game. 
 * States are registered and instantiated with the your game instance through the
 * use of the [[GameState]] decorator. Any class which both extends State and is decorated
 * with [[GameState]] will automatically be available for you in your game instance.
 * */
export default class State implements RenderCycle {

	private name : string;
	private framesPerSecond: number;

	private initCBs :StatePhaseCB[];
	private loadCBs :StatePhaseCB[];
	private unloadCBs :StatePhaseCB[];
	private destroyCBs :StatePhaseCB[];

	private modes :Mode[];
	private activeModes :Mode[];

	phase :RenderPhase;

	constructor() {
    	this.modes = [];
    	this.activeModes =[];
    	this.initCBs = [];
    	this.loadCBs = [];
    	this.unloadCBs = [];
    	this.destroyCBs = [];
    }

    runInit() :Observable<{}[]> {
    	this.setPhase(RenderPhase.INITIALIZING);
		return Observable.forkJoin(this.runPhaseCBs(this.initCBs));
	}

	init(cb :StatePhaseCB) {
		this.initCBs.push(cb);
	}

	runLoad() :Observable<{}[]> {
		this.setPhase(RenderPhase.LOADING);
		return Observable.forkJoin(this.runPhaseCBs(this.loadCBs));
	}

	load(cb :StatePhaseCB) {
		this.loadCBs.push(cb);
	} 

	runUpdate(delta :number) :void {
		this.setPhase(RenderPhase.UPDATING);
	};

	runRender(delta :number) :void {
		this.setPhase(RenderPhase.RENDERING);
	};

	runPause() :void {
		this.setPhase(RenderPhase.PAUSED);
	};

	runUnPause() :void {
		this.setPhase(RenderPhase.RENDERING);
	};

	runUnload() :Observable<{}[]> {
		return Observable.forkJoin(this.runPhaseCBs(this.unloadCBs));
	}

	runDestroy() :Observable<{}[]>  {
		this.setPhase(RenderPhase.DESTROYING);
		return Observable.forkJoin(this.runPhaseCBs(this.destroyCBs));
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

	setModes(modes :Mode[]) {
		this.modes = modes;
	}

	getModes() :Mode[] {
		return this.modes;
	}

	getModeByName(name :string) :Mode {
		let foundMode = null;
		this.modes.some(mode=>{
			const p = mode.getName() === name;
			if(p) foundMode = mode;
			return p;
		});
		return foundMode;
	}

	activateMode(mode :Mode) :void {
		mode.runInit()
			.take(1)
			.subscribe(null,null,()=>{
				this.activeModes.push(mode);
			});
	}

	avtivateAllModes(mode :Mode) :void {
		this.modes.forEach(mode=>{
			this.activateMode(mode);
		});
	}

	deActivateMode(mode :Mode) :void {
		mode.runUnload()
			.take(1)
			.subscribe(null,null,()=>{
				this.activeModes.splice(this.activeModes.indexOf(mode),1);		
			}).unsubscribe();
	}

	deActivateAllMode(mode :Mode) :void {
		this.activeModes.forEach(mode=>{
			this.deActivateMode(mode);
		});
	}

	private runPhaseCBs(cbs :StatePhaseCB[]) :Observable<{}[]> {
		return Observable.create(observer => {	
		    cbs.forEach(cb=>{
				cb();
			});
		    observer.complete();
		});
	}

}