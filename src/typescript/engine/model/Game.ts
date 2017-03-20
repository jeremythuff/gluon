import {RenderCycle} from "./interface/RenderCycle";
import {ReplaySubject, Observable} from "@reactivex/rxjs/dist/cjs/Rx";

import State from "./State";
import {RenderPhase} from "../enum/RenderPhase";

import {GameInitCB} from "./interface/GameInitCB";
import {GameLoadCB} from "./interface/GameLoadCB";
import {GameUpdateCB} from "./interface/GameUpdateCB";
import {GameRenderCB} from "./interface/GameRenderCB";
import {GamePauseCB} from "./interface/GamePauseCB";
import {GameUnPauseCB} from "./interface/GameUnPauseCB";
import {GameUnloadCB} from "./interface/GameUnloadCB";
import {GameDestroyCB} from "./interface/GameDestroyCB";

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

	private initCBs :GameInitCB[];
	private loadCBs :GameLoadCB[];
	private updateCBs :GameUpdateCB[];
	private renderCBs :GameRenderCB[];
	private pauseCBs :GamePauseCB[];
	private unPauseCBs :GameUnPauseCB[];
	private unloadCBs :GameUnloadCB[];
	private destroyCBs :GameDestroyCB[];
	
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

    runInit() :Observable<GameInitCB> {
		this.setPhase(RenderPhase.INITIALIZING);
		const initObservable = Observable.of("start");
		return initObservable.flatMap(():any=>{
			this.initCBs.forEach(cb=>{
				cb(this);
			});
			return initObservable;
		});
	}

	init(initCB :GameInitCB) :void {
		this.initCBs.push(initCB);
	}

	runLoad() :Observable<GameLoadCB> {
		this.setPhase(RenderPhase.LOADING);

		const loadObservable = Observable.of("start");
		return loadObservable.flatMap(():any=>{
			this.loadCBs.forEach(cb=>{
				cb(this);
			});
			return loadObservable;
		});
	}

	load(cb :GameLoadCB) :void {
		this.loadCBs.push(cb);
	}

	runUpdate(delta :number) :void {
		this.setPhase(RenderPhase.UPDATING);
		this.updateCBs.forEach(cb=>{
			cb(delta,this);
		});
	}

	update(cb :GameUpdateCB) :void {
		this.updateCBs.push(cb);
	}

	runRender(delta :number) :void {
		this.setPhase(RenderPhase.RENDERING);
		this.renderCBs.forEach(cb=>{
			cb(delta, this);
		});
	}

	render(cb :GameRenderCB) :void {
		this.renderCBs.push(cb);
	}

	runPause() :void {
		this.setPhase(RenderPhase.PAUSED);
		this.pauseCBs.forEach(cb=>{
			cb(this);
		});
	};

	pause(cb :GamePauseCB) {
		this.pauseCBs.push(cb);
	}

	runUnPause() :void {
		this.setPhase(RenderPhase.READY);
		this.unPauseCBs.forEach(cb=>{
			cb(this);
		});
	};

	unPause(cb :GameUnPauseCB) : void {
		this.unPauseCBs.push(cb);
	}

	runUnload() :Observable<GameUnloadCB> {
		this.setPhase(RenderPhase.UNLOADING);

		const unLoadObservable = Observable.of("start");
		return unLoadObservable.flatMap(():any=>{
			this.unloadCBs.forEach(cb=>{
				cb(this);
			});
			return unLoadObservable;
		});
	}

	unload(cb :GameUnloadCB) :void {
		this.unloadCBs.push(cb);
	}

	runDestroy()  {
		this.setPhase(RenderPhase.DESTROYING);
		const unDestroyObservable = Observable.of("start");
		return unDestroyObservable.flatMap(():any=>{
			this.destroyCBs.forEach(cb=>{
				cb(this);
			});
			return unDestroyObservable;
		});
	}

	destroy(cb :GameDestroyCB) :void {
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