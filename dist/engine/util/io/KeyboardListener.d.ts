import { AbstractControlDevice } from "./AbstractControlDevice";
import { ControlCB } from "./ControlCB";
export default class KeyboardListener extends AbstractControlDevice {
    private keyBoardObs;
    constructor(runWhenCBS: Array<ControlCB[]>, activatedInput: boolean[]);
}
