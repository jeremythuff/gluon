import Game from "../model/Game";
import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
declare namespace RunningGameRegistry {
    function setRunningGame(game: Game): void;
    function getRunningGame(): Observable<Game>;
}
export = RunningGameRegistry;
