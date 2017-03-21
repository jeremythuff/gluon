/**
 *  The Mode class represents a grouping of controll definition and
 *  displayable elements. Modes are registered in a [[State]] and many can be
 *  active at any given time.
 */
export default class Mode {

	private name :string;

	constructor(naem ?: string) {
		if(name) this.name = name;
	}

	setName(name :string) :void {
		this.name = name;
	}
 
	getName() :string {
		return this.name;
	}
}