import { useEffect, useState } from "react";
import HistoryFilters from "../components/HistoryFilters";

const History = ()=>{
    const [profiles,setProfiles] = useState([])
    const [filterData,setFilterData] = useState(null)
    const [history,setHistory] = useState([])

    const openLink = (url)=>{
        console.log("opening link")
        window.open(url,"_blank")
    }

    useEffect(()=>{
        const getHistory = async ()=>{
            try{
               const profiles = await window.electronAPI.getAllProfiles();
               setProfiles(profiles)
               const history = await window.electronAPI.readHistory({
                profile:profiles[0].historyPath,
                searchString:"",
                limit: 50,
                offset:0
               });
               setHistory(history.data);
                console.log("react history:",history)
                console.log("profiles", profiles)
            }catch(err){
                console.log("react history error",err)
            }
        }
        getHistory()
    },[])
    return(
        <div className="w-[100%] h-[100%] overflow-auto p-5">
            <div className="p-4">
                <HistoryFilters filters={filterData} setFilters={setFilterData} profiles={profiles}/>
            </div>
            {history&&<table className=" text-sm w-full ">
                <thead>
                    <tr>
                    <th>Action</th>
                    <th>VisitTime</th>
                    <th>Title</th>
                    <th>URL</th>
                    </tr>
                </thead>
                <tbody>{
                    history?.map((h)=>{
                        return  <tr>
                            <td className="p-3 witespace-no-wrap"><button className="cursor-pointer text-blue-500 underline" onClick={()=>openLink(h.url)}>open in broeser</button></td>
                            <td className="p-3 witespace-no-wrap">{h.visit_time}</td>
                            <td className="p-3 witespace-no-wrap">{h.title}</td>
                            <td className="p-3 witespace-no-wrap">{h.url}</td>
                        </tr>
                    })
                    }
                </tbody>
            </table>}
        </div>
    )
}

export default History;