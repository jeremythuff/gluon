import Game from "../Game";

export interface StatePhaseCB {
	(delta ?:number): void;
}