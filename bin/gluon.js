#!/usr/bin/env node
var shell = require("shelljs");
var nodeCLI = require("shelljs-nodecli");
require("colors");

var pwd = shell.pwd();
var fileSeparator = pwd.indexOf("/") != -1 ? "/" : "\\";

var engineDir = pwd+fileSeparator+"node_modules"+fileSeparator+"gluon";

var config = JSON.parse(shell.cat(pwd+fileSeparator+"gluonconfig.json"));

if(process.argv.indexOf("build") != -1) {

	console.log("\n\nGluon building...".bold.underline.green);

	//var buildCmd = "--progress " + pwd+fileSeparator+config.entry.join(fileSeparator) + " " + pwd+fileSeparator+config.outPut.join(fileSeparator) + " --config "+ engineDir  +"webpack.config.js";
	var buildCmd = config.entry.join(fileSeparator) + " " + config.outPut.join(fileSeparator) + " --config "+ engineDir+fileSeparator  +"webpack.config.js --progress";

	var webpackProc = nodeCLI.exec("webpack", buildCmd, {async: true});

}

if(process.argv.indexOf("start") != -1) {
	console.log("\n\nGluon running...".bold.underline.green);
	console.log("ctrl-c kills process\n".red);
	nodeCLI.exec("electron", "node_modules/gluon/dist/main.js");
}

