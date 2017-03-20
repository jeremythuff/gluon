import Game from "../Game";

export interface GameLoadCB {
	(game :Game): void;
}