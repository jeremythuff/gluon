import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
import { RenderCycle } from "./interface/RenderCycle";
import { RenderPhase } from "../enum/RenderPhase";
export default class State implements RenderCycle {
    private name;
    private framesPerSecond;
    phase: RenderPhase;
    constructor(name?: string);
    runInit(): Observable<any>;
    runLoad(): Observable<any>;
    runUpdate(): void;
    runRender(): void;
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
