const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electron", {
    openFile: () => {
        return ipcRenderer.invoke('file-open')
    }
})