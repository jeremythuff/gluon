require('shelljs/global');

const nodecli = require("shelljs-nodecli");

nodecli.exec("node", "bld/dirs.js"); 

nodecli.exec("node-sass", "--include-path scss src/resources/sass/gluon-engine.scss dist/engine/resources/styles/css/gluon-engine.css"); 

exit(0);