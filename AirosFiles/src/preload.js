// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { ipcRenderer, contextBridge, ipcMain } = require("electron")

const API = {
    window: {
        close: () => ipcRenderer.send("close"),
        minimize: () => ipcRenderer.send("minimize"),
        restore: () => ipcRenderer.send("restore"),

        pass: () => ipcRenderer.send("pass_page"),
        pass2: () => ipcRenderer.send("pass_page2"),

        search: (searchText) => ipcRenderer.send("search-text", searchText),
    },
}

contextBridge.exposeInMainWorld("app", API);


contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
});