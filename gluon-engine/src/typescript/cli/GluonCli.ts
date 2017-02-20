#!/usr/bin/env node

import * as electron from 'electron';
import * as process from 'process';
import {CliCommand} from './CliCommand';
import Start from "./Start";
import Help from "./Help";

class GluonCli {
	private args :Array<string>;
	constructor(args : Array<string>) {
		this.args = args.slice(3, args.length);
	}

	provessCommand(arg:string) : void {
		let command : CliCommand;
		switch(arg) { 
		    case "--start": 
		    case "-s": { 
		    	command = new Start();
		    	break; 
		    }
		    case "--help": 
		    case "-h":
		   	default: { 
		      command = new Help();
		      break; 
		   } 
		}

		command.run(this.args); 

	}

}

const glionCli = new GluonCli(process.argv);

glionCli.provessCommand(process.argv[2]);