import {Observable} from "@reactivex/rxjs/dist/cjs/Rx";
import {RenderPhase} from "../../enum/RenderPhase";
export interface RenderCycle {

	phase :RenderPhase;

	runInit() :Observable<any>;
	runLoad() :Observable<any>;
	runUpdate(clock ?:number) :void;
	runRender(clock ?:number) :void;
	runPause() :void;
	runUnPause() :void;
	runUnload() :Observable<any>;
	runDestroy() :Observable<any>;
	phaseIs(phase :RenderPhase) :boolean;
	setPhase(phase :RenderPhase) :void;
	getPhase() :RenderPhase;

}