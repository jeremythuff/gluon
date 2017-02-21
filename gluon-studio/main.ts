
import * as Gluon from "gluon-engine";

@Gluon.MakeGame({})
class GluonStudio extends Gluon.Game {

	public newValue : string;

	constructor(name: string) {
		super(name);
		console.log("Constructed: ", this);
	}
}
