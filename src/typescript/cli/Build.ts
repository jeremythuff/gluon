import {CliCommand} from "./CliCommand";
import AbstractCliCommand from "./AbstractCliCommand";

import * as shell from "shelljs";
import * as NodeSass from "node-sass";
import * as fs from "fs";

const colors = require('colors/safe');
const nodecli = require("shelljs-nodecli");
var table = require('text-table');


export default class Build extends AbstractCliCommand implements CliCommand {

	static key : string = "build";
	static shortKey : string = "b";
	static help : [string, string] = ["build, b", colors.green("Transpiles the projects typescript into the distribution folder.")];

	execute(args :Array<string>) {

		const engineDir = this.getGlobalModuleRoot();
		const globalResourcesDir = `${engineDir}/dist/engine/resources`;
		const mainHtmlTemplatePath = `${globalResourcesDir}/html/main.html`;
		const localResourceDir = "src/resources";
		const mainHtmlPath = "dist/main.html";
		const mainCssPath = "resources/css/main.css";
		const mainJsPath = "Main.js";

		console.log(table([[new Date().toString(), "Transpiling typescript."]]));

		if (shell.test('-d', "dist")) shell.rm("-rf","dist");  

		nodecli.exec("tsc", (code : any, out : string) => {

			const paths : Array<string> = new Array<string>();

			out.split(/\r?\n/).forEach(outLine => {
				if(outLine.includes("TSFILE")&&!outLine.includes(".d.ts")&&!outLine.includes(".js.map")) {
					const path = outLine.substring(outLine.indexOf("dist/")+5, outLine.length);
					paths.push(path);
				}
			});

			console.log(table([[new Date().toString(), "Building html."]]));
			if (!shell.test('-d', "dist/resources")) shell.mkdir("dist/resources");  
			if (shell.test('-d', `${localResourceDir}/html`)) shell.cp("-R", `${localResourceDir}/html`, "dist/resources/html/");
			shell.cp(mainHtmlTemplatePath, mainHtmlPath);

			paths.forEach(path => {
				shell.sed("-i", "{SCRIPTS}", `<script src='${path}'></script>\n\t\t{SCRIPTS}`, mainHtmlPath);
			});
			shell.sed("-i", "{SCRIPTS}", "", mainHtmlPath);
			
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
		}); 

	}
}