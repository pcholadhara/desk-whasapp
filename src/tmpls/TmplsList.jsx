import { useEffect, useState } from "react";
import { getAllTemplates } from "../db2/templates/db.templates.load";
import { Link } from "react-router";
import { getStrDate } from "../xtra/dates";
import { deleteTemplates } from "../db2/templates/db.templates.delete";

const TmplsList = () => {
    const [list, setList] = useState([]);

    const loadTemplates = async () => {
        const list = await getAllTemplates(); console.log("Template List", list);
        setList(list);
    }
    const handleClick = async(id)=>{
        const res = await deleteTemplates(id);
        loadTemplates();
        console.log(res);
    }

    const handleSendClick = async(tmp)=>{
        setOpen(true);
        //const res = await saveTemplateToSend(tmp);console.log(res);
    }

    useEffect(() => {
        loadTemplates();
    }, [])

    return (<>
        <div className=" bg-white p-4 w-full h-full flex flex-col">
            <div className="flex flex-row justify-between mb-4 shrink-0">
                <p className="text-lg font-semibold">Templates</p>
                <Link to="/tmpls/0/save">
                    <button className="ml-auto px-4 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-600/20 transition-all duration-200 transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white">Add New</button>
                </Link>
            </div>
            <div className="flex-1 overflow-y-auto min-h-0">
                <div className="space-y-2 pr-2">
                    {list.map((msg) => (
                        <div key={msg.id} className="space-y-3 flex flex-col border border-gray-300 rounded-lg p-4">
                            <div className="flex flex-row items-center gap-2">
                                <p className="text-gray-700 font-medium text-base grow">{msg.tmplName}</p>
                                <Link to={`/tmpls/${msg.id}/send`}>
                                <button onClick={(e) => handleSendClick(msg.id)} className="text-gray-900 border-b hover:text-blue-600 transition-colors">
                                    Send
                                </button>
                                </Link>
                                <Link to={`/tmpls/${msg.id}/save`}>
                                    <button className="text-gray-900 border-b hover:text-green-600 transition-colors">
                                        Edit
                                    </button>
                                </Link>
                                <button onClick={(e) => handleClick(msg.id)} className="text-gray-900 border-b hover:text-blue-600 transition-colors">
                                    Delete
                                </button>

                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-800 whitespace-pre-wrap line-clamp-2">{msg.tmplBody}</p>
                                <p className="text-sm text-gray-500">{getStrDate(msg.dateTime)}</p>
                            </div>
                        </div>
                    ))}
                    {list.length < 1 && (
                        <div className="space-y-2 flex flex-col">
                            <p>No templates found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>)
}

const UploadNumber = ({setOpen})=>{

    const handleUpload = (e)=>{
        const file = e.target.files[0];
        if (!file) return;

        console.log("Selected file:", file);
    }

    return(<>
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-90">
                <h2 className="text-lg font-semibold mb-4">
                    Upload phone numbers
                </h2>

                <input
                    type="file"
                    accept=".xlsx,.xls,.csv,.txt"
                    className="border p-2 rounded w-full"
                    onChange={handleUpload}
                />

                <button
                    onClick={() => setOpen(false)}
                    className="mt-4 px-4 py-2 bg-gray-300 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    </>)
}

export default TmplsList;