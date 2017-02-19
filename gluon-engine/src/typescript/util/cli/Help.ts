#!/usr/bin/env node

import {CliCommand} from "./CliCommand"

export default class Help implements CliCommand {
	run(args :Array<string>) {
		console.log("TODO: Write help");
	}
}