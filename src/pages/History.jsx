import { useEffect } from "react";

const History = ()=>{
    useEffect(()=>{
        const getHistory = async ()=>{
            try{
               const history = await window.electronAPI.syncHistory();
               console.log("react history:",history)
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