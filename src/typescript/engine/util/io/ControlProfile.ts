import {Controlable} from "../../model/interface/Controlable";
import {ControlCB} from "./ControlCB";
import {Keyboard} from "./Keyboard";
import {Mouse} from "./Mouse";


export default class ControlProfile {
    
    protected controlee :Controlable;

    private whileCBs :Map<(Keyboard|Mouse)[], ControlCB[]>;
	private whenCBs :Map<(Keyboard|Mouse)[], ControlCB[]>;

    constructor(controlee :Controlable) {
        this.controlee = controlee;
        this.whileCBs = new Map<(Keyboard|Mouse)[], ControlCB[]>();
		this.whenCBs = new Map<(Keyboard|Mouse)[], ControlCB[]>();
    }

    setWhileCBs(whileCBs :Map<(Keyboard|Mouse)[], ControlCB[]>) :void {
        this.whileCBs = whileCBs;
    }

    setWhenCBs(whenCBs :Map<(Keyboard|Mouse)[], ControlCB[]>) :void {
        this.whenCBs = whenCBs;
    }

    getWhileCBs() :Map<(Keyboard|Mouse)[], ControlCB[]> {
        return this.whileCBs;
    }

    getWhenCBs() :Map<(Keyboard|Mouse)[], ControlCB[]> {
        return this.whenCBs;
    }

}