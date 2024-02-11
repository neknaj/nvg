const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electron", {
    openFile: () => {
        return ipcRenderer.invoke('openFile')
    },
    readFile: (path) => {
        return ipcRenderer.invoke('readFile',path)
    },
    saveFile: (path,data) => {
        return ipcRenderer.invoke('saveFile',path,data)
    },
    saveAs: (data) => {
        return ipcRenderer.invoke('saveAs',data)
    },
    on: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
    evalBW: (program,env) => {
        return ipcRenderer.send('evalBW',program,env)
    },
})