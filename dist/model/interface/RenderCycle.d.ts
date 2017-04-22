import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
import { RenderPhase } from "../../enum/RenderPhase";
export interface RenderCycle {
    startInit(): Observable<{}[]>;
    startLoad(): Observable<{}[]>;
    startUpdate(clock?: number): void;
    startRender(clock?: number): void;
    startPause(): void;
    startUnpause(): void;
    startUnload(): Observable<{}[]>;
    startDestroy(): Observable<{}[]>;
    phaseIs(phase: RenderPhase): boolean;
    setPhase(phase: RenderPhase): void;
    getPhase(): RenderPhase;
}
