require('shelljs/global');
 
if (!test('-d', "dist")) mkdir("dist");

cp("src/resources/lib/electron/electronMain.js", "dist");

exit(0);