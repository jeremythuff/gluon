require('shelljs/global');

const nodecli = require("shelljs-nodecli");

nodecli.exec("node", "bld/dirs.js"); 

cp("-R", "src/resources/sass/", "dist/resources/sass");

exit(0);