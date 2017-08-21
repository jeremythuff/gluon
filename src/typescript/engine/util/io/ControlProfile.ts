import "reflect-metadata";

import { Controllable } from "../../model/interface/Controllable";
import { ControlCB } from "./ControlCB";
import { Keyboard } from "./Keyboard";
import { Mouse } from "./Mouse";

export class ControlProfile<C extends Controllable> {

    public controlee: C;

    private whileCBs: Map<(Keyboard | Mouse)[], ControlCB[]>;
    private whenCBs: Map<(Keyboard | Mouse)[], ControlCB[]>;

    constructor(controlee: C) {
        this.controlee = controlee;
        this.whileCBs = new Map<(Keyboard | Mouse)[], ControlCB[]>();
        this.whenCBs = new Map<(Keyboard | Mouse)[], ControlCB[]>();
    }

    setWhileCBs(whileCBs: Map<(Keyboard | Mouse)[], ControlCB[]>): void {
        this.whileCBs = whileCBs;
    }

    setWhenCBs(whenCBs: Map<(Keyboard | Mouse)[], ControlCB[]>): void {
        this.whenCBs = whenCBs;
    }

    getWhileCBs(): Map<(Keyboard | Mouse)[], ControlCB[]> {
        return this.whileCBs;
    }

    getWhenCBs(): Map<(Keyboard | Mouse)[], ControlCB[]> {
        return this.whenCBs;
    }

}