#!/usr/bin/env node

import {CliCommand} from "./CliCommand"
import AbstractCliCommand from "./AbstractCliCommand"

import * as shelljs from "shelljs";
import * as path from 'path';

import * as process from 'process';

const colors = require('colors/safe');
const nodecli = require("shelljs-nodecli");

export default class Start extends AbstractCliCommand implements CliCommand {

	static help : [string, string] = ["start, s [main.js]", colors.green("Launches the Gluon project.")];

	execute(args :Array<string>) {

		console.log(colors.green.underline("Starting Gluon..."));

		const execustionPath = path.resolve(this.getGlobalModuleRoot(), "dist", "launcher", "Launcher.js");
		const mainJsPath = path.resolve(process.cwd(), args[0]);
		const mainHtmlPath = `${__dirname}/../engine/resources/html/main.html`;

		shelljs.sed("-i", "{MAIN_JS}", mainJsPath, mainHtmlPath);

		nodecli.exec("electron", execustionPath + " " + mainHtmlPath);
	}
}