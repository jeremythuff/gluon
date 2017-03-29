
import Keyboard from "./Keyboard";

export default class Controls {

	public keyboard :Keyboard;

	constructor() {
		this.keyboard = new Keyboard();
	}

	_runCBs(delta ?:number) :void {
		this.keyboard._runCBs(delta);
	}

}