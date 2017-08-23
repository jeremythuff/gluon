import { GameMain, Game, DevelopmentControlls } from "gluon-engine";

import { FirstState } from "./state/FirstState";

@GameMain({
	initialState: FirstState,
	controllProfiles: [
		DevelopmentControlls
	]
})
class {GAME_NAME} extends Game {
	init() :void {
		console.log(this);
	}
}