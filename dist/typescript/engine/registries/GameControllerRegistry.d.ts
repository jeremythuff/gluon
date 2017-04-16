import ControlProfile from "../util/io/ControlProfile";
import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
import { Keyboard } from "../util/io/Keyboard";
import { Mouse } from "../util/io/Mouse";
import { ControlCB } from "../util/io/ControlCB";
declare namespace GameControllerRegistry {
    function setControlProfile(mode: typeof ControlProfile): void;
    function getControlProfileObservable(): Observable<typeof ControlProfile>;
    function getWhileCBMapByName(className: string): Map<(Keyboard | Mouse)[], ControlCB[]>;
    function getWhenCBMapByName(className: string): Map<(Keyboard | Mouse)[], ControlCB[]>;
}
export = GameControllerRegistry;
