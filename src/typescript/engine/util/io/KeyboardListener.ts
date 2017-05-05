
import { AbstractControlListener } from "./AbstractControlListener";
import { ControlCB } from "./ControlCB";
import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";

export default class KeyboardListener extends AbstractControlListener {

	private keyBoardObs: Observable<KeyboardEvent>;

	constructor(runWhenCBS: Array<ControlCB[]>, activatedInput: boolean[]) {
		super(runWhenCBS, activatedInput);

		this.keyBoardObs = Observable
			.merge(
			Observable.fromEvent(window, "keyup"),
			Observable.fromEvent(window, "keydown")
			)
			.distinctUntilChanged()

		this.keyBoardObs
			.subscribe(e => {
				e.preventDefault();
				if (e.type == "keydown") {
					this.activateInput(e.which);
					this.lastEvent = e;
				} else {
					this.releaseInput(e.which);
				}
			});

	}

}