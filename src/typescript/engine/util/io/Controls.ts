import {Keyboard} from "./Keyboard";
import {Mouse} from "./Mouse";
import {ControlCB} from "./ControlCB";
import KeyboardListener from "./KeyboardListener";
import MouseListener from "./MouseListener";
import ControlRule from "./ControlRule";

export default class Controls {

	private keyboardListener :KeyboardListener;
	private mouseListener :MouseListener;

	private whileCBs :Map<(Keyboard|Mouse)[], ControlCB[]>;
	private whenCBs :Map<(Keyboard|Mouse)[], ControlCB[]>;
	private runWhenCBS :Array<ControlCB[]>;

	private cbsToCall :Map<(Keyboard|Mouse)[], ControlCB[]> 

	private activatedInput :boolean[];

	constructor() {

		this.whileCBs = new Map<(Keyboard|Mouse)[], ControlCB[]>();
		this.whenCBs = new Map<(Keyboard|Mouse)[], ControlCB[]>();
		this.cbsToCall = new Map<(Keyboard|Mouse)[], ControlCB[]>();
		this.runWhenCBS = [];
		this.activatedInput = [];


		this.keyboardListener = new KeyboardListener(this.runWhenCBS, this.activatedInput);
		this.mouseListener = new MouseListener(this.runWhenCBS, this.activatedInput);
	}

	when(...input :(Keyboard|Mouse)[]) :ControlRule {
		return new ControlRule(input, this.whenCBs);
	}

	whenAny(...input :(Keyboard|Mouse)[]) :ControlRule {
		return new ControlRule(input, this.whenCBs, true);
	}

	while(...input :(Keyboard|Mouse)[]) :ControlRule {
		return new ControlRule(input, this.whileCBs);
	}

	whileAny(...input :(Keyboard|Mouse)[]) :ControlRule {
		return new ControlRule(input, this.whileCBs, true);
	}

	_runCBs(delta ?:number) :void {
		this.runWhileCBs(delta);
		this.runWhenCBs(delta);
		this.cbsToCall.forEach((cbArr, inputs)=>cbArr.forEach(cb=>cb(delta,inputs)));
		this.cbsToCall.clear();
	}

	private runWhenCBs(delta ?:number) :void {
		this.whenCBs.forEach((cbArr, inputArr)=>{
			const inputsActive = inputArr.every(k=>{
				return this.activatedInput[k];
			});

			if(inputsActive && this.runWhenCBS.indexOf(cbArr)===-1) {

				this.cbsToCall.set(inputArr, cbArr);
				this.runWhenCBS.push(cbArr);

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

	private runWhileCBs(delta ?:number) :void {

		this.whileCBs.forEach((cbArr, inputArr)=>{
			
			const inputsActive = inputArr.every(k=>{
				return this.activatedInput[k];
			});
			
			if(inputsActive) {

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