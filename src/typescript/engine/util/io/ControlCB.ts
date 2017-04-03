import {AbstractControlDevice} from "./AbstractControlDevice";
import {Keyboard} from "./Keyboard";
import {Mouse} from "./Mouse";

export interface ControlCB {
	(events ?:Map<string,{}>, delta ?:number) :void;
	
}