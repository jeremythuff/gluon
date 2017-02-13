
export default class Game {

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

}