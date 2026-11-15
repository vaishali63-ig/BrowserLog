import { useState } from "react";

const Search = ({profileData,setResponse})=>{
    const [searchString,setSearchString] = useState("")
    const handleSearch = ()=>{
        if (!searchString){
            return
        }
        const searchtxt = searchString.toLowerCase();
        setResponse({status:"loading",message:"searching..."})
        const filterdData = profileData.filter((p)=>{
            return p.name.toLowerCase().includes(searchtxt)||p.email.toLowerCase().includes(searchtxt)||p.browser.toLowerCase().includes(searchtxt)
        })
        setResponse({status:"success",message:"",output:filterdData})
    }
    const handleClear = ()=>{
        setSearchString("");
        setResponse({status:"success",message:"",output:profileData});
    }
    return <div className="w-[100%] flex gap-4 justify-center">
        <input onKeyDown={(e)=>{if(e.key==="Enter")handleSearch();}} value={searchString} onChange={(e)=>setSearchString(e.target.value)} className="w-[80%] lg:w-[50%] p-2 border rounded-lg shadow border-zinc-200" placeholder="enter name or email" type="text" />
        <button disabled={!searchString} onClick={handleSearch} className="cursor-pointer p-2 bg-blue-800 rounded-lg shadow text-white font-semibold">Search</button>
        <button onClick={handleClear} className="cursor-pointer text-lg font-semibold border border-2 border-blue-800 p-2 font-semibold rounded-lg shadow-lg">Clear</button>
    </div>
}

export default Search;