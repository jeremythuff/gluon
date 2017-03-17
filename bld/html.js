require('shelljs/global');

const nodecli = require("shelljs-nodecli");

nodecli.exec("node", "bld/dirs.js"); 

cp("-R", "src/resources/html/", "dist/engine/resources/html");

exit(0);