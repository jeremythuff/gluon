
import { AbstractControlListener } from "./AbstractControlListener";
import { ControlCB } from "./ControlCB";
import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
import { Mouse } from "./Mouse";

export default class MouseListener extends AbstractControlListener {

	private mouseObs: Observable<MouseEvent | WheelEvent>;
	private mouseMoveStopTimer: number;
	private mouseWheelStopTimer: number;

	constructor(runWhenCBS: Array<ControlCB[]>, activatedInput: boolean[]) {
		super(runWhenCBS, activatedInput);

		this.mouseObs = Observable
			.merge(
			Observable.fromEvent(window, "mousedown"),
			Observable.fromEvent(window, "mouseup"),
			Observable.fromEvent(window, "mousemove"),
			Observable.fromEvent(window, "wheel")
			)
			.distinctUntilChanged()

		this.mouseObs
			.subscribe(e => {
				e.preventDefault();
				switch (e.type) {
					case "mousedown":
						this.activateInput((<MouseEvent>e).button + 1000);
						break;

					case "mouseup":
						this.releaseInput((<MouseEvent>e).button + 1000);
						break;

					case "mousemove":
						this.activateInput(Mouse.MOVE);

						if (this.mouseMoveStopTimer) window.clearTimeout(this.mouseMoveStopTimer);
						this.mouseMoveStopTimer = window.setTimeout(() => {
							this.releaseInput(Mouse.MOVE);
						}, 10);

						break;

					case "wheel":

						this.activateInput(Mouse.WHEEL);

						if ((<WheelEvent>e).wheelDelta < 0) {
							this.activateInput(Mouse.WHEEL_UP);
						} else if ((<WheelEvent>e).wheelDelta > 0) {
							this.activateInput(Mouse.WHEEL_DOWN);
						} else {
							this.releaseInput(Mouse.WHEEL);
							this.releaseInput(Mouse.WHEEL_UP);
							this.releaseInput(Mouse.WHEEL_DOWN);
						}

						if (this.mouseWheelStopTimer) window.clearTimeout(this.mouseWheelStopTimer);
						this.mouseWheelStopTimer = window.setTimeout(() => {
							this.releaseInput(Mouse.WHEEL);
							this.releaseInput(Mouse.WHEEL_UP);
							this.releaseInput(Mouse.WHEEL_DOWN);
						}, 10);

						break;

					default:
						break;
				}

				this.lastEvent = e;

			});

	}

}