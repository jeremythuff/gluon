#!/usr/bin/env node

import {CliCommand} from "./CliCommand"
import AbstractCliCommand from "./AbstractCliCommand"

import Start from "./Start";
import Init from "./Init";
import Build from "./Build";
import Docs from "./Docs";

const colors = require('colors/safe');
var table = require('text-table');

export default class Help extends AbstractCliCommand implements CliCommand {

	static key : string = "help";
	static shortKey : string = "h";
	static help : [string, string] = ["help, h: ", colors.green("Displays this dialog.")];

	execute(args :Array<string>) {

		console.log("\n"+colors.yellow.underline("Gluon CLI Usage:")+"\n");
		
		const helpTable = table([
			Init.help,
			Build.help,
			Start.help,
			Docs.help,
			Help.help
		]);

		console.log(helpTable);
	}
}