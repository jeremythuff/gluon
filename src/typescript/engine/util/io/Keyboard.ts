
import {AbstractControlDevice} from "./AbstractControlDevice";
import {ControlCB} from "./ControlCB";
import {Key} from "./Key";

import {Observable} from "@reactivex/rxjs/dist/cjs/Rx";

export default class Keyboard extends AbstractControlDevice {

	private keyBoardObs :Observable<KeyboardEvent>;

	constructor() {
		super();

		this.whileCBs = new Map<Key[], ControlCB[]>();
		this.whenCBs = new Map<Key[], ControlCB[]>();

		this.keyBoardObs = Observable
			.merge(
				Observable.fromEvent(window, "keyup"), 
				Observable.fromEvent(window, "keydown")
			)
			.distinctUntilChanged()
			
		this.keyBoardObs
			.subscribe(e=>{
				if(e.type=="keydown") {
					this.activateInput(e.which);
				} else {
					this.releaseInput(e.which);
				}				
			});

	}

}