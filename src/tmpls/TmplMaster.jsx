import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useTplMaster } from "./utils.tmpls.mastr";

const TmplMaster = ()=>{
    const {id} = useParams();
    const {tpls, setTpls, msg, loadTemplate, createTpl, updateTpl} = useTplMaster(id);
    const [btnDis, setBtnDis] = useState(false);

    const saveTmpls = async()=>{
        console.log({id});
        const saved = parseInt(id) > 0 ? updateTpl() : createTpl();
    }

    useEffect(() => {
        loadTemplate();
    }, [id])
    
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
                        <input type="text" placeholder="Template Name" value={tpls.tmplName} onChange={(e) => setTpls({...tpls, tmplName: e.target.value})} className="w-full px-4 py-1 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200" />
                        
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider ml-1">Message</label>
                        <textarea
                            placeholder="Type your message here..."
                            value={tpls.tmplBody}
                            onChange={(e) => setTpls({...tpls, tmplBody: e.target.value})}
                            className="w-full px-4 py-1 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200 grow resize-none"
                        />
                    </div>
                    <button
                        onClick={saveTmpls}
                        className="w-full py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                        Save
                    </button>
                    {msg.text && <div className={`w-full px-4 py-2 text-sm font-medium ${msg.err ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} rounded-md`}>
                        {msg.text}
                    </div>}
                </div>
            </div>
        </div>
    </>)
}
export default TmplMaster;