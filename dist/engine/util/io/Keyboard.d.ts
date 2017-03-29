import { AbstractControlDevice } from "./AbstractControlDevice";
import { ControlCB } from "../../model/interface/ControlCB";
import { Key } from "../../enum/Key";
export default class Keyboard extends AbstractControlDevice {
    private pressedKeys;
    private whileCBs;
    private whenCBs;
    private runWhenCBS;
    private keyBoardObs;
    constructor();
    runWhen(cb: ControlCB, ...keys: Key[]): Keyboard;
    runWhile(cb: ControlCB, ...keys: Key[]): Keyboard;
    runCBs(): void;
    private runWhenCBs();
    private runWhileCBs();
}
