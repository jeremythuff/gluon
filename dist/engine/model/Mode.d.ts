import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
import { AbstractRenderCycle } from "./abstracts/AbstractRenderCycle";
import { Controlable } from "./interface/Controlable";
import ControlProfile from "../util/io/ControlProfile";
export default class Mode extends AbstractRenderCycle implements Controlable {
    static _staticControlProfiles: (typeof ControlProfile)[];
    private name;
    private controlProfiles;
    constructor();
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
    setControlProfiles(controlProfiles: ControlProfile[]): void;
    getControlProfiles(): ControlProfile[];
    addControlProfile(controlProfile: ControlProfile): void;
    removeControlProfile(controlProfile: ControlProfile): void;
}
