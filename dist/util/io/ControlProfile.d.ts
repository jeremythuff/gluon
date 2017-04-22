import { AbstractControllable } from "../../model/abstracts/AbstractControllable";
import { ControlCB } from "./ControlCB";
import { Keyboard } from "./Keyboard";
import { Mouse } from "./Mouse";
export default class ControlProfile<C extends AbstractControllable> {
    protected controlee: C;
    private whileCBs;
    private whenCBs;
    constructor(controlee: C);
    setWhileCBs(whileCBs: Map<(Keyboard | Mouse)[], ControlCB[]>): void;
    setWhenCBs(whenCBs: Map<(Keyboard | Mouse)[], ControlCB[]>): void;
    getWhileCBs(): Map<(Keyboard | Mouse)[], ControlCB[]>;
    getWhenCBs(): Map<(Keyboard | Mouse)[], ControlCB[]>;
}
