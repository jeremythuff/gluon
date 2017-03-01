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

		console.log(table([[new Date().toString(), "Transpiling typescript."]]));
		nodecli.exec("tsc"); 

		console.log(table([[new Date().toString(), "Compiling styles."]]));
		NodeSass.render(
			{
				file: "src/resources/sass/main.scss"
			},
			function(err, res) {
				if(!err) {
					if (!shell.test('-d', "dist/resources")) shell.mkdir("dist/resources");
					if (!shell.test('-d', "dist/resources/sass")) shell.mkdir("dist/resources/sass");
					fs.writeFile("dist/resources/sass/main.css", res.css, function(e){
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

		// console.log(table([[new Date().toString(), "Compying resources."]]));
		// nodecli.exec("tsc"); 

	}
}