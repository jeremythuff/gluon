import { CliCommand } from "./CliCommand"
import AbstractCliCommand from "./AbstractCliCommand"

import * as shelljs from "shelljs";
import * as path from 'path';

import * as process from 'process';

const colors = require('colors/safe');
const nodecli = require("shelljs-nodecli");

export default class Docs extends AbstractCliCommand implements CliCommand {

	static key: string = "docs";
	static shortKey: string = "d";
	static help: [string, string] = [`${Docs.key}, ${Docs.shortKey}`, colors.green("Launches a documentation application.")];

	execute(args: Array<string>) {

		const engineDir = this.getGlobalModuleRoot();
		const resourcesDir = `${engineDir}/dist/engine/resources`;
		const docsHtmlPath = `${engineDir}/docs/index.html`;
		const execustionPath = `${engineDir}/dist/typescript/launcher/Launcher.js`;

		nodecli.exec("electron", execustionPath + " " + docsHtmlPath + " false");

		shelljs.exit(0);

	}

}