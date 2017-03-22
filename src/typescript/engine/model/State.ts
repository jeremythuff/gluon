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
    	this.initCBs = [];
    	this.loadCBs = [];
    	this.unloadCBs = [];
    	this.destroyCBs = [];
    }

    runInit() :Observable<{}[]> {
    	this.setPhase(RenderPhase.INITIALIZING);
    	const initObs = Observable.create(observer => {
		    this.initCBs.forEach(cb=>{
				cb();
			});
		    observer.complete();
		});

		return Observable.forkJoin(initObs);

	}

	init(cb :StatePhaseCB) {
		this.initCBs.push(cb);
	}

	runLoad() :Observable<{}[]> {
		this.setPhase(RenderPhase.LOADING);
		
		const loadObs = Observable.create(observer => {	
		    this.loadCBs.forEach(cb=>{
				cb();
			});
		    observer.complete();
		});

		return Observable.forkJoin(loadObs);
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
		const unloadObs = Observable.create(observer => {	
		    this.loadCBs.forEach(cb=>{
				cb();
			});
		    observer.complete();
		});

		return Observable.forkJoin(unloadObs);
	}

	runDestroy() : Observable<{}[]>  {
		this.setPhase(RenderPhase.DESTROYING);
		const destroyObs = Observable.create(observer => {	
		    this.loadCBs.forEach(cb=>{
				cb();
			});
		    observer.complete();
		});

		return Observable.forkJoin(destroyObs);
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
		console.log("State "+this.getName()+" is "+RenderPhase[this.getPhase()]);
	}

	setModes(modes :Mode[]) {
		this.modes = modes;
	}

	getModes() :Mode[] {
		return this.modes;
	}

	avtivateMode(mode :Mode) :void {
		mode.runInit()
			.take(1)
			.subscribe(()=>{
				this.activeModes.push(mode);
			}).unsubscribe();
	}

	deAvtivateMode(mode :Mode) :void {
		mode.runUnload()
			.take(1)
			.subscribe(()=>{
				this.activeModes.splice(this.activeModes.indexOf(mode),1);		
			}).unsubscribe();
	}

}