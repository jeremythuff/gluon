
import Mode from "../model/Mode";
import * as GameModeRegistry from "../registries/GameModeRegistry";

export default function GameMode(options ?: { [name: string]: any[]|string }) {
    return function(decorated :typeof Mode) :typeof Mode {

        GameModeRegistry.setGameMode(decorated)

        return decorated;

    }
}
