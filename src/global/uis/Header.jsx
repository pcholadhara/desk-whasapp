import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

const Header = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (<>
        <div  className="flex w-full flex-row items-center justify-between px-4 h-12 border-b border-gray-200 bg-[#006565] text-white">
            <div style={{"-webkit-app-region": "drag"}} className="text-lg font-semibold">
                logo
            </div>

            <button onClick={(e) => setOpen(!open)} className="p-2 rounded-md hover:bg-gray-100 text-white hover:text-black transition">
                <Menu size={18} />
            </button>
            {open && (
                <div ref={menuRef} className="absolute top-10 right-4 w-30 bg-white border border-gray-200 rounded-md shadow-lg z-50 text-black">
                    <ul className="flex flex-col">
                        <li  className="px-2 py-2">
                            <Link to="" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</Link>
                        </li>
                        <li className="px-2 py-2">
                            <Link to="" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</Link>
                        </li>
                        <li className="px-2 py-2">
                            <Link to="" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</Link>
                        </li>
                    </ul>
                </div>
            )}    
        
        </div>
    </>)
}
export default Header;