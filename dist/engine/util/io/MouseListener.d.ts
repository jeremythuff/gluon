import { AbstractControlListener } from "./AbstractControlListener";
import { ControlCB } from "./ControlCB";
export default class MouseListener extends AbstractControlListener {
    private MouseObs;
    constructor(runWhenCBS: Array<ControlCB[]>, activatedInput: boolean[]);
}
