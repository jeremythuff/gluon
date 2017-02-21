import Engine from "../model/Engine"
import Game from "../model/Game"

export default function MakeGame(options : {}) {
	return function(decorated :any) {
		const game = <Game> new decorated(decorated.name);
		const engine = new Engine(game);
		engine.start();
	}
}
