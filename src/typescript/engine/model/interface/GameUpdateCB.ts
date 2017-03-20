import Game from "../Game";

export interface GameUpdateCB {
	(delta :number, game :Game): void;
}