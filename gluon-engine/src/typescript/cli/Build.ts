import {CliCommand} from "./CliCommand";
import AbstractCliCommand from "./AbstractCliCommand";

import * as shell from "shelljs";
import * as NodeSass from "node-sass";
import * as fs from "fs";

const colors = require('colors/safe');
const nodecli = require("shelljs-nodecli");
var table = require('text-table');


export default class Build extends AbstractCliCommand implements CliCommand {

	static help : [string, string] = ["build, b", colors.green("Transpiles the projects typescript into the distribution folder.")];

	execute(args :Array<string>) {

		const engineDir = this.getGlobalModuleRoot();
		const globalResourcesDir = `${engineDir}/dist/engine/resources`;
		const mainHtmlTemplatePath = `${globalResourcesDir}/html/main.html`;
		const localResourceDir = "src/resources";
		const mainHtmlPath = "dist/main.html";
		const mainCssPath = "resources/css/main.css";
		const mainJsPath = "main.js";

		console.log(table([[new Date().toString(), "Transpiling typescript."]]));
		nodecli.exec("tsc");

		console.log(table([[new Date().toString(), "Building html."]]));
		if (!shell.test('-d', "dist/resources")) shell.mkdir("dist/resources");  
		if (!shell.test('-d', `${localResourceDir}/html`)) shell.cp("-R", `${localResourceDir}/html`, "dist/resources/html/");
		shell.cp(mainHtmlTemplatePath, mainHtmlPath);

		shell.sed("-i", "{GAME_MAIN_JS}", mainJsPath, mainHtmlPath);
		shell.sed("-i", "{GAME_MAIN_CSS}", mainCssPath, mainHtmlPath);

		console.log(table([[new Date().toString(), "Compiling styles."]]));
		NodeSass.render(
			{
				file: "src/resources/sass/main.scss"
			},
			function(err, res) {
				if(!err) {
					if (!shell.test('-d', "dist/resources/css")) shell.mkdir("dist/resources/css");
					fs.writeFile("dist/"+mainCssPath, res.css, function(e){
				        if(!e){
				          console.log(table([[new Date().toString(), "Styles written to disk."]]));
				        } else {
				        	console.log(e);
				        }
				    });
				} else {
					console.log(err);
				}
			}
		); 

	}
}