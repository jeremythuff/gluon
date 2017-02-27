import {CliCommand} from "./CliCommand";
import AbstractCliCommand from "./AbstractCliCommand";

const colors = require('colors/safe');

export default class Build extends AbstractCliCommand implements CliCommand {

	static help : [string, string] = ["build, b", colors.green("Transpiles the projects typescript into the distribution folder.")];

	execute(args :Array<string>) {
		console.log("Build");
	}
}