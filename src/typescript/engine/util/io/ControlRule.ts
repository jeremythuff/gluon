import {Keyboard} from "./Keyboard";
import {Mouse} from "./Mouse";
import {ControlCB} from "./ControlCB";

export default class ControlRule {

	private cbs :Map<(Keyboard|Mouse)[], ControlCB[]>;
	private inputs :(Keyboard|Mouse)[];
	private excludes :(Keyboard|Mouse)[];
	private any :boolean;
	
	constructor(inputs :(Keyboard|Mouse)[], cbs :Map<(Keyboard|Mouse)[], ControlCB[]>, any ?:boolean) {
		this.cbs = cbs;
		this.inputs = inputs;
		this.excludes = [];
		this.any = any;
	}

	run(cb :ControlCB) :ControlRule {
		if(this.any) {
			this.inputs.forEach(k=>{
				this.cbs.get([k])?this.cbs.get([k]).push(cb):this.cbs.set([k], [cb]);		
			});	
		} else {
			this.cbs.get(this.inputs)?this.cbs.get(this.inputs).push(cb):this.cbs.set(this.inputs, [cb]);	
		}

		return this;
		
	}

	exclude(inputs :(Keyboard|Mouse)[]) :ControlRule {
		this.inputs.concat(inputs);
		return this;
	}

}