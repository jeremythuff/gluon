import {Renderable} from "./interface/Renderable";

export default class Game implements Renderable {

	private running : boolean;
	private name : string;
	
	constructor(name:string) {
		this.setName(name);
	};

	getName() : string {
		return this.name;
	}

	setName(name:string) : void {
		this.name = name;
	}

	isRunning(running?:boolean) : boolean {
		if(running != null) this.running = running;
		return this.running;
	}

	init() :Promise<any> {
		const promise = new Promise((resolve, reject) => {
			resolve();
		});
		return promise;
	}

	load() :Promise<any> {
		const promise = new Promise((resolve, reject) => {
			resolve();
		});
		return promise;
	}

	update() :void {}

	render() :void {}

	destroy() :void {}

}