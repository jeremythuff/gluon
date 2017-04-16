import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
import { AbstractRenderCycle } from "./abstracts/AbstractRenderCycle";
import ControlProfile from "../util/io/ControlProfile";
import { AbstractControllable } from "../model/abstracts/AbstractControllable";
export default class Mode extends AbstractRenderCycle {
    private name;
    private controlProfiles;
    constructor();
    protected _runInit(): Observable<{}[]>;
    protected _runLoad(): Observable<{}[]>;
    protected _runUpdate(delta: number): void;
    protected _runRender(delta: number): void;
    protected _runPause(): void;
    protected _runUnpause(): void;
    protected _runUnload(): Observable<{}[]>;
    protected _runDestroy(): Observable<{}[]>;
    setName(name: string): void;
    getName(): string;
    setControlProfiles(controlProfiles: ControlProfile<AbstractControllable>[]): void;
    getControlProfiles(): ControlProfile<AbstractControllable>[];
    addControlProfile(controlProfile: ControlProfile<AbstractControllable>): void;
    removeControlProfile(controlProfile: ControlProfile<AbstractControllable>): void;
}
