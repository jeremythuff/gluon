import {RenderCycle} from "./interface/RenderCycle";
import {Observable} from "@reactivex/rxjs/dist/cjs/Rx";

export default class Game implements RenderCycle {

	private running : boolean;
	private name : string;
	
    constructor(name?: string) {
    	if(name) this.setName(name);
    }

	getName() : string {
		return this.name;
	}

	setName(name:string) : void {
		this.name = name;
	}

	isRunning(running?:boolean) : boolean {
		if(running != null) this.running = running;
		return this.running;
	}

	init() :Observable<any> {
		return Observable.of(() => {});
	}

	load() :Observable<any> {
		return Observable.of(() => {});
	}

	update() :void {}

	render() :void {}

	destroy() :void {}

}