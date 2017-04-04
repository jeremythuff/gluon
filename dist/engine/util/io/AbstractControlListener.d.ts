import { ControlCB } from "./ControlCB";
export declare abstract class AbstractControlListener {
    private runWhenCBS;
    protected activatedInput: boolean[];
    constructor(runWhenCBS: Array<ControlCB[]>, activatedInput: boolean[]);
    protected activateInput(inputCode: number): void;
    protected releaseInput(inputCode: number): void;
}
