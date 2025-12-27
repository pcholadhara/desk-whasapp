import { useEffect, useRef, useState } from "react"
import { getAllTemplates } from "../db2/templates/db.templates.load"
import { saveToCampaign, upadateToCampaign } from "../db2/campaign/db2.campaign.save";
import * as XLSX from "xlsx";
import { createRandomTmplPicker, sendFunction } from "../tmpls/utils.tmpls.send";
import { getCampaignNumber } from "../db2/campaign/db2.campaign.load";

const Send_Bulk = () =>{
    const [numbers, setNumbers] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [selected, setSelected] = useState([null, null, null]); 

    useEffect(() => {
        const loadTemplates = async () => {
            const list = await getAllTemplates();
            setTemplates(list);
        };
        loadTemplates();
    }, []);

    return(<>
        <div className=" bg-white p-4 h-full w-full flex flex-col gap-2">
            <PhoneNumbers numbers={numbers} setNumbers={setNumbers} />
            <Template templates={templates} selected={selected} setSelected={setSelected} />
            <Send templates={templates} />
        </div>
    </>)
}

const PhoneNumbers = ({ numbers, setNumbers }) => {

    const handleUpload = (e) => {
        console.log("running handleUPload");
        const file = e.target.files[0]; console.log("file", file);
        const reader = new FileReader();

        reader.onload = (evt) => {
            const arrayBuffer = evt.target.result;

            const workbook = XLSX.read(arrayBuffer, { type: "array" });

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });
            setNumbers(data.map(num => num.phn_numbers))
            console.log("Excel to json", data);
        }
        reader.readAsArrayBuffer(file);
    }

    const handleSave = async () => {
        for (let i = 0; i < numbers.length; i++) {
            const camp = {
                phnNo: numbers[i].toString(),
                sentOn: 0,
                tmplsId: 0,
                isSent: "N"
            };
            const res = await saveToCampaign(camp);
            console.log("campaign saved", res);
        }
    }

    return (<>
        <div className="w-full flex flex-col">
            <div className="p-4 flex flex-col border border-gray-300 gap-1">
                <h5 className="font-bold">Phone Numbers</h5>
                <input
                    type="file"
                    accept=".xlsx,.xls,.csv,.txt"
                    className="border p-2 rounded w-full"
                    onChange={handleUpload}
                />
                <button className="p-2 w-1/5 bg-green-800 text-white grow" onClick={() => handleSave()}>SAVE</button>
            </div>
        </div>
    </>)
}

const Template = ({ templates, selected, setSelected }) => {

    const handleChange = (index, templateId) => {
        const tmpl = templates.find(t => t.id === Number(templateId)) || null;

        setSelected(prev => {
            const copy = [...prev];
            copy[index] = tmpl;
            return copy;
        });
    };

    return (
        <div className="w-full flex flex-col grow">
            <div className="p-4 h-full flex flex-col border border-gray-300 space-y-4">
                <h5 className="font-bold">Template</h5>

                {[0, 1, 2].map(i => (
                    <select
                        key={i}
                        className="border rounded px-3 py-2"
                        value={selected[i]?.id || ""}
                        onChange={(e) => handleChange(i, e.target.value)}
                    >
                        <option value="">Select Template {i + 1}</option>
                        {templates.map(t => (
                            <option key={t.id} value={t.id}>
                                {t.tmplName}
                            </option>
                        ))}
                    </select>
                ))}
            </div>
        </div>
    );
};



const Send = ({ templates }) => {
    const [intervalMinutes, setIntervalMinutes] = useState(3);
    const [isRunning, setIsRunning] = useState(false);
    const timeoutRef = useRef(null);
    const isRunningRef = useRef(false);
    const [btnSatate, setBtnState] = useState("SEND");
    const [sendCount, setSendCount] = useState(0);

    const handleSend = async () => {
        setIsRunning(true);
        isRunningRef.current = true;
        setBtnState("Sending...");
        const tmplt = createRandomTmplPicker(templates);
        await sendMessage(parseInt(intervalMinutes), tmplt);
    }

    const handleStop = () => {
        setIsRunning(false);
        isRunningRef.current = false;
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setBtnState("SEND");
    }

    const sendMessage = async (interval, tmplt) => {
        const fn = interval * 60 * 1000;
        const sn = (interval + 3) * 60 * 1000;
        const row = await getCampaignNumber();
        console.log("Campaign Row", row);
        if (!row) {
            setIsRunning(false);
            isRunningRef.current = false;
            return;
        }
        let tmp = tmplt();
        console.log("Template Picker", tmp);

        //await sendFunction(row.phnNo, tmp.tmplBody);
        setSendCount(prev => prev + 1);
        //const res = await upadateToCampaign(row.id, {tmplsId : tmp.id, isSent: "Y"});
        //console.log("Campaign Update Result", res);
        console.log("isRunning", isRunningRef.current);

        if (isRunningRef.current) {
            console.log("calling next interval");
            nextInterval(fn, sn, interval, tmplt);
        }
    }

    const nextInterval = (fn, sn, interval, tmplt) => {
        let random = Math.floor(Math.random() * (sn - fn)) + fn;console.log("Next interval in ms", random);
        timeoutRef.current = setTimeout(async () => {
            if (isRunningRef.current) {
                await sendMessage(interval, tmplt);
            }
        }, random);
    }

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="w-full flex flex-col">
            <div className="flex flex-row items-center gap-2">
                <input
                    type="number"
                    value={intervalMinutes}
                    placeholder="Interval"
                    onChange={(e) => setIntervalMinutes(e.target.value)}
                    className="p-2 grow ring-0 outline-none focus:outline-none border border-gray-400"
                />
                <button
                    className="p-2 bg-green-800 text-white grow"
                    onClick={handleSend}
                    disabled={isRunning}
                >
                    {btnSatate}
                </button>
                {isRunning && (
                    <button
                        className="p-2 bg-red-800 text-white grow"
                        onClick={handleStop}
                    >
                        STOP
                    </button>
                )}
            </div>
        </div>
    )
}

export default Send_Bulk;