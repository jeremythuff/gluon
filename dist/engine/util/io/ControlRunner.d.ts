import ControlProfile from "./ControlProfile";
export default class ControlRunner {
    protected lastEvents: Map<string, Event>;
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
