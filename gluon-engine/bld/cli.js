require('shelljs/global');

const nodecli = require("shelljs-nodecli");

nodecli.exec("node", "bld/dirs.js"); 

cp("-R", "src/resources/cli/", "dist/engine/resources/cli");

exit(0);