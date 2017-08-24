#!/usr/bin/env node

import { CliCommand } from "./CliCommand"
import AbstractCliCommand from "./AbstractCliCommand"

import * as shelljs from "shelljs";
import * as path from 'path';

import * as process from 'process';

const colors = require('colors/safe');
const nodecli = require("shelljs-nodecli");

export default class Test extends AbstractCliCommand implements CliCommand {

	static key: string = "test";
	static shortKey: string = "t";
	static help: [string, string] = [`${Test.key}, ${Test.shortKey} [Main.js]`, colors.green("Tests the Gluon project.")];

	execute(args: string[]) {

		const engineDir = this.getGlobalModuleRoot();
		const resourcesDir = `${engineDir}/dist/engine/resources`;
		const mainHtmlPath = `${shelljs.pwd()}/dist/main.html`;
		const execustionPath = `${engineDir}/dist/launcher/Launcher.js`;

		if(args.some(arg=>{
			return arg === "watch" || arg === "w"
		})) {
			var child = nodecli.exec("tsc-watch", "--onSuccess 'glu t'", {async:true});
		} else {
			nodecli.exec("electron-mocha", `-w --renderer -R spec "${shelljs.pwd()}/dist/**/*.spec.js"`);
			shelljs.exit(0);
		}

	}
}
