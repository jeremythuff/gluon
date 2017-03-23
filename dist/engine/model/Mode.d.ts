import { RenderCycle } from "./interface/RenderCycle";
import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
import { RenderPhase } from "../enum/RenderPhase";
export default class Mode implements RenderCycle {
    phase: RenderPhase;
    private name;
    constructor(naem?: string);
    runInit(): Observable<{}[]>;
    runLoad(): Observable<{}[]>;
    runUpdate(clock?: number): void;
    runRender(clock?: number): void;
    runPause(): void;
    runUnPause(): void;
    runUnload(): Observable<{}[]>;
    runDestroy(): Observable<{}[]>;
    phaseIs(phase: RenderPhase): boolean;
    setPhase(phase: RenderPhase): void;
    getPhase(): RenderPhase;
    setName(name: string): void;
    getName(): string;
}
