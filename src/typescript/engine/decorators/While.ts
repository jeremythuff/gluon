import { Keyboard } from "../util/io/Keyboard";
import { Mouse } from "../util/io/Mouse";
import ControlProfile from "../util/io/ControlProfile";

import * as GameControllereRegistry from "../registries/GameControllerRegistry";

import { AbstractControllable } from "../model/abstracts/AbstractControllable";

export default function While(...inputs: (Keyboard | Mouse)[]) {
	return function (targetClass: ControlProfile<AbstractControllable>, methodName: string, descriptor: PropertyDescriptor) {
		const rbMap = GameControllereRegistry.getWhileCBMapByName(targetClass.constructor.name);
		const cbMap = rbMap.get(inputs);
		cbMap ? cbMap.push(descriptor.value) : rbMap.set(inputs, [descriptor.value]);
	}
};
