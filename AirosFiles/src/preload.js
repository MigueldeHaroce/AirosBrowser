// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { ipcRenderer, contextBridge } = require("electron")

const API = {
    window: {
        close: () => ipcRenderer.send("close"),
        minimize: () => ipcRenderer.send("minimize"),
        restore: () => ipcRenderer.send("restore"),
    },
}

contextBridge.exposeInMainWorld("app", API)
