import { useState } from "react"
import { browsersData } from "../common/staticData"

const ProfileCard = ({profile})=>{
    const [staticData] = useState(browsersData.filter((b)=>b?.name == profile?.browser)?.[0])
    return (
        <div className="border border-zinc-200 hover:shadow rounded-lg p-2 h-[7rem] w-[20rem]">
            <div className="flex justify-start items-center gap-2">
                <img className="h-[2.5rem] w-[2.5rem] rounded-[100%] border border-zinc-200" src={staticData?.logo||""} alt="" />
                <p className="text-lg text-blue-800 font-semibold">{staticData?.name||""}</p>
            </div>
            <div>
                <p className="text-lg font-semibold text-blue-500">Name: <span className="text-sm text-zinc-700">{profile?.name}</span></p>
                <p className="text-lg font-semibold text-blue-500">Email: <span className="text-sm text-zinc-700">{profile?.email||"non-loged-in"}</span></p>
            </div>
        </div>
    ) 
}

export default ProfileCard