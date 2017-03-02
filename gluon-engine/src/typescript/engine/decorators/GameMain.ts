import Engine from "../model/Engine"
import Game from "../model/Game"

export default function GameMain(options ?: Map<string, any>) {
	return function(decorated : typeof Game) : void {
		const game = new decorated(decorated.name);
		if(!game.getName()) game.setName(decorated.name);
		const engine = new Engine(game);
		engine.start();
	}
}