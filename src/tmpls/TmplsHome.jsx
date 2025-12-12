import { useEffect, useState } from "react";
import { saveTemplate, updateTemplate } from "../db2/templates/db.templates.save";
import { getStrDate } from "../xtra/dates";
import { getAllTemplates, getTmplsById } from "../db2/templates/db.templates.load";
import { Link, useParams } from "react-router";

const TmplsHome = ()=>{
    const {id} = useParams();
    const [message, setMessage] = useState("");
    const [tmplsName, setTmplsName] = useState("");
    const [ack, setAck] = useState({msg:"", error:false});
    const selId = parseInt(id);

    const loadMsg = async()=>{
        console.log("id",  id);
        const msg = await getTmplsById(selId);console.log("Tmplts to edit", msg);
        setMessage(msg.tmplBody);
        setTmplsName(msg.tmplName);
    }
    
    const saveTmpls = async()=>{
        const template = {
            tmplName: tmplsName,
            tmplBody: message
        };
        if(id){
            const res = await updateTemplate(template, parseInt(id));console.log(res);
            if(res.success === 1){
                setAck({msg:"Template updated successfully!", error:false});
                setTmplsName("");
                setMessage("");
            }
            else{setAck({msg:"Failed to update template.", error:true});}
            return;
        }

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

    useEffect(()=>{
        if(selId !== 0){
        loadMsg();
    }
    },[selId])
    return(<>
        <div className=" bg-white p-4 h-full w-full flex flex-col">
            <div className="space-y-2 grow flex flex-col">
                <div className="space-y-4 flex flex-col grow">
                    <div className="space-y-2 flex flex-row justify-between">
                        <p className="text-lg font-semibold">Templates</p>
                        <Link to="/templates/list">
                            <button className="ml-auto px-4 py-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold shadow-lg shadow-gray-600/20 transition-all duration-200 transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-white">Back to List</button>
                        </Link>
                    </div>
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
                    {ack.msg && <div className={`w-full px-4 py-2 text-sm font-medium ${ack.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} rounded-md`}>
                        {ack.msg}
                    </div>}
                </div>
            </div>
        </div>
    </>)
}
export default TmplsHome;