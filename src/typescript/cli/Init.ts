import * as path from 'path';
import * as shell from "shelljs";

import { CliCommand } from "./CliCommand";
import AbstractCliCommand from "./AbstractCliCommand";

const nodecli = require("shelljs-nodecli");

const colors = require('colors/safe');
var table = require('text-table');

export default class Init extends AbstractCliCommand implements CliCommand {

	static key: string = "init";
	static shortKey: string = "i";
	static help: [string, string] = ["init, i [name]", colors.green("Creates the starting file and folder structure for a Gluon project.")];

	execute(args: Array<string>) {

		const gameName = args[0] ? args[0] : "game";
		const classSafeGameName = this.classCase(gameName);
		const engineDir = this.getGlobalModuleRoot();
		const resourcesDir = `${engineDir}/dist/resources`;
		const cliDir = `${resourcesDir}/cli`;
		const tmpDir = shell.tempdir();

		console.log(table([[new Date().toString(), `Creating project directory: ${gameName}.`]]));
		if (!shell.test('-d', gameName)) {
			shell.mkdir(gameName);
		} else {
			console.log("ERROR");
			console.log("A directory already exists by the name: " + gameName);
		}

		shell.cd(gameName);

		console.log(table([[new Date().toString(), "Initializing npm enviroement."]]));
		shell.cp(`${cliDir}/project.package.json`, `${shell.pwd()}/package.json`);
		shell.sed('-i', '{GAME_NAME}', gameName.toLowerCase(), `${shell.pwd()}/package.json`);

		console.log(table([[new Date().toString(), "Installing dependancies."]]));
		nodecli.exec("npm", `install --save ${engineDir}`);

		console.log(table([[new Date().toString(), "Initializing typescript enviroement."]]));
		shell.cp(`${cliDir}/project.tsconfig.json`, `tsconfig.json`);
		//template tsconfig.json

		if (!shell.test('-d', "src")) shell.mkdir("src");
		if (!shell.test('-d', "src/test")) shell.mkdir("src/test");
		if (!shell.test('-d', "src/typescript")) shell.mkdir("src/typescript");
		if (!shell.test('-d', "src/typescript/game")) shell.mkdir("src/typescript/game");


		shell.cp(`${cliDir}/project.main.ts`, 'src/typescript/game/Main.ts');
		shell.sed('-i', '{GAME_NAME}', classSafeGameName, 'src/typescript/game/main.ts');

		shell.cp(`${cliDir}/project.main.spec.ts`, 'src/test/Main.spec.ts');
		shell.sed('-i', '{GAME_NAME}', classSafeGameName, 'src/test/Main.spec.ts');

		if (!shell.test('-d', "src/typescript/game/state")) shell.mkdir("src/typescript/game/state");
		shell.cp(`${cliDir}/project.firstState.ts`, 'src/typescript/game/state/FirstState.ts');

		console.log(table([[new Date().toString(), "Copying styles."]]));
		if (!shell.test('-d', "src/resources")) shell.mkdir("src/resources");
		shell.mkdir("src/resources/sass");
		shell.cp(`${cliDir}/project.main.scss`, `${shell.pwd()}/src/resources/sass/main.scss`);
		shell.sed('-i', '{MAIN_SCSS}', `${resourcesDir}/sass/gluon-engine.scss`, `${shell.pwd()}/src/resources/sass/main.scss`);

		if (!shell.test('-d', "src/typescript/tests")) shell.mkdir("src/typescript/tests");

	}

	private classCase(str: string): string {

		let newStr = str.toLowerCase()
			.replace(/['"]/g, '')
			.replace(/\W+/g, ' ')
			.replace(/ (.)/g, function ($1) { return $1.toUpperCase(); })
			.replace(/ /g, '')

		return newStr.charAt(0).toUpperCase() + newStr.slice(1);
	}
}