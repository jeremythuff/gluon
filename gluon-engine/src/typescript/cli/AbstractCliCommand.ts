import {CliCommand} from "./CliCommand";

export default class AbstractCliCommand {

	private rootPath :string;
	private globalModuleRoot :string;

	constructor(rootPath :string, globalModuleRoot :string) {
		this.rootPath = rootPath;
		this.globalModuleRoot = globalModuleRoot;
	}

	setRootPath(rootPath :string) : void {
		this.rootPath = rootPath;
	}

	getRootPath() : string {
		return this.rootPath;
	}

	setGlobalModuleRoot(globalModuleRoot :string) : void {
		this.globalModuleRoot = globalModuleRoot;
	}

	getGlobalModuleRoot() : string {
		return this.globalModuleRoot;
	}

}