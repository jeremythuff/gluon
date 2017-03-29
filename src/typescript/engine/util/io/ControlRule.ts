import {Key} from "./Key";
import {Button} from "./Button";
import {ControlCB} from "./ControlCB";

export default class ControlRule {

	private cbs :Map<(Key|Button)[], ControlCB[]>;
	private inputs :(Key|Button)[];
	private any :boolean;
	
	constructor(inputs :(Key|Button)[], cbs :Map<(Key|Button)[], ControlCB[]>, any ?:boolean) {
		this.cbs = cbs;
		this.inputs = inputs;
		this.any = any;
	}

	run(cb :ControlCB) {
		if(this.any) {
			this.inputs.forEach(k=>{
				this.cbs.get([k])?this.cbs.get([k]).push(cb):this.cbs.set([k], [cb]);		
			});	
		} else {
			this.cbs.get(this.inputs)?this.cbs.get(this.inputs).push(cb):this.cbs.set(this.inputs, [cb]);	
		}
		
	}

}