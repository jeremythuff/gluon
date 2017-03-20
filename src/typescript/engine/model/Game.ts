import {RenderCycle} from "./interface/RenderCycle";
import {ReplaySubject, Observable} from "@reactivex/rxjs/dist/cjs/Rx";

import State from "./State";
import {RenderPhase} from "../enum/RenderPhase";
import {GamePhaseCB} from "./interface/GamePhaseCB";

/**
 * The Game class is the central class to all Gluon games. By extending
 * this class into you game main glass, and decorating it with the [[GameMain]]
 * decorator, it will be the main entry point for your game.
 */
export default class Game implements RenderCycle {

	phase : RenderPhase = RenderPhase.OFF;

	private name : string;

	private framesPerSecond :number;

	private initialStateName :string;

	private activeState :State;

	private states :State[];

	private initCBs :GamePhaseCB[];
	private loadCBs :GamePhaseCB[];
	private updateCBs :GamePhaseCB[];
	private renderCBs :GamePhaseCB[];
	private pauseCBs :GamePhaseCB[];
	private unPauseCBs :GamePhaseCB[];
	private unloadCBs :GamePhaseCB[];
	private destroyCBs :GamePhaseCB[];
	
    constructor(name ?:string) {
    	if(name) this.setName(name);
    	this.states = [];
    	this.initCBs = [];
    	this.loadCBs = [];
    	this.updateCBs = [];
    	this.renderCBs = [];
    	this.pauseCBs = [];
    	this.unPauseCBs = [];
    	this.unloadCBs = [];
    	this.destroyCBs = [];
    }

    runInit() :Observable<GamePhaseCB> {
		this.setPhase(RenderPhase.INITIALIZING);
		const initObservable = Observable.of("start");
		return initObservable.flatMap(():any=>{
			this.initCBs.forEach(cb=>{
				cb();
			});
			return initObservable;
		});
	}

	init(initCB :GamePhaseCB) :void {
		this.initCBs.push(initCB);
	}

	runLoad() :Observable<GamePhaseCB> {
		this.setPhase(RenderPhase.LOADING);

		const loadObservable = Observable.of("start");
		return loadObservable.flatMap(():any=>{
			this.loadCBs.forEach(cb=>{
				cb();
			});
			return loadObservable;
		});
	}

	load(cb :GamePhaseCB) :void {
		this.loadCBs.push(cb);
	}

	runUpdate(delta :number) :void {
		this.setPhase(RenderPhase.UPDATING);
		this.updateCBs.forEach(cb=>{
			cb(delta);
		});
	}

	update(cb :GamePhaseCB) :void {
		this.updateCBs.push(cb);
	}

	runRender(delta :number) :void {
		this.setPhase(RenderPhase.RENDERING);
		this.renderCBs.forEach(cb=>{
			cb(delta);
		});
	}

	render(cb :GamePhaseCB) :void {
		this.renderCBs.push(cb);
	}

	runPause() :void {
		this.setPhase(RenderPhase.PAUSED);
		this.pauseCBs.forEach(cb=>{
			cb();
		});
	};

	pause(cb :GamePhaseCB) {
		this.pauseCBs.push(cb);
	}

	runUnPause() :void {
		this.setPhase(RenderPhase.READY);
		this.unPauseCBs.forEach(cb=>{
			cb();
		});
	};

	unPause(cb :GamePhaseCB) : void {
		this.unPauseCBs.push(cb);
	}

	runUnload() :Observable<GamePhaseCB> {
		this.setPhase(RenderPhase.UNLOADING);

		const unLoadObservable = Observable.of("start");
		return unLoadObservable.flatMap(():any=>{
			this.unloadCBs.forEach(cb=>{
				cb();
			});
			return unLoadObservable;
		});
	}

	unload(cb :GamePhaseCB) :void {
		this.unloadCBs.push(cb);
	}

	runDestroy()  {
		this.setPhase(RenderPhase.DESTROYING);
		const unDestroyObservable = Observable.of("start");
		return unDestroyObservable.flatMap(():any=>{
			this.destroyCBs.forEach(cb=>{
				cb();
			});
			return unDestroyObservable;
		});
	}

	destroy(cb :GamePhaseCB) :void {
		this.destroyCBs.push(cb);
	}

	getName() : string {
		return this.name;
	}

	setName(name:string) : void {
		this.name = name;
	}

	getInitialStateName() : string {
		return this.initialStateName;
	}

	setInitialStateName(stateName :string) : void {
		this.initialStateName = stateName;
	}

	getActiveState() :State {
		return this.activeState;
	}

	setActiveState(state :State) :void {
		this.activeState = state;
	}

	getFramesPerSecond() :number {
		let frameRate = this.framesPerSecond;
		if(this.getActiveState()) {
			frameRate = this.getActiveState().getFramesPerSecond()
				?this.getActiveState().getFramesPerSecond()
				:this.framesPerSecond;
		}
		return frameRate;
	}

	setFramesPerSecond(framesPerSecond :number) :void {
		this.framesPerSecond = framesPerSecond;
	}

	getState(name :string) : State {
		let foundState = null;

		this.states.some((state :State) => {
			let pred = state.getName() === name;
			if(pred) foundState = state;
			return pred;
		});

		return foundState;
	}

	addState(state :State) : State {
		this.states.push(state);
		return state;
	}

	phaseIs(phase:RenderPhase) :boolean {
		return phase===this.phase || phase === Math.floor(this.phase);
	}

	getPhase() :RenderPhase {
		return this.phase;
	}

	setPhase(phase :RenderPhase) :void {
		this.phase = phase;
		//console.log("Game "+this.getName()+" is "+RenderPhase[this.getPhase()]);
	}

}