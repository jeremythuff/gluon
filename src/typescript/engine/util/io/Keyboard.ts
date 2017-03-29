
import {AbstractControlDevice} from "./AbstractControlDevice";
import {ControlCB} from "../../model/interface/ControlCB";
import {Key} from "../../enum/Key";

import {Observable} from "@reactivex/rxjs/dist/cjs/Rx";

export default class Keyboard extends AbstractControlDevice {

	private pressedKeys :boolean[];

	private whileCBs :Map<Key[], ControlCB[]>;
	private whenCBs :Map<Key[], ControlCB[]>;
	private runWhenCBS :Array<ControlCB>;

	private keyBoardObs :Observable<KeyboardEvent>;

	constructor() {
		super();
		this.whileCBs = new Map<Key[], ControlCB[]>();
		this.whenCBs = new Map<Key[], ControlCB[]>();
		
		this.runWhenCBS = [];
		this.pressedKeys = [];

		this.keyBoardObs = Observable
			.merge(
				Observable.fromEvent(window, "keyup"), 
				Observable.fromEvent(window, "keydown")
			)
			.distinctUntilChanged()
			
		this.keyBoardObs
			.subscribe(e=>{
				if(e.type=="keyup") {
					this.pressedKeys[e.which]=false;
					this.runWhenCBS.length = 0;
				} else {
					this.pressedKeys[e.which]=true;
				}				
			});
	}

	runWhen(cb :ControlCB, ...keys:Key[]) :Keyboard {
		let runCB = false;
		this.whenCBs.get(keys)?this.whenCBs.get(keys).push(cb):this.whenCBs.set(keys, [cb]);		
		return this;
	}

	runWhile(cb :ControlCB, ...keys:Key[]) :Keyboard {
		let runCB = false;
		this.whileCBs.get(keys)?this.whileCBs.get(keys).push(cb):this.whileCBs.set(keys, [cb]);		
		return this;
	}

	runCBs() :void {
		this.runWhileCBs();
		this.runWhenCBs();
	}

	private runWhenCBs() :void {
		this.whenCBs.forEach((cbArray, keyArray)=>{
			let runCB = keyArray.every(k=>{
				return this.pressedKeys[k];
			});
			if(runCB) cbArray.forEach(cb=>{
				if(this.runWhenCBS.indexOf(cb)===-1){
					console.log();
					cb();
					this.runWhenCBS.push(cb);
				}
			});
		});
	}

	private runWhileCBs() :void {
		this.whileCBs.forEach((cbArray, keyArray)=>{
			let runCB = keyArray.every(k=>{
				return this.pressedKeys[k];
			});
			if(runCB) cbArray.forEach(cb=>{cb();});
		});
	}

}