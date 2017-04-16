import { AbstractControlListener } from "./AbstractControlListener";
import { ControlCB } from "./ControlCB";
export default class MouseListener extends AbstractControlListener {
    private mouseObs;
    private mouseMoveStopTimer;
    private mouseWheelStopTimer;
    constructor(runWhenCBS: Array<ControlCB[]>, activatedInput: boolean[]);
}
