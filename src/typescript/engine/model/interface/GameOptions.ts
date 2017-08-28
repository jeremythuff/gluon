//import GameMain from "../../decorators/GameMain";
import Game from "../Game";
import State from "../State";
import { ControlProfile } from "../../util/io/ControlProfile";
//import DevelopmentControls from "../../util/io/DevelopmentControls";

export interface GameOptions<C extends Game, T extends ControlProfile<C>> {
    initialState?: typeof State;
    controlProfiles?: Array<{new (c:C): T}>

}

// @GameMain<SampleGame>({
// 	controlProfiles: [
//         DevelopmentControls
//     ]
// })
// class SampleGame extends Game {
// 	init() :void {
// 		console.log(this);
// 	}
// }