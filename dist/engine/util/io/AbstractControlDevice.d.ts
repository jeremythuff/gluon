import { Key } from "./Key";
import { Button } from "./Button";
import { ControlCB } from "./ControlCB";
import ControlRule from "./ControlRule";
export declare abstract class AbstractControlDevice {
    protected whileCBs: Map<(Key | Button)[], ControlCB[]>;
    protected whenCBs: Map<(Key | Button)[], ControlCB[]>;
    protected runWhenCBS: Array<ControlCB[]>;
    protected activatedInput: boolean[];
    private cbsToCall;
    constructor();
    protected activateInput(inputCode: number): void;
    protected releaseInput(inputCode: number): void;
    when(...input: (Key | Button)[]): ControlRule;
    whenAny(...input: (Key | Button)[]): ControlRule;
    while(...input: (Key | Button)[]): ControlRule;
    whileAny(...input: (Key | Button)[]): ControlRule;
    _runCBs(delta?: number): void;
    private runWhenCBs(delta?);
    private runWhileCBs(delta?);
}
