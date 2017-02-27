import * as path from 'path';
import * as shell from "shelljs";

import {CliCommand} from "./CliCommand";
import AbstractCliCommand from "./AbstractCliCommand";

const nodecli = require("shelljs-nodecli");

const colors = require('colors/safe');

export default class Init extends AbstractCliCommand implements CliCommand {

	static help : [string, string] = ["init, i [name]", colors.green("Creates the starting file and folder structure for a Gluon project.")];

	execute(args :Array<string>) {

		const gameName = args[0]?args[0]:"game";
		const engineDir = this.getGlobalModuleRoot();
		const resourcesDir = `${engineDir}/dist/engine/resources`;
		const cliDir = `${resourcesDir}/cli`;
		const tmpDir = shell.tempdir();

		if (!shell.test('-d', "src")) shell.mkdir("src");
		if (!shell.test('-d', "src/typescript")) shell.mkdir("src/typescript");
		if (!shell.test('-d', `src/typescript/${gameName}`)) shell.mkdir(`src/typescript/${gameName}`);
		shell.cp(`${cliDir}/project.main.ts`, `${shell.pwd()}/src/typescript/${gameName}/main.ts`);

		if (!shell.test('-d', "src/typescript/resources")) shell.mkdir("src/resources");
		if (!shell.test('-d', "src/typescript/resources")) shell.mkdir("src/resources/sass");
		shell.cp(`${cliDir}/project.main.scss`, `${shell.pwd()}/src/resources/sass/main.scss`);		

		if (!shell.test('-d', "src/typescript/tests")) shell.mkdir("src/typescript/tests");

		shell.cp(`${cliDir}/project.package.json`, `${shell.pwd()}/package.json`);
		shell.cp(`${cliDir}/project.tsconfig.json`, `${shell.pwd()}/tsconfig.json`);

	}
}