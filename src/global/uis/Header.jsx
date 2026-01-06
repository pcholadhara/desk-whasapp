import { Menu, ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

const Header = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
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
        <div className="flex w-full flex-row items-center justify-between px-4 h-12 border-b border-gray-200 bg-[#006565] text-white">
            <button onClick={() => navigate(-1)} className="p-2 mr-2 rounded-md hover:bg-gray-100 text-white hover:text-black transition">
                <ArrowLeft size={18} />
            </button>
            <div className="text-lg font-semibold grow" style={{ "WebkitAppRegion": "drag" }}>
                WhatsApp
            </div>

            <button onClick={(e) => setOpen(!open)} className="p-2 rounded-md hover:bg-gray-100 text-white hover:text-black transition">
                <Menu size={18} />
            </button>
            {open && (
                <div ref={menuRef} className="absolute top-10 right-4 w-[200px] bg-white border border-gray-200 rounded-md shadow-lg z-50 text-black">
                    <ul className="flex flex-col w-full">
                        <List to="" setOpen={setOpen} placeHolder="WhatsApp" />
                        <List to="/chat" setOpen={setOpen} placeHolder="Chat" />
                        <List to="/templates/list" setOpen={setOpen} placeHolder="Templates" />
                        <List to="/bulk/send" setOpen={setOpen} placeHolder="Bulk Message" />
                        <List to="" setOpen={setOpen} placeHolder="Settings" />
                        <List to="" setOpen={setOpen} placeHolder="Logout" />
                    </ul>
                </div>
            )}

        </div>
    </>)
}

const List = ({ to, setOpen, placeHolder }) => {
    return (<>
        <li className="px-2 flex">
            <Link to={to} className="px-4 py-2 w-full hover:bg-gray-100 cursor-pointer" onClick={e => setOpen(false)}>{placeHolder}</Link>
        </li>
    </>)
}

export default Header;

