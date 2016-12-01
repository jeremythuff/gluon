#!/usr/bin/env node
var nodeCLI = require("shelljs-nodecli");
var colors = require('colors');

console.log("\n\nGluon running...\n".bold.underline.green);
console.log("ctrl-c kills process\n".red);

nodeCLI.exec("electron", process.argv[2]);

