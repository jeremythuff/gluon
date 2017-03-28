import { AbstractControlDevice } from "./AbstractControlDevice";
import { ControlCB } from "../../model/interface/ControlCB";
import { Key } from "../../enum/Key";
export default class Keyboard extends AbstractControlDevice {
    private pressedKeys;
    private cbs;
    private keyBoardObs;
    constructor();
    runWhen(cb: ControlCB, ...keys: Key[]): Keyboard;
    runCBs(): void;
}
