import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { getStrDate } from "../xtra/dates";
import { getTmplsById } from "../db2/templates/db.templates.load";
import * as XLSX from "xlsx";
import { saveToCampaign } from "../db2/campaign/db2.campaign.save";
import { generateRandomInterval, sendTemplatesDirectly } from "./utils.tmpls.send";

const TmplsSend = () => {
    const {id} = useParams();
    const [tmpl, setTmpl] = useState({});
    const [interval, setInterval] = useState(2);
    const [numbers, setNumbers] = useState([]);
    const tmpId = parseInt(id);
    const nav = useNavigate();

    const loadTempls = async () => {
        const msg = await getTmplsById(tmpId); console.log("Tmplts to edit", msg);
        setTmpl(msg);
    }

    const handleUpload = (e)=>{
        console.log("running handleUPload");
        const file = e.target.files[0];console.log("file",file);
        const reader = new FileReader();

        reader.onload = (evt)=>{
            const arrayBuffer  = evt.target.result;
            
            const workbook = XLSX.read(arrayBuffer, {type: "array"});

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });
            setNumbers(data.map(num => num.phn_numbers))
            console.log("Excel to json", data);
        }
        reader.readAsArrayBuffer(file);
    }

    // function intervalFunc(int){
    //     let time = Date.now() + 10000;
    //     return ()=>{
    //         const current = time;
    //         time += (int * 60 * 1000);
    //         return current;
    //     }
    // }

    const handleSend = async () => {
        const time = generateRandomInterval(interval); console.log("randomTime", time);
        //const msg = getRandomTmpl(ids)

        for (let i = 0; i < numbers.length; i++) {
            const camp = {
                phnNo   : numbers[i].toString(),
                sentOn  : time,
                tmplsId : tmpl.id,
            };
            const res = await saveToCampaign(camp);
            console.log("campaign saved", res);
        }
        await sendTemplatesDirectly(numbers, tmpl, interval)
        nav(-1);
    }

    useEffect(()=>{
        loadTempls();
    },[]);

    return (<>
        <div className=" bg-white p-6 h-full w-full flex flex-col">
            <div className="space-y-2 grow flex flex-col">
                <div className="space-y-2 flex flex-col justify-between">
                    <p className="text-lg font-semibold">Send Templates</p>
                    <div className="p-6 rounded border border-gray-300">
                        <h2 className="text-lg font-semibold mb-4">
                            Upload phone numbers
                        </h2>
                        <input
                            type="file"
                            accept=".xlsx,.xls,.csv,.txt"
                            className="border p-2 rounded w-full"
                            onChange={handleUpload}
                        />
                    </div>
                    <div className="space-y-3 flex flex-col border border-gray-300 rounded-lg p-6 grow">
                        <div className="flex flex-row items-center gap-2">
                            <p className="text-gray-700 font-medium text-base grow">{tmpl.tmplName}</p>
                            <Link to={`/tmpls/${tmpl.id}/save`}>
                                <button className="text-gray-900 border-b hover:text-green-600 transition-colors">
                                    Edit
                                </button>
                            </Link>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-gray-800 whitespace-pre-wrap">{tmpl.tmplBody}</p>
                            <p className="text-sm text-gray-500">{getStrDate(tmpl.dateTime)}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between border gap-1 border-gray-300 rounded-lg p-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Time Interval</label>
                        <input type="number" onChange={(e)=>{
                                        const minVal = 3;
                                        const val = Number(e.target.value)
                                        if(val >= minVal) setInterval(val);
                        }} value={interval} placeholder="Interval" className="w-2/4 px-4 py-1 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200" />
                        <button onClick={handleSend} className="w-2/4 bg-green-900 text-white hover:bg-green-700">Send</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default TmplsSend;