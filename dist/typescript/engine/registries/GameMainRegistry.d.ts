import Game from "../model/Game";
import { ReplaySubject } from "@reactivex/rxjs/dist/cjs/Rx";
declare namespace GameMainRegistry {
    function setGameMain(game: Game): void;
    function getGameMainSubject(): ReplaySubject<Game>;
}
export = GameMainRegistry;
