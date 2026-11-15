import { BrowserWindow,app, ipcMain } from "electron";
import path from "path"
import { readChromeHistory } from "./database/historyReader.js";



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

ipcMain.handle("history:sync", async ()=>{
    try{
        const history = await readChromeHistory();
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