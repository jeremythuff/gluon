import {Controlable} from "../../model/interface/Controlable";
import {ControlCB} from "./ControlCB";
import {Keyboard} from "./Keyboard";
import {Mouse} from "./Mouse";


export default class ControlProfile {
    
    private controlee :Controlable;

    private whileCBs :Map<(Keyboard|Mouse)[], ControlCB[]>;
	private whenCBs :Map<(Keyboard|Mouse)[], ControlCB[]>;

    constructor(controlee :Controlable) {
        this.controlee = controlee;
        this.whileCBs = new Map<(Keyboard|Mouse)[], ControlCB[]>();
		this.whenCBs = new Map<(Keyboard|Mouse)[], ControlCB[]>();
    }

    protected While(...inputs :(Keyboard|Mouse)[]) {
        return function(controlCB: any, propertyKey: string, descriptor: PropertyDescriptor) :void {
            this.whileCBs.get([inputs])?this.whileCBs.get([inputs]).push(controlCB):this.whileCBs.set([inputs], [controlCB]);		
        };
    }

    protected When(...inputs :(Keyboard|Mouse)[]) {
        return function(controlCB: any, propertyKey: string, descriptor: PropertyDescriptor) :void {
            this.whenCBs.get([inputs])?this.whenCBs.get([inputs]).push(controlCB):this.whenCBs.set([inputs], [controlCB]);		
        }
    }

    protected WhileAny(...inputs :(Keyboard|Mouse)[]) {
        return function(controlCB :any) :void {
            inputs.forEach(k=>{
				this.whileCBs.get([k])?this.whileCBs.get([k]).push(controlCB):this.whileCBs.set([k], [controlCB]);		
			});
        }
    }

    protected WhenAny(...inputs :(Keyboard|Mouse)[]) {
        return function(controlCB :any) :void {
            inputs.forEach(k=>{
				this.whenCBs.get([k])?this.whenCBs.get([k]).push(controlCB):this.whenCBs.set([k], [controlCB]);		
			});
        }
    }

    getWhileCBs() :Map<(Keyboard|Mouse)[], ControlCB[]> {
        return this.whileCBs;
    }

    getWhenCBs() :Map<(Keyboard|Mouse)[], ControlCB[]> {
        return this.whenCBs;
    }


}