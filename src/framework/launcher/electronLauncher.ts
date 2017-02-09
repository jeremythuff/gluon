/// <reference path="./../../../dist/typings/globals/github-electron/index.d.ts" />
/// <reference path="./../../../dist/typings/globals/node/index.d.ts" />

import * as Electron from 'electron';

export default class ElectronLauncher {
    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    static BrowserWindow: any;
    private static onWindowAllClosed() {
        if (process.platform !== 'darwin')
            ElectronLauncher.application.quit();
    }
    private static onClose(){
        // Dereference the window object.
        ElectronLauncher.mainWindow = null;
    }
    private static onReady(){
        ElectronLauncher.mainWindow = new ElectronLauncher.BrowserWindow({width: 800, height: 600})
        ElectronLauncher.mainWindow.loadURL('file://' + __dirname + '/html/main.html');
        ElectronLauncher.mainWindow.on('closed', ElectronLauncher.onClose);
    }
    static main( app: Electron.App, browserWindow: typeof Electron.BrowserWindow){
        // we pass the Electron.App object and the 
        // Electron.BrowserWindow into this function
        // so this class has no dependencies.  This
        // makes the code easier to write tests for

        ElectronLauncher.BrowserWindow = browserWindow;
        ElectronLauncher.application = app;
        ElectronLauncher.application.on('window-all-closed', ElectronLauncher.onWindowAllClosed);
        ElectronLauncher.application.on('ready', ElectronLauncher.onReady);

    }
}