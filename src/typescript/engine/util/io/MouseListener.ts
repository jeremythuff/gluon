
import {AbstractControlListener} from "./AbstractControlListener";
import {ControlCB} from "./ControlCB";
import {Observable} from "@reactivex/rxjs/dist/cjs/Rx";

export default class MouseListener extends AbstractControlListener {

	private MouseObs :Observable<MouseEvent>;

	constructor(runWhenCBS :Array<ControlCB[]>, activatedInput :boolean[]) {
		super(runWhenCBS, activatedInput);
		
		this.MouseObs = Observable
			.merge(
				Observable.fromEvent(window, "mousedown"),
				Observable.fromEvent(window, "mouseup")			
			)
			.distinctUntilChanged()
			
		this.MouseObs
			.subscribe(e=>{

				switch (e.type) {
					case "mousedown":
						this.activateInput(e.button+1000);
						break;

					case "mouseup":
						this.releaseInput(e.button+1000);
						break;
					
					default:
						// code...
						break;
				}
			
			});

	}

}