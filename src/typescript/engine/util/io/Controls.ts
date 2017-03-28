
import Keyboard from "./Keyboard";

export default class Controls {

	public keyboard :Keyboard;

	constructor() {
		this.keyboard = new Keyboard();
	}

	runCBs() :void {
		this.keyboard.runCBs();
	}

}