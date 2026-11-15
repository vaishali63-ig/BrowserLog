import { useEffect } from "react";

const History = ()=>{
    useEffect(()=>{
        const getHistory = async ()=>{
            try{
               const history = await window.electronAPI.syncHistory();
               const profiles = await window.electronAPI.getAllProfiles();
            //    console.log("react history:",history)
            //    console.log("profiles", profiles)
            }catch(err){
                console.log("react history error",err)
            }
        }
        getHistory()
    },[])
    return(
        <div className="w-[100%] h-[100%]">
            
        </div>
    )
}

export default History;