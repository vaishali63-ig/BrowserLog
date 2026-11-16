import { BrowserWindow,app, ipcMain } from "electron";
import path from "path"
import { readProfileHistory } from "./database/historyReader.js";
import { getChromeProfiles, getEdgeProfiles } from "./services/profileService.js";



function createwindow (){

  const win = new BrowserWindow({
    width:1200,
    height: 800,
    webPreferences: {
     preload: path.join(app.getAppPath(),"electron","preload.js"),
     contextIsolation:true,
     nodeIntegration:false
    },
    autoHideMenuBar:true,
  })

  win.webContents.openDevTools()

  if ( app.isPackaged){
     win.loadFile(path.join(app.getAppPath(),"dist","index.html"));
  }else{
     win.loadURL("http://localhost:5173/")
  }
}

app.whenReady().then(createwindow)

app.on("window-all-closed", ()=>{
    if(process.platform!="darwin") app.quit();
})

ipcMain.handle("history:sync", async (event,params)=>{
    try{
        const history = await readProfileHistory(
             params.profile,
             params.searchString,
             params.startTime,
             params.endTime
        );
        return {
            status:"success",
            data: history
        }
    }catch(err){
        console.log("ipc error",err)
        return{
            status:"failed",
            message: err.message,
            stack:err.stack
        }
    }
})

ipcMain.handle("get-all-profiles", ()=>{
    return[
        ...getChromeProfiles(),
        ...getEdgeProfiles(),
    ].sort((a,b)=>a.name.localeCompare(b.name))
})