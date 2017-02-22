#!/usr/bin/env node

import {CliCommand} from "./CliCommand"
const colors = require('colors/safe');
var table = require('text-table');

export default class Help implements CliCommand {
	execute(args :Array<string>) {

		console.log("\n"+colors.yellow.underline("Gluon CLI Usage:")+"\n");
		const helpTable = table([
			["init, i [name]", colors.green("Creates the starting file and folder structure for a Gluon project.")],
			["build, b", colors.green("Transpiles the projects typescript into the distribution folder.")],
			["start, s [main.js]", colors.green("Launches the Gluon project.")],
			["help, h: ", colors.green("Displays this dialog.")]
		]);

		console.log(helpTable);
	}
}