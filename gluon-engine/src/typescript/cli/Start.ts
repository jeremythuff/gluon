#!/usr/bin/env node

import {CliCommand} from "./CliCommand"
import AbstractCliCommand from "./AbstractCliCommand"

import * as shelljs from "shelljs";
import * as path from 'path';

import * as process from 'process';

const colors = require('colors/safe');
const nodecli = require("shelljs-nodecli");

export default class Start extends AbstractCliCommand implements CliCommand {

	static key : string = "start";
	static shortKey : string = "s";
	static help : [string, string] = [`${Start.key}, ${Start.shortKey} [Main.js]`, colors.green("Launches the Gluon project.")];

	execute(args :Array<string>) {

		const engineDir = this.getGlobalModuleRoot();
		const resourcesDir = `${engineDir}/dist/engine/resources`;
		const mainHtmlPath = `${shelljs.pwd()}/dist/main.html`;
		const execustionPath = `${engineDir}/dist/launcher/Launcher.js`;

		nodecli.exec("electron", execustionPath + " " + mainHtmlPath);

		shelljs.exit(0);
	}
}