import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
import { RenderCycle } from "./interface/RenderCycle";
import { RenderPhase } from "../enum/RenderPhase";
export default class State implements RenderCycle {
    private name;
    private framesPerSecond;
    phase: RenderPhase;
    constructor(name?: string);
    init(): Observable<any>;
    load(): Observable<any>;
    update(): void;
    render(): void;
    pause(): void;
    unPause(): void;
    unload(): Observable<any>;
    destroy(): Observable<() => void>;
    getName(): string;
    setName(name: string): void;
    getFramesPerSecond(): number;
    setFramesPerSecond(framesPerSecond: number): void;
    phaseIs(phase: RenderPhase): boolean;
    getPhase(): RenderPhase;
    setPhase(phase: RenderPhase): void;
}
