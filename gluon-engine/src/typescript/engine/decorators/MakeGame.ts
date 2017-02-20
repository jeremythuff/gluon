import Engine from "../model/Engine"
import Game from "../model/Game"

export default function MakeGame(options : {}) {
	return function(decoreaded :any) {
		const game = <Game> new decoreaded(decoreaded.name);
		const engine = new Engine(game);
		engine.start();
	}
}
