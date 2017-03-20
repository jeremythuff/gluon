import Game from "../Game";
export interface GameUnloadCB {
    (game: Game): void;
}
