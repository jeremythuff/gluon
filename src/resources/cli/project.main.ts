import {GameMain} from "gluon-engine";
import {Game} from "gluon-engine";

@GameMain({
	initialState: "FirstState"
})
class MyGame extends Game {
	init() :void {
		console.log(this);
	}
}