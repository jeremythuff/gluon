import { ControlProfile } from "../util/io/ControlProfile";
import { Controllable } from "../model/interface/Controllable";

export default function WhenDone(cbName: string, time?: number, ...cbArgs: any[]) {
	return function decorator(targetClass: ControlProfile<Controllable>, methodName: string, descriptor: PropertyDescriptor) {

		const finishedCB = targetClass[cbName];
		const originalMethod = descriptor.value; 

		let timeout;

		descriptor.value =  function (...args: any[]) {

			if(timeout) window.clearTimeout(timeout);
			timeout = window.setTimeout(()=>{
				finishedCB.apply(this, cbArgs);
			}, time?time:100)

			const result = originalMethod.apply(this, args);
			return result;
		}

		return descriptor;
	}
};