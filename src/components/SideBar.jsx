import { NavLink, useLocation } from "react-router";
import { sideBarOptions } from "../common/staticData";

const SideBar = () => {
    const pathName = useLocation().pathname
    return(
        <div className="h-[100%] w-[100%] border-r border-zinc-200 p-4">
            {
                sideBarOptions.map((o)=>{
                    return (
                        <NavLink to={`/${o.id}`}>
                        <div className={`m-2 p-2 rounded-lg text-lg font-semibold ${`/${o.id}`==pathName?"bg-blue-800 text-white":"hover:bg-blue-100"}`}>{o.title}</div>
                        </NavLink>
                    )
                })
            }
        </div>
    )
}
export default SideBar;