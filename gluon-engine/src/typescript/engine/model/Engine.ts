import * as THREE from "three";
import Game from "./Game";

export default class Engine {
	
	private clock : THREE.Clock;
	private running: boolean;
	private game: Game;

	constructor(game: Game) {
		this.game = game;
		this.clock = new THREE.Clock();
	}

	private animationLoop() {
		if(this.running) {
			window.requestAnimationFrame(this.animationLoop.bind(this));
			const delta =  this.clock.getDelta();
			if(this.game && this.game.isRunning()) this.game.update(delta);
			if(this.game && this.game.isRunning()) this.game.render(delta);	
		}
	}

	getGame() : Game {
		return this.game;
	}

	setGame(game:Game) : void {
		this.game = game;
	}

	start() :Game {
		this.running = true;
		let game = this.getGame();
		this.animationLoop();
		game.init().subscribe(()=>{
			game.load().subscribe(()=>{
				game.isRunning(true);
				setTimeout(()=>{this.stop()}, 2500)
			});
		});
		return game;
	}

	stop() :void {
		this.running=false;
		this.getGame().isRunning(false);
		this.getGame().destroy();
	}

}