import {RenderCycle} from "./interface/RenderCycle";
import {Observable} from "@reactivex/rxjs/dist/cjs/Rx";
import {RenderPhase} from "../enum/RenderPhase";

/**
 *  The Mode class represents a grouping of controll definition and
 *  displayable elements. Modes are registered in a [[State]] and many can be
 *  active at any given time.
 */
export default class Mode implements RenderCycle {

	phase :RenderPhase;

	private name :string;

	constructor(naem ?: string) {
		if(name) this.name = name;
	}

	runInit() :Observable<{}[]> {
		this.setPhase(RenderPhase.INITIALIZING);

    	const initObs = Observable.create(observer => {
		    observer.complete();
		});

		return Observable.forkJoin(initObs);
	};

	runLoad() :Observable<{}[]> {
		return null;
	};
	
	runUpdate(clock ?:number) :void {};
	
	runRender(clock ?:number) :void {};
	
	runPause() :void {};
	
	runUnPause() :void {};
	
	runUnload() :Observable<{}[]> {
		return null;
	};
	
	runDestroy() :Observable<{}[]> {
		return null;
	};
	
	phaseIs(phase :RenderPhase) :boolean {
		return null;
	};
	setPhase(phase :RenderPhase) :void {
		this.phase = phase;
	};
	getPhase() :RenderPhase {
		return this.phase;
	};

	setName(name :string) :void {
		this.name = name;
	}
 
	getName() :string {
		return this.name;
	}
}