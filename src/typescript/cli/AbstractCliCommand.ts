//import {CliCommand} from "./CliCommand";
//const colors = require('colors/safe');

export default class AbstractCliCommand {

	private rootPath :string;
	private globalModuleRoot :string;
	
	static help: [string, string];

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