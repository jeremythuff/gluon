import { GameState, State } from "gluon-engine";

import { FirstMode } from "./mode/FirstMode";

@GameState({
    modes: [
        FirstMode
    ]
})
class FirstState extends State {};