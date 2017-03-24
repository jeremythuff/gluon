import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
import { AbstractRenderCycle } from "./abstracts/AbstractRenderCycle";
import Mode from "./Mode";
export default class State extends AbstractRenderCycle {
    private name;
    private framesPerSecond;
    private modes;
    private activeModes;
    constructor();
    protected _runInit(): Observable<{}[]>;
    protected _runLoad(): Observable<{}[]>;
    protected _runUpdate(delta: number): void;
    protected _runRender(delta: number): void;
    protected _runPause(): void;
    protected _runUnPause(): void;
    protected _runUnLoad(): Observable<{}[]>;
    protected _runDestroy(): Observable<{}[]>;
    getName(): string;
    setName(name: string): void;
    getFramesPerSecond(): number;
    setFramesPerSecond(framesPerSecond: number): void;
    setModes(modes: Mode[]): void;
    getModes(): Mode[];
    getModeByName(name: string): Mode;
    activateMode(mode: Mode): void;
    avtivateAllModes(mode: Mode): void;
    deActivateMode(mode: Mode): void;
    deActivateAllMode(mode: Mode): void;
}
