import {Key} from "./Key";
import {Button} from "./Button";
import {ControlCB} from "./ControlCB";
import ControlRule from "./ControlRule";

export abstract class AbstractControlDevice {

	protected whileCBs :Map<(Key|Button)[], ControlCB[]>;
	protected whenCBs :Map<(Key|Button)[], ControlCB[]>;
	protected runWhenCBS :Array<ControlCB>;
	protected activatedInput :boolean[];

	constructor() {
		this.runWhenCBS = [];
		this.activatedInput = [];
	}

	protected activateInput(inputCode :number) {
		this.activatedInput[inputCode]=true;
	}

	protected releaseInput(inputCode :number) {
		this.activatedInput[inputCode]=false;
		this.runWhenCBS.length = 0;
	}

	when(...input :(Key|Button)[]) :ControlRule {
		return new ControlRule(input, this.whenCBs);
	}

	whenAny(...input :(Key|Button)[]) :ControlRule {
		return new ControlRule(input, this.whenCBs, true);
	}

	while(...input :(Key|Button)[]) :ControlRule {
		return new ControlRule(input, this.whileCBs);
	}

	whileAny(...input :(Key|Button)[]) :ControlRule {
		return new ControlRule(input, this.whileCBs, true);
	}

	_runCBs(delta ?:number) :void {
		this.runWhileCBs(delta);
		this.runWhenCBs(delta);
	}

	private runWhenCBs(delta ?:number) :void {
		this.whenCBs.forEach((cbArray, keyArray)=>{
			let runCB = keyArray.every(k=>{
				return this.activatedInput[k];
			});
			if(runCB) cbArray.forEach(cb=>{
				if(this.runWhenCBS.indexOf(cb)===-1){
					cb(delta, keyArray);
					this.runWhenCBS.push(cb);
				}
			});
		});
	}

	private runWhileCBs(delta ?:number) :void {
		this.whileCBs.forEach((cbArray, keyArray)=>{
			
			let runCB = keyArray.every(k=>{
				return this.activatedInput[k];
			});
			
			if(runCB) cbArray.forEach(cb=>{
				cb(delta, keyArray);
			});

		});
	}

}
