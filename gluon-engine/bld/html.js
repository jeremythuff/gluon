require('shelljs/global');
 
if (!test('-d', "dist/engine/resources")) mkdir("dist/engine/resources");

cp("-R", "src/resources/html/", "dist/engine/resources/html");

exit(0);