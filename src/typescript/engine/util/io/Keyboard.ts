
import {AbstractControlDevice} from "./AbstractControlDevice";
import {ControlCB} from "../../model/interface/ControlCB";
import {Key} from "../../enum/Key";

import {Observable} from "@reactivex/rxjs/dist/cjs/Rx";

export default class Keyboard extends AbstractControlDevice {

	private pressedKeys :boolean[];

	private cbs :Map<Key[], ControlCB[]>;

	private keyBoardObs :Observable<KeyboardEvent>;

	constructor() {
		super();
		this.cbs = new Map<Key[], ControlCB[]>();
		this.pressedKeys = [];

		this.keyBoardObs = Observable
			.merge(
				Observable.fromEvent(window, "keyup"), 
				Observable.fromEvent(window, "keydown")
			)
			.distinctUntilChanged()
			
		this.keyBoardObs
			.subscribe(e=>{
				this.pressedKeys[e.which]=e.type=="keyup"?false:true;
			});
	}

	runWhen(cb :ControlCB, ...keys:Key[]) :Keyboard {
		let runCB = false;
		this.cbs.get(keys)?this.cbs.get(keys).push(cb):this.cbs.set(keys, [cb]);		
		return this;
	}

	runCBs() :void {
		this.cbs.forEach((cbArray, keyArray)=>{
			let runCB = keyArray.every(k=>{
				return this.pressedKeys[k];
			});
			if(runCB) cbArray.forEach(cb=>{cb();});
		});
	}

}