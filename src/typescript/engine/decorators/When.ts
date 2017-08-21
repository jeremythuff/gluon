import { Keyboard } from "../util/io/Keyboard";
import { Mouse } from "../util/io/Mouse";
import { ControlProfile } from "../util/io/ControlProfile";

import * as GameControllereRegistry from "../registries/GameControllerRegistry";

import { Controllable } from "../model/interface/Controllable";

export default function When(...inputs: (Keyboard | Mouse)[]) {
	return function (targetClass: ControlProfile<Controllable>, methodName: string, descriptor: PropertyDescriptor) {
		const rbMap = GameControllereRegistry.getWhenCBMapByName(targetClass.constructor.name);
		const cbMap = rbMap.get(inputs);
		cbMap ? cbMap.push(descriptor.value) : rbMap.set(inputs, [descriptor.value]);
	}
};