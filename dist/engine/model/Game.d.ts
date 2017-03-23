import { AbstractRenderCycle } from "./abstracts/AbstractRenderCycle";
import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
import State from "./State";
export default class Game extends AbstractRenderCycle {
    private name;
    private framesPerSecond;
    private initialStateName;
    private activeState;
    private states;
    constructor(name?: string);
    protected _runInit(): Observable<{}[]>;
    protected _runLoad(): Observable<{}[]>;
    protected _RunUpdate(delta: number): void;
    protected _RunRender(delta: number): void;
    protected _RunPause(): void;
    protected _RunUnPause(): void;
    protected _runUnLoad(): Observable<{}[]>;
    protected _runDestroy(): Observable<{}[]>;
    getName(): string;
    setName(name: string): void;
    getInitialStateName(): string;
    setInitialStateName(stateName: string): void;
    getActiveState(): State;
    setActiveState(state: State): void;
    getFramesPerSecond(): number;
    setFramesPerSecond(framesPerSecond: number): void;
    getState(name: string): State;
    addState(state: State): State;
}
