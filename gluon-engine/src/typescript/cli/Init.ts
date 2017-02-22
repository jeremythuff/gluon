import * as path from 'path';
const nodecli = require("shelljs-nodecli");

import {CliCommand} from "./CliCommand";
import * as shell from "shelljs";

export default class Init implements CliCommand {
	execute(args :Array<string>) {
		
		nodecli.exec("npm", "install ../gluon-engine");

		const gameName = args[0];
		const engineDir = "node_modules/gluon-engine";
		const resourcesDir = `${engineDir}/dist/engine/resources`;
		const cliDir = `${resourcesDir}/cli`;
		const tmpDir = shell.tempdir();

		if (!shell.test('-d', "src")) shell.mkdir("src");
		if (!shell.test('-d', "src/typescript")) shell.mkdir("src/typescript");
		if (!shell.test('-d', `src/typescript/${gameName}`)) shell.mkdir(`src/typescript/${gameName}`);
		if (!shell.test('-d', "src/typescript/resources")) shell.mkdir("src/typescript/resources");
		if (!shell.test('-d', "src/typescript/tests")) shell.mkdir("src/typescript/tests");

		shell.cp(`${cliDir}/project.package.json`, `${shell.pwd()}/package.json`);

		console.log(gameName, engineDir, tmpDir);

	}
}