require('shelljs/global');

const path = require('path');
const nodecli = require("shelljs-nodecli");

const singleFile = process.argv[2];

nodecli.exec("node", "bld/dirs.js"); 

if(singleFile) {
    const singleFileDist = (process.argv[2].replace("src", "dist")).replace("ts", "js");
    const singleFileOutDir = path.dirname(singleFileDist);
    console.log("singleFileDist", singleFileDist);
    console.log("singleFileOutDir", singleFileOutDir);
    rm(singleFileDist);
    nodecli.exec("tsc", singleFile, "--outDir dist", "--lib 'es6, dom'", "--experimentalDecorators true", "--sourceMap true", "-d true", "--listEmittedFiles true", "--listFiles true", "--baseUrl \"./src/typescript/\""); 
    nodecli.exec("npm", "test"); 
} else {
    nodecli.exec("tsc", "-p tsconfig.json"); 
}

exit(0);