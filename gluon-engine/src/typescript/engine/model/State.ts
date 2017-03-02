export default class State {

	private name : string;

	constructor() {}

	getName() : string {
		return this.name;
	}

	setName(name :string) : void {
		this.name = name;
	}

}