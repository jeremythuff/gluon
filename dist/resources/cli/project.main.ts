import {GameMain} from "gluon-engine";
import {Game} from "gluon-engine";

@GameMain({
	initialState: "FirstState"
})
class {GAME_NAME} extends Game {
	init() :void {
		console.log(this);
	}
}