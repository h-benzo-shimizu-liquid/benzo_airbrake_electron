
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import { BrowserWindow, app, ipcMain, IpcMainEvent, } from "electron";
import apiGroups, { RequestGroups, } from "@main/api/groups";
import apiNotices, { RequestNotices, } from "@main/api/notices";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

let mainWindow: BrowserWindow | null = null;

app.on("ready", (): void => {
	create();
});

app.on("activate", (): void => {
	if (mainWindow !== null) { return; }
	create();
});

app.on("window-all-closed", (): void => {
	app.quit();
});

const create = (): void => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 400,
		webPreferences: {
			preload: `${__dirname}/preload.js`,
		},
	});
	mainWindow.loadURL(`file://${__dirname}/index.html`);
	mainWindow.on("closed", (): void => { mainWindow = null; });
	//mainWindow.webContents.openDevTools();
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

ipcMain.on("groups", (event: IpcMainEvent, request: RequestGroups): void => {
	apiGroups(request).then((response: string): void => {
		event.sender.send("groups", response);
	}).catch((error: Error): void => {
		console.log("error");
	});
});

ipcMain.on("notices", (event: IpcMainEvent, request: RequestNotices): void => {
	apiNotices(request).then((response: string): void => {
		event.sender.send("notices", response);
	}).catch((error: Error): void => {
		console.log("error");
	});
});

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

