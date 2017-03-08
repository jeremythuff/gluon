import {RenderCycle} from "./interface/RenderCycle";
import {Observable} from "@reactivex/rxjs/dist/cjs/Rx";

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
    	this.phase = RenderPhase.INITIALIZING;
		return Observable.of(() => {
			this.activeState.init();
		});
	}

	load() :Observable<any> {
		this.phase = RenderPhase.LOADING;
		return Observable.of(() => {
				this.activeState.load().subscribe(() => {
					this.phase = RenderPhase.RUNNING;
				});
		});
	}

	update(delta :number) :void {}

	render(clock :number) :void {}

	pause() :void {
		this.phase = RenderPhase.PAUSED;
	};

	unPause() :void {
		this.phase = RenderPhase.RUNNING;
	};

	destroy() :void {
		this.phase = RenderPhase.DESTROYING;
		this.activeState.destroy()
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
		return this.phase === phase;
	}

	getPhase() :RenderPhase {
		return this.phase;
	}

	setPhase(phase :RenderPhase) :void {
		this.phase = phase;
	}

}