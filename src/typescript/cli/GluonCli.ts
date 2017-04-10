#!/usr/bin/env node

import * as process from 'process';
import * as npm from 'npm';
import * as path from 'path';

import { CliCommand } from './CliCommand';
import Build from "./Build";
import Docs from "./Docs";
import Init from "./Init";
import Start from "./Start";
import Help from "./Help";

const colors = require('colors/safe');

class GluonCli {

	private args: Array<string>;
	private engineRoot: string

	constructor(args: Array<string>) {
		this.engineRoot = path.resolve(process.argv[0], "gluon-engine");
		this.args = args.slice(3, args.length);
	}

	processCommand(arg: string): void {
		let command: CliCommand;

		npm.load({}, function () {
			const globalModuleRoot = path.resolve(npm.globalDir, "gluon-engine");

			switch (arg) {
				case Build.key:
				case Build.shortKey: {
					command = new Build(this.engineRoot, globalModuleRoot);
					break;
				}
				case Docs.key:
				case Docs.shortKey: {
					command = new Docs(this.engineRoot, globalModuleRoot);
					break;
				}
				case Init.key:
				case Init.shortKey: {
					command = new Init(this.engineRoot, globalModuleRoot);
					break;
				}
				case Start.key:
				case Start.shortKey: {
					command = new Start(this.engineRoot, globalModuleRoot);
					break;
				}
				case Help.key:
				case Help.shortKey:
				default: {
					if (arg !== Help.key || arg !== Help.shortKey) {
						console.log(colors.red(`\n *ERROR* command not found: ${arg}`));
					}
					command = new Help(this.engineRoot, globalModuleRoot);
					break;
				}
			}

			command.execute(this.args);

		}.bind(this));

	}

}

const glionCli = new GluonCli(process.argv);

glionCli.processCommand(process.argv[2]);