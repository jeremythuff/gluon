#!/usr/bin/env node

import {CliCommand} from "./CliCommand"
const colors = require('colors/safe');
var table = require('text-table');

export default class Help implements CliCommand {
	execute(args :Array<string>) {

		console.log("\n"+colors.yellow.underline("Gluon CLI Usage:")+"\n");
		const helpTable = table([
			["start, s [main.js]", colors.green("Luanch the gluon game.")],
			["help, h: ", colors.green("Display this dialog.")]
		]);

		console.log(helpTable);
	}
}