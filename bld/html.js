require('shelljs/global');
 
if (!test('-d', "dist")) mkdir("dist");
if (!test('-d', "dist/app")) mkdir("dist/app");

cp("src/resources/html/main.html", "dist/launcher");
cp("-Rf", "src/resources/html/", "dist/launcher");

exit(0);