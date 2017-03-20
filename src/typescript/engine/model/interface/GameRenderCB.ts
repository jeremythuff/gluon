import Game from "../Game";

export interface GameRenderCB {
	(delta :number, game :Game): void;
}