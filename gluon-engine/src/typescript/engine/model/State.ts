import {Observable} from "@reactivex/rxjs/dist/cjs/Rx";

import {RenderCycle} from "./interface/RenderCycle";

export default class State implements RenderCycle {

	private name : string;

	constructor(name ?:string) {
    	if(name) this.setName(name);
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

	getName() : string {
		return this.name;
	}

	setName(name :string) : void {
		this.name = name;
	}

}