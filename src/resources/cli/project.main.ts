import { GameMain, Game, DevelopmentControls } from "gluon-engine";

import { FirstState } from "./state/FirstState";

@GameMain({
	initialState: FirstState,
	controlProfiles: [
		DevelopmentControls
	]
})
class {GAME_NAME} extends Game {
	init() :void {
		console.log(this);
	}
}