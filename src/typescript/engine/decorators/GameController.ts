import { ControlProfile } from "../util/io/ControlProfile";
import * as GameControllerRegistry from "../registries/GameControllerRegistry";

import {Controllable} from "../model/interface/Controllable";

export default function GameController<C extends Controllable>(options?: { [name: string]: any[] | string }) {
    return function decorator(decorated: {new (c:C): ControlProfile<C>}) {
        Object.keys(decorated.prototype).forEach(key=>{
            Reflect.getMetadataKeys(decorated.prototype[key]);
        });

        GameControllerRegistry.setControlProfile(decorated.prototype);
    }
}