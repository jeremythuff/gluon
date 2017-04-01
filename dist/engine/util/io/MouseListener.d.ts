import { AbstractControlDevice } from "./AbstractControlDevice";
import { ControlCB } from "./ControlCB";
export default class MouseListener extends AbstractControlDevice {
    private MouseObs;
    constructor(runWhenCBS: Array<ControlCB[]>, activatedInput: boolean[]);
}
