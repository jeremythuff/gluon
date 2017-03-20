import Game from "../Game";

export interface GameDestroyCB {
	(game :Game): void;
}