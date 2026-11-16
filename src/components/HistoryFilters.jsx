import { useState } from "react"

const HistoryFilters = ({profiles,filters,setFilters,getHistory})=>{
    const [response,setResponse] = useState({message:"",status:""})
    const handleFetch = async()=>{
       try{
        setResponse({message:`fetching data...`,status:"loading"})
        if (filters.startDate>filters.endDate){
            throw("start date can not grater than end date")
        }
        const ed = new Date(filters.endDate)
        ed.setHours(23,59,59,999)
        const history = await getHistory(
            filters.profile.historyPath,filters.searchString,filters.startDate,ed,filters.profile.browser
        )

        if (!history||history.lenght==0){
            throw("no data availible");
        }

        setResponse({message:`data fetched`,status:"success"})

        }catch(err){
            setResponse({message:`${err}`,status:"failed"})
        }
    }
    return(
        <>
        <div className="p-4 flex gap-4 flex-wrap ">
            <select onChange={(e)=>{setFilters((prev)=>{return{...prev,profile:profiles.filter((p)=>p.historyPath == e.target.value)?.[0]||{}}})}} className="p-2 border border-zinc-200 rounded-lg" name="" id="profile" value={filters?.profile?.historyPath}>
                {
                    profiles.map((p,idx)=>{
                        return <option key={idx} value={p.historyPath}>{`${p.name} - ${p.email||"not-sign-in"}`}</option>
                    })
                }
            </select>
            <input onChange={(e)=>setFilters((prev)=>{return{...prev,searchString:e.target.value}})} className="p-2 border border-zinc-200 rounded-lg w-[50%]"  value={filters?.searchString} type="text" placeholder="enter search text" />
            <div className="flex gap-2 w-[70%] items-center">
            <input  onChange={(e)=>setFilters((prev)=>{return{...prev,startDate:e.target.value}})} className="p-2 border border-zinc-200 rounded-lg w-[40%]" value={filters?.startDate} type="date" placeholder="select from date" />
            <p className="text-lg font-semibold">{" TO "}</p>
            <input  onChange={(e)=>setFilters((prev)=>{return{...prev,endDate:e.target.value}})} className="p-2 border border-zinc-200 rounded-lg w-[40%]" value={filters?.endDate} type="date" placeholder="select to date" />
            </div>
            <button onClick={handleFetch} className="p-2 border border-zinc-200 rounded-lg text-lg shagow-lg font-semibold text-white bg-blue-800 cursor-pointer">Search</button>
        </div>
        {response.status=="failed"&&<p className="text-red-500 text-center">{response.message}</p>}
        {/* {response.status=="success"&&<p className="text-green-500 text-center">{response.message}</p>} */}
        {response.status=="loading"&&<p className="text-center">{response.message}</p>}

        </>
    )
}

export default HistoryFilters;