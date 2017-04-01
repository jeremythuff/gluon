import { Keyboard } from "./Keyboard";
import { Mouse } from "./Mouse";
import { ControlCB } from "./ControlCB";
export default class ControlRule {
    private cbs;
    private inputs;
    private excludes;
    private any;
    constructor(inputs: (Keyboard | Mouse)[], cbs: Map<(Keyboard | Mouse)[], ControlCB[]>, any?: boolean);
    run(cb: ControlCB): ControlRule;
    exclude(inputs: (Keyboard | Mouse)[]): ControlRule;
}
