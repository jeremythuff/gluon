import ControlProfile from "./ControlProfile";
export default class ControlRunner {
    private keyboardListener;
    private mouseListener;
    private alreadyRun;
    private cbsToCall;
    private activatedInput;
    constructor();
    _runCBs(profiles: ControlProfile[], delta?: number): void;
    private runWhenCBs(profiles, delta?);
    private runWhileCBs(profiles, delta?);
}
