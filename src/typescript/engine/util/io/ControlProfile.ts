import "reflect-metadata";

import { AbstractControllable } from "../../model/abstracts/AbstractControllable";
import { ControlCB } from "./ControlCB";
import { Keyboard } from "./Keyboard";
import { Mouse } from "./Mouse";

export default class ControlProfile<C extends AbstractControllable> {

    protected controlee: C;

    private whileCBs: Map<(Keyboard | Mouse)[], ControlCB[]>;
    private whenCBs: Map<(Keyboard | Mouse)[], ControlCB[]>;

    constructor(controlee: C) {
        this.controlee = controlee;
        this.whileCBs = new Map<(Keyboard | Mouse)[], ControlCB[]>();
        this.whenCBs = new Map<(Keyboard | Mouse)[], ControlCB[]>();

        let prototype = Reflect.getPrototypeOf(this);

        Object.keys(prototype).forEach(key=>{
            console.log(Reflect.getMetadataKeys(prototype[key]));
        });

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