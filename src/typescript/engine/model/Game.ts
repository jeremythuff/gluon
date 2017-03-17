import {RenderCycle} from "./interface/RenderCycle";
import {ReplaySubject, Observable} from "@reactivex/rxjs/dist/cjs/Rx";

import State from "./State";
import {RenderPhase} from "../enum/RenderPhase";

export default class Game implements RenderCycle {

	phase : RenderPhase = RenderPhase.OFF;

	private name : string;

	private framesPerSecond :number;

	private initialStateName :string;

	private activeState :State;

	private states : Array<State>;
	
    constructor(name ?:string) {
    	if(name) this.setName(name);
    	this.states = new Array<State>();
    }

    init() :Observable<any> {
		this.setPhase(RenderPhase.INITIALIZING);
		return Observable.of(() => {
			this.activeState.init();
		});
	}

	load() :Observable<any> {
		this.setPhase(RenderPhase.LOADING);
		return Observable.of(() => {
			this.activeState.load().subscribe(() => {
				this.setPhase(RenderPhase.READY);
			});
		});
	}

	update(delta :number) :void {
		this.setPhase(RenderPhase.UPDATING);
	}

	render(clock :number) :void {
		this.setPhase(RenderPhase.RENDERING);
	}

	pause() :void {
		this.setPhase(RenderPhase.PAUSED);
	};

	unPause() :void {
		this.setPhase(RenderPhase.READY);
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
		console.log("Game "+this.getName()+" is "+RenderPhase[this.getPhase()]);
	}

}