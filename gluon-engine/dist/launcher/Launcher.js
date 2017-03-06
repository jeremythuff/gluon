#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron = require("electron");
var process = require("process");
var app = electron.app;
var mainWindow;
function createWindow() {
    mainWindow = new electron.BrowserWindow({ width: 800, height: 600, webPreferences: { nodeIntegration: true } });
    mainWindow.loadURL("file://" + process.argv[2]);
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