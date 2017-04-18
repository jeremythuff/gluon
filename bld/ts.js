require('shelljs/global');

const nodecli = require("shelljs-nodecli");

const singleFile = process.argv[2];

nodecli.exec("node", "bld/dirs.js"); 

if(singleFile) {
    const singleFileOut = process.argv[2].replace("src", "dist");
    nodecli.exec("tsc", singleFile, "--outDir " + singleFileOut, "--lib 'es6, dom'", "--experimentalDecorators true"); 
    nodecli.exec("npm", "test"); 
} else {
    nodecli.exec("tsc", "-p tsconfig.json"); 
}

exit(0);