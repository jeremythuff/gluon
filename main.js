const electron = require("electron");

const {app, BrowserWindow, globalShortcut} = electron;

let mainWindow;

app.setName("Desktop App");

app.on("ready", () => {
	mainWindow = new BrowserWindow({
		width: 1280,
		height: 900,
		show: false
	});

	mainWindow.setTitle("Stockings");
	mainWindow.loadURL(`file://${__dirname}/index.html`);
	
	mainWindow.once('ready-to-show', () => {
  		mainWindow.show()
	});

	mainWindow.on("closed", () => {
		mainWindow = null;
	});

});

app.on("will-quit", () => {
	globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
	app.quit();
});