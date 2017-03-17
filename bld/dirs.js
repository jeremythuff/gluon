require('shelljs/global');

if (!test('-d', "dist")) mkdir("dist");
if (!test('-d', "dist/engine")) mkdir("dist/engine"); 
if (!test('-d', "dist/engine/resources")) mkdir("dist/engine/resources");

exit(0);