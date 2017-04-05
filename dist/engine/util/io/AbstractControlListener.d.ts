import { ControlCB } from "./ControlCB";
export declare abstract class AbstractControlListener {
    private runWhenCBS;
    protected activatedInput: boolean[];
    protected lastEvent: Event;
    constructor(runWhenCBS: Array<ControlCB[]>, activatedInput: boolean[]);
    protected activateInput(inputCode: number): void;
    protected releaseInput(inputCode: number): void;
    getLastEvent(): Event;
}
