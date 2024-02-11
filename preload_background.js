const { contextBridge, ipcRenderer } = require("electron")
let params = new URLSearchParams(document.location.search);
let bwid = params.get("bwid");

contextBridge.exposeInMainWorld("electron", {
    winloadBW: () => {
        return ipcRenderer.invoke('winloadBW'+bwid)
    },
    resultBW: (object) => {
        return ipcRenderer.send('resultBW'+bwid,object)
    },
    on: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
})