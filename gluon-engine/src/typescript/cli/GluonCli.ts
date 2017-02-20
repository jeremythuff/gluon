#!/usr/bin/env node

import * as electron from 'electron';
import * as process from 'process';
import {CliCommand} from './CliCommand';
import Start from "./Start";
import Help from "./Help";

const colors = require('colors/safe');

class GluonCli {
	private args :Array<string>;
	constructor(args : Array<string>) {
		this.args = args.slice(3, args.length);
	}

	provessCommand(arg:string) : void {
		let command : CliCommand;
		switch(arg) { 
		    case "start": 
		    case "s": { 
		    	command = new Start();
		    	break; 
		    }
		    case "help": 
		    case "h":
		   	default: { 

		   		console.log(colors.red(`\n *ERROR* command not found: "${arg}"`));

		      	command = new Help();
		      	break; 
		   } 
		}

		command.execute(this.args); 

	}

}

const glionCli = new GluonCli(process.argv);

glionCli.provessCommand(process.argv[2]);