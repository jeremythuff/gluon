import {Observable} from "@reactivex/rxjs/dist/cjs/Rx";

import {AbstractRenderCycle} from "./abstracts/AbstractRenderCycle";

/**
 *  The Mode class represents a grouping of controll definition and
 *  displayable elements. Modes are registered in a [[State]] and many can be
 *  active at any given time.
 */
export default class Mode extends AbstractRenderCycle {

	private name :string;

	constructor(name ?: string) {
		super();
		if(name) this.name = name;
	}

	protected  _runInit() :Observable<{}[]> {
		return Observable.forkJoin();
	}

	protected _runLoad() :Observable<{}[]> {
		return Observable.forkJoin();
	}

	protected _runUpdate(delta :number) :void {};

	protected _runRender(delta :number) :void {};

	protected _runPause() :void {}

	protected _runUnPause() :void {};

	protected _runUnLoad() :Observable<{}[]> {
		return Observable.forkJoin();
	}

	protected _runDestroy() :Observable<{}[]>  {
		return Observable.forkJoin();
	}

	setName(name :string) :void {
		this.name = name;
	}
 
	getName() :string {
		return this.name;
	}
}