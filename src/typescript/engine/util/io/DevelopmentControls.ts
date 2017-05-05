
import GameController from "../../decorators/GameController";
import ControlProfile from "./ControlProfile"
import When from "../../decorators/When"
import {Keyboard} from "./Keyboard"

import Game from "../../model/Game";

import * as Electron from "electron"; 

@GameController()
export default class DevelopmentControls extends ControlProfile<typeof Game> {

    @When(Keyboard.CTRL, Keyboard.SHIFT, Keyboard.I)
    toggleDevTools() {
        Electron.remote.getCurrentWebContents().toggleDevTools();
    }

    @When(Keyboard.CTRL, Keyboard.SHIFT, Keyboard.R)
    reload() {
        Electron.remote.getCurrentWebContents().reloadIgnoringCache();
    }

    @When(Keyboard.CTRL, Keyboard.SHIFT, Keyboard.Q)
    close() {
        Electron.remote.getCurrentWindow().close();
    }

}