import Mode from "../model/Mode";
import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
declare namespace GameModeRegistry {
    function setGameMode(mode: typeof Mode): void;
    function getGameModeObservable(): Observable<typeof Mode>;
}
export = GameModeRegistry;
