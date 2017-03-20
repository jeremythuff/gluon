import Game from "../Game";

export interface GamePhaseCB {
	(delta ?:number): void;
	
}