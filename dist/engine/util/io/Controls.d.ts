import { Keyboard } from "./Keyboard";
import { Mouse } from "./Mouse";
import ControlRule from "./ControlRule";
export default class Controls {
    private keyboardListener;
    private mouseListener;
    private whileCBs;
    private whenCBs;
    private runWhenCBS;
    private cbsToCall;
    private activatedInput;
    constructor();
    when(...input: (Keyboard | Mouse)[]): ControlRule;
    whenAny(...input: (Keyboard | Mouse)[]): ControlRule;
    while(...input: (Keyboard | Mouse)[]): ControlRule;
    whileAny(...input: (Keyboard | Mouse)[]): ControlRule;
    _runCBs(delta?: number): void;
    private runWhenCBs(delta?);
    private runWhileCBs(delta?);
}
