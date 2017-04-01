
import {AbstractControlDevice} from "./AbstractControlDevice";
import {ControlCB} from "./ControlCB";
import {Observable} from "@reactivex/rxjs/dist/cjs/Rx";

export default class KeyboardListener extends AbstractControlDevice {

	private keyBoardObs :Observable<KeyboardEvent>;

	constructor(runWhenCBS :Array<ControlCB[]>, activatedInput :boolean[]) {
		super(runWhenCBS, activatedInput);
		
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