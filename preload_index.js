const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electron", {
    onload: (path) => {
        return ipcRenderer.send('onload',path)
    },
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
    exportFrame: (frame,data) => {
        return ipcRenderer.invoke('exportFrame',frame,data)
    },
    cleanExportFrame: (start,end) => {
        return ipcRenderer.invoke('cleanExportFrame',start,end)
    },
    on: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
    evalBW: (program,env) => {
        return ipcRenderer.send('evalBW',program,env)
    },
    composeVideo: (start,end,fps,fname) => {
        return ipcRenderer.send('composeVideo',start,end,fps,fname)
    },
    openPathDefault: (path) => {
        return ipcRenderer.send('openPathDefault',path)
    },
    openPathExplorer: (path) => {
        return ipcRenderer.send('openPathExplorer',path)
    },
    openPathSelf: (path) => {
        return ipcRenderer.send('openPathSelf',path)
    },
    getFolder: (path) => {
        return ipcRenderer.send('getFolder',path)
    },
    readFrameCache: (frame) => {
        return ipcRenderer.invoke('readFrameCache',frame)
    },
    saveFrameCache: (frame,data) => {
        return ipcRenderer.send('saveFrameCache',frame,data)
    },
})