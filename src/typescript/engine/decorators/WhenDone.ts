import ControlProfile from "../util/io/ControlProfile";

import * as GameControllereRegistry from "../registries/GameControllerRegistry";

import { AbstractControllable } from "../model/abstracts/AbstractControllable";

export default function WhenDone(cbName) {
	return function (targetClass: ControlProfile<AbstractControllable>, methodName: string, descriptor: PropertyDescriptor) {
		
		const finishedCB = targetClass[cbName];
		const originalMethod = descriptor.value; 

		let timeout;

		descriptor.value =  function (...args: any[]) {

			if(timeout) window.clearTimeout(timeout);
			timeout = window.setTimeout(()=>{
				finishedCB.apply(this);;
			}, 100)

			const a = args.map(a => JSON.stringify(a)).join();
			const result = originalMethod.apply(this, args);
			const r = JSON.stringify(result);
			return result;
		}

		return descriptor;
	}
};