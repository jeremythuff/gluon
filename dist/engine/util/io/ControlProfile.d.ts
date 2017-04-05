import { Controlable } from "../../model/interface/Controlable";
import { ControlCB } from "./ControlCB";
import { Keyboard } from "./Keyboard";
import { Mouse } from "./Mouse";
export default class ControlProfile {
    private controlee;
    private whileCBs;
    private whenCBs;
    constructor(controlee: Controlable);
    setWhileCBs(whileCBs: Map<(Keyboard | Mouse)[], ControlCB[]>): void;
    setWhenCBs(whenCBs: Map<(Keyboard | Mouse)[], ControlCB[]>): void;
    getWhileCBs(): Map<(Keyboard | Mouse)[], ControlCB[]>;
    getWhenCBs(): Map<(Keyboard | Mouse)[], ControlCB[]>;
}
