import {ControlCB} from "./ControlCB";

export abstract class AbstractControlDevice {

	private runWhenCBS :Array<ControlCB[]>;
	protected activatedInput :boolean[];

	constructor(runWhenCBS :Array<ControlCB[]>, activatedInput :boolean[]) {
		this.runWhenCBS = runWhenCBS;
		this.activatedInput = activatedInput;
	}

	protected activateInput(inputCode :number) {
		this.activatedInput[inputCode]=true;
	}

	protected releaseInput(inputCode :number) {
		this.activatedInput[inputCode]=false;
		this.runWhenCBS.length = 0;
	}

}
