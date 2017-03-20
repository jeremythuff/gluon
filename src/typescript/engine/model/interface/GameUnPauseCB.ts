import Game from "../Game";

export interface GameUnPauseCB {
	(game :Game): void;
}