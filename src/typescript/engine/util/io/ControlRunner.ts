import {Keyboard} from "./Keyboard";
import {Mouse} from "./Mouse";
import {ControlCB} from "./ControlCB";
import KeyboardListener from "./KeyboardListener";
import MouseListener from "./MouseListener";
import ControlProfile from "./ControlProfile";

export default class ControlRunner {

	private keyboardListener :KeyboardListener;
	private mouseListener :MouseListener;

	private runWhenCBS :Array<ControlCB[]>;

	private cbsToCall :Map<(Keyboard|Mouse)[], ControlCB[]> 

	private activatedInput :boolean[];

	constructor() {

		this.cbsToCall = new Map<(Keyboard|Mouse)[], ControlCB[]>();
		this.runWhenCBS = [];
		this.activatedInput = [];


		this.keyboardListener = new KeyboardListener(this.runWhenCBS, this.activatedInput);
		this.mouseListener = new MouseListener(this.runWhenCBS, this.activatedInput);
	}

	_runCBs(profiles :ControlProfile[], delta ?:number) :void {
		this.runWhileCBs(profiles, delta);
		this.runWhenCBs(profiles, delta);
		this.cbsToCall.forEach((cbArr, inputs)=>cbArr.forEach(cb=>cb(null,delta)));
		this.cbsToCall.clear();
	}

	private runWhenCBs(profiles :ControlProfile[], delta ?:number) :void {
		
		profiles.forEach(profile=>{

			profile.getWhenCBs().forEach((cbArr, inputArr)=>{
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
			
		});
	}

	private runWhileCBs(profiles :ControlProfile[], delta ?:number) :void {

		profiles.forEach(profile=>{

			profile.getWhileCBs().forEach((cbArr, inputArr)=>{
			
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

		});


	}

}