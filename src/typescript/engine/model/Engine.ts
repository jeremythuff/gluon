import * as THREE from "three";
import * as electron from "electron";

import Game from "./Game";

import {RenderPhase} from "../enum/RenderPhase";

/**
 * This Engine class drives the animation loop and starts and stops your instance of the [[Game]]. 
 * It gets connected to your game via the [[GameMain]] decorator.
 */
export default class Engine {
	
	private clock : THREE.Clock;
	private running: boolean;
	private game: Game;

	private defaultFramesPerSecond :number = 30;
	private framesPerSecond :number;
	private lastFrameTime = 0;

	constructor(game: Game) {
		this.setGame(game);
		this.clock = new THREE.Clock();
	}

	private animationLoop() {
		if(this.running) {

			window.requestAnimationFrame(this.animationLoop.bind(this));
			const delta =  this.clock.getDelta();
			const now = this.clock.getElapsedTime();
			
			if(this.game && this.game.phaseIs(RenderPhase.RUNNING)) this.game.runUpdate(delta);

			const gameFramesPerSecond :number = this.getGame().getFramesPerSecond();
			const currentFramesPerSecond :number = gameFramesPerSecond?gameFramesPerSecond:this.framesPerSecond;

			if(this.game && this.game.phaseIs(RenderPhase.RUNNING) && (now - this.lastFrameTime)*1000 > (1000 / currentFramesPerSecond)) {
				this.lastFrameTime = now;
				this.game.runRender(delta);
			}	
		}
	}

	getGame() : Game {
		return this.game;
	}

	setGame(game:Game) : void {
		this.game = game;
	}

	start() :Game {
		console.log("Starting");
		let game = this.getGame();
		const gameFramesPerSecond :number = this.getGame().getFramesPerSecond();
		this.framesPerSecond = gameFramesPerSecond?gameFramesPerSecond:this.defaultFramesPerSecond;

		game.setPhase(RenderPhase.START);

		game.runInit()
			.take(1)
			.subscribe(null,null,()=>{
				game.runLoad()
					.take(1)
					.subscribe(null,null,()=>{
						this.running = true;
						this.animationLoop();
						game.setPhase(RenderPhase.RUNNING);

					}).unsubscribe();
		}).unsubscribe();		

		return game;
	}

	stop() :void {
		const game = this.getGame();
		game.setPhase(RenderPhase.STOP);
		game.runUnload()
			.take(1)
			.subscribe(null,null,()=>{
				game.runDestroy()
					.take(1)
					.subscribe(null,null,()=>{
						game.setPhase(RenderPhase.OFF);
						this.running=false;
						electron.remote.getCurrentWindow().close();
					}).unsubscribe();
		}).unsubscribe();
	}

}