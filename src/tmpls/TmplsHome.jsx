import { useEffect, useState } from "react";
import { saveTemplate } from "../db2/templates/db.templates.save";
import { getStrDate } from "../xtra/dates";
import { getAllTemplates } from "../db2/templates/db.templates.load";

const TmplsHome = ()=>{
    const [message, setMessage] = useState("");
    const [compo, setCompo] = useState("add");
    const [tmplsName, setTmplsName] = useState("");
    const [ack, setAck] = useState({msg:"", error:false});

    const saveTmpls = async()=>{
        const template = {
            tmplName: tmplsName,
            tmplBody: message
        };
        const res = await saveTemplate(template);
        if(res.success === 1){
            setAck({msg:"Template saved successfully!", error:false});
            setTmplsName("");
            setMessage("");
        } else {
            setAck({msg:"Failed to save template.", error:true});
        }
        console.log(res);
    }


    return(<>
        <div className=" bg-white p-4 h-full w-full flex flex-col">
            <div className="space-y-2 grow flex flex-col">

                <div className="space-y-4 flex flex-col grow">
                    <div className="space-y-2 flex flex-row">
                        <p className="text-lg font-semibold">Templates</p>
                        {compo==="list" ? <button onClick={e=>setCompo("add")} className="ml-auto px-4 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-600/20 transition-all duration-200 transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white">Add New</button>
                         : <button onClick={e=>setCompo("list")} className="ml-auto px-4 py-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold shadow-lg shadow-gray-600/20 transition-all duration-200 transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-white">Back to List</button>}
                    </div>
                    {(compo === "add") ? 
                        <div className="space-y-4 flex flex-col grow">
                            <div className="space-y-2 flex flex-col grow">
                                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider ml-1">Template Name</label>
                                <input type="text" placeholder="Template Name" value={tmplsName} onChange={e => setTmplsName(e.target.value)} className="w-full px-4 py-1 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200" />
                                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider ml-1">Message</label>
                                <textarea
                                    placeholder="Type your message here..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full px-4 py-1 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200 grow resize-none"
                                />
                            </div>
                            <button
                                onClick={saveTmpls}
                                className="w-full py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-600/20 transition-all duration-200 transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white">
                                Save
                            </button>
                        </div> : 
                        <div className="space-y-4 flex flex-col overflow-hidden">
                            <TmplsList />
                        </div>}
                    {ack.msg && <div className={`w-full px-4 py-2 text-sm font-medium ${ack.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} rounded-md`}>
                        {ack.msg}
                    </div>}
                </div>
            </div>
        </div>
    </>)
}

const TmplsList = ()=>{
    const [list, setList] = useState([]);

    const loadTemplates = async()=>{
        const list = await getAllTemplates();console.log("Template List",list);
        setList(list);
    }

    useEffect(()=>{
        loadTemplates();
    },[])

    return (<>
        <div className=" bg-white p-4 h-screen w-full flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto space-y-4">
                {list.map((msg, i) => <div key={msg.id} className="space-y-3 flex flex-col border border-gray-300 rounded-lg p-4">
                    <div className="flex flex-row items-center gap-2">
                        <p className="text-gray-700 font-medium text-base grow">{msg.tmplName}</p>
                        <button className="text-gray-900 border-b hover:text-blue-600 transition-colors">
                            Send
                        </button>
                        <button className="text-gray-900 border-b hover:text-green-600 transition-colors">
                            Edit
                        </button>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-gray-800 whitespace-pre-wrap line-clamp-2">{msg.tmplBody}</p>
                        <p className="text-sm text-gray-500">{getStrDate(msg.dateTime)}</p>
                    </div>
                </div>)}
                {list.length < 1 && <div className="space-y-2 flex flex-col grow">
                    <p>No templates found.</p>
                </div>}
            </div>
        </div>
    </>)
}

export default TmplsHome