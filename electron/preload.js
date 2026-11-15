const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI",{
    syncHistory:()=> ipcRenderer.invoke("history:sync"),
    getAllProfiles:()=> ipcRenderer.invoke("get-all-profiles")
});

