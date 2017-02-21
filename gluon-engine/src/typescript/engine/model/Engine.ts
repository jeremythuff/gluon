import Game from "./Game";

export default class Engine {

	private game: Game;

	constructor(game: Game) {
		this.game = game;
	}

	getGame() : Game {
		return this.game;
	}

	setGame(game:Game) : void {
		this.game = game;
	}

	start() :Game {
		let game = this.getGame();
		game.init().subscribe(()=>{
			game.load().subscribe(()=>{
				game.isRunning(true);
			});
		});
		return game;
	}

	stop() :void {
		this.getGame().isRunning(false);
		this.getGame().destroy();
	}

}