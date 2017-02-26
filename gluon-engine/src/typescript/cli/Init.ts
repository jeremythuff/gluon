import * as path from 'path';
import * as shell from "shelljs";

import {CliCommand} from "./CliCommand";
import AbstractCliCommand from "./AbstractCliCommand"

const nodecli = require("shelljs-nodecli");

export default class Init extends AbstractCliCommand implements CliCommand {
	execute(args :Array<string>) {

		const gameName = args[0]?args[0]:"game";
		const engineDir = this.getGlobalModuleRoot();
		const resourcesDir = `${engineDir}/dist/engine/resources`;
		const cliDir = `${resourcesDir}/cli`;
		const tmpDir = shell.tempdir();

		if (!shell.test('-d', "src")) shell.mkdir("src");
		if (!shell.test('-d', "src/typescript")) shell.mkdir("src/typescript");
		if (!shell.test('-d', `src/typescript/${gameName}`)) shell.mkdir(`src/typescript/${gameName}`);
		if (!shell.test('-d', "src/typescript/resources")) shell.mkdir("src/typescript/resources");
		if (!shell.test('-d', "src/typescript/tests")) shell.mkdir("src/typescript/tests");

		shell.cp(`${cliDir}/project.package.json`, `${shell.pwd()}/package.json`);

	}
}