import {AbstractControlDevice} from "./AbstractControlDevice";
import {Key} from "./Key";
import {Button} from "./Button";

export interface ControlCB {
	(delta ?:number, inputs ?:(Key|Button)[]) :void;
	
}