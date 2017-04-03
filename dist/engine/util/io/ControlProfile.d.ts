import { Controlable } from "../../model/interface/Controlable";
import { ControlCB } from "./ControlCB";
import { Keyboard } from "./Keyboard";
import { Mouse } from "./Mouse";
export default class ControlProfile {
    private controlee;
    private whileCBs;
    private whenCBs;
    constructor(controlee: Controlable);
    protected While(...inputs: (Keyboard | Mouse)[]): (controlCB: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
    protected When(...inputs: (Keyboard | Mouse)[]): (controlCB: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
    protected WhileAny(...inputs: (Keyboard | Mouse)[]): (controlCB: any) => void;
    protected WhenAny(...inputs: (Keyboard | Mouse)[]): (controlCB: any) => void;
    getWhileCBs(): Map<(Keyboard | Mouse)[], ControlCB[]>;
    getWhenCBs(): Map<(Keyboard | Mouse)[], ControlCB[]>;
}
