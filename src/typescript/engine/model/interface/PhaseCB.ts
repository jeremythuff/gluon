import Game from "../Game";

export interface PhaseCB {
	(delta ?:number): void;
	
}