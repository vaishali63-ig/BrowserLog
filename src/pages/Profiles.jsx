import { useEffect, useState } from "react";
import ProfileCard from "../components/profileCard";
import Search from "../components/search";

const Profiles = ()=>{
    const [ProfileData,setProfileData] = useState([])
    const [response,setResponse] = useState({status:"",message:"",output:[]})
    useEffect(()=>{
        const getProfiles = async ()=>{
            try{
             setResponse({message:"fetching profile data please wait...", status:"loading"})

             const profiles = await window.electronAPI.getAllProfiles();

             setProfileData(profiles||[])

             if (!profiles?.length){
                throw("no data availible")
             }

             setResponse({status:'success',message:"data retrived successfully",output:profiles||[]})

            }catch(err){
                setResponse({message:`${err.message}`,status:"failed"})
            }
        }
        getProfiles();
    },[])
    return (
        <div className="flex flex-wrap gap-2 justify-around items-start p-4 w-[100%] h-[100%] overflow-y-auto">
            <div className="w-[100%] mb-4"><Search profileData={ProfileData} setResponse={setResponse}/></div>
            {
                response.status=="success"?response.output?.map((p,idx)=>{
                    return <ProfileCard key={`${p.name}-${idx}`} profile={p}/>
                })
                : response.status=="failed"?<p className="text-sm text-red-500">{response?.message||""}</p>
                : response.status=="loading"?<p className="text-sm">{response.message}</p>
                :<></>
            }
        </div>
    )
}

export default Profiles;