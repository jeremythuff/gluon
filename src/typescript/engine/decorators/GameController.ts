import ControlProfile from "../util/io/ControlProfile";
import * as GameControllerRegistry from "../registries/GameControllerRegistry";

export default function GameController(options ?: { [name: string]: any[]|string }) {
    return function(decorated :typeof ControlProfile) :void {
        GameControllerRegistry.setControlProfile(decorated);
    }
}