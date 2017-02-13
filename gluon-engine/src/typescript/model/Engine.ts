import * as THREE from "three";
import Game from "./Game";

export default class Engine {

	private game: Game;

	constructor(gameName:string) {
		this.game = new Game(gameName);
	}

	getGame() : Game {
		return this.game;
	}

	setGame(game:Game) : void {
		this.game = game;
	}

}