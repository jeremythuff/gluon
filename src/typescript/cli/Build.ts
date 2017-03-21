import {CliCommand} from "./CliCommand";
import AbstractCliCommand from "./AbstractCliCommand";

import * as shell from "shelljs";
import * as NodeSass from "node-sass";
import * as fs from "fs";

import * as path from "path";

const colors = require('colors/safe');
const nodecli = require("shelljs-nodecli");
var table = require('text-table');


export default class Build extends AbstractCliCommand implements CliCommand {

	static key : string = "build";
	static shortKey : string = "b";
	static help : [string, string] = ["build, b", colors.green("Transpiles the projects typescript into the distribution folder.")];

	execute(args :Array<string>) {

		const engineDir = this.getGlobalModuleRoot();
		const globalResourcesDir = `${engineDir}${path.sep}dist${path.sep}engine${path.sep}resources`;
		const mainHtmlTemplatePath = `${globalResourcesDir}${path.sep}html${path.sep}main.html`;
		const localResourceDir = `src${path.sep}resources`;
		const mainHtmlPath = `dist${path.sep}main.html`;
		const mainCssPath = `resources${path.sep}css${path.sep}main.css`;
		const mainJsPath = "Main.js";

		console.log(table([[new Date().toString(), "Transpiling typescript."]]));

		if (shell.test('-d', "dist")) shell.rm("-rf","dist");  

		nodecli.exec("tsc", (code : any, out : string) => {

			const paths : Array<string> = new Array<string>();

			out.split(/\r?\n/).forEach(outLine => {
				if(outLine.includes("TSFILE")&&!outLine.includes(".d.ts")&&!outLine.includes(".js.map")) {
					const filePath = outLine.substring(outLine.indexOf(`dist${path.sep}`)+5, outLine.length);
					paths.push(filePath);
				}
			});

			console.log(table([[new Date().toString(), "Building html."]]));
			if (!shell.test('-d', `dist${path.sep}resources`)) shell.mkdir(`dist${path.sep}resources`);  
			if (shell.test('-d', `${localResourceDir}${path.sep}html`)) shell.cp("-R", `${localResourceDir}${path.sep}html`, `dist${path.sep}resources${path.sep}html${path.sep}`);
			shell.cp(mainHtmlTemplatePath, mainHtmlPath);

			paths.forEach(scriptPath => {
				shell.sed("-i", "{SCRIPTS}", `<script src='${scriptPath}'></script>\n\t\t{SCRIPTS}`, mainHtmlPath);
			});
			shell.sed("-i", "{SCRIPTS}", "", mainHtmlPath);
			
			shell.sed("-i", "{GAME_MAIN_CSS}", mainCssPath, mainHtmlPath);

			console.log(table([[new Date().toString(), "Compiling styles."]]));
			NodeSass.render(
				{
					file: `src${path.sep}resources${path.sep}sass${path.sep}main.scss`
				},
				function(err, res) {
					if(!err) {
						if (!shell.test('-d', `dist${path.sep}resources${path.sep}css`)) shell.mkdir(`dist${path.sep}resources${path.sep}css`);
						fs.writeFile(`dist${path.sep}`+mainCssPath, res.css, function(e){
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
		}); 

	}
}