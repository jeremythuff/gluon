import {Observable} from "@reactivex/rxjs/dist/cjs/Rx";
import {RenderPhase} from "../../enum/RenderPhase";
export interface RenderCycle {

	phase :RenderPhase;

	init() :Observable<any>;
	load() :Observable<any>;
	update(clock ?:number) :void;
	render(clock ?:number) :void;
	pause() :void;
	destroy() :void;
	phaseIs(phase :RenderPhase) :boolean;
	setPhase(phase :RenderPhase) :void;
	getPhase() :RenderPhase;

}