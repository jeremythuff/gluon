import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
import { RenderCycle } from "./interface/RenderCycle";
import { RenderPhase } from "../enum/RenderPhase";
import { StatePhaseCB } from "./interface/StatePhaseCB";
export default class State implements RenderCycle {
    private name;
    private framesPerSecond;
    private initCBs;
    private loadCBs;
    phase: RenderPhase;
    constructor(name?: string);
    runInit(): Observable<any>;
    init(cb: StatePhaseCB): void;
    runLoad(): Observable<any>;
    load(cb: StatePhaseCB): void;
    runUpdate(delta: number): void;
    runRender(delta: number): void;
    runPause(): void;
    runUnPause(): void;
    runUnload(): Observable<any>;
    runDestroy(): Observable<() => void>;
    getName(): string;
    setName(name: string): void;
    getFramesPerSecond(): number;
    setFramesPerSecond(framesPerSecond: number): void;
    phaseIs(phase: RenderPhase): boolean;
    getPhase(): RenderPhase;
    setPhase(phase: RenderPhase): void;
}
