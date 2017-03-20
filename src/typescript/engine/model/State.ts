import {Observable} from "@reactivex/rxjs/dist/cjs/Rx";

import {RenderCycle} from "./interface/RenderCycle";

import {RenderPhase} from "../enum/RenderPhase";
import {StatePhaseCB} from "./interface/StatePhaseCB";

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

	phase :RenderPhase;

	constructor(name ?:string) {
    	if(name) this.setName(name);
    	this.initCBs = [];
    	this.loadCBs = [];
    }

    runInit() :Observable<any> {
    	this.setPhase(RenderPhase.INITIALIZING);

    	const initObservable = Observable.of("start").flatMap(():any=>{
			this.initCBs.forEach(cb=>{
				cb();
			});
			return initObservable;
		});
		
		return Observable.concat(initObservable, this.runLoad())

	}

	init(cb :StatePhaseCB) {
		this.initCBs.push(cb);
	}

	runLoad() :Observable<any> {
		this.setPhase(RenderPhase.LOADING);
		const loadObservable = Observable.of("start");
		return loadObservable.flatMap(():any=>{
			this.loadCBs.forEach(cb=>{
				cb();
			});
			return loadObservable;
		});
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

	runUnload() :Observable<any> {
		this.setPhase(RenderPhase.UNLOADING);
		return Observable.of(() => {});
	}

	runDestroy()  {
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
		console.log("State "+this.getName()+" is "+RenderPhase[this.getPhase()]);
	}

}