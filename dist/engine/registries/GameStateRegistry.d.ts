import State from "../model/State";
import { Observable } from "@reactivex/rxjs/dist/cjs/Rx";
declare namespace GameStateRegistry {
    function addGameState(state: State): void;
    function getLastRegisteredGameState(): Observable<State>;
}
export = GameStateRegistry;
