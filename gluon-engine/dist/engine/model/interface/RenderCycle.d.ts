import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
import { RenderPhase } from "../../enum/RenderPhase";
export interface RenderCycle {
    phase: RenderPhase;
    init(): Observable<any>;
    load(): Observable<any>;
    update(clock?: number): void;
    render(clock?: number): void;
    pause(): void;
    unPause(): void;
    unload(): Observable<any>;
    destroy(): Observable<any>;
    phaseIs(phase: RenderPhase): boolean;
    setPhase(phase: RenderPhase): void;
    getPhase(): RenderPhase;
}
