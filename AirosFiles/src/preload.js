// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { ipcRenderer, contextBridge } = require("electron")

const API = {
    window: {
        close: () => ipcRenderer.send("close"),
        minimize: () => ipcRenderer.send("minimize"),
        restore: () => ipcRenderer.send("restore"),

        pass: () => ipcRenderer.send("pass_page"),
        pass2: () => ipcRenderer.send("pass_page2"),
    },
}

contextBridge.exposeInMainWorld("app", API)
