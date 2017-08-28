
import GameController from "../../decorators/GameController";
import { ControlProfile} from "./ControlProfile"
import When from "../../decorators/When"
import OverrideAs from "../../decorators/OverrideAs"
import {Keyboard} from "./Keyboard"

import Game from "../../model/Game";

import * as Electron from "electron"; 

@GameController<C>()
export default class DevelopmentControls<C extends Game> extends ControlProfile<C> {

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