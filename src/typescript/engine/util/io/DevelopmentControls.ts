
import GameController from "../../decorators/GameController";
import { ControlProfile} from "./ControlProfile"
import When from "../../decorators/When"
import OverrideAs from "../../decorators/OverrideAs"
import {Keyboard} from "./Keyboard"

import {Controllable} from "../../model/interface/Controllable";
import Game from "../../model/Game";

import * as Electron from "electron"; 

@GameController<Game>()
export default class DevelopmentControls extends ControlProfile<Game> {

    @When(Keyboard.CTRL, Keyboard.SHIFT, Keyboard.I)
    @OverrideAs("Toggle Devtools")
    toggleDevTools() {
      Electron.remote.getCurrentWebContents().toggleDevTools();
    }

    @When(Keyboard.CTRL, Keyboard.SHIFT, Keyboard.R)
    @OverrideAs("Refresh")
    reload() {
        Electron.remote.getCurrentWebContents().reloadIgnoringCache();
    }

    @When(Keyboard.CTRL, Keyboard.SHIFT, Keyboard.Q)
    @OverrideAs("Exit")
    close() {
        Electron.remote.getCurrentWindow().close();
    }

}