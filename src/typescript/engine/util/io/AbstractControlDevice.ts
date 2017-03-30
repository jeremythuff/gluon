import {Key} from "./Key";
import {Button} from "./Button";
import {ControlCB} from "./ControlCB";
import ControlRule from "./ControlRule";

export abstract class AbstractControlDevice {

	protected whileCBs :Map<(Key|Button)[], ControlCB[]>;
	protected whenCBs :Map<(Key|Button)[], ControlCB[]>;
	protected runWhenCBS :Array<ControlCB[]>;
	protected activatedInput :boolean[];

	private cbsToCall :Map<(Key|Button)[], ControlCB[]> 

	constructor() {
		this.runWhenCBS = [];
		this.activatedInput = [];
		this.cbsToCall = new Map<(Key|Button)[], ControlCB[]>();
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
		this.cbsToCall.forEach((cbArr, keys)=>cbArr.forEach(cb=>cb(delta,keys)));
		this.cbsToCall.clear();
	}

	private runWhenCBs(delta ?:number) :void {
		this.whenCBs.forEach((cbArr, inputArr)=>{
			const keysActive = inputArr.every(k=>{
				return this.activatedInput[k];
			});

			if(keysActive && this.runWhenCBS.indexOf(cbArr)===-1) {

				this.cbsToCall.set(inputArr, cbArr);
				this.runWhenCBS.push(cbArr);

				this.cbsToCall.forEach((cA, iA, map)=>{

					if(iA!==inputArr && iA.some(i=>{
						return inputArr.indexOf(i) !==-1;
					})) {
						console.log("key is active");
						if(iA.length<=inputArr.length) {
							this.cbsToCall.delete(iA);
						} else {
							this.cbsToCall.delete(inputArr);
						}
					}
				});

			}

		});
	}

	private runWhileCBs(delta ?:number) :void {

		this.whileCBs.forEach((cbArr, inputArr)=>{
			
			const keysActive = inputArr.every(k=>{
				return this.activatedInput[k];
			});
			
			if(keysActive) {

				this.cbsToCall.set(inputArr, cbArr);

				this.cbsToCall.forEach((cA, iA, map)=>{

					if(iA!==inputArr && iA.some(i=>{
						return inputArr.indexOf(i) !==-1;
					})) {
					
						if(iA.length<=inputArr.length) {
							this.cbsToCall.delete(iA);
						} else {
							this.cbsToCall.delete(inputArr);
						}

					}
				});

			}

		});

	}

}
