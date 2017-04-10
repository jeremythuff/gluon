import "reflect-metadata";

import Mode from "../model/Mode";
import ControlProfile from "../util/io/ControlProfile";

import * as GameModeRegistry from "../registries/GameModeRegistry";
import * as GameControllereRegistry from "../registries/GameControllerRegistry";

export default function GameMode(options ?: { [name: string]: any[]|string }) {
    return function(decorated :typeof Mode) :typeof Mode {

        Mode._staticControlProfiles = [];
        Reflect.defineMetadata("options", options, decorated);
        GameModeRegistry.setGameMode(decorated)

        return decorated;

    }
}
