import Game from "../Game";
export interface GamePauseCB {
    (game: Game): void;
}
