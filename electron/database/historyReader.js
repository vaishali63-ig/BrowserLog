import { app } from "electron"
import path from "path"
import fs from "fs/promises"
import { openDatabase } from "./connection.js"
export async function readChromeHistory(){
    let db
    try {
    const historyPath = path.join(
        process.env.LOCALAPPDATA,
        "Google",
        "Chrome",
        "User Data",
        "Default",
        "History"
    )

    db = await openDatabase(historyPath);

    
        const result = db.exec(
            `
             select * from visits join urls on visits.url = urls.id LIMIT 500
            `
        )

        console.log(result)
        return result;
    }catch(err){
        console.log("error occured",err)
        throw  err
    }finally{
        db?.close()
    }
}