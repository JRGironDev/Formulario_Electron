const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const path = require("path");

let ventana;

function createWindow() {
  ventana = new BrowserWindow({
    width: 1000,
    height: 1300,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(app.getAppPath(), "preload.js"),
    },
  });
  ventana.loadFile("index.html");
}

let ventana2;

function createWindow2() {
  ventana2 = new BrowserWindow({
    width: 400,
    height: 325,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(app.getAppPath(), "preload.js"),
    },
  });

  ventana2.loadFile("segundo.html");
}

app.whenReady().then(createWindow);

ipcMain.on("inicio-sesion", (event, args) => {
  createWindow2();

  ventana2.webContents.on("did-finish-load", () => {
    ventana2.webContents.send("bienvenido-usuario", args);
  });
});
