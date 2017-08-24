import { GameState, State } from "gluon-engine";

import { FirstMode } from "../mode/FirstMode";

@GameState({
    modes: [
        FirstMode
    ]
})
export class FirstState extends State {};