const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electron", {
    openFile: () => {
        return ipcRenderer.invoke('file-open')
    },
    on: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
})