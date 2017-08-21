import ControlProfile from "../util/io/ControlProfile";
import * as GameControllerRegistry from "../registries/GameControllerRegistry";

export default function GameController(options?: { [name: string]: any[] | string }) {
    return function (decorated: typeof ControlProfile) {

        Object.keys(decorated.prototype).forEach(key=>{
            Reflect.getMetadataKeys(decorated.prototype[key]);
        });

        GameControllerRegistry.setControlProfile(decorated);
    }
}