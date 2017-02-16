"use strict";
var electron = require("electron");
var process = require("process");
var nodeModule = require('module');
nodeModule.globalPaths.push(__dirname + "/dist");
console.log(nodeModule);
var app = electron.app;
var mainWindow;
function createWindow() {
    mainWindow = new electron.BrowserWindow({ width: 800, height: 600 });
    mainWindow.loadURL("file://" + __dirname + "/../main.html");
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
;
app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
//# sourceMappingURL=Launcher.js.map