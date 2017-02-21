import {Observable} from "@reactivex/rxjs/dist/cjs/Rx";

export interface RenderCycle {

	init() :Observable<any>;
	load() :Observable<any>;
	update() :void;
	render() :void;
	destroy() :void;

}