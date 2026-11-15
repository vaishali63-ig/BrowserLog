const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI",{
    syncHistory:()=> ipcRenderer.invoke("history:sync")
});