import Game from "../model/Game";
import { ReplaySubject } from "@reactivex/rxjs/dist/cjs/Rx";
declare namespace RunningGameRegistry {
    function setRunningGame(game: Game): void;
    function getRunningGameSubject(): ReplaySubject<Game>;
}
export = RunningGameRegistry;
