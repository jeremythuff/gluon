import "reflect-metadata";

import ControlProfile from "../util/io/ControlProfile";

import { AbstractControllable } from "../model/abstracts/AbstractControllable";

export default function OverrideAs(actionName: string) {
	return function (targetClass: ControlProfile<AbstractControllable>, methodName: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata("overrideAs", actionName, descriptor);
		return descriptor;
	}
};