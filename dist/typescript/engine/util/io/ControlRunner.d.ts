import ControlProfile from "./ControlProfile";
import { AbstractControllable } from "../../model/abstracts/AbstractControllable";
export default class ControlRunner {
    protected lastEvents: Map<string, Event>;
    private keyboardListener;
    private mouseListener;
    private alreadyRun;
    private cbsToCall;
    private activatedInput;
    constructor();
    _runCBs(profiles: ControlProfile<AbstractControllable>[], delta?: number): void;
    private runWhenCBs(profiles, delta?);
    private runWhileCBs(profiles, delta?);
}
