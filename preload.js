const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("comunicacion", {
  inicioUsuario: (usuario) => ipcRenderer.send("inicio-sesion", usuario),
  bienvenidoUsuario: (canal, callback) =>
    ipcRenderer.on("bienvenido-usuario", callback),
});
