import { AbstractControlListener } from "./AbstractControlListener";
import { ControlCB } from "./ControlCB";
export default class KeyboardListener extends AbstractControlListener {
    private keyBoardObs;
    constructor(runWhenCBS: Array<ControlCB[]>, activatedInput: boolean[]);
}
