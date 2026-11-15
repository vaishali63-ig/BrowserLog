import fs from "fs"
import path from "path"

const getProfiles = (userDataPath,browser)=>{
    if (!fs.existsSync(userDataPath)){
        return []
    }

    const localStatePath = path.join(userDataPath,"Local State");

    let profileInfo = {}

    try{
        const localState = JSON.parse(fs.readFileSync(localStatePath,"utf-8"))

        profileInfo = localState?.profile?.info_cache ||{}

    }catch{
        console.log("error while getting user info")
    }

    return Object.entries(profileInfo).map(([id,info])=>{
        return{
            id,
            name: info?.name||"",
            email: info?.user_name||"",
            browser,
            historyPath:path.join(userDataPath,id,"History")
        }
    })
}

export function getChromeProfiles () {
  return getProfiles(
    path.join(process.env.LOCALAPPDATA,"Google","Chrome","User Data"),
    "Chrome"
  )
}

export function getEdgeProfiles () {
    return getProfiles(
        path.join(process.env.LOCALAPPDATA,"Microsoft","Edge","User Data"),
        "Edge"
    )
}