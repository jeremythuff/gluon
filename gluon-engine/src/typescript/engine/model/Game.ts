import {RenderCycle} from "./interface/RenderCycle";
import {Observable} from "@reactivex/rxjs/dist/cjs/Rx";

import State from "./State";

export default class Game implements RenderCycle {

	private running : boolean;
	private name : string;

	private initialStateName :string;

	private activeState :State;

	private states : Array<State>;
	
    constructor(name ?:string) {
    	if(name) this.setName(name);
    	this.states = new Array<State>();
    }

    init() :Observable<any> {
		return Observable.of(() => {});
	}

	load() :Observable<any> {
		return Observable.of(() => {});
	}

	update(delta :number) :void {}

	render(clock :number) :void {}

	destroy() :void {}

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

	isRunning(running?:boolean) : boolean {
		if(running != null) this.running = running;
		return this.running;
	}

}