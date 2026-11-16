const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI",{
    readHistory:(params)=> ipcRenderer.invoke("history:sync",params),
    getAllProfiles:()=> ipcRenderer.invoke("get-all-profiles")
});

