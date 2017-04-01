import {AbstractControlDevice} from "./AbstractControlDevice";
import {Keyboard} from "./Keyboard";
import {Mouse} from "./Mouse";

export interface ControlCB {
	(delta ?:number, inputs ?:(Keyboard|Mouse)[]) :void;
	
}