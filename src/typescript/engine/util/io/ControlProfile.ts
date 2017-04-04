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
        console.log("BUILT");
    }

    addWhileCBs(inputs :(Keyboard|Mouse)[], cbs :ControlCB[]) :void {
        this.whileCBs.set(inputs, cbs);
    }

    addWhenCBs(inputs :(Keyboard|Mouse)[], cbs :ControlCB[]) :void {
        this.whenCBs.set(inputs, cbs);
    }

    getWhileCBs() :Map<(Keyboard|Mouse)[], ControlCB[]> {
        return this.whileCBs;
    }

    getWhenCBs() :Map<(Keyboard|Mouse)[], ControlCB[]> {
        return this.whenCBs;
    }

}