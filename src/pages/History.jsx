import { useEffect, useState } from "react";
import HistoryFilters from "../components/HistoryFilters";
import { browsersData } from "../common/staticData";

const History = ()=>{
    const [profiles,setProfiles] = useState([])
    const [filterData,setFilterData] = useState({profile:{},startDate:new Date().toLocaleDateString('en-ca'),endDate:new Date().toLocaleDateString('en-ca'),searchString:""})
    const [history,setHistory] = useState([])


    const openLink = (url)=>{
        console.log("opening link")
        window.open(url,"_blank")
    }

    const getProfiles = async ()=>{
        try{
           const profiles = await window.electronAPI.getAllProfiles();
           setProfiles(profiles)
           setFilterData((prev)=>{return{...prev,profile:profiles?.[0]||{}}})
           return profiles
        }catch(err){
           console.log("error fetching profile data",err)
        }
    }

    const getHistory = async (historyPath,searchString,starDate,endDate,browser)=>{
       try{
               const history = await window.electronAPI.readHistory({
                profile:historyPath,
                searchString:searchString,
                startTime: starDate,
                endTime: endDate 
               });
               setHistory(history?.data?.map((h)=>{return{...h,browser:browser}})||[]);
               return history?.data
               
            }catch(err){
                console.log("react history error",err)
            }
    }

    useEffect(()=>{
        const fetchData = async()=>{
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 10);
        const endDate = new Date();
        endDate.setHours(23,59,59,999)
        const profils = await getProfiles();
        console.log("browser",profils?.[0]?.browser)
        getHistory(profils?.[0]?.historyPath||"","",startDate,endDate,profils?.[0]?.browser||"")
        }
        fetchData();
    },[])
    return(
        <div className="w-[100%] h-[100%] p-5 overflow-y-auto">
            <div className="p-4">
                <HistoryFilters getHistory={getHistory} filters={filterData} setFilters={setFilterData} profiles={profiles}/>
            </div>
            {history&&<div className="w-[100%] h-[100%] flex flex-col gap-2">
               {history.map((h)=>{
                return (<div className = "flex gap-2 p-2 border border-zinc-200 rounded-lg shadow-lg w-[100%] h-[5rem] ">
                  <p className="w-[30%]">{h?.visit_time}</p>
                  <div onClick={()=>openLink(h?.url)} className="cursor-pointer flex gap-2 justify-start items-center h-[100%] w-[70%] overflow-x-auto">
                    <img className="rounded-[100%] shadow-lg border border-zinc-200 h-[2.2rem] w-[2.2rem]" src={browsersData.filter((b)=>b?.name == h.browser)?.[0]?.logo||""} alt="" />
                    <p>{h.title}</p>
                  </div>
                </div>)
               })}
            </div>}
        </div>
    )
}

export default History;