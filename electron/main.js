import { BrowserWindow,app } from "electron";
import path from "path"

function createwindow (){

  const win = new BrowserWindow({
    width:1200,
    height: 800,
    webPreferences: {
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