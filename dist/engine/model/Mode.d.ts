import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
import { AbstractRenderCycle } from "./abstracts/AbstractRenderCycle";
export default class Mode extends AbstractRenderCycle {
    private name;
    constructor(name?: string);
    protected _runInit(): Observable<{}[]>;
    protected _runLoad(): Observable<{}[]>;
    protected _runUpdate(delta: number): void;
    protected _runRender(delta: number): void;
    protected _runPause(): void;
    protected _runUnPause(): void;
    protected _runUnLoad(): Observable<{}[]>;
    protected _runDestroy(): Observable<{}[]>;
    setName(name: string): void;
    getName(): string;
}
