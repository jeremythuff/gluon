import { RenderCycle } from "./interface/RenderCycle";
import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
import State from "./State";
export default class Game implements RenderCycle {
    private running;
    private name;
    private activeState;
    private states;
    constructor(name?: string);
    init(): Observable<any>;
    load(): Observable<any>;
    update(): void;
    render(): void;
    destroy(): void;
    getName(): string;
    setName(name: string): void;
    getActiveState(): State;
    setActiveState(state: State): void;
    getState(name: string): State;
    addState(state: State): State;
    isRunning(running?: boolean): boolean;
}
