export default class State {

	private name : string;

	 constructor(name ?:string) {
    	if(name) this.setName(name);
    }

	getName() : string {
		return this.name;
	}

	setName(name :string) : void {
		this.name = name;
	}

}