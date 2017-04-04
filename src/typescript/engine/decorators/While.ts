import {Keyboard} from "../util/io/Keyboard";
import {Mouse} from "../util/io/Mouse";
import ControlProfile from "../util/io/ControlProfile";

import * as GameControllereRegistry from "../registries/GameControllerRegistry";

export default function While(...inputs :(Keyboard|Mouse)[]) {
	return function(targetClass :typeof ControlProfile, methodName :string, descriptor :PropertyDescriptor) {
		const cbMap = GameControllereRegistry.getWhileCBMapByName(targetClass.constructor.name).get(inputs);
        cbMap?cbMap.push(descriptor.value):GameControllereRegistry.getWhileCBMapByName(targetClass.constructor.name).set(inputs, [descriptor.value]);
	}
};
