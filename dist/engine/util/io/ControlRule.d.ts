import { Key } from "./Key";
import { Button } from "./Button";
import { ControlCB } from "./ControlCB";
export default class ControlRule {
    private cbs;
    private inputs;
    private any;
    constructor(inputs: (Key | Button)[], cbs: Map<(Key | Button)[], ControlCB[]>, any?: boolean);
    run(cb: ControlCB): void;
}
