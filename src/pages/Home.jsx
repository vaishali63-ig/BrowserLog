import { NavLink } from "react-router";
import { homePageSetup } from "../common/staticData";
import { useEffect, useState } from "react";

const Home = () =>{
    const [homeData,setHomeData] = useState(homePageSetup?.[0]||null)
    useEffect(()=>{
    })
    return(
        <div className="w-[100%] h-[100%] flex flex-col gap-4 justify-center items-center">
            <p className="text-3xl text-blue-800 font-semibold text-center">Welcome To Browser Log</p>
            <p className="text-2xl font-semibold text-center">{homeData?.H1 || "Remember That Page?"}</p>
            <p className="text-center text-sm text-zinc-700">{homeData?.H2 || "Lets Find Something From Your Browsing "}</p>
            <NavLink to="/history" className="text-lg border border-zinc-200 shadow rounded-lg bg-blue-800 hover:bg-blue-900 text-white font-semibold p-2">{homeData?.BTN_TXT || "Explore History"}</NavLink>
        </div>
    )
}

export default Home;