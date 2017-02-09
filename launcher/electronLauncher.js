"use strict";
var ElectronLauncher = (function () {
    function ElectronLauncher() {
    }
    ElectronLauncher.onWindowAllClosed = function () {
        if (process.platform !== 'darwin')
            ElectronLauncher.application.quit();
    };
    ElectronLauncher.onClose = function () {
        ElectronLauncher.mainWindow = null;
    };
    ElectronLauncher.onReady = function () {
        ElectronLauncher.mainWindow =
            new ElectronLauncher.BrowserWindow({ width: 800, height: 600 });
        ElectronLauncher.mainWindow
            .loadURL('file://' + __dirname + '/../src/resources/html/main.html');
        ElectronLauncher.mainWindow.on('closed', ElectronLauncher.onClose);
    };
    ElectronLauncher.main = function (app, browserWindow) {
        ElectronLauncher.BrowserWindow = browserWindow;
        ElectronLauncher.application = app;
        ElectronLauncher.application.on('window-all-closed', ElectronLauncher.onWindowAllClosed);
        ElectronLauncher.application.on('ready', ElectronLauncher.onReady);
    };
    return ElectronLauncher;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ElectronLauncher;
