import ControlProfile from "../util/io/ControlProfile";
import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
declare namespace GameControllerRegistry {
    function setControlProfile(mode: typeof ControlProfile): void;
    function getControlProfileObservable(): Observable<typeof ControlProfile>;
}
export = GameControllerRegistry;
