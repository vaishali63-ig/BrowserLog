import { logoUrl } from "../common/staticData";

const Navbar = () => {
    return (
        <div className="w-[100%] h-[100%] border-b border-zinc-200 p-2 flex justify-between items center">
            <div className="flex justify-center gap-2 items-center">
                <img className="w-[2.2rem] h-[2.2rem] rounded-[100%] border border-zinc-200" src={logoUrl} alt="" />
                <p className="text-lg font-semibold text-blue-900">Browser Log</p>
            </div>
        </div>
    )
}

export default Navbar;