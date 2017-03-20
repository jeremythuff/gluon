import Game from "../Game";
export interface GameInitCB {
    (game: Game): void;
}
