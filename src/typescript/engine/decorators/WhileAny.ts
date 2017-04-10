import {Keyboard} from "../util/io/Keyboard";
import {Mouse} from "../util/io/Mouse";
import ControlProfile from "../util/io/ControlProfile";

import * as GameControllereRegistry from "../registries/GameControllerRegistry";

export default function While(...inputs :(Keyboard|Mouse)[]) {
	return function(targetClass :ControlProfile, methodName :string, descriptor :PropertyDescriptor) {
		const rbMap = GameControllereRegistry.getWhileCBMapByName(targetClass.constructor.name);
		const cbMap = rbMap.get(inputs);
        inputs.forEach(input=>{
            cbMap?cbMap.push(descriptor.value):rbMap.set([input], [descriptor.value]);
        });
	}
};