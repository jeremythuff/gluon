import "reflect-metadata";

import { ControlProfile } from "../util/io/ControlProfile";

import { Controllable } from "../model/interface/Controllable";

export default function OverrideAs(actionName: string) {
	return function decorator(targetClass: ControlProfile<Controllable>, methodName: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata("overrideAs", actionName, descriptor);
		return descriptor;
	}
};